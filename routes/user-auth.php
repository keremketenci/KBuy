<?php

use App\Http\Controllers\User\Auth\AuthenticatedSessionController;
use App\Http\Controllers\User\Auth\PasswordController;
use App\Http\Controllers\User\Auth\RegisteredUserController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\Seller\SellerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

// User routes

Route::get('/user/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'checkRole:user'])->name('user.dashboard');

Route::middleware(['auth', 'checkRole:user'])->group(function () {
    Route::get('/user/profile', [ProfileController::class, 'edit'])->name('user.profile.edit');
    Route::patch('/user/profile', [ProfileController::class, 'update'])->name('user.profile.update');
    Route::delete('/user/profile', [ProfileController::class, 'destroy'])->name('user.profile.destroy');
});

// Admin routes

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'checkRole:admin'])->name('admin.dashboard');

Route::middleware(['auth', 'checkRole:admin'])->group(function () {
    Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('/admin/profile', [ProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('/admin/profile', [ProfileController::class, 'destroy'])->name('admin.profile.destroy');
});

// Seller routes

Route::get('/seller/dashboard', function () {
    return Inertia::render('Seller/Dashboard/SellerDashboard');
})->middleware(['auth', 'checkRole:seller'])->name('seller.dashboard');

Route::get('/seller/dashboard', [SellerController::class, 'SellerDashboard'])->middleware(['auth', 'checkRole:seller'])->name('seller.dashboard');

Route::middleware(['auth', 'checkRole:seller', 'ensureProductBelongsToSeller'])->group(function () {
    Route::get('/seller/dashboard/edit/product/{productId}', [SellerController::class, 'edit'])->name('seller.product.edit');
    Route::patch('/seller/dashboard/edit/product/{productId}', [SellerController::class, 'update'])->name('seller.product.update');
    Route::delete('/seller/dashboard/delete/product/{productId}', [SellerController::class, 'destroy'])->name('seller.product.destroy');
});
Route::middleware(['auth', 'checkRole:seller'])->group(function () {
    Route::get('/seller/dashboard/add/product', [SellerController::class, 'add'])->name('seller.product.add');
    Route::post('/seller/dashboard/store/product', [SellerController::class, 'store'])->name('seller.product.store');
});

Route::middleware(['auth', 'checkRole:seller'])->group(function () {
    Route::get('/seller/profile', [ProfileController::class, 'edit'])->name('seller.profile.edit');
    Route::patch('/seller/profile', [ProfileController::class, 'update'])->name('seller.profile.update');
    Route::delete('/seller/profile', [ProfileController::class, 'destroy'])->name('seller.profile.destroy');
});