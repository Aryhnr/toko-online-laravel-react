export default function CategoryCard({ category }) {
    return (
        <div
            className="
                h-25 sm:h-30
                bg-gray-100 rounded-md p-5
                transition-all duration-300
                hover:-translate-y-1
                cursor-pointer
                flex items-center
            "
        >
            <div className="flex items-center gap-4 w-full">
                {/* ICON */}
                <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                    <img
                        src={category.icon}
                        alt={category.name}
                        className="w-6 h-6 object-contain"
                    />
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 truncate">
                        {category.name}
                    </h3>

                    <p className="text-sm text-slate-500 line-clamp-2">
                        {category.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
