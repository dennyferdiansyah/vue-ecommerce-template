import {ref, watchEffect} from 'vue'
import {useProductStore} from '@/stores/product.store'
import type {Product} from '@/types/product'

interface Options {
    limit?: number
    page?: number
    random?: boolean
    sortKey?: 'price' | string
    autoFetch?: boolean
}

export function useScopedProducts(filters: Record<string, any> = {}, options: Options = {}) {
    const store = useProductStore()

    const products = ref<Product[]>([])
    const loading = ref(false)

    const loadProducts = async () => {
        loading.value = true
        const result = await store.fetchScopedProducts(filters, options.page || 1, options.limit || 12)

        let scoped = [...result]

        if (options.random) {
            for (let i = scoped.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[scoped[i], scoped[j]] = [scoped[j], scoped[i]]
            }
        }

        if (options.sortKey === 'price') {
            scoped.sort((a, b) => a.price - b.price)
        }

        products.value = scoped
        loading.value = false
    }

    const loadRelatedProducts = async (slug: string) => {
        loading.value = true

        if (!slug) {
            loading.value = false
            products.value = []
        }

        products.value = await store.fetchRelatedProducts(slug)
        loading.value = false
    }

    if (options.autoFetch !== false) {
        watchEffect(loadProducts)
    }

    return {
        products,
        loading,
        loadProducts,
        loadRelatedProducts,
    }
}
