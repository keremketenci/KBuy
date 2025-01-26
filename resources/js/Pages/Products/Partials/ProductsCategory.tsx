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

interface ProductsCategoryProps {
    data: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string, checked: boolean) => void;
}

export function ProductsCategory({
    data,
    selectedCategories,
    onCategoryChange,
}: ProductsCategoryProps) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredCategories = data.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleCategoryChange = (category: string, checked: boolean) => {
        onCategoryChange(category, checked);
    };

    return (
        <div>
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-2 text-xl">
                        Category
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="p-1">
                            <Input
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="h-72">
                            <div className="p-2">
                                {filteredCategories.map((category) => (
                                    <React.Fragment key={category}>
                                        <div className="flex flex-row items-center text-sm gap-x-2">
                                            <Checkbox
                                                id={category}
                                                checked={selectedCategories.includes(
                                                    category,
                                                )}
                                                onCheckedChange={(
                                                    checked: boolean,
                                                ) =>
                                                    handleCategoryChange(
                                                        category,
                                                        checked,
                                                    )
                                                }
                                            />
                                            {category}
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
