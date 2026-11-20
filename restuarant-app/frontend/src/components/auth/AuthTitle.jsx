export default function AuthTitle({ title, subtitle }) {
    return (
        <>
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.38em] text-white/90">
                <span className="text-green-800">Fenzotti</span> Foods <span className="text-red-800">Co.</span>
            </p>
            <h1 className="mb-10 text-center font-serif text-6xl font-medium leading-none text-black sm:text-7xl">
                {title}
            </h1>
            <p className="mb-3 text-center text-sm text-white/85">
                {subtitle}
            </p>
        </>
    )
}