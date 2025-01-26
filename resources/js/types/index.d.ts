import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Admin {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Seller {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    category: {
        id: number;
        name: string;
    };
    seller: {
        id: number;
        name: string;
    };
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface CartItem {
    id: number;
    product: {
        id: number;
        name: string;
        price: number;
        stock: number;
    };
    quantity: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        admin: Admin;
        seller: Seller;
    };
    product: Product;
    category: Category;
    cartItem: CartItem;
    ziggy: Config & { location: string };
};
