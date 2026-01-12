import CategoryDropdown from "../../Components/CategoryDropdown";


export default function FilterCard({
    categories = [],
    filters,
    setFilters,
    setCurrentPage,
}) {
    const handleChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-5 space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
                Filter Produk
            </h3>

            {/* SEARCH */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                    Nama Produk
                </label>
                <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Cari produk..."
                    className="
                        w-full rounded-xl px-4 py-2.5 text-sm
                        bg-gray-50
                        ring-1 ring-gray-200
                        placeholder:text-gray-400
                        focus:outline-none
                        focus:ring-2 focus:ring-[#213448]
                        transition
                    "
                />
            </div>

            {/* CATEGORY */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                    Kategori
                </label>
                <CategoryDropdown
                    categories={categories}
                    value={filters.category}
                    onChange={(val) => handleChange("category", val)}
                />
            </div>

            {/* PRICE */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Range Harga
                </label>

                <div className="flex gap-3">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) =>
                            handleChange("minPrice", e.target.value)
                        }
                        className="
                            w-1/2 rounded-xl px-4 py-2.5 text-sm
                            bg-gray-50
                            ring-1 ring-gray-200
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2 focus:ring-[#213448]
                            transition
                        "
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) =>
                            handleChange("maxPrice", e.target.value)
                        }
                        className="
                            w-1/2 rounded-xl px-4 py-2.5 text-sm
                            bg-gray-50
                            ring-1 ring-gray-200
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2 focus:ring-[#213448]
                            transition
                        "
                    />
                </div>
            </div>
        </div>
    );
}
