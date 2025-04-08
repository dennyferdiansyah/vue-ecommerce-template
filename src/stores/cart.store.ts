import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItemTypes } from '@/types/cart.ts'
export const useCartStore = defineStore('cart', () => {
    const cart = ref<CartItemTypes[]>([])

    const total = computed(() =>
        cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const totalQuantity = computed(() =>
        cart.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    function addToCart(item: CartItemTypes): void {
        const existing = cart.value.find(i => i.id === item.id)
        if (existing) {
            existing.quantity += item.quantity
        } else {
            cart.value.push({ ...item })
        }
    }

    function removeFromCart(id: number): void {
        cart.value = cart.value.filter(item => item.id !== id)
    }

    function updateQuantity(id: number, quantity: number): void {
        const item = cart.value.find(i => i.id === id)
        if (item) item.quantity = quantity
    }

    function clearCart(): void {
        cart.value = []
    }

    return {
        cart,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity,
        clearCart
    }
}, {
    persist: {
        key: 'cart-store',
        storage: localStorage
    }
})