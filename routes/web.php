<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

/*
|--------------------------------------------------------------------------
| PUBLIC (BELUM LOGIN)
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
/* PRODUCT */
// Route::get('/products', [ProductController::class, 'index'])
//     ->name('products.index');

// Route::get('/products/{product}', [ProductController::class, 'show'])
//     ->name('products.show');

// /* CART */
// Route::get('/cart', [CartController::class, 'index'])
//     ->name('cart.index');

// Route::post('/cart', [CartController::class, 'store'])
//     ->name('cart.store');



// Sementara
Route::get('/products', function () {
    return Inertia::render('Product/Index');
})->name('products.index');

Route::get('/products/{slug}', function ($slug) {
    return Inertia::render('Product/Show', [
        'slug' => $slug, // sementara, biar URL realistis
    ]);
})->name('products.show');


/*
|--------------------------------------------------------------------------
| CUSTOMER
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::post('/checkout', fn () => Inertia::render('Checkout'));
});

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', fn () =>
            Inertia::render('Admin/Dashboard')
        )->name('dashboard');

        // Categories
        Route::get('/categories', [CategoryController::class, 'index'])
            ->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])
            ->name('categories.store');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])
            ->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])
            ->name('categories.destroy');

        // Products
        Route::get('/products', [ProductController::class, 'index'])
            ->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])
            ->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])
            ->name('products.store');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
            ->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])
            ->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])
            ->name('products.destroy');
    });
