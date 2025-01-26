<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class SellerController extends Controller
{
    public function SellerDetails($sellerId)
    {
        // Fetch the seller with 'seller' role
        $seller = User::where('role', 'seller')->findOrFail($sellerId);

        // Fetch products related to the seller
        $products = Product::with('category', 'seller')
            ->where('seller_id', $sellerId)  // Filter products by seller_id
            ->get();

        // Return both the seller and filtered products to the view
        return Inertia::render('Seller/SellerDetails/SellerDetails', [
            'seller' => [
                'id' => $seller->id,
                'name' => $seller->name,
                'email' => $seller->email,
            ],
            'products' => $products,
        ]);
    }
    public function SellerDashboard()
    {
        // Get the authenticated user's ID
        $sellerId = auth()->id();

        // Fetch the seller with 'seller' role
        $seller = User::where('role', 'seller')->findOrFail($sellerId);

        // Fetch products related to the seller
        $products = Product::with('category', 'seller')
            ->where('seller_id', $sellerId) // Filter products by seller_id
            ->get();

        // Return both the seller and filtered products to the view
        return Inertia::render('Seller/Dashboard/SellerDashboard', [
            'seller' => [
                'id' => $seller->id,
                'name' => $seller->name,
                'email' => $seller->email,
            ],
            'products' => $products,
        ]);
    }

    public function edit($productId)
    {
        // Fetch the product by its ID
        $product = Product::findOrFail($productId);

        // Fetch all categories
        $categories = Category::all();

        // Return the product and categories data to the edit view
        return Inertia::render('Seller/Dashboard/Edit/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $productId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::findOrFail($productId);

        // Update product details
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('seller.dashboard')->with('success', 'Product updated successfully!');
    }

    public function destroy($productId)
    {
        $product = Product::find($productId);

        if (!$product) {
            return redirect()->back()->withErrors(['product' => 'Product not found']);
        }

        $product->delete();

        return redirect()->route('seller.dashboard')->with('success', 'Product deleted successfully!');
    }

    public function add()
    {
        // Fetch all categories to populate the dropdown
        $categories = Category::all();

        // Return the view with categories
        return Inertia::render('Seller/Dashboard/Add/Add', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Create a new product for the authenticated seller
        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'seller_id' => auth()->id(), // Associate the product with the current seller
        ]);

        return redirect()->route('seller.dashboard')->with('success', 'Product added successfully!');
    }

}