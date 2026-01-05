import { Head, Link, router } from "@inertiajs/react";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import Table from "@/Components/Admin/Table/Table";
import { route } from "ziggy-js";

export default function Index({ products }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(route("admin.products.destroy", id));
        }
    };

    const columns = [
        {
            label: "Image",
            field: "image",
            render: (row) => (
                <img
                    src={
                        row.images?.[0]?.image_path
                            ? `/storage/${row.images[0].image_path}`
                            : "/placeholder-product.png"
                    }
                    alt={row.name}
                    className="w-16 h-16 object-cover rounded"
                />
            ),
        },
        {
            label: "Name",
            field: "name",
        },
        {
            label: "Category",
            field: "category",
            render: (row) => (
                <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                    {row.category?.name || "N/A"}
                </span>
            ),
        },
        {
            label: "Price",
            field: "price",
            render: (row) => (
                <span className="font-semibold text-green-600">
                    Rp {parseFloat(row.price).toLocaleString("id-ID")}
                </span>
            ),
        },
        {
            label: "Stock",
            field: "stock",
            render: (row) => (
                <span
                    className={`px-2 py-1 text-xs rounded ${
                        row.stock > 10
                            ? "bg-green-100 text-green-700"
                            : row.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {row.stock}
                </span>
            ),
        },
        {
            label: "Status",
            field: "is_active",
            render: (row) => (
                <span
                    className={`px-2 py-1 text-xs rounded ${
                        row.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {row.is_active ? "Active" : "Inactive"}
                </span>
            ),
        },
        {
            label: "Flash Sale",
            field: "is_flash_sale",
            render: (row) =>
                row.is_flash_sale ? (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                        🔥 Yes
                    </span>
                ) : (
                    <span className="text-gray-400 text-xs">No</span>
                ),
        },
        {
            label: "Actions",
            field: "actions",
            render: (row) => (
                <div className="flex gap-2">
                    <Link
                        href={route("admin.products.edit", row.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                        <Pencil size={16} />
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Products Management" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Products Management
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Manage your product catalog
                            </p>
                        </div>
                        <Link
                            href={route("admin.products.create")}
                            className="flex items-center gap-2 px-4 py-2 bg-[#213448] text-white rounded-lg hover:bg-[#1a2a3a] transition"
                        >
                            <Plus size={20} />
                            Add Product
                        </Link>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns}
                        data={products.data}
                        pagination={products}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
