import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Robotics() {
    return (
        <>
            <NavBar/>

            <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center">
                    Robotics and IoT projects coming soon...
                </h2>
            </main>

            <Footer />
        </>
    )
}

export default Robotics;