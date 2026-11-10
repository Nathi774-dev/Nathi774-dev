import { X } from "lucide-react";

export default function FilterPanel({
    open,
    onClose,
    filters,
    setFilters
}) {
    if (!open) return null;

    return (
        <>
            {/* Background */}
            <div onClose={onClose} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

            {/* The filter section display */}
            <aside
                className="
                    fixed right-0 top-0 z-50 h-screen w-80 bg-white p-6
                    shadow-2xl
                "
            >
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        Filters
                    </h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                    <h3 className="font-semibold">
                        Sort By
                    </h3>
                    <select 
                        className="w-full rounded-xl border p-3"
                        value={filters.sort}
                        onChange={(e) => setFilters({...filters, sort: e.target.value})}
                    >
                        <option value="">Default</option>
                        <option value="low">Price: Low -&gt; High </option>
                        <option value="high">Price: High -&gt; Low </option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>
            </aside>
        </>
    )
}