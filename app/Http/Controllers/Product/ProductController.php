<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function Products()
    {
        $products = Product::with('category', 'seller')->get();
        // $products = Product::all();
        return Inertia::render('Products/Products', [
            'products' => $products,
        ]);
    }

    public function ProductDetails($productId)
    {
        $product = Product::with('category', 'seller')->findOrFail($productId);

        $products = Product::with('category', 'seller')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $productId)
            ->get();

        return Inertia::render('Products/ProductDetails', [
            'product' => $product,
            'products' => $products,
        ]);
    }
}