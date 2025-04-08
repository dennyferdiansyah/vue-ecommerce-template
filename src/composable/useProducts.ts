import { useProductStore } from '@/stores/product.store.ts'
import { storeToRefs } from 'pinia'

export function useProducts() {
    const productStore = useProductStore()
    const { products, loading } = storeToRefs(productStore)

    const loadProducts = async (filters = {}, page: number = 1, limit: number = 12) => {
        await productStore.fetchProducts({
            ...filters,
            page,
            limit,
        })
    }

    return {
        products,
        loading,
        loadProducts,
    }
}
