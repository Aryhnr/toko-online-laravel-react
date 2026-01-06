<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->paginate(10);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        try {
            $iconName = null;

            if ($request->hasFile('icon')) {
                $iconName = Str::uuid() . '.' . $request->icon->extension();
                $request->icon->storeAs('categories', $iconName, 'public');
            }

            Category::create([
                'name'        => $request->name,
                'slug'        => Str::slug($request->name),
                'description' => $request->description,
                'icon'        => $iconName,
                'is_active'   => $request->boolean('is_active', true),
            ]);

            return redirect()
                ->route('admin.categories.index')
                ->with('success', 'Category created successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Failed to create category. Please try again.');
        }
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try {
            $iconName = $category->icon;

            if ($request->hasFile('icon')) {
                // Hapus icon lama
                if ($category->icon && Storage::disk('public')->exists('categories/' . $category->icon)) {
                    Storage::disk('public')->delete('categories/' . $category->icon);
                }

                $iconName = Str::uuid() . '.' . $request->icon->extension();
                $request->icon->storeAs('categories', $iconName, 'public');
            }

            $category->update([
                'name'        => $request->name,
                'slug'        => Str::slug($request->name),
                'description' => $request->description,
                'icon'        => $iconName,
                'is_active'   => $request->boolean('is_active', true),
            ]);

            return redirect()
                ->route('admin.categories.index')
                ->with('success', 'Category updated successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Failed to update category. Please try again.');
        }
    }

    public function destroy(Category $category)
    {
        try {
            if (method_exists($category, 'products') && $category->products()->exists()) {
                return redirect()
                    ->back()
                    ->with('error', 'Cannot delete category with existing products.');
            }

            // Hapus file icon
            if ($category->icon && Storage::disk('public')->exists('categories/' . $category->icon)) {
                Storage::disk('public')->delete('categories/' . $category->icon);
            }

            $category->delete();

            return redirect()
                ->route('admin.categories.index')
                ->with('success', 'Category deleted successfully.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to delete category. Please try again.');
        }
    }
}
