import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/menu/SearchBar";
import MenuHeader from "../components/menu/MenuHeader";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/sidebar/Navbar";
import FilterButton from "../components/menu/FilterButton";
import MenuGrid from "../components/menu/MenuGrid";
import FilterPanel from "../components/menu/FilterPanel";
import ShoppingCart from "../components/menu/ShoppingCart";
import { useCart } from "../context/CartContext";

function Menu() {
    const [search, setSearch] = useState("");
    const [openSideBar, setOpenSidebar] = useState(false);
    const [category, setCategory] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        sort: "",
        availableOnly: false,
        vegetarian: false,
        vegan: false
    });

    const navigate = useNavigate();
    const { addToCart, totalItems } = useCart();

    return (
        <>
            <Sidebar  open={openSideBar} onClose={() => setOpenSidebar(false)} />
            <main className="min-h-screen bg-[#e98a53]">
                <Navbar onOpenSidebar={() => setOpenSidebar(true)} />
                <MenuHeader />
                <div className="mt-8 flex items-center justify-end gap-4 px-8">
                    <SearchBar search={search} setSearch={setSearch} />
                    <FilterButton onClick={() => setShowFilters(true)} />
                </div>
                <FilterPanel 
                    open={showFilters} 
                    onClose={() => setShowFilters(false)} 
                    setFilters={setFilters}
                    filters={filters}
                />
                <MenuGrid search={search} category={category} filters={filters} onAddToCart={addToCart} />
                <ShoppingCart items={totalItems} onClick={() => navigate("/cart")} />
            </main>
        </>
    )
}

export default Menu;