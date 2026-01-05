import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Upload, X, Plus, AlertCircle } from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        is_active: true,
        is_flash_sale: false,
        images: [],
        badges: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    /* ================= IMAGE HANDLING ================= */

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        // Validasi tipe file
        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];
        const invalidFiles = files.filter(
            (file) => !validTypes.includes(file.type)
        );

        if (invalidFiles.length > 0) {
            alert("Only JPEG, PNG, and WebP images are allowed");
            return;
        }

        // Validasi ukuran file (max 5MB per file)
        const maxSize = 5 * 1024 * 1024; // 5MB
        const oversizedFiles = files.filter((file) => file.size > maxSize);

        if (oversizedFiles.length > 0) {
            alert("Each image must be less than 5MB");
            return;
        }

        const newFiles = [...data.images, ...files];
        setData("images", newFiles);

        const previews = newFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);

        // Reset input agar bisa upload file yang sama lagi
        e.target.value = "";
    };

    const removeImage = (index) => {
        // Revoke URL untuk mencegah memory leak
        URL.revokeObjectURL(imagePreviews[index]);

        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setData("images", newImages);
        setImagePreviews(newPreviews);
    };

    /* ================= BADGES ================= */

    const addBadge = () => {
        setData("badges", [
            ...data.badges,
            { label: "", variant: "default", position: "top-left" },
        ]);
    };

    const updateBadge = (index, field, value) => {
        const newBadges = [...data.badges];
        newBadges[index][field] = value;
        setData("badges", newBadges);
    };

    const removeBadge = (index) => {
        setData(
            "badges",
            data.badges.filter((_, i) => i !== index)
        );
    };

    /* ================= SUBMIT ================= */

    const submit = (e) => {
        e.preventDefault();

        // Validasi minimal 1 gambar
        if (data.images.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        post(route("admin.products.store"), {
            onSuccess: () => {
                // Cleanup URLs
                imagePreviews.forEach((url) => URL.revokeObjectURL(url));
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Product" />

            <div className="py-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route("admin.products.index")}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Products
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Create New Product
                        </h1>
                    </div>

                    {/* Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Preview */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white p-5 rounded-xl border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-semibold text-gray-700 tracking-wide">
                                        Image Preview
                                    </h2>
                                    <span className="text-xs text-gray-500">
                                        {imagePreviews.length}{" "}
                                        {imagePreviews.length === 1
                                            ? "image"
                                            : "images"}
                                    </span>
                                </div>

                                {/* EMPTY STATE */}
                                {imagePreviews.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-32 rounded-lg border border-dashed border-gray-300">
                                        <Upload
                                            size={32}
                                            className="text-gray-400 mb-2"
                                        />
                                        <p className="text-sm text-gray-400">
                                            No images uploaded yet
                                        </p>
                                    </div>
                                )}

                                {/* IMAGE PREVIEWS */}
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3">
                                        {imagePreviews.map((preview, index) => (
                                            <div
                                                key={index}
                                                className="relative group overflow-hidden rounded-lg border bg-gray-50"
                                            >
                                                <div className="aspect-square bg-white">
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${
                                                            index + 1
                                                        }`}
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute top-2 right-2 p-1.5 bg-white/95 text-red-500 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                                                    title="Remove image"
                                                >
                                                    <X size={14} />
                                                </button>

                                                {index === 0 && (
                                                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#213448] text-white text-[10px] font-medium rounded-md shadow">
                                                        PRIMARY
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <AlertCircle
                                        size={20}
                                        className="text-blue-600 flex-shrink-0 mt-0.5"
                                    />
                                    <div className="text-xs text-blue-800 space-y-1">
                                        <p className="font-medium">
                                            Image Guidelines:
                                        </p>
                                        <ul className="list-disc list-inside space-y-0.5 text-blue-700">
                                            <li>Max 5MB per image</li>
                                            <li>JPG, PNG, or WebP only</li>
                                            <li>First image is primary</li>
                                            <li>At least 1 image required</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-3 py-2 border text-sm rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#213448] focus:border-[#213448] transition-colors ${
                                            errors.category_id
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="e.g. Gaming Laptop ROG Strix"
                                        className={`w-full px-3 py-2 border text-sm rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#213448] focus:border-[#213448] transition-colors ${
                                            errors.name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows="4"
                                        placeholder="Describe your product features, specifications, etc..."
                                        className="w-full px-3 py-2 border text-sm rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-[#213448] focus:border-[#213448] transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {/* Price & Stock */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price (Rp) *
                                        </label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            placeholder="100000"
                                            min="0"
                                            step="1000"
                                            className={`w-full px-3 py-2 border text-sm rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#213448] focus:border-[#213448] transition-colors ${
                                                errors.price
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                            required
                                        />
                                        {errors.price && (
                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.price}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stock *
                                        </label>
                                        <input
                                            type="number"
                                            value={data.stock}
                                            onChange={(e) =>
                                                setData("stock", e.target.value)
                                            }
                                            placeholder="50"
                                            min="0"
                                            className={`w-full px-3 py-2 border text-sm rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#213448] focus:border-[#213448] transition-colors ${
                                                errors.stock
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                            required
                                        />
                                        {errors.stock && (
                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.stock}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Images Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Images *
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#213448] transition-colors">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="images"
                                        />
                                        <label
                                            htmlFor="images"
                                            className="cursor-pointer block"
                                        >
                                            <Upload
                                                size={40}
                                                className="mx-auto text-gray-400 mb-2"
                                            />
                                            <p className="text-sm text-gray-600 font-medium">
                                                Click to upload images
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                JPG, PNG or WebP (max 5MB each)
                                            </p>
                                        </label>
                                    </div>
                                    {errors.images && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.images}
                                        </p>
                                    )}
                                </div>

                                {/* Badges */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Product Badges (Optional)
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addBadge}
                                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                                        >
                                            <Plus size={16} /> Add Badge
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {data.badges.map((badge, index) => (
                                            <div
                                                key={index}
                                                className="
                                                    flex flex-col gap-2
                                                    sm:flex-row sm:items-center
                                                    p-3 bg-gray-50 rounded-lg border border-gray-200
                                                "
                                            >
                                                {/* Badge Label */}
                                                <input
                                                    type="text"
                                                    value={badge.label}
                                                    onChange={(e) =>
                                                        updateBadge(
                                                            index,
                                                            "label",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Badge Label"
                                                    className="
                                                        w-full sm:flex-1
                                                        rounded px-3 py-2 border text-sm
                                                        border-gray-300 bg-white
                                                        focus:ring-2 focus:ring-[#213448]
                                                        focus:border-[#213448]
                                                    "
                                                />

                                                {/* Variant & Position */}
                                                <select
                                                    value={badge.variant}
                                                    onChange={(e) =>
                                                        updateBadge(
                                                            index,
                                                            "variant",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full sm:w-auto
                                                        rounded px-3 py-2 border text-sm
                                                        border-gray-300 bg-white
                                                        focus:ring-2 focus:ring-[#213448]
                                                        focus:border-[#213448]
                                                    "
                                                >
                                                    <option value="default">
                                                        Default
                                                    </option>
                                                    <option value="success">
                                                        Success
                                                    </option>
                                                    <option value="danger">
                                                        Danger
                                                    </option>
                                                    <option value="warning">
                                                        Warning
                                                    </option>
                                                </select>

                                                <select
                                                    value={badge.position}
                                                    onChange={(e) =>
                                                        updateBadge(
                                                            index,
                                                            "position",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full sm:w-auto
                                                        rounded px-3 py-2 border text-sm
                                                        border-gray-300 bg-white
                                                        focus:ring-2 focus:ring-[#213448]
                                                        focus:border-[#213448]
                                                    "
                                                >
                                                    <option value="top-left">
                                                        Top Left
                                                    </option>
                                                    <option value="top-right">
                                                        Top Right
                                                    </option>
                                                </select>

                                                {/* Remove Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeBadge(index)
                                                    }
                                                    className="
                                                        self-end sm:self-auto
                                                        p-2 text-red-600 hover:bg-red-50
                                                        rounded transition-colors
                                                    "
                                                    title="Remove badge"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}

                                        {data.badges.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">
                                                No badges added yet
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Toggles */}
                                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                                        Product Status
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "is_active",
                                                        !data.is_active
                                                    )
                                                }
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    data.is_active
                                                        ? "bg-[#213448]"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                                                        data.is_active
                                                            ? "translate-x-6"
                                                            : "translate-x-1"
                                                    }`}
                                                />
                                            </button>
                                            <span className="text-sm text-gray-700">
                                                Product Status
                                            </span>
                                        </div>
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded ${
                                                data.is_active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            {data.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "is_flash_sale",
                                                        !data.is_flash_sale
                                                    )
                                                }
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    data.is_flash_sale
                                                        ? "bg-red-500"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                                                        data.is_flash_sale
                                                            ? "translate-x-6"
                                                            : "translate-x-1"
                                                    }`}
                                                />
                                            </button>
                                            <span className="text-sm text-gray-700">
                                                Flash Sale
                                            </span>
                                        </div>
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded ${
                                                data.is_flash_sale
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            {data.is_flash_sale
                                                ? "Enabled"
                                                : "Disabled"}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <Link
                                        href={route("admin.products.index")}
                                        className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-[#213448] text-white rounded-lg hover:bg-[#1a2a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <svg
                                                    className="animate-spin h-4 w-4"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Creating...
                                            </span>
                                        ) : (
                                            "Create Product"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
