import { LockKeyhole, MapPin } from "lucide-react";
import MapReview from "./location/MapPreview";

export default function HeroSection() {
    return (
        <main className="grid min-h-[calc(100vh-56px)] grid-cols-2">
            {/* Left section */}
            <section className="flex flex-col justify-between bg-white px-8 py-10 lg:px-14 lg:py-12">
                <div>
                    <h2 className="max-w-md text-4xl font-bold leading-[1.35] text-green-500 lg:text-5xl">
                        Guard your {" "}
                        <LockKeyhole className="mb-1 inline-block" size={32}/>{" "}
                        vehicles with ease
                    </h2>
                </div>

                {/* Description */}
                <div className="max-w-lg">
                    <h3 className="text-3xl font-bold leading-relaxed text-green-500">
                        Log in or sign up to get all the features of the Public Transprt API
                    </h3>
                </div>

                <p className="mt-5 text-base leading-7 text-gray-600">
                    Monitor vehicles, detect accidents in time and
                    use intelligent automation to manage your public 
                    transport network.
                </p>
            </section>

            {/* Right section */}
            <section className="flex flex-col bg-[#85c850] px-6 py-8 sm:px-10 lg:px-14">
                <p className="max-w-md text-lg leading-7 text-white">
                    The mapping system is implemented by google maps
                </p>
                <MapReview />
            </section>
        </main>
    )
}