export interface Product {
    id: number
    title: string
    slug: string
    price: number
    description: string
    images: string[] | string
    category: {
        id: number
        name: string
        image: string
    }
    creationAt?: Date
    updatedAt?: Date
}


export interface SearchProductParams {
    title?: string;
    price?: number;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    categorySlug?: string;
    page?: number;
    limit?: number;
}