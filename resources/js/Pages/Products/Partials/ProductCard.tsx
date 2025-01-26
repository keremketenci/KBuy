import { Link } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/shadcn/ui/card';

interface ProductsCardProps {
    id: number;
    name: string;
    nameClass?: string;
    price: number;
    image_url: string;
    footer?: string;
}

export function ProductCard({
    id,
    name,
    nameClass,
    price,
    image_url,
    footer,
}: ProductsCardProps) {
    return (
        <Card className="w-64">
            <Link href={`/products/product/${id}`}>
                <CardContent className="relative w-full h-48">
                    <img
                        src={
                            image_url || '/images/products/default-product.jpg'
                        }
                        alt={name}
                        className="object-cover w-full h-full rounded-t-lg"
                    />
                </CardContent>
            </Link>
            <CardHeader className="text-center">
                {name && <CardTitle className={nameClass}>{name}</CardTitle>}
                {price && <CardDescription>${price}</CardDescription>}
            </CardHeader>
            {footer && (
                <CardFooter className="flex justify-center">
                    {footer}
                </CardFooter>
            )}
        </Card>
    );
}
