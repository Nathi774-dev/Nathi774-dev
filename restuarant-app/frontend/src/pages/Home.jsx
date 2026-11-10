import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/sidebar/Navbar";
import Hero from "../components/home/Hero";
import FloatingActions from "../components/home/FloatingSection";
import ReviewSection from "../components/home/reviews/ReviewSection";
import QuickLinks from "../components/home/QuickLinks";
import Footer from "../components/Footer";
import Payment from "./Payment";

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="min-h-screen bg-[#E98A53]">
                <Navbar onOpenSidebar={() => setSidebarOpen(true)} showTitle={true}  showLocations={true}>
                    Welcome to <br /> Fenzotti Foods.
                </Navbar>
                <Hero />
                <ReviewSection />
                <section className="relative">
                    <div className="sticky bottom-6 flex justify-end pr-6">
                        <FloatingActions />
                    </div>
                </section>
                <QuickLinks />
                <Footer />
            </main>
        </>
    )
}

export default Home;