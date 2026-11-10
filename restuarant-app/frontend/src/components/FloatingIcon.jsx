export default function FloatingIcon({ className="", children, delay="0ms", duration="6s" }) {
    return (
        <div
            aria-hidden="true"
            style={{
                animationDelay: `${delay}, ${delay}`,
                animationDuration: `1.2s, ${duration}`
            }}
            className={`
                pointer-events-none
                absolute
                hidden 
                opacity-0 
                text-white 
                sm:block 
                [&>svg]:w-12 
                [&>svg]:h-12
                [&>svg]:stroke-[1.5]
                animate-[iconEntrance_1.2s_ease-out_forwards,floatFood_5s_ease-in-out_infinite]
                ${className}
            `}
            aria-hidden="true"
        >
            {children}
        </div>
    )
}