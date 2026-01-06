export default function CategoryCard({ category }) {
    return (
        <div
            className="
                h-24 sm:h-28
                bg-gray-100 rounded-lg p-4
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-md
                cursor-pointer
                flex items-center
            "
        >
            <div className="flex items-center gap-4 w-full">
                {/* IMAGE */}
                <div className="w-14 h-14 shrink-0 rounded-lg bg-white overflow-hidden flex items-center justify-center">
                    {category.icon ? (
                        <img
                            src={category.icon}
                            alt={category.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                    )}
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-600 truncate">
                        {category.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2">
                        {category.description || "Browse products"}
                    </p>
                </div>
            </div>
        </div>
    );
}
