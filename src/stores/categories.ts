import { defineStore } from 'pinia'
import { ref } from 'vue'
import {getCategories, getCategory} from "@/services";
import type {CategoryTypes} from "@/types/category.ts";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<CategoryTypes[]>([])
    const category = ref<CategoryTypes>()
    const loading = ref(false)
    const error: any = ref(null)

    const fetchCategories = async () => {
        if (categories.value.length > 0) return // Use persisted data if exists

        loading.value = true
        error.value = null
        try {
            const response = await getCategories()
            categories.value = response
        } catch (err) {
            error.value = 'Failed to fetch categories'
            console.error('Error fetching categories:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchCategoryBySlug = async (slug: string) => {

        loading.value = true
        error.value = null
        try {
            const response = await getCategory(slug)
            category.value = response
        } catch (err) {
            error.value = 'Failed to fetch categories'
            console.error('Error fetching categories:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        categories,
        category,
        loading,
        error,
        fetchCategories,
        fetchCategoryBySlug,
    }
}, {
    persist: {
        key: 'category-store',
        pick: ['categories'],
        storage: localStorage
    }
})
