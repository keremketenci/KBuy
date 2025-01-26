import { Separator } from '@/Components/shadcn/ui/separator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { typeProduct } from '@/Pages/Seller/Dashboard/columns';
import ProductsList from '@/Pages/Seller/Dashboard/ProductsList';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SellerDashboard({
    products,
}: {
    products: typeProduct[];
}) {
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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in as seller!
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">Seller's Products</h1>
                <Separator />
            </div>
            <div className="container flex flex-col items-center mx-auto md:flex-row md:items-start md:space-x-8">
                <div className="w-full pt-4">
                    <ProductsList data={products} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
