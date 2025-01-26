<?php

// use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Seller\SellerController;
use App\Http\Controllers\Cart\CartController;

use App\Models\Cart;


// ----------------------------------------------------------------
// Index
Route::get('/', function () {
    return Inertia::render('Index');
});

// ----------------------------------------------------------------
// Product
Route::get('/products', [ProductController::class, 'Products']);

Route::get('/products/product/{id}', action: [ProductController::class, 'ProductDetails'])->name('products.details');

// ----------------------------------------------------------------
// Seller
Route::get('/sellers/seller/{id}', [SellerController::class, 'SellerDetails'])->name('seller.details');

// ----------------------------------------------------------------
// Cart

Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::get('/cart/items', function () {

        $cartItems = Cart::with('product')->where('user_id', auth()->id())->get();
        return response()->json(['cartItems' => $cartItems]);
    });
    Route::post('/user/cart/store', [CartController::class, 'store'])->name('cart.store');

    Route::patch('/cart/{id}/update', [CartController::class, 'update']);

    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/cart/is-in-cart/{productId}', [CartController::class, 'isInCart']);

    Route::post('/cart/complete-purchase', [CartController::class, 'completePurchase']);

});

require __DIR__ . '/user-auth.php';