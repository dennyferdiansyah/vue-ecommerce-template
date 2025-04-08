import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getProduct, getProductByCategory, getProducts, getRelatedProducts} from '@/services'
import type {Product} from '@/types/product'

export const useProductStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const product = ref<Product>()
    const pageSize = ref<number>(12)
    const productMap = ref<Record<string, Product>>({})
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

    async function fetchScopedProducts(filters = {}, page = 1, limit = 12): Promise<Product[]> {
        try {
            const response = await getProducts({ ...filters, page, limit })
            return response
        } catch (error) {
            console.error('Failed to fetch scoped products:', error)
            return []
        }
    }

    async function fetchRelatedProducts(slug: string): Promise<Product[]> {
        try {
            const response = await getRelatedProducts(slug)
            return response
        } catch (error) {
            console.error('Failed to fetch scoped products:', error)
            return []
        }
    }

    async function fetchProducts(filters = {}, page: number = 1, limit: number = 12) {
        loading.value = true
        console.log(filters, 'isi filter')
        try {
            const response = await getProducts({
                ...filters,
                page,
                limit
            })
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
            if (productMap.value[slug]) {
                product.value = productMap.value[slug]
            } else {
                const response = await getProduct(slug)
                productMap.value[slug] = response
                product.value = response

                limitProductMapSize(20)
            }
        } catch (error) {
            console.error('Failed to fetch product:', error)
        } finally {
            loading.value = false
        }
    }

    async function fetchProductByCategory(id: number, page: number = 1, limit: number = 12) {
        loading.value = true
        try {
            const response = await getProductByCategory(id, page, limit)
            products.value = response
        } catch (error) {
            console.error('Failed to fetch products:', error)
            products.value = []
        } finally {
            setTimeout(() => {
                loading.value = false
            }, 500)
        }
    }

    function limitProductMapSize(limit: number) {
        const keys = Object.keys(productMap.value)
        if (keys.length > limit) {
            const oldestKey = keys[0]
            delete productMap.value[oldestKey]
        }
    }

    return {
        products,
        product,
        loading,
        favorites,
        productMap,
        pageSize,
        fetchProducts,
        fetchScopedProducts,
        fetchRelatedProducts,
        fetchProductBySlug,
        fetchProductByCategory,
        toggleFavorite,
        isFavorite,
    }
}, {
    persist: {
        key: 'product-store',
        storage: localStorage,
        pick: ['favorites', 'productMap']
    }
})