import { apiClient } from './client'
import type {CategoryTypes} from "@/types/category.ts";

interface CreateCategoryData {
    name: string
    image: string
}

export const getCategories = async (): Promise<CategoryTypes[]> => {
    const response = await apiClient.get<CategoryTypes[]>('/categories')
    return response.data
}

export const getCategory = async (slug: string): Promise<CategoryTypes> => {
    const response = await apiClient.get<CategoryTypes>(`/categories/slug/${slug}`)
    return response.data
}

export const createCategory = async (category: CreateCategoryData): Promise<CategoryTypes> => {
    const response = await apiClient.post<CategoryTypes>('/categories', category)
    return response.data
}