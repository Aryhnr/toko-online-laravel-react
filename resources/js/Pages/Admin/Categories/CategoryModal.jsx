import { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react"; // Import router
import AdminModal from "../../../Components/modal/AdminModal";

export default function CategoryModal({ show, onClose, category }) {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            description: "",
            icon: null,
            is_active: true,
        });

    useEffect(() => {
        if (category) {
            setData({
                name: category.name || "",
                description: category.description || "",
                icon: null,
                is_active: category.is_active == 1,
            });

            if (category.icon) {
                setPreview(`/storage/categories/${category.icon}`);
            }
        } else {
            reset();
            setPreview(null);
        }

        clearErrors();
    }, [category, show]);

    const submit = (e) => {
        e.preventDefault();

        if (category) {
            // Gunakan router.post dengan _method
            router.post(
                `/admin/categories/${category.id}`,
                {
                    _method: "PUT",
                    ...data,
                },
                {
                    forceFormData: true,
                    onSuccess: closeModal,
                }
            );
        } else {
            post("/admin/categories", {
                forceFormData: true,
                onSuccess: closeModal,
            });
        }
    };

    const closeModal = () => {
        reset();
        setPreview(null);
        clearErrors();
        onClose();
    };

    return (
        <AdminModal
            show={show}
            onClose={closeModal}
            title={category ? "Edit Category" : "Add New Category"}
            maxWidth="lg"
            footer={
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="category-form"
                        disabled={processing}
                        className="px-6 py-2.5 rounded-xl bg-[#213448] text-white hover:bg-[#1a2a3a] disabled:opacity-50"
                    >
                        {processing
                            ? "Saving..."
                            : category
                            ? "Update Changes"
                            : "Create Category"}
                    </button>
                </div>
            }
        >
            <form id="category-form" onSubmit={submit} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`w-full h-11 px-4 rounded-xl bg-gray-50 border
                            ${
                                errors.name
                                    ? "border-red-400"
                                    : "border-gray-200"
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
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
                    />
                </div>

                {/* Image (icon column) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setData("icon", file);
                            if (file) {
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                        className="block w-full text-sm text-gray-600"
                    />

                    {errors.icon && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.icon}
                        </p>
                    )}

                    {/* Preview */}
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-28 h-28 rounded-xl object-cover border"
                        />
                    )}
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="button"
                        onClick={() => setData("is_active", !data.is_active)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full
                            ${data.is_active ? "bg-[#213448]" : "bg-gray-300"}
                        `}
                    >
                        <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transform transition
                                ${
                                    data.is_active
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }
                            `}
                        />
                    </button>

                    <span className="text-sm text-gray-600">
                        Status:
                        <span className="ml-1 font-medium text-gray-800">
                            {data.is_active ? "Active" : "Inactive"}
                        </span>
                    </span>
                </div>
            </form>
        </AdminModal>
    );
}
