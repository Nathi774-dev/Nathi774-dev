import HomeNavbar from "../components/HomeNavbar";
import HeroSection from "../components/HeroSection";

const links = [
    {
        name: "Login",
        route: "/login"
    },
    {
        name: "Signup",
        route: "/signup"
    }
]

function Home() {

    return <div className="min-h-screen bg-white">
        <HomeNavbar links={links}/>
        <HeroSection />
    </div>
}

export default Home;