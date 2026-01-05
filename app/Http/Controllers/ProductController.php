<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        try {
            DB::beginTransaction();

            $product = Product::create([
                'category_id'   => $request->category_id,
                'name'          => $request->name,
                'slug'          => Str::slug($request->name),
                'description'   => $request->description,
                'price'         => $request->price,
                'stock'         => $request->stock,
                'is_active'     => $request->boolean('is_active', true),
                'is_flash_sale' => $request->boolean('is_flash_sale', false),
            ]);

            // Upload images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $file) {
                    $path = $file->store('products', 'public');

                    $product->images()->create([
                        'image_path' => $path,
                        'is_primary' => $index === 0,
                    ]);
                }
            }

            // Tambah badge jika ada
            if ($request->filled('badges')) {
                foreach ($request->badges as $badge) {
                    $product->badges()->create([
                        'label'    => $badge['label'] ?? '',
                        'variant'  => $badge['variant'] ?? 'default',
                        'position' => $badge['position'] ?? 'top-left',
                    ]);
                }
            }

            DB::commit();

            return redirect()
                ->route('admin.products.index')
                ->with('success', 'Product created successfully.');
        } catch (Throwable $e) {
            DB::rollBack();
            report($e);

            return back()
                ->withInput()
                ->with('error', 'Failed to create product. Please try again.');
        }
    }

    public function edit(Product $product)
    {
        $product->load(['category', 'images', 'badges']);
        
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/Products/Update', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            DB::beginTransaction();

            $product->update([
                'category_id'   => $request->category_id,
                'name'          => $request->name,
                'slug'          => Str::slug($request->name),
                'description'   => $request->description,
                'price'         => $request->price,
                'stock'         => $request->stock,
                'is_active'     => $request->boolean('is_active', true),
                'is_flash_sale' => $request->boolean('is_flash_sale', false),
            ]);

            // Update images
            if ($request->hasFile('images')) {
                // Hapus images lama dari storage
                foreach ($product->images as $image) {
                    Storage::disk('public')->delete($image->image_path);
                }
                
                $product->images()->delete();

                foreach ($request->file('images') as $index => $file) {
                    $path = $file->store('products', 'public');

                    $product->images()->create([
                        'image_path' => $path,
                        'is_primary' => $index === 0,
                    ]);
                }
            }

            // Update badges
            if ($request->has('badges')) {
                $product->badges()->delete();

                foreach ($request->badges as $badge) {
                    $product->badges()->create([
                        'label'    => $badge['label'] ?? '',
                        'variant'  => $badge['variant'] ?? 'default',
                        'position' => $badge['position'] ?? 'top-left',
                    ]);
                }
            }

            DB::commit();

            return redirect()
                ->route('admin.products.index')
                ->with('success', 'Product updated successfully.');
        } catch (Throwable $e) {
            DB::rollBack();
            report($e);

            return back()
                ->withInput()
                ->with('error', 'Failed to update product.');
        }
    }

    public function destroy(Product $product)
    {
        try {
            DB::beginTransaction();

            // Hapus images dari storage
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }

            $product->delete();

            DB::commit();

            return redirect()
                ->route('admin.products.index')
                ->with('success', 'Product deleted successfully.');
        } catch (Throwable $e) {
            DB::rollBack();
            report($e);

            return back()->with('error', 'Failed to delete product.');
        }
    }
}