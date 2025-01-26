import { Button } from '@/Components/shadcn/ui/button';
import { ScrollArea } from '@/Components/shadcn/ui/scroll-area';
import { Separator } from '@/Components/shadcn/ui/separator';
import { CartItem, PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function CartDetails() {
    const { cartItems: initialCartItems } =
        usePage<PageProps<{ cartItems: CartItem[] }>>().props;

    const [cartItems, setCartItems] = useState(initialCartItems);

    // Handle quantity change
    const handleQuantityChange = async (productId: number, change: number) => {
        const updatedCartItems = cartItems.map((item) =>
            item.id === productId
                ? { ...item, quantity: item.quantity + change }
                : item,
        );
        setCartItems(updatedCartItems);

        // Send the updated quantity to the server
        try {
            await axios.patch(`/cart/${productId}/update`, {
                quantity: updatedCartItems.find((item) => item.id === productId)
                    ?.quantity,
            });
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };

    const handleRemove = async (productId: number) => {
        try {
            await axios.delete(`/cart/${productId}`);
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.id !== productId),
            );
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handleCompletePurchase = async () => {
        try {
            const response = await axios.post('/cart/complete-purchase');
            alert(response.data.message);

            // Optionally, you can redirect the user to a confirmation page or refresh the cart
            window.location.reload(); // Refresh the page to reflect cart clearance
        } catch (error) {
            alert('An error occurred while completing the purchase.');
        }
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            if (item.product) {
                total += item.product.price * item.quantity;
            }
        });
        return total;
    };

    const shippingCost = 10;
    const taxRate = 0.08;

    const tax = calculateTotal() * taxRate;
    const totalAmount = calculateTotal() + shippingCost + tax;

    return (
        <div className="container grid grid-cols-1 gap-6 p-6 mx-auto md:grid-cols-2">
            {/* Left Side - Cart Items */}
            <div>
                <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
                <ScrollArea className="flex flex-col h-screen pt-4 pb-24">
                    <ul>
                        {cartItems.map((item: CartItem) =>
                            item.product ? (
                                <div key={item.id} className="pr-4 space-y-4">
                                    <li
                                        key={item.id}
                                        className="flex flex-row justify-between"
                                    >
                                        <div className="flex flex-row items-center space-x-2">
                                            <Link
                                                href={`/products/product/${item.product.id}`}
                                            >
                                                <img
                                                    src={
                                                        '/images/products/default-product.jpg'
                                                    }
                                                    alt={item.product.name}
                                                    className="object-cover w-24 h-24 mr-4"
                                                />
                                            </Link>
                                            <div className="">
                                                <p className="font-semibold">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-gray-600">
                                                    {item.quantity} x $
                                                    {item.product.price}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        -1,
                                                    )
                                                }
                                                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        1,
                                                    )
                                                }
                                                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                                disabled={
                                                    item.quantity >=
                                                    item.product.stock
                                                }
                                            >
                                                +
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                                className="p-1 ml-4 bg-transparent rounded-sm hover:bg-red-600"
                                            >
                                                <img
                                                    className="w-6"
                                                    src="/icons/trash.svg"
                                                    alt="remove item"
                                                />
                                            </Button>
                                        </div>
                                    </li>
                                    <Separator />
                                    <div className="mb-4"></div>
                                </div>
                            ) : (
                                <li key={item.id}>
                                    <span>Product not found</span>
                                </li>
                            ),
                        )}
                    </ul>
                </ScrollArea>
            </div>

            {/* Right Side - Price Breakdown */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Price Breakdown</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <Button
                        onClick={handleCompletePurchase}
                        className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Complete Purchase
                    </Button>
                </div>
            </div>
        </div>
    );
}
