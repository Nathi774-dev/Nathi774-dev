import {
    useState,
    useContext,
    createContext
} from "react";

import { locations } from "../components/menu/data/tableData";

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {

    const [reservation, setReservation] = useState({
        locationId: "",
        date: "",
        time: "",
        guests: 1,
        tableId: null
    });
    const [myReservation, setMyReservation] = useState([]);

    function createReservation() {
        if (!myReservation) {
            return false;
        }
        const newReservation = {
            id: `res-${Date.now()}`,
            ...reservation
        }

        setMyReservation((currentReservations) => [
            ...currentReservations,
            newReservation
        ])

        return true;
    }

    // --------------------------------
    // UPDATE RESERVATION
    // --------------------------------

    function updateReservation(name, value) {

        setReservation((currentReservation) => ({
            ...currentReservation,

            [name]: value,

            // Changing these fields means
            // the previously selected table
            // may no longer be valid.
            ...(name === "locationId" ||
            name === "date" ||
            name === "time" ||
            name === "guests"
                ? { tableId: null }
                : {})
        }));
    }


    // --------------------------------
    // RESET TABLE
    // --------------------------------

    function resetTable() {

        setReservation((currentReservation) => ({
            ...currentReservation,
            tableId: null
        }));
    }


    // --------------------------------
    // FIND SELECTED LOCATION
    // --------------------------------

    const selectedLocation = locations.find(
        (location) =>
            location.id === reservation.locationId
    );


    // --------------------------------
    // GET TABLES FOR LOCATION
    // --------------------------------

    const locationTables =
        selectedLocation?.tables ?? [];


    // --------------------------------
    // TEMPORARY RESERVATIONS
    // --------------------------------

    const existingReservations = [

        {
            id: "res-001",
            locationId: "main",
            tableId: 3,
            date: "2026-08-23",
            time: "08:00",
            guests: 3
        },

        {
            id: "res-002",
            locationId: "walmer",
            tableId: 4,
            date: "2026-09-30",
            time: "16:45",
            guests: 1
        },

        {
            id: "res-003",
            locationId: "bluewater",
            tableId: 2,
            date: "2026-10-08",
            time: "14:10",
            guests: 3
        }

    ];


    // --------------------------------
    // CHECK IF TABLE IS RESERVED
    // --------------------------------

    
    
    // --------------------------------
    // AVAILABLE TABLES
    // --------------------------------

    
    
    // SELECT TABLE
    function selectTable(tableId) {

        const table = availableTables.find(
            (table) => table.id === tableId
        );

        if (!table) {
            return;
        }
        
        setReservation((currentReservation) => ({
            ...currentReservation,
            tableId
        }));
    }


    // CHECK RESERVATION
    const isReservationComplete =
    Boolean(
        reservation.locationId &&
        reservation.date &&
            reservation.time &&
            reservation.guests &&
            reservation.tableId
        );


    // DEBUGGING

    console.log("Reservation:", reservation);

    console.log(
        "Selected location:",
        selectedLocation
    );

    console.log(
        "Location tables:",
        locationTables
    );
    
    console.log(
        "Available tables:",
        availableTables
    );


    // --------------------------------
    // PROVIDER
    // --------------------------------

    const allReservations = [
        ...existingReservations,
        ...myReservation
    ]

    function isTableReserved(tableId) {
        return allReservations.some((reserveItem) => {
            return (
                reserveItem.locationId === reservation.locationId && 
                reserveItem.tabelId === tableId && 
                reserveItem.date === reservation.date && 
                reserveItem.time === reservation.time
            )
        })
    }
    
    const availableTables =
        locationTables.filter((table) => {

            const hasEnoughSeats =
                table.seats >=
                Number(reservation.guests);

            const alreadyReserved =
                isTableReserved(table.id);

            return (
                hasEnoughSeats &&
                !alreadyReserved
            );
        });
    return (
        <ReservationContext.Provider
            value={{
                reservation,
                locations,
                selectedLocation,
                locationTables,
                availableTables,
                existingReservations,
                isReservationComplete,
                updateReservation,
                resetTable,
                selectTable,
                isTableReserved,
                createReservation,
                myReservation
            }}
        >
            {children}
        </ReservationContext.Provider>
    );
}


export function useReservation() {

    const context =
        useContext(ReservationContext);

    if (!context) {
        throw new Error(
            "useReservation must only be used inside the ReservationProvider"
        );
    }

    return context;
}