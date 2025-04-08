import { storeToRefs } from 'pinia'
import {useCategoryStore} from "@/stores/category.store.ts";

export function useCategories() {
    const categoryStore = useCategoryStore()
    const { categories, category, error, loading } = storeToRefs(categoryStore)

    const loadCategories = async () => {
        await categoryStore.fetchCategories()
    }

    return {
        categories,
        category,
        loading,
        error,
        loadCategories,
    }
}
