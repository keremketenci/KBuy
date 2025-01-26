'use client';

import {
    columnsCard,
    columnsTable,
    typeProduct,
} from '@/Pages/Seller/Dashboard/columns';
import { DataCard } from '@/Pages/Seller/Partials/data-card';
import { DataTable } from '@/Pages/Seller/Partials/data-table';
import React, { useState } from 'react';

// Accept data as props from the Server Component
interface ProductListProps {
    data: typeProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

    return (
        <>
            {/* Render table or card based on the view mode */}
            {viewMode === 'table' ? (
                <DataTable
                    columns={columnsTable}
                    data={data}
                    modeCurrent="Table View"
                    modeNext="Card View"
                    modeChanger={() => setViewMode('card')}
                />
            ) : (
                <DataCard
                    columns={columnsCard}
                    data={data}
                    modeCurrent="Card View"
                    modeNext="Table View"
                    modeChanger={() => setViewMode('table')}
                />
            )}
        </>
    );
};

export default ProductList;
