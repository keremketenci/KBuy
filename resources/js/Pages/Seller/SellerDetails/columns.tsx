'use client';
import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
// components ui
import { Button } from '@/Components/shadcn/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/shadcn/ui/dropdown-menu';
import { Link } from '@inertiajs/react';

export type typeProduct = Product;
export type ProductsCard = Product;
export type ProductsTable = Product;

export const columnsCard: ColumnDef<ProductsCard>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'image_url',
        header: 'Image',
    },
];

export const columnsTable: ColumnDef<ProductsTable>[] = [
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    row.original.id.toString(),
                                )
                            }
                        >
                            Copy Product Id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/products/product/${row.original.id}`}>
                            <DropdownMenuItem>
                                View product details
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Name
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const name = row.getValue('name') as string;
            return <div className="font-medium text-center">{name}</div>;
        },
    },
    {
        accessorKey: 'category',
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Category
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const category =
                (row.getValue('category') as { name: string })?.name ||
                'No Category';
            return <div className="font-medium text-center">{category}</div>;
        },
    },
    {
        accessorKey: 'seller',
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Seller
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const seller =
                (row.getValue('seller') as { name: string })?.name ||
                'No Seller';
            return <div className="font-medium text-center">{seller}</div>;
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Price
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price);

            return <div className="font-medium text-center">{formatted}</div>;
        },
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Stock
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const stock = parseFloat(row.getValue('stock'));
            return <div className="font-medium text-center">{stock}</div>;
        },
    },
];
