import { Heart, ShoppingCart } from "lucide-react";
import BadgeCard from "../ui/BadgeCard";

export default function ProductCard({ product }) {
    return (
        <div className="bg-white overflow-hidden transition">
            <div className="relative group aspect-square overflow-hidden rounded-xl">
                {product.badge && (
                    <BadgeCard
                        label={product.badge.label}
                        variant={product.badge.variant}
                        position={product.badge.position}
                    />
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-300 rounded-xl group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 flex gap-2 p-3 translate-y-full group-hover:translate-y-0 transition duration-300">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#213448] text-white py-2 rounded-lg text-sm hover:bg-[#162737]">
                        <ShoppingCart size={16} />
                        Add
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-white text-[#E9445A] rounded-lg hover:bg-gray-100">
                        <Heart size={18} />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-sm font-semibold line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">{product.category}</p>

                <p className="mt-2 font-bold text-[#E9445A]">
                    Rp {product.price}
                </p>
            </div>
        </div>
    );
}

