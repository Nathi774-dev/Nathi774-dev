export default function Footer({ open }) {
    return (
        <div 
            className={`
                    mt-auto border-t border-white/10 p-6 
                    transition-all duration-700 
                    ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
                `}>
            <p className="text-xs uppercase tracking-widest text-stone-400">
                Follow Us
            </p>

            <div className="mt-4 flex gap-4">
                {/* Social icons go here */}
            </div>

            <p className="mt-6 text-xs text-stone-400">
                support@fenzottifoods.com
            </p>

            <p className="mt-6 text-xs text-stone-500">
                &copy; 2026 Fenzotti Foods Co.
            </p>
        </div>
    )
}