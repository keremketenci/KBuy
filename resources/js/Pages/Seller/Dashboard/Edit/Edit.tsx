import { Button } from '@/Components/shadcn/ui/button';
import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Edit({
    product,
    categories,
}: {
    product: any;
    categories: any[];
}) {
    const { data, setData, patch, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('seller.product.update', product.id));
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Edit Product
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full px-4 py-2 mt-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                placeholder="Enter product name"
                            />
                            {errors.name && (
                                <div className="text-sm text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Category
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData('category_id', e.target.value)
                                }
                                className="w-full px-4 py-2 mt-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <div className="text-sm text-red-500">
                                    {errors.category_id}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="w-full px-4 py-2 mt-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                            placeholder="Enter product description"
                        />
                        {errors.description && (
                            <div className="text-sm text-red-500">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Price
                            </label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                className="w-full px-4 py-2 mt-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                placeholder="Enter product price"
                            />
                            {errors.price && (
                                <div className="text-sm text-red-500">
                                    {errors.price}
                                </div>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={(e) =>
                                    setData('stock', e.target.value)
                                }
                                className="w-full px-4 py-2 mt-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                placeholder="Enter stock quantity"
                            />
                            {errors.stock && (
                                <div className="text-sm text-red-500">
                                    {errors.stock}
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
