import { CarouselImage } from '@/Components/shadcn/CarouselImage';
import { Separator } from '@/Components/shadcn/ui/separator';
import ProductsList from '@/Pages/Seller/SellerDetails/ProductsList';
import { typeProduct } from '@/Pages/Seller/SellerDetails/columns';
import { PageProps, Seller } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SellerDetails({
    products,
}: {
    products: typeProduct[];
}) {
    const { seller } = usePage<PageProps<{ seller: Seller }>>().props;
    console.log(seller);
    const [productData, setProductData] = useState<typeProduct[] | null>(null);

    useEffect(() => {
        if (products) {
            setProductData(products);
        }
    }, [products]);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex flex-row justify-center py-12">
                <div className="flex w-full px-4 space-x-12 max-w-7xl">
                    {/* Image Section */}
                    <div className="flex-shrink-0 w-1/2">
                        <CarouselImage
                            images={[]}
                            defaultImage="/images/sellers/default-seller.jpg"
                            defaultImageCount={1}
                        />
                    </div>

                    {/* Seller Details Section */}
                    <div className="w-1/2">
                        <h1 className="text-3xl font-semibold">
                            {seller.name}
                        </h1>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold">
                                Seller Details:
                            </h3>
                            <ul className="mt-2 space-y-1">
                                <li>
                                    <strong>Name:</strong> {seller.name}
                                </li>
                                <li>
                                    <strong>E-Mail:</strong> {seller.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">Seller's Products</h1>
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
