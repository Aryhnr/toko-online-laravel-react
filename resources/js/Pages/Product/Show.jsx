import { useState } from "react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import BadgeCard from "@/Components/ui/BadgeCard";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Show() {
    const product = {
        id: 1,
        name: "Celana Cargo Loose",
        slug: "celana-cargo-loose",
        category: { name: "Fashion Wanita" },
        description: "Celana CarGo",
        price: 30000,
        stock: 400,
        status: "active",
        flash_sale: true,
        badges: [
            {
                label: "Celana",
                variant: "success",
                position: "top-right",
            },
        ],
        images: [
            "/images/produk/produk1.jpg",
            "/images/produk/produk2.jpg",
            "/images/produk/produk1.jpg",
        ],
    };

    // ✅ STATE GAMBAR AKTIF
    const [activeImage, setActiveImage] = useState(0);

    const prevImage = () => {
        setActiveImage((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setActiveImage((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <GuestLayout>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* IMAGE SECTION */}
                    <div>
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                            {/* BADGE */}
                            {product.badges?.map((badge, index) => (
                                <BadgeCard
                                    key={index}
                                    label={badge.label}
                                    variant={badge.variant}
                                    position={badge.position}
                                />
                            ))}

                            {/* MAIN IMAGE */}
                            <img
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />

                            {/* PREV */}
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {/* NEXT */}
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* THUMBNAILS (CENTER) */}
                        <div className="mt-4 flex justify-center gap-3">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border transition
                                        ${
                                            activeImage === index
                                                ? "border-[#213448]"
                                                : "border-gray-300 hover:border-gray-400"
                                        }
                                    `}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* INFO */}
                    <div>
                        <p className="text-sm text-gray-500">
                            {product.category.name}
                        </p>

                        <h1 className="text-2xl font-bold mt-1">
                            {product.name}
                        </h1>

                        <p className="mt-3 text-2xl font-bold text-[#E9445A]">
                            Rp {product.price.toLocaleString("id-ID")}
                        </p>

                        <p className="mt-2 text-sm text-gray-600">
                            Stok tersedia:{" "}
                            <span className="font-semibold">
                                {product.stock}
                            </span>
                        </p>

                        {product.flash_sale && (
                            <p className="mt-2 inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                                Flash Sale
                            </p>
                        )}

                        {/* ACTION */}
                        <div className="flex gap-3 mt-6">
                            <button className="flex items-center gap-2 bg-[#213448] text-white px-6 py-3 rounded-lg hover:bg-[#162737]">
                                <ShoppingCart size={18} />
                                Add to Cart
                            </button>

                            <button className="w-12 h-12 flex items-center justify-center border rounded-lg text-[#E9445A]">
                                <Heart size={20} />
                            </button>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {product.status !== "active" && (
                            <p className="mt-4 text-sm text-red-500">
                                Produk tidak tersedia
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
