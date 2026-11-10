import { createContext, useContext, useState } from "react";

const favouriteContext = createContext(null);


export function FavouritesProvider({children}) {
    const [favourites, setFavourites] = useState([]);

    function toggleFavourites(item) {
        setFavourites(currentFavourite => {
            const alreadFavourite = currentFavourite.some(favourite => {
                favourite.id === item.id
            })

            if (alreadFavourite) {
                return currentFavourite.filter(favourite => {
                    favourite.id !== item.id
                })
            }
            return [...currentFavourite, item]
        })
    }

    function isFavourite(id) {
        return favourites.some(favourite => {
            favourite.id === id
        })
    }

    function removeFavourite(id) {
        setFavourites(currentFavourite => {
            currentFavourite.filter(favourite => {
                favourite.id !== id
            })
        })
    }

    return (
        <favouriteContext.Provider
            value={{
                favourites,
                toggleFavourites,
                isFavourite,
                removeFavourite
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