import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ProductPreview({ product }) {
    const images = product?.images || [];
    const [activeIndex, setActiveIndex] = useState(0);

    if (!product) return null;

    const prevImage = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const getImageUrl = (image) => {
        if (!image) return "/placeholder-product.png";
        return `/storage/${image.image_path}`;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT - IMAGE */}
            <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                    {images.length > 0 ? (
                        <img
                            src={getImageUrl(images[activeIndex])}
                            alt={product.name}
                            className="w-full h-full object-contain p-6"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No Image
                        </div>
                    )}

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
                            >
                                <ChevronLeft size={22} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
                            >
                                <ChevronRight size={22} />
                            </button>
                        </>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto p-2">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-24 h-24 rounded-xl overflow-hidden border ${
                                    activeIndex === i
                                        ? "ring-2 ring-[#213448]"
                                        : "opacity-60"
                                }`}
                            >
                                <img
                                    src={getImageUrl(img)}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* RIGHT - INFO */}
            <div className="space-y-6">
                {/* NAME */}
                <div>
                    <p className="text-sm text-gray-400 uppercase mb-1">
                        Product Name
                    </p>
                    <h3 className="text-2xl font-semibold">{product.name}</h3>
                </div>

                {/* PRICE */}
                <div>
                    <p className="text-sm text-gray-400 uppercase mb-1">
                        Price
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                    </p>
                </div>

                {/* META GRID */}
                <div className="grid grid-cols-2 gap-4">
                    {/* CATEGORY */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">
                            Category
                        </p>
                        <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {product.category?.name || "Uncategorized"}
                        </span>
                    </div>

                    {/* STOCK */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">
                            Stock
                        </p>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm ${
                                product.stock > 10
                                    ? "bg-green-100 text-green-700"
                                    : product.stock > 0
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {product.stock}
                        </span>
                    </div>

                    {/* STATUS */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">
                            Status
                        </p>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm ${
                                product.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {product.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>

                    {/* FLASH SALE */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">
                            Flash Sale
                        </p>
                        {product.is_flash_sale ? (
                            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                🔥 Yes
                            </span>
                        ) : (
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                                No
                            </span>
                        )}
                    </div>
                </div>

                {/* BADGES */}
                {product.badges?.length > 0 && (
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-2">
                            Badges
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {product.badges.map((badge, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-[#213448]/10 text-[#213448] text-xs font-medium"
                                >
                                    {badge.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* DESCRIPTION */}
                <div>
                    <p className="text-sm text-gray-400 uppercase mb-2">
                        Description
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        {product.description || "-"}
                    </p>
                </div>
            </div>
        </div>
    );
}
