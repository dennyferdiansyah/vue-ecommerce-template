import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cart.store.ts'
import type {CartItemTypes} from "@/types/cart.ts";

export interface Order {
    id: string
    items: CartItemTypes[]
    total: number
    createdAt: string
}

export const useOrderStore = defineStore('order', () => {
    const orders = ref<Order[]>([])

    function checkout(): void {
        const cartStore = useCartStore()
        if (cartStore.cart.length === 0) return

        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            items: cartStore.cart.map(item => ({ ...item })),
            total: cartStore.total,
            createdAt: new Date().toISOString()
        }

        orders.value.unshift(newOrder)
        cartStore.clearCart()
    }

    return {
        orders,
        checkout
    }
}, {
    persist: {
        key: 'order-store',
        storage: localStorage
    }
})
