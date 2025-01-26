import { ProductsCategory } from '@/Pages/Products/Partials/ProductsCategory';
import ProductsList from '@/Pages/Products/Partials/ProductsList';
import { ProductsSeller } from '@/Pages/Products/Partials/ProductsSeller';
import { typeProduct } from '@/Pages/Products/columns';
import { useEffect, useState } from 'react';

export default function ProductsTable({
    products,
}: {
    products: typeProduct[];
}) {
    const [productData, setProductData] = useState<typeProduct[] | null>(null);
    const [categoriesData, setCategoriesData] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sellersData, setSellersData] = useState<string[]>([]);
    const [selectedSellers, setSelectedSellers] = useState<string[]>([]);

    useEffect(() => {
        if (products) {
            setProductData(products);

            // Extract category names from the products
            const categoryNames = [
                ...new Set(products.map((product) => product.category.name)), // Extract unique categories
            ].sort((a, b) => a.localeCompare(b)); // Sort categories alphabetically
            setCategoriesData(categoryNames);

            // Extract seller names from the products
            const sellerNames = [
                ...new Set(products.map((product) => product.seller.name)), // Extract unique sellers
            ].sort((a, b) => a.localeCompare(b)); // Sort sellers alphabetically
            setSellersData(sellerNames);
        }
    }, [products]);

    const handleCategoryChange = (category: string, checked: boolean) => {
        setSelectedCategories((prev) => {
            if (checked) {
                return [...prev, category]; // Add category to selected
            } else {
                return prev.filter((cat) => cat !== category); // Remove category from selected
            }
        });
    };

    const handleSellerChange = (seller: string, checked: boolean) => {
        setSelectedSellers((prev) => {
            if (checked) {
                return [...prev, seller]; // Add seller to selected
            } else {
                return prev.filter((sel) => sel !== seller); // Remove seller from selected
            }
        });
    };

    // Filter product data based on selected categories and sellers
    const filteredProducts = productData?.filter(
        (product: typeProduct) =>
            (selectedCategories.length === 0 ||
                selectedCategories.includes(product.category.name)) &&
            (selectedSellers.length === 0 ||
                selectedSellers.includes(product.seller.name)),
    );

    if (!filteredProducts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container flex flex-col items-center mx-auto md:flex-row md:items-start md:space-x-8">
            <div className="grid grid-cols-2 mt-4 md:flex md:flex-auto md:max-w-72 md:flex-col md:mt-6">
                <ProductsSeller
                    data={sellersData}
                    selectedSellers={selectedSellers}
                    onSellerChange={handleSellerChange}
                />
                <ProductsCategory
                    data={categoriesData}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                />
            </div>
            <div className="w-full pt-4">
                <ProductsList data={filteredProducts} />
            </div>
        </div>
    );
}
