import { Pizza, Soup, Salad, IceCreamCone, CupSoda, Beef, FishIcon} from "lucide-react";

const categories = [
    {
        name: "All",
        icon: Beef,
    },
    {
        name: "Pizzas",
        icon: Pizza
    },
    {
        name: "Pies",
        icon: Soup
    },
    {
        name: "Salads",
        icon: Salad
    },
    {
        name: "Desserts",
        icon: IceCreamCone
    },
    {
        name: "Drinks",
        icon: CupSoda
    },
    {
        name: "Seafood",
        icon: FishIcon
    },
    {
        name: "Pies",
        icon: Soup
    }
];

export default function Categories({ category, setCategory }) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map(({ name, icon: Icon }) => (
                <button 
                    key={name}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-colors ${`
                        category === name ? "bg-[#5a311d] shadow-lg" : 
                        "bg-white text-stone-700 hover:bg-[#d96d2d] hover:text-white"`
                    }`}
                    onClick={() => setCategory(name)}
                >
                    <Icon size={24} />
                    <span className="text-sm font-medium">{name}</span>
                </button>
            ))}
        </div>
    )
}