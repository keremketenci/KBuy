'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/shadcn/ui/accordion';
import { Checkbox } from '@/Components/shadcn/ui/checkbox';
import { Input } from '@/Components/shadcn/ui/input';
import { ScrollArea } from '@/Components/shadcn/ui/scroll-area';
import { Separator } from '@/Components/shadcn/ui/separator';
import * as React from 'react';

interface ProductsSellerProps {
    data: string[];
    selectedSellers: string[];
    onSellerChange: (seller: string, checked: boolean) => void;
}

export function ProductsSeller({
    data,
    selectedSellers,
    onSellerChange,
}: ProductsSellerProps) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredSellers = data.filter((seller) =>
        seller.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleSellerChange = (seller: string, checked: boolean) => {
        onSellerChange(seller, checked);
    };

    return (
        <div>
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-2 text-xl">
                        Seller
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="p-1">
                            <Input
                                placeholder="Search sellers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="h-72">
                            <div className="p-2">
                                {filteredSellers.map((seller) => (
                                    <React.Fragment key={seller}>
                                        <div className="flex flex-row items-center text-sm gap-x-2">
                                            <Checkbox
                                                id={seller}
                                                checked={selectedSellers.includes(
                                                    seller,
                                                )}
                                                onCheckedChange={(
                                                    checked: boolean,
                                                ) =>
                                                    handleSellerChange(
                                                        seller,
                                                        checked,
                                                    )
                                                }
                                            />
                                            {seller}
                                        </div>
                                        <Separator className="my-2" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
