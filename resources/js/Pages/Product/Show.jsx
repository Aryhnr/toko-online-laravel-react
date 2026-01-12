import { useState } from "react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import BadgeCard from "@/Components/ui/BadgeCard";
import GuestLayout from "@/Layouts/GuestLayout";
import BestSellerSlider from "@/Components/BestSellerSlider";
import bestSellerProducts from "@/data/dummyProducts";

export default function Show({ products }) {
    // data dummy
    const product = {
        id: 1,
        name: "Celana Cargo Loose",
        slug: "celana-cargo-loose",
        category: { name: "Fashion Wanita" },
        description: "Celana cargo bahan tebal, nyaman dipakai harian.",
        price: 30000,
        is_active: true,
        badges: [
            {
                label: "Best Seller",
                variant: "success",
                position: "top-right",
            },
        ],
        images: [
            "/images/produk/produk1.jpg",
            "/images/produk/produk2.jpg",
            "/images/produk/produk1.jpg",
        ],
        variants: [
            { id: 1, size: "S", color: "Hitam", stock: 10, price: null },
            { id: 2, size: "M", color: "Hitam", stock: 5, price: 35000 },
            { id: 3, size: "L", color: "Putih", stock: 0, price: null },
            { id: 4, size: "XL", color: null, stock: 8, price: null },
        ],
    };

    const bestSellers = products ?? bestSellerProducts;

    // state
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [qty, setQty] = useState(1);

    // image slider
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

    // Varian logic
    const sizes = [...new Set(product.variants.map((v) => v.size))];

    const colors = selectedSize
        ? [
              ...new Set(
                  product.variants
                      .filter((v) => v.size === selectedSize && v.color)
                      .map((v) => v.color)
              ),
          ]
        : [];

    const selectVariant = (size, color = null) => {
        const variant = product.variants.find(
            (v) => v.size === size && (color ? v.color === color : true)
        );

        setSelectedVariant(variant || null);
        setQty(1);
    };

    return (
        <GuestLayout>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Image section */}
                    <div>
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                            {/* BADGES */}
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
                                className="absolute left-3 top-1/2 -translate-y-1/2
                                bg-white/80 hover:bg-white p-2 rounded-full shadow"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {/* NEXT */}
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                bg-white/80 hover:bg-white p-2 rounded-full shadow"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* THUMBNAILS */}
                        <div className="mt-4 flex justify-center gap-3">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border
                                        ${
                                            activeImage === index
                                                ? "border-[#213448]"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
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

                    {/* Info Section */}
                    <div className="space-y-6 md:sticky md:top-24">
                        {/* CATEGORY */}
                        <p className="text-sm text-gray-500">
                            {product.category?.name}
                        </p>

                        {/* NAME */}
                        <h1 className="text-2xl font-bold">{product.name}</h1>

                        {/* PRICE */}
                        <p className="text-2xl font-bold text-[#E9445A]">
                            Rp{" "}
                            {(
                                selectedVariant?.price ?? product.price
                            ).toLocaleString("id-ID")}
                        </p>

                        {/* SIZE */}
                        <div>
                            <p className="text-sm font-medium mb-2">Size</p>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setSelectedColor(null);
                                            selectVariant(size);
                                        }}
                                        className={`px-4 py-2 border rounded-lg text-sm
                                            ${
                                                selectedSize === size
                                                    ? "bg-[#213448] text-white border-[#213448]"
                                                    : "hover:border-[#213448]"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* COLOR */}
                        {colors.length > 0 && (
                            <div>
                                <p className="text-sm font-medium mb-2">
                                    Color
                                </p>
                                <div className="flex gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                selectVariant(
                                                    selectedSize,
                                                    color
                                                );
                                            }}
                                            className={`px-4 py-2 border rounded-lg text-sm
                                                ${
                                                    selectedColor === color
                                                        ? "bg-[#213448] text-white border-[#213448]"
                                                        : "hover:border-[#213448]"
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STOCK */}
                        {selectedVariant && (
                            <p className="text-sm text-gray-600">
                                Stok tersedia:
                                <span className="font-semibold ml-1">
                                    {selectedVariant.stock}
                                </span>
                            </p>
                        )}

                        {/* QTY */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-10 border rounded-lg"
                            >
                                −
                            </button>

                            <span className="font-medium">{qty}</span>

                            <button
                                onClick={() =>
                                    selectedVariant &&
                                    qty < selectedVariant.stock &&
                                    setQty(qty + 1)
                                }
                                className="w-10 h-10 border rounded-lg"
                            >
                                +
                            </button>
                        </div>

                        {/* ACTION */}
                        <div className="flex gap-3">
                            <button
                                disabled={
                                    !selectedVariant || !product.is_active
                                }
                                className="flex-1 flex items-center justify-center gap-2
                                bg-[#213448] text-white px-6 py-3 rounded-lg
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart size={18} />
                                Add to Cart
                            </button>

                            <button className="w-12 h-12 flex items-center justify-center border rounded-lg text-[#E9445A]">
                                <Heart size={20} />
                            </button>
                        </div>

                        {/* DESCRIPTION */}
                        {product.description && (
                            <div className="pt-4 border-t">
                                <h3 className="font-semibold mb-2">
                                    Description
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* STATUS */}
                        {!product.is_active && (
                            <p className="text-sm text-red-500">
                                Produk tidak tersedia
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* BEST SELLER */}
            <BestSellerSlider products={bestSellers} />
        </GuestLayout>
    );
}
