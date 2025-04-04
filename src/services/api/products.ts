import { apiClient } from './client'
import type { Product } from '@/types/product'
import {getOffset} from "@/utils/pagination.ts";

interface CreateProductData {
    title: string
    price: number
    description: string
    categoryId: number
    images: string[]
}

export const getProducts = async (page: number = 1, limit: number = 12): Promise<Product[]> => {
    const offset = getOffset(page, limit)
    const response = await apiClient.get<Product[]>('/products', {
        params: {
            offset,
            limit,
        }
    })
    return response.data
}

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