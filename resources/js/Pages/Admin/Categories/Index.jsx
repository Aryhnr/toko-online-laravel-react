import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CategoryModal from "./CategoryModal";
import Table from "@/Components/Admin/Table/Table";

export default function Index({ categories }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    const columns = [
        {
            label: "Name",
            field: "name",
            render: (row) => (
                <span className="font-medium text-gray-800">{row.name}</span>
            ),
        },
        {
            label: "Slug",
            field: "slug",
            render: (row) => <span className="text-gray-500">{row.slug}</span>,
        },
        {
            label: "Description",
            field: "description",
            render: (row) => (
                <span className="text-gray-500 text-sm">
                    {row.description ? (
                        row.description.length > 50 ? (
                            row.description.substring(0, 50) + "..."
                        ) : (
                            row.description
                        )
                    ) : (
                        <span className="text-gray-400 italic">
                            No description
                        </span>
                    )}
                </span>
            ),
        },
        {
            label: "Status",
            field: "is_active",
            render: (row) =>
                row.is_active ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-600 inline-block">
                        Active
                    </span>
                ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-500 inline-block">
                        Inactive
                    </span>
                ),
        },
        {
            label: "Actions",
            field: "actions",
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setSelected(row);
                            setOpen(true);
                        }}
                        className="p-2 rounded-lg text-[#DDA853] hover:bg-[#DDA853]/15 transition"
                        title="Edit Category"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                        title="Delete Category"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Categories" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-[#213448]">
                                Categories
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Manage product categories
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setSelected(null);
                                setOpen(true);
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#213448] text-white hover:bg-[#1a2a3a] shadow-sm transition"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">
                                Add Category
                            </span>
                            <span className="sm:hidden">Add</span>
                        </button>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns}
                        data={categories.data}
                        pagination={categories}
                    />
                </div>
            </div>

            <CategoryModal
                show={open}
                onClose={() => setOpen(false)}
                category={selected}
            />
        </AdminLayout>
    );
}
