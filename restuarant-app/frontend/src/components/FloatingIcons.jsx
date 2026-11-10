import {
    Beef, CakeSlice, Croissant, Eye, EyeOff, Grape, Soup, Utensils, Wine, Pizza
} from "lucide-react";
import FloatingIcon from "./FloatingIcon";
import cheeseIcon from "../assets/icons/cheese.svg";
import chickenIcon from "../assets/icons/chicken.svg";
import steakIcon from "../assets/icons/steak.svg";
import utensils from "../assets/icons/utensils.svg";

export default function FloatingIcons() {
    const lucideIcons = [
        {
            Icon: Soup,
            className: "left-[12%] top-[16%]",
            delay: "0ms",
            duration: "6.4s"
        },
        {
            Icon: Grape,
            className: "left-[20%] top-[12%]",
            delay: "400ms",
            duration: "4s"
        },
        {
            Icon: Beef,
            className: "left-[89%] top-[70%]",
            delay: "600ms",
            duration: "5s"
        },
        {
            Icon: Wine,
            className: "left-[67%] top-[18%]",
            delay: "800ms",
            duration: "7s"
        },
        {
            Icon: Pizza,
            className: "left-[33%] top-[45%]",
            delay: "1000ms",
            duration: "6s"
        },
        {
            Icon: Croissant,
            className: "left-[72%] top-[81%]",
            delay: "1200ms",
            duration: "6s"
        }
    ]

    const imgIcons = [
        {
            img: cheeseIcon,
            iconClassName: "left-[41%] top-[60%]",
            delay: "1400ms",
            duration: "4s",
            alt: "cheese-icon"            
        },
        {
            img: steakIcon,
            iconClassName: "left-[23%] top-[77%]",
            delay: "1600ms",
            duration: "6s",
            alt: "steak-icon"
        },
        {
            img: chickenIcon,
            iconClassName: "left-[34%] top-[23%]",
            delay: "1800ms",
            duration: "3s",
            alt: "chicken-icon"
        },
        {
            img: utensils,
            iconClassName: "left-[88%] top-[22 %]",
            delay: "2000ms",
            duration: "4.4s",
            alt: "utensil-icon"
        }
    ]
    return (
        <>
            {lucideIcons.map(({ className, Icon, delay, duration }, index) => (
                <FloatingIcon 
                    key={index}
                    className={className}
                    delay={delay}
                    duration={duration}
                >
                    <Icon className="w-12 h-12 text-white" />
                </FloatingIcon>
            ))}

            {imgIcons.map((icon, index) => (
                <FloatingIcon  key={index} className={icon.iconClassName} delay={icon.delay} duration={icon.duration}>
                    <img src={icon.img} alt={icon.alt} className="w-12 h-12"/>
                </FloatingIcon>
            ))}
        </>
    )
}