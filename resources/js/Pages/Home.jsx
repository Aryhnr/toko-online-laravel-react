import GuestLayout from "@/Layouts/GuestLayout";
import HeroSlider from "../Components/HeroSlider";
import BrandValues from "../Components/BrandValues";
import ProductCard from "../Components/cards/ProductCard";
import BestSellerSlider from "../Components/BestSellerSlider";
import CategorySlider from "../Components/CategorySlider";

const bestSellerProducts = [
    {
        id: 1,
        name: "Oversized T-Shirt Black",
        category: "Men",
        price: "149.000",
        image: "/images/produk/produk1.jpg",
        badge: {
            label: "Best Seller",
            variant: "dark",
            position: "top-left",
        },
    },
    {
        id: 2,
        name: "Hoodie Cream",
        category: "Women",
        price: "259.000",
        image: "/images/produk/produk2.jpg",
        badge: {
            label: "SALE 30%",
            variant: "danger",
            position: "top-right",
        },
    },
    {
        id: 3,
        name: "Hoodie Cream",
        category: "Women",
        price: "259.000",
        image: "/images/produk/produk2.jpg",
        badge: {
            label: "SALE 30%",
            variant: "danger",
            position: "top-right",
        },
    },
    {
        id: 4,
        name: "Oversized T-Shirt Black",
        category: "Men",
        price: "149.000",
        image: "/images/produk/produk1.jpg",
        badge: {
            label: "Best Seller",
            variant: "dark",
            position: "top-left",
        },
    },
    {
        id: 5,
        name: "Hoodie Cream",
        category: "Women",
        price: "259.000",
        image: "/images/produk/produk2.jpg",
        badge: {
            label: "SALE 30%",
            variant: "danger",
            position: "top-right",
        },
    },
    {
        id: 6,
        name: "Oversized T-Shirt Black",
        category: "Men",
        price: "149.000",
        image: "/images/produk/produk1.jpg",
        badge: {
            label: "Best Seller",
            variant: "dark",
            position: "top-left",
        },
    },
];
const categories = [
    {
        id: 1,
        name: "Website",
        description: "Landing page & company profile",
        icon: "🌐",
    },
    {
        id: 2,
        name: "UI Design",
        description: "Figma & design system",
        icon: "🎨",
    },
    {
        id: 3,
        name: "Backend",
        description: "API & database",
        icon: "⚙️",
    },
    {
        id: 4,
        name: "Mobile App",
        description: "Android & iOS",
        icon: "📱",
    },
    {
        id: 5,
        name: "DevOps",
        description: "Server & deployment",
        icon: "🚀",
    },
];


export default function Home() {
    return (
        <GuestLayout>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
                {/* SLIDER */}
                <div className="md:col-span-3 md:row-span-2">
                    <HeroSlider />
                </div>

                {/* BANNER 1 */}
                <div className="md:col-start-4 md:row-start-1">
                    <img
                        src="/images/hero2/atas.png"
                        alt="Banner Promo 1"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* BANNER 2 */}
                <div className="md:col-start-4 md:row-start-2">
                    <img
                        src="/images/hero2/bawah.png"
                        alt="Banner Promo 2"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Brand Values */}
            <BrandValues />

            {/* Best Saller */}
            <BestSellerSlider products={bestSellerProducts} />

            {/* Categori */}
            <CategorySlider categories={categories} />

            <div className="mt-5">
                <h2 className="text-xl font-bold mb-4">Produk Terbaru</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {bestSellerProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <p className="text-gray-600">Ini halaman utama.</p>
        </GuestLayout>
    );
}
