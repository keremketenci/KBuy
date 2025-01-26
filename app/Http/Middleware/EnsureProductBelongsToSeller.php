<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class EnsureProductBelongsToSeller
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $productId = $request->route('productId'); // Assuming route parameter is named 'productId'

        // Check if the product exists and belongs to the authenticated user
        $product = Product::where('id', $productId)
            ->where('seller_id', Auth::id())
            ->first();

        if (!$product) {
            // Redirect or abort if product doesn't belong to the seller
            return abort(403, 'You are not authorized to edit this product.');
        }

        return $next($request);
    }
}