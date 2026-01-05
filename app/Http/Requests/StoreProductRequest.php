<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id'   => 'required|exists:categories,id',
            'name'          => 'required|string|max:255|unique:products,name',
            'description'   => 'nullable|string|max:2000',
            'price'         => 'required|numeric|min:0',
            'stock'         => 'required|integer|min:0',
            'is_active'     => 'required|boolean',
            'is_flash_sale' => 'required|boolean',
            'images.*'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'badges'        => 'nullable|array',
            'badges.*.label' => 'required_with:badges|string|max:50',
            'badges.*.variant' => 'required_with:badges|string|in:default,success,danger,warning',
            'badges.*.position' => 'required_with:badges|string|in:top-left,top-right',
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category does not exist.',
            'name.required' => 'Product name is required.',
            'name.unique' => 'This product name already exists.',
            'price.required' => 'Price is required.',
            'price.min' => 'Price must be at least 0.',
            'stock.required' => 'Stock is required.',
            'stock.min' => 'Stock must be at least 0.',
            'images.*.image' => 'File must be an image.',
            'images.*.mimes' => 'Image must be jpeg, png, jpg, or webp.',
            'images.*.max' => 'Image size must not exceed 2MB.',
        ];
    }
}