<?php

namespace App\Http\Controllers\Cart;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CartController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $cartItems = auth()->user()->carts()->with('product:id,name,price,stock')->get();

        return inertia('Cart/CartDetails', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = auth()->user();

        $cartItem = Cart::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if (!$cartItem) {
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => 1,
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',  // Ensure quantity is at least 1
        ]);

        $user = auth()->user();
        $cartItem = Cart::where('user_id', $user->id)->where('id', $id)->first();

        if ($cartItem) {
            $product = Product::find($cartItem->product_id);

            // Ensure quantity doesn't exceed stock
            if ($request->quantity > $product->stock) {
                return response()->json([
                    'message' => 'Not enough stock available.',
                ], 400);
            }

            // Update the quantity
            $cartItem->update([
                'quantity' => $request->quantity,
            ]);

            return response()->json([
                'message' => 'Cart item updated successfully.',
            ], 200);
        }

        return response()->json([
            'message' => 'Product not found in cart.',
        ], 404);
    }

    public function destroy($id)
    {
        $user = auth()->user();

        $cartItem = Cart::where('user_id', $user->id)
            ->where('id', $id)
            ->first();

        if ($cartItem) {
            $cartItem->delete();

            return response()->json([
                'message' => 'Product removed from cart successfully.'
            ], 200);
        }

        return response()->json([
            'message' => 'Product not found in cart.'
        ], 404);
    }

    public function isInCart($productId)
    {
        $exists = auth()->user()->carts()->where('product_id', $productId)->exists();

        return response()->json([
            'inCart' => $exists
        ], 200);
    }

    public function completePurchase()
    {
        $user = auth()->user();

        // Get the user's cart items with product details
        $cartItems = $user->carts()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Your cart is empty.'
            ], 400);
        }

        DB::beginTransaction();

        try {
            foreach ($cartItems as $cartItem) {
                $product = $cartItem->product;

                // Ensure stock is sufficient
                if ($product->stock < $cartItem->quantity) {
                    DB::rollBack();
                    return response()->json([
                        'message' => "Not enough stock for product: {$product->name}.",
                    ], 400);
                }

                // Reduce the product stock
                $product->decrement('stock', $cartItem->quantity);

                // Optionally, you could record this in an order history table here
            }

            // Clear the cart
            $user->carts()->delete();

            DB::commit();

            return response()->json([
                'message' => 'Purchase completed successfully!',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while processing your purchase.',
            ], 500);
        }
    }
}