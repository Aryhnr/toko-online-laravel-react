<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Atau tambahkan: auth()->check() && auth()->user()->isAdmin()
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string|max:1000',
            'icon'        => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_active'   => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Category name is required.',
            'name.unique'   => 'This category name already exists.',
            'name.max'      => 'Category name must not exceed 255 characters.',
        ];
    }
}