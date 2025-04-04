import { useProductStore } from '@/stores/products'

export function useProducts() {
    const productStore = useProductStore()

    const loadProducts = async () => {
        if (!productStore.products.length) {
            await productStore.fetchProducts()
        }
    }

    return {
        products: productStore.products,
        loading: productStore.loading,
        loadProducts
    }
}