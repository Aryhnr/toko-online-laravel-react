import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CategoryModal from "./CategoryModal";

export default function Index({ categories }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            router.delete(route("admin.categories.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Categories" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#213448]">
                        Categories
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage product categories
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelected(null);
                        setOpen(true);
                    }}
                    className="
                        flex items-center gap-2
                        px-4 py-2.5
                        rounded-lg
                        bg-[#213448] text-white
                        hover:bg-[#1a2a3a]
                        shadow-sm
                        transition
                    "
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 text-left font-medium">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left font-medium">
                                Slug
                            </th>
                            <th className="px-6 py-4 text-center font-medium">
                                Status
                            </th>
                            <th className="px-6 py-4 text-right font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {categories.data.map((cat) => (
                            <tr
                                key={cat.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {cat.name}
                                </td>

                                <td className="px-6 py-4 text-gray-500">
                                    {cat.slug}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    {cat.is_active ? (
                                        <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-600">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-500">
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1">
                                        <button
                                            onClick={() => {
                                                setSelected(cat);
                                                setOpen(true);
                                            }}
                                            className="
                                                p-2 rounded-lg
                                                text-[#DDA853]
                                                hover:bg-[#DDA853]/15
                                                transition
                                            "
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="
                                                p-2 rounded-lg
                                                text-red-500
                                                hover:bg-red-50
                                                transition
                                            "
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {categories.data.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No categories found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-end gap-1">
                {categories.links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.url || "#"}
                        className={`
                            px-3 py-1.5 text-sm rounded-lg
                            ${
                                link.active
                                    ? "bg-[#213448] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                            ${!link.url && "opacity-40 pointer-events-none"}
                        `}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                    />
                ))}
            </div>

            <CategoryModal
                show={open}
                onClose={() => setOpen(false)}
                category={selected}
            />
        </AdminLayout>
    );
}
