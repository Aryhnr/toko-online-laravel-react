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
        $products = Product::with(['category', 'images', 'badges'])
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
                    if (!empty($badge['label'])) {
                        $product->badges()->create([
                            'label'    => $badge['label'],
                            'variant'  => $badge['variant'] ?? 'default',
                            'position' => $badge['position'] ?? 'top-left',
                        ]);
                    }
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

            // Update product data
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

            // ========== HANDLE IMAGE DELETION ==========
            // Hapus gambar lama yang ditandai untuk dihapus
            if ($request->filled('deleted_images')) {
                $deletedIds = $request->deleted_images;
                
                $imagesToDelete = $product->images()
                    ->whereIn('id', $deletedIds)
                    ->get();

                foreach ($imagesToDelete as $image) {
                    // Hapus file dari storage
                    Storage::disk('public')->delete($image->image_path);
                    // Hapus record dari database
                    $image->delete();
                }
            }

            // ========== HANDLE NEW IMAGE UPLOAD ==========
            // Upload gambar baru (TIDAK menghapus gambar lama yang tidak ditandai)
            if ($request->hasFile('images')) {
                // Hitung jumlah gambar yang masih ada
                $existingImagesCount = $product->images()->count();
                
                foreach ($request->file('images') as $index => $file) {
                    $path = $file->store('products', 'public');

                    $product->images()->create([
                        'image_path' => $path,
                        // Set sebagai primary hanya jika tidak ada gambar lama sama sekali
                        'is_primary' => ($existingImagesCount === 0 && $index === 0) ? 1 : 0,
                    ]);
                }
            }

            // Pastikan ada minimal 1 gambar primary
            $this->ensurePrimaryImage($product);

            // ========== UPDATE BADGES ==========
            if ($request->has('badges')) {
                // Hapus semua badge lama
                $product->badges()->delete();

                // Tambah badge baru
                foreach ($request->badges as $badge) {
                    if (!empty($badge['label'])) {
                        $product->badges()->create([
                            'label'    => $badge['label'],
                            'variant'  => $badge['variant'] ?? 'default',
                            'position' => $badge['position'] ?? 'top-left',
                        ]);
                    }
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
                ->with('error', 'Failed to update product: ' . $e->getMessage());
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

            // Delete product (akan cascade delete images & badges jika ada foreign key constraint)
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

    /**
     * Pastikan ada minimal 1 gambar yang di-set sebagai primary
     */
    private function ensurePrimaryImage(Product $product)
    {
        $hasPrimary = $product->images()->where('is_primary', 1)->exists();
        
        if (!$hasPrimary) {
            // Set gambar pertama sebagai primary
            $firstImage = $product->images()->first();
            if ($firstImage) {
                $firstImage->update(['is_primary' => 1]);
            }
        }
    }
}