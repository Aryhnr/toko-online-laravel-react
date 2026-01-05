import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = [...data.images, ...files];
        setData("images", newFiles);

        const previews = newFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setData("images", newImages);
        setImagePreviews(newPreviews);
    };

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

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.products.store"));
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
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
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
                        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
                            <h2 className="text-lg font-medium text-gray-700 mb-2">
                                Image Preview
                            </h2>
                            {imagePreviews.length === 0 && (
                                <p className="text-sm text-gray-400">
                                    No images uploaded yet.
                                </p>
                            )}
                            <div className="grid grid-cols-1 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-40 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <X size={16} />
                                        </button>
                                        {index === 0 && (
                                            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                                                Primary
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 space-y-6">
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
                                        className={`w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-[#213448] focus:border-[#213448] ${
                                            errors.category_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
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
                                        <p className="mt-1 text-xs text-red-500">
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
                                        placeholder="e.g. Gaming Laptop"
                                        className={`w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-[#213448] focus:border-[#213448] ${
                                            errors.name ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">
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
                                        placeholder="Product description..."
                                        className="w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-[#213448] focus:border-[#213448]"
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
                                            className={`w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-[#213448] focus:border-[#213448] ${
                                                errors.price
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        />
                                        {errors.price && (
                                            <p className="mt-1 text-xs text-red-500">
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
                                            className={`w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-[#213448] focus:border-[#213448] ${
                                                errors.stock
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        />
                                        {errors.stock && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.stock}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Images Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Images
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="images"
                                        />
                                        <label
                                            htmlFor="images"
                                            className="cursor-pointer"
                                        >
                                            <Upload
                                                size={40}
                                                className="mx-auto text-gray-400 mb-2"
                                            />
                                            <p className="text-sm text-gray-600">
                                                Click to upload images
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Badges (Optional)
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addBadge}
                                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            <Plus size={16} /> Add Badge
                                        </button>
                                    </div>

                                    {data.badges.map((badge, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 mb-2 p-3 bg-gray-50 rounded"
                                        >
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
                                                placeholder="Label"
                                                className="flex-1 rounded border-gray-300 bg-white"
                                            />
                                            <select
                                                value={badge.variant}
                                                onChange={(e) =>
                                                    updateBadge(
                                                        index,
                                                        "variant",
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded border-gray-300 bg-white"
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
                                                className="rounded border-gray-300 bg-white"
                                            >
                                                <option value="top-left">
                                                    Top Left
                                                </option>
                                                <option value="top-right">
                                                    Top Right
                                                </option>
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeBadge(index)
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Toggles */}
                                <div className="space-y-3">
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
                                                    : "bg-gray-200"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                    data.is_active
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                        <span className="text-sm text-gray-700">
                                            Product is{" "}
                                            {data.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </div>

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
                                                    : "bg-gray-200"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                    data.is_flash_sale
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                        <span className="text-sm text-gray-700">
                                            Flash Sale{" "}
                                            {data.is_flash_sale
                                                ? "Enabled"
                                                : "Disabled"}
                                        </span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <Link
                                        href={route("admin.products.index")}
                                        className="px-6 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-[#213448] text-white rounded-lg hover:bg-[#1a2a3a] transition disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Creating..."
                                            : "Create Product"}
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
