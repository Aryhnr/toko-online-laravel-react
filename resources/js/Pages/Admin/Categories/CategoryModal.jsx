import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import AdminModal from "../../../Components/modal/AdminModal";

export default function CategoryModal({ show, onClose, category }) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            description: "",
            icon: "",
            is_active: true,
        });

    useEffect(() => {
        if (category) {
            setData({
                name: category.name || "",
                description: category.description || "",
                icon: category.icon || "",
                is_active: category.is_active == 1,
            });
        } else {
            reset();
        }
        clearErrors();
    }, [category, show]);

    const submit = (e) => {
        e.preventDefault();

        if (category) {
            put(`/admin/categories/${category.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post("/admin/categories", {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <AdminModal show={show} onClose={closeModal} maxWidth="lg">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-[#213448]">
                    {category ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="px-6 py-5 space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="e.g. Electronics"
                        className={`
                            w-full h-11 px-4
                            rounded-xl
                            bg-gray-50
                            border border-gray-200
                            text-gray-800
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2 focus:ring-[#213448]/20
                            focus:border-[#213448]
                            transition
                            ${
                                errors.name &&
                                "border-red-400 focus:ring-red-200"
                            }
                        `}
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Optional description…"
                        className="
                            w-full px-4 py-3
                            rounded-xl
                            bg-gray-50
                            border border-gray-200
                            text-gray-800
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2 focus:ring-[#213448]/20
                            focus:border-[#213448]
                            transition
                        "
                    />
                </div>

                {/* Icon */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Icon Identifier
                    </label>
                    <input
                        type="text"
                        value={data.icon}
                        onChange={(e) => setData("icon", e.target.value)}
                        placeholder="e.g. shopping-bag"
                        className="
                            w-full h-11 px-4
                            rounded-xl
                            bg-gray-50
                            border border-gray-200
                            text-gray-800
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2 focus:ring-[#213448]/20
                            focus:border-[#213448]
                            transition
                        "
                    />
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-4 pt-1">
                    <button
                        type="button"
                        onClick={() => setData("is_active", !data.is_active)}
                        className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition
                            ${data.is_active ? "bg-[#213448]" : "bg-gray-300"}
                        `}
                    >
                        <span
                            className={`
                                inline-block h-4 w-4 rounded-full bg-white transition-transform
                                ${
                                    data.is_active
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }
                            `}
                        />
                    </button>
                    <span className="text-sm text-gray-600">
                        Category is{" "}
                        <span className="font-medium text-gray-800">
                            {data.is_active ? "Active" : "Inactive"}
                        </span>
                    </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            px-6 py-2.5
                            rounded-xl
                            bg-[#213448] text-white
                            hover:bg-[#1a2a3a]
                            transition
                            disabled:opacity-50
                        "
                    >
                        {processing
                            ? "Saving..."
                            : category
                            ? "Update Changes"
                            : "Create Category"}
                    </button>
                </div>
            </form>
        </AdminModal>
    );
}
