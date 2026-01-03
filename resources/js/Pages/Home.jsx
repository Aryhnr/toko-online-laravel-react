import GuestLayout from "@/Layouts/GuestLayout";
import HeroSlider from "../Components/HeroSlider";
import BrandValues from "../Components/BrandValues";

import ProductCard from "../Components/cards/ProductCard";
import BestSellerSlider from "../Components/BestSellerSlider";
import CategorySlider from "../Components/CategorySlider";

// 👉 IMPORT DATA DUMMY
import bestSellerProducts from "@/data/dummyProducts";
import categories from "@/data/dummyCategories";

export default function Home({ products, categoryList }) {
    // 👉 fallback: backend belum ada → pakai dummy
    const bestSellers = products ?? bestSellerProducts;
    const categoryData = categoryList ?? categories;

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

            {/* Best Seller */}
            <BestSellerSlider products={bestSellers} />

            {/* Category */}
            <CategorySlider categories={categoryData} />

            {/* Produk Terbaru */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Produk Terbaru</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
