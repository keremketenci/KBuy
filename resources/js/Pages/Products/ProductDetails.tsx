import { CarouselImage } from '@/Components/shadcn/CarouselImage';
import { Button } from '@/Components/shadcn/ui/button';
import { Separator } from '@/Components/shadcn/ui/separator';
import ProductsList from '@/Pages/Products/Partials/ProductsList';
import { typeProduct } from '@/Pages/Products/columns';
import { PageProps, Product } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductDetails({
    products,
}: {
    products: typeProduct[];
}) {
    const { product } = usePage<PageProps<{ product: Product }>>().props;
    const [productData, setProductData] = useState<typeProduct[] | null>(null);
    const [inCart, setInCart] = useState(false);
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user;

    useEffect(() => {
        const checkInCart = async () => {
            if (!isLoggedIn) {
                console.log('User not logged in. Skipping cart check.');
                return;
            }

            try {
                const response = await fetch(`/cart/is-in-cart/${product.id}`);
                const data = await response.json();
                setInCart(data.inCart);
            } catch (error) {
                console.error('Error checking cart status:', error);
            }
        };

        checkInCart();

        if (products) {
            setProductData(products);
        }
    }, [product.id, products]);

    if (!products) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = (productId: number) => {
        axios.post('/user/cart/store', { product_id: productId });
        setInCart(true);
    };

    const cartItems = new Map<number, number>();

    return (
        <>
            <div className="flex flex-row justify-center py-12">
                <div className="flex w-full px-4 space-x-12 max-w-7xl">
                    {/* Image Section */}
                    <div className="flex-shrink-0 w-1/2">
                        <CarouselImage
                            images={[]}
                            defaultImage="/images/products/default-product.jpg"
                            defaultImageCount={5}
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className="w-1/2">
                        <h1 className="text-3xl font-semibold">
                            {product.name}
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            {product.description}
                        </p>

                        <div className="mt-4">
                            <span className="text-2xl font-bold text-gray-900">{`$${product.price}`}</span>
                        </div>

                        <div className="mt-6">
                            <Button
                                className={`px-6 py-2 text-white transition rounded-md ${
                                    !isLoggedIn
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : inCart || product.stock === 0
                                          ? 'bg-gray-400 cursor-not-allowed'
                                          : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                                onClick={() =>
                                    isLoggedIn && handleAddToCart(product.id)
                                } // Sadece giriş yapılmışsa işlevi çağır
                                disabled={
                                    !isLoggedIn ||
                                    inCart ||
                                    product.stock === 0 ||
                                    (cartItems.get(product.id) ?? 0) >=
                                        product.stock
                                }
                            >
                                {!isLoggedIn
                                    ? 'Not Logged In' // Giriş yapılmamışsa bu metni göster
                                    : inCart
                                      ? 'Already in Cart'
                                      : product.stock === 0
                                        ? 'Out of Stock'
                                        : 'Add to Cart'}
                            </Button>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold">
                                Product Details:
                            </h3>
                            <ul className="mt-2 space-y-1">
                                <Link
                                    href={`/sellers/seller/${product.seller.id}`}
                                >
                                    <li className="hover:underline">
                                        <strong>Seller:</strong>{' '}
                                        {product.seller.name}
                                    </li>
                                </Link>

                                <li>
                                    <strong>Category:</strong>{' '}
                                    {product.category.name}
                                </li>
                                <li>
                                    <strong>Stock Status:</strong>{' '}
                                    {product.stock}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">Products with same category</h1>
                <Separator />
            </div>
            <div className="container flex flex-col items-center mx-auto md:flex-row md:items-start md:space-x-8">
                <div className="w-full pt-4">
                    <ProductsList data={products} />
                </div>
            </div>
        </>
    );
}
