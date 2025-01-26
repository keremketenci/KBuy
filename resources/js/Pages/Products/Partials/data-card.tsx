'use client';

// react
import * as React from 'react';

import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

// components ui
import { DataTablePagination } from '@/Components/shadcn/ui/DataTablePagination';
import { Button } from '@/Components/shadcn/ui/button';
import { Input } from '@/Components/shadcn/ui/input';
import { ProductCard } from '@/Pages/Products/Partials/ProductCard';
import { ProductsCard } from '@/Pages/Products/columns';

interface DataTableProps {
    columns: ColumnDef<ProductsCard>[];
    data: ProductsCard[];
    modeCurrent: string | null;
    modeNext: string | null;
    modeChanger: () => void;
}

export function DataCard<TData, TValue>({
    columns,
    data,
    modeCurrent,
    modeNext,
    modeChanger,
}: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col items-center justify-between py-4 space-x-4 space-y-4 md:flex-row">
                <Input
                    placeholder="Filter names..."
                    value={
                        (table.getColumn('name')?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('name')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex flex-row space-x-2">
                    <Button variant="default">{modeCurrent}</Button>
                    <Button variant="link" onClick={modeChanger}>
                        {modeNext}
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 justify-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                        const { id, name, price, image_url } = row.original;
                        return (
                            <ProductCard
                                key={row.id}
                                id={id}
                                name={name}
                                price={price}
                                image_url={image_url}
                            />
                        );
                    })
                ) : (
                    <div className="col-span-1 text-center">No results.</div>
                )}
            </div>
            <div className="flex flex-col py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
