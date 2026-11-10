import { menuItems } from "./data/menuData";
import { categories } from "./data/menuData";
import MenuCard from "./MenuCard";


export default function MenuGrid({ search, category, filters, onAddToCart }) {
    const filteredItems = menuItems.filter((item) => {
        const matchedCategory = category === "All" || item.category === category;
        const matchedSearches = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesAvailable = !filters.availability || item.available;
        const matchesVegetarian = !filters.vegetarian || item.vegetarian;
        const matchesVegan = !filters.vegan || item.vegan;

        return (
            matchedCategory && matchedSearches && matchesAvailable && matchesVegetarian && matchesVegan
        );
    });

    // for sorting
    switch (filters.sort) {
        case "low":
            filteredItems.sort((a, b) => a.price - b.price)
            break;
        case "high":
            filteredItems.sort((a, b) => b.sort - a.sort);
            break;
        case "rating":
            filteredItems.sort((a, b) => b.rating - a.rating)
        default:
            break;
    }

    return (
        <section className="px-8 py-10">
            {filteredItems.length === 0 ? (
                <div className="flex h-60 items-center justify-center">
                    <p className="text-lg font-medium text-stone-700">
                        No dishes found.
                    </p>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map((item) => (
                        <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
                    ))}
                </div>
            )} 
        </section>
    )
}