import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const favouriteContext = createContext(null);
const apiURL = import.meta.env.VITE_API_URL

export function FavouritesProvider({children}) {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token, isAuthenticated, loading: authLoading } = useAuth();

    // handling API responses
    async function handleResponse(response) {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    }

    // get user's favourites from the backend
    const getFavourites = useCallback(async () => {
        if (!token) return [];

        const response = await fetch(`${apiRURL}/api/favourites`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await handleResponse(response);
        setFavourites(data.favourites || []);

        return data.favourites || [];
    }, [token]);

    // Load the favourites after the user is authenticated
    useEffect(() => {
        let active = true;
        const loadFavourites = async () => {
            if (authLoading) return;

            if (!isAuthenticated || !token) {
                setFavourites([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            try {
                const response = await fetch(`${apiURL}/api/favourites`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await handleResponse(response);

                if (active) {
                    setFavourites(Array.isArray(data.favourites) ? data.favourites : []);
                }
            } catch (err) {
                if (active) {
                    setError(err.message);
                    setFavourites([]);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadFavourites();

        // cleanup function to prevent errors
        return () => {
            active = false;
        }
    }, [token, isAuthenticated, authLoading])

    async function toggleFavourites(item) {
        // add or remove a favourite with the backend
        if (!isAuthenticated || !token) {
            throw new Error("Please log in to manage your favourites.");
        }

        const menuItemId = item._id;
        if (!menuItemId) {
            throw new Error("Invalid menu item");
        }

        const alreadyFavourite = favourites.some(favourite => favourite._id === menuItemId);
        if (alreadyFavourite) {
            await removeFavourite(menuItemId);
            return;
        }

        const response = await fetch(`${apiURL}/api/favourites/${menuItemId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        await handleResponse(response);
        setFavourites(current => {
            const exists = current.some(favourite => favourite._id === menuItemId);
            return exists ? current : [...current, item]
        })
    }

    // check if an item is already a favourite
    function isFavourite(id) {
        return (favourites || []).some(favourite => {
            favourite._id === id
        })
    }

    // remove a favourite with a DELETE request
    async function removeFavourite(id) {
        if (!token) {
            throw new Error("Please log in to manage your favourites.");
        }

        const response = await fetch(`${apiURL}/api/favourites/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        await handleResponse(response);
        setFavourites(current => {
            current.filter(item => item._id !== id)
        })
    }

    return (
        <favouriteContext.Provider
            value={{
                favourites,
                toggleFavourites,
                isFavourite,
                removeFavourite,
                loading,
                error
            }}
        >
           {children}
        </favouriteContext.Provider>
    )
}

export function useFavourites() {
    const context = useContext(favouriteContext);
    if (!context) {
        throw new Error(
            "This custom hook must be inside the favourites context provider"
        )
    }
    return context;
}