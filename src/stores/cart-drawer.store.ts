import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
    const cartDrawerOpen = ref(false)

    function openCartDrawer() {
        cartDrawerOpen.value = true
    }

    function closeCartDrawer() {
        cartDrawerOpen.value = false
    }

    return {
        cartDrawerOpen,
        openCartDrawer,
        closeCartDrawer
    }
})
