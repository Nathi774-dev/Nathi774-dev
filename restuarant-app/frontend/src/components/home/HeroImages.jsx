import { useEffect, useState } from "react";
import heroImg1 from "../../assets/food-hero-img.jpg";
import heroImg2 from "../../assets/food-and-wine-hero.jpg";
import heroImg3 from "../../assets/dessertHero-img.jpg";

const heroImages = [
    {
        img: heroImg1,
        alt: "Delicious spaghetti"
    },
    {
        img: heroImg2,
        alt: "For a bit of taste"
    },
    {
        img: heroImg3,
        alt: "Desserts for everyone"
    }
]

export default function HeroImage() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prevCurrent => prevCurrent === heroImages.length - 1 ? 0 : prevCurrent + 1)
        }, 4000)

        return () => {
            clearInterval(timer);
        }
    }, [])

    return (
        <section className="mt-2 px-16">
            <div className="overflow-hidden rounded-3xl shadow-xl">
                <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translate(-${current * 100}%)`
                    }}
                >
                    {heroImages.map(({img, alt}) => (
                        <img src={img} alt={alt} key={img} className="h-98 w-full shrink-0 object-cover rounded-3xl" />
                    ))}
                </div>
                <div className="mt-5 flex justify-center gap-3">
                    {heroImages.map((_, index) => (
                        <button 
                            key={index} 
                            onClick={() => setCurrent(index)}
                            className={`h-3 w-3 rounded-full transition ${
                                current === index ? "bg-white" : "bg-white/40"
                            }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    )
}