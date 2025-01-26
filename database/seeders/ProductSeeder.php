<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Fetch all sellers and categories
        $sellers = User::where('role', 'seller')->get();
        $categories = Category::all();

        foreach ($sellers as $seller) {
            // Each seller sells multiple products
            Product::factory(rand(3, 7))->create([
                'seller_id' => $seller->id, // Use User ID with role seller
                'category_id' => $categories->random()->id,
            ]);
        }
    }

}