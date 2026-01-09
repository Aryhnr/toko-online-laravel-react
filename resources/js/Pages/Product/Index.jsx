import ProductCard from "@/Components/cards/ProductCard";
import bestSellerProducts from "@/data/dummyProducts";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Index({ products, categories }) {
    const bestSellers = products ?? bestSellerProducts;
    return (
        <GuestLayout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <p className="text-sm text-gray-500">
                        Temukan produk terbaik pilihan kami
                    </p>
                </div>

                {/* GRID PRODUCT */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
