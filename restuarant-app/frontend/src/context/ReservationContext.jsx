import {
    useState,
    useContext,
    createContext,
    useEffect
} from "react";

import { useAuth } from "./AuthContext"; 

import { locations as locals } from "../components/menu/data/tableData";

const ReservationContext = createContext(null);
const apiURL = `${import.meta.env.VITE_API_URL}/api`


async function apiRequest(endpoint, token, options = {}) {
    const response = await fetch(`${apiURL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
}

export function ReservationProvider({ children }) {

    const { token, isAuthenticated, loading: authLoading } = useAuth();
    const [reservation, setReservation] = useState({
        locationId: "",
        date: "",
        time: "",
        guests: 1,
        tableId: null
    });
    const [myReservation, setMyReservation] = useState([]);
    const [availableTables, setAvailableTables] = useState([])
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [reservationError, setReservationError] = useState("")

    // SELECTED LOCATION
    const selectedLocation = locals.find(loc => loc.id === reservation.locationId)
    const locationTables = selectedLocation?.tables ?? [];

    // FETCH MY RESERVATIONS
    async function fetchMyReservation() {
        if (!token || isAuthenticated) {
            setMyReservation([]);
            return;
        }

        try {
            setLoadingResponse(true);
            setReservationError("");

            const data = await apiRequest("/reservations/my-reservations");
            setMyReservation(Array.isArray(data.reservations) ? data.reservations : []);
        } catch (err) {
            console.error("Fetch reservations error: ", err);
            setReservationError(err.message);
        } finally {
            setLoadingResponse(false);
        }
    }

    useEffect(() => {
        if (authLoading) return;

        if (isAuthenticated && token) {
            fetchMyReservation();
        } else {
            setMyReservation([]);
        }

    }, [authLoading, isAuthenticated, token]);

    // FETCH AVAILABLE TABLES
    useEffect(() => {
        const { locationId, date, time, guests } = reservation;
        if (!locationId || !date || !time || !guests) {
            setAvailableTables([]);
            return;
        }
        let ignore = false;
        async function fetchAvailableTables() {
            try {
                const params = new URLSearchParams({ locationId, date, time, guests: String(guests) });
                const data = await apiRequest(`/reservations/availability?${params.toString()}`, token);

                // for debugging
                console.log("Availability request:", params.toString());
                console.log("Availability response:", data);
                if (!ignore) {
                    setAvailableTables(data.availableTables || []);;
                }
            } catch (err) {
                console.error("Fetch available tables error: ", err);
                if (!ignore) {
                    setAvailableTables([]);
                }
            }
        }

        fetchAvailableTables();

        return () => {
            ignore = true;
        }
    }, [reservation.locationId, reservation.date, reservation.time, reservation.guests])

    // UPDATE RESERVATION
    function updateReservation(name, value) {
        setReservation(current => ({
            ...current,
            [name]: name === "guests" ? Number(value) : value,
            ...(
                name === "locationId" || 
                name === "date" || 
                name === "time" || 
                name === "guests" ? { tableId: null } : {}
            )
        }));
    } 

    // SELECT TABLE
    function selectTable(tableId) {
        const table = availableTables.find(item => item.id === Number(tableId));
        if (!table) return;

        setReservation(current => ({ ...current, tableId: table.id }))
    }

    // RESET TABLE
    function resetTable() {
        setReservation(current => ({
            ...current,
            tableId: null
        }));
    }

    // CREATE RESERVATION
    async function createReservation() {
        try {
            setReservationError("");
            
            if (authLoading) {
                throw new Error("Please wait until your is verified");
            }

            if (!isAuthenticated || !token) {
                throw new Error("Please log in before booking a reservation.");
            }

            const data = await apiRequest("/reservations", token, {
                method: "POST",
                body: JSON.stringify({
                    locationId: reservation.locationId,
                    tableId: reservation.tableId,
                    date: reservation.date,
                    time: reservation.time,
                    guests: Number(reservation.guests)
                })
            });

            // Adds the saved reservation returned by MongoDB
            setMyReservation(current => [...current, data.reservation]);

            // clear the form after successful booking
            setReservation({
                locationId: "",
                date: '',
                time: '',
                guests: 1,
                tableId: null
            });

            return data.reservation;
        } catch (err) {
            console.error("Create reservation error: ", err);
            setReservationError(err.message);
            throw err;
        }
    }

    // CANCEL RESERVATION
    async function cancelReservation(reservationId) {
        try {
            setReservationError("");

            const data = await apiRequest(
                `/reservations/cancel/${reservationId}`,
                token,
                { method: "DELETE" }
            );

            // Only update the reservation list after successful cancellation
            setMyReservation(current => {
                if (!Array.isArray(current)) return [];

                return current.map(item =>
                    item._id === reservationId
                        ? { ...item, status: "cancelled" }
                        : item
                );
            });

            return data;

        } catch (error) {
            console.error("Cancel reservation error:", error);

            // Do not overwrite myReservation with an error message
            setReservationError(error.message);

            throw error;
        }
    }
    

    // CHECK RESERVATION
    const isReservationComplete = Boolean(
        reservation.locationId && 
        reservation.date &&
        reservation.tableId && 
        reservation.guests && 
        reservation.time
    );

    // CHECK AVAILABILITY
    function isTableReserved(tableId) {
        return !availableTables.some(table => table.id === Number(tableId))
    }

    //PROVIDER (LAST STEP)
    return (
        <ReservationContext.Provider value={{
            reservation,
            locations: locals,
            selectTable,
            reservationError,
            selectedLocation,
            locationTables,
            availableTables,
            isReservationComplete,
            updateReservation,
            createReservation,
            cancelReservation,
            resetTable,
            myReservation,
            loadingResponse,
            fetchMyReservation
        }}>
            {children}
        </ReservationContext.Provider>
    )
}

export function useReservation() {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error("useReservation must only be used inside the Reservation provider");
    }

    return context;
}