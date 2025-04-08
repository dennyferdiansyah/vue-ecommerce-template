import { apiClient } from './client'
import type {Product, SearchProductParams} from '@/types/product'
import {getOffset} from "@/utils/pagination.ts";

interface CreateProductData {
    title: string
    price: number
    description: string
    categoryId: number
    images: string[]
}

export const getProducts =  async (params: SearchProductParams = {}): Promise<Product[]> => {
    const {
        title,
        price,
        price_min,
        price_max,
        categoryId,
        categorySlug,
        page = 1,
        limit = 12,
    } = params;

    const offset = getOffset(page, limit);

    const response = await apiClient.get<Product[]>('/products', {
        params: {
            offset,
            limit,
            ...(title ? { title } : {}),
            ...(price ? { price } : {}),
            ...(price_min ? { price_min } : {}),
            ...(price_max ? { price_max } : {}),
            ...(categoryId ? { categoryId } : {}),
            ...(categorySlug ? { categorySlug } : {}),
        },
    });

    return response.data;
};

export const getRelatedProducts =  async (slug: string): Promise<Product[]> => {

    const response = await apiClient.get<Product[]>(`/products/slug/${slug}/related`);

    return response.data;
};

export const getProduct = async (slug: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/slug/${slug}`)
    return response.data
}

export const getProductByCategory = async (id: number, page: number = 1, limit:number = 12): Promise<Product[]> => {

    const offset = getOffset(page, limit)

    const response = await apiClient.get<Product[]>(`/categories/${id}/products`, {
        params: {
            offset,
            limit,
        }
    })
    return response.data
}

export const createProduct = async (product: CreateProductData): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', product)
    return response.data
}

export const updateProduct = async (id: number, product: Partial<CreateProductData>): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, product)
    return response.data
}

export const deleteProduct = async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`)
}