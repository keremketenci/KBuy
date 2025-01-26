import { Button } from '@/Components/shadcn/ui/button';
import { ScrollArea } from '@/Components/shadcn/ui/scroll-area';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/shadcn/ui/sheet';
import { CartItem, PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface CartSheetProps {
    trigger: React.ReactNode;
}

export default function CartSheet({ trigger }: CartSheetProps) {
    const { cartItems: initialCartItems } =
        usePage<PageProps<{ cartItems: CartItem[] }>>().props;
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('/cart/items');
            if (response.ok) {
                const data = await response.json();
                setCartItems(data.cartItems);
            } else {
                console.error('Failed to fetch cart items.');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        setCartItems(initialCartItems);
    }, [initialCartItems]);

    const handleRemove = async (productId: number) => {
        try {
            await axios.delete(`/cart/${productId}`);
            // Ürün silindikten sonra state'i güncelle
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.id !== productId),
            );
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    return (
        <Sheet>
            <SheetTrigger
                className="flex flex-col justify-items-center"
                onClick={fetchCartItems}
            >
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="flex flex-col">
                    <SheetTitle>Your Cart</SheetTitle>
                    <Link
                        className="flex flex-col justify-center w-full"
                        href="/cart"
                    >
                        <Button variant={'ghost'}>Go to Cart Page</Button>
                    </Link>
                </SheetHeader>
                <ScrollArea className="flex flex-col h-screen pt-4 pb-24">
                    <ul>
                        {cartItems.map((item: CartItem) =>
                            item.product ? (
                                <li
                                    key={item.id}
                                    className="flex flex-row justify-between pb-4"
                                >
                                    <div className="flex flex-row items-center">
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
                                        <div>
                                            <p className="font-semibold">
                                                {item.product.name}
                                            </p>
                                            <p className="text-gray-600">
                                                {item.quantity} x $
                                                {item.product.price}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="self-center">
                                        <Button
                                            className="p-1 bg-transparent rounded-sm hover:bg-red-600"
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            <img
                                                className="w-6"
                                                src="/icons/trash.svg"
                                                alt="remove item"
                                            />
                                        </Button>
                                    </div>
                                </li>
                            ) : (
                                <li key={item.id}>
                                    <span>Product not found</span>
                                </li>
                            ),
                        )}
                    </ul>
                </ScrollArea>
            </SheetContent>
            <SheetDescription></SheetDescription>
        </Sheet>
    );
}
