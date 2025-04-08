import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategories, getCategory } from "@/services"
import type { CategoryTypes } from "@/types/category.ts"

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<CategoryTypes[]>([])
    const category = ref<CategoryTypes>()
    const loading = ref(false)
    const error: any = ref(null)

    // Track when categories were last fetched
    const lastFetched = ref<number | null>(null)
    const EXPIRATION_TIME = 10 * 60 * 1000 // 10 minutes

    const fetchCategories = async () => {
        const now = Date.now()
        const isExpired = !lastFetched.value || (now - lastFetched.value > EXPIRATION_TIME)

        if (categories.value.length > 0 && !isExpired) return

        loading.value = true
        error.value = null

        try {
            const response = await getCategories()
            categories.value = response
            lastFetched.value = Date.now()
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
            error.value = 'Failed to fetch category'
            console.error('Error fetching category:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        categories,
        category,
        loading,
        error,
        lastFetched,
        fetchCategories,
        fetchCategoryBySlug,
    }
}, {
    persist: {
        key: 'category-store',
        pick: ['categories', 'lastFetched'],
        storage: localStorage,
    }
})
