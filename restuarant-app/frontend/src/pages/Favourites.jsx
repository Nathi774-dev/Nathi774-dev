import { useNavigate } from "react-router-dom";
import FavouritesHeader from "../components/favourites/FavouritesHeader";
import FavouritesGrid from "../components/favourites/FavouritesGrid";
import { useFavourites } from "../context/FavouriteContext";
import { useCart } from "../context/CartContext";
import ShoppingCart from "../components/menu/ShoppingCart";

function Favourites() {
    const navigate = useNavigate();

    const {favourites, removeFavourite} = useFavourites();
    const {totalItems} = useCart();

    return (
        <main className="min-h-screen bg-[#e98a53] px-8 py-10">
            <FavouritesHeader onBack={() => navigate(-1)} />
            <FavouritesGrid favourites={favourites} onRemoveFavourite={removeFavourite} onBrowse={() => navigate("/menu")} />
            <ShoppingCart items={totalItems} onClick={() => navigate("/cart")} />
        </main>
    )
}

export default Favourites;