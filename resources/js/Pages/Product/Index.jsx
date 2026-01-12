import { useMemo, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import bestSellerProducts from "@/data/dummyProducts";

import FilterCard from "./FilterCard";
import SortBar from "./SortBar";
import ProductGrid from "./ProductGrid";

export default function Index({ products, categories }) {
    const allProducts = products ?? bestSellerProducts;

    const [filters, setFilters] = useState({
        category: "",
        name: "",
        minPrice: "",
        maxPrice: "",
    });

    const [sort, setSort] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    /* ================= FILTER & SORT ================= */
    const filteredProducts = useMemo(() => {
        let data = [...allProducts];

        // filter name
        if (filters.name) {
            data = data.filter((p) =>
                p.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // filter category
        if (filters.category) {
            data = data.filter((p) => p.category?.id == filters.category);
        }

        // filter price
        if (filters.minPrice) {
            data = data.filter((p) => p.price >= filters.minPrice);
        }

        if (filters.maxPrice) {
            data = data.filter((p) => p.price <= filters.maxPrice);
        }

        // sort
        if (sort === "cheapest") {
            data.sort((a, b) => a.price - b.price);
        }

        if (sort === "latest") {
            data.sort((a, b) => b.id - a.id);
        }

        return data;
    }, [filters, sort, allProducts]);

    /* ================= PAGINATION ================= */
    const totalPages = Math.ceil(filteredProducts.length / perPage);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* FILTER */}
                    <FilterCard
                        categories={categories}
                        filters={filters}
                        setFilters={setFilters}
                        setCurrentPage={setCurrentPage}
                    />

                    {/* CONTENT */}
                    <div className="md:col-span-3 space-y-4">
                        <SortBar sort={sort} setSort={setSort} />

                        <ProductGrid
                            products={paginatedProducts}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
