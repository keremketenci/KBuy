import * as React from 'react';

import { Card, CardContent } from '@/Components/shadcn/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/Components/shadcn/ui/carousel';

interface CarouselImageProps {
    images?: string[];
    defaultImage?: string;
    defaultImageCount?: number;
}

export function CarouselImage({
    images,
    defaultImage,
    defaultImageCount,
}: CarouselImageProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const imageList = images?.length
        ? images
        : new Array(defaultImageCount).fill({ defaultImage });

    return (
        <div className="max-w-xs mx-auto">
            <Carousel setApi={setApi} className="w-full max-w-xs">
                <CarouselContent>
                    {imageList.map((image, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="flex items-center justify-center p-6 aspect-square">
                                    <img
                                        src={defaultImage || image}
                                        alt={`Image ${index + 1}`}
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-sm text-center text-muted-foreground">
                Slide {current} of {count || defaultImageCount}
            </div>
        </div>
    );
}
