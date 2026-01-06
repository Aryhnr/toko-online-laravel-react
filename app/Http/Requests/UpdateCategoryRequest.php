<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Atau tambahkan: auth()->check() && auth()->user()->isAdmin()
    }

    public function rules(): array
    {
        $categoryId = $this->route('category'); // Ambil ID dari route parameter

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')->ignore($categoryId),
            ],
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