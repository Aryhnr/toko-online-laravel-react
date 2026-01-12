import ProductCard from "@/Components/cards/ProductCard";

export default function ProductGrid({
    products,
    currentPage,
    setCurrentPage,
    totalPages,
}) {
    return (
        <>
            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        Produk tidak ditemukan
                    </p>
                )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg text-sm border
                                ${
                                    currentPage === i + 1
                                        ? "bg-[#213448] text-white"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}

