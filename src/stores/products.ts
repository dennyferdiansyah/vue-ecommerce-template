import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getProduct, getProductByCategory, getProducts} from '@/services'
import type {Product} from '@/types/product'

export const useProductStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const product = ref<Product>()
    const loading = ref(false)
    const favorites = ref<Product[]>([])

    const isFavorite = (productId: number) => {
        return favorites.value.some(product => product.id === productId)
    }

    const toggleFavorite = (product: any) => {
        const index = favorites.value.findIndex(p => p.id === product.id)
        if (index !== -1) {
            favorites.value.splice(index, 1)
        } else {
            favorites.value.push(product)
        }
    }

    async function fetchProducts(page: number, limit: number) {
        loading.value = true
        try {
            const response = await getProducts(page, limit)
            products.value = response
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            loading.value = false
        }
    }

    async function fetchProductBySlug(slug: string) {
        loading.value = true
        try {
            const response = await getProduct(slug)
            product.value = response
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            loading.value = false
        }
    }

    async function fetchProductByCategory(id: number) {
        loading.value = true
        try {
            const response = await getProductByCategory(id)
            products.value = response
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            setTimeout(() => {
                loading.value = false
            }, 500)
        }
    }

    return {
        products,
        product,
        loading,
        favorites,
        fetchProducts,
        fetchProductBySlug,
        fetchProductByCategory,
        toggleFavorite,
        isFavorite,
    }
}, {
    persist: {
        key: 'product-store',
        storage: localStorage,
        pick: ['favorites']
    }
})