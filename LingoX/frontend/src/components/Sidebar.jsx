import {
    Home,
    BookOpen,
    Dumbbell,
    Trophy,
    User,
    Languages
} from "lucide-react";

const navigation = [
    { name: "Learn", icon: Home },
    { name: "Lessons", icon: BookOpen },
    { name: "Practise", icon: Dumbbell },
    { name: "Leaderboard", icon: Trophy },
    { name: "Profile", icon: User }
];

export default function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="sidebar">
            <div className="brand">
                <Languages size={30} />
                <span>Lingo<span className="brand-accent">X</span></span>
            </div>
            <nav>
                {navigation.map((navItem, index) => (
                    <button 
                        key={index} 
                        className={`nav-item ${activePage === navItem.name ? "active" : ""}`}
                        onClick={() => setActivePage(navItem.name)}
                    >
                        <navItem.icon size={21} />
                        <span>{navItem.name}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <p>Learn something new every day!</p>
                <span>Made with ❤ for language learners</span>
            </div>
        </aside>
    )
}