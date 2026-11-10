export default function AuthButton({ children }) {
    return (
        <button
            type="submit"
            className="
                h-14 w-full rounded-2xl 
                bg-black font-semibold text-white shadow-lg 
                transition duration-300 hover:-translate-y-1 hover:bg-stone-900
                hover:shadow-2xl"
        >
            {children}
        </button>
    )
}