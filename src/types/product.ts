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
    creationAt?: string
    updatedAt?: string
}