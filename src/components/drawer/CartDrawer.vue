<!-- components/CartDrawer.vue -->
<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
import {Button} from '@/components/ui/button'
import {useDrawerStore} from "@/stores/cart-drawer.store.ts";
import {useCartStore} from "@/stores/cart.store.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import {getImageUrl} from "@/utils/common.ts";
import {useRouter} from "vue-router";

const drawerStore = useDrawerStore()
const cartStore = useCartStore()
const route = useRouter()

const lastItemAdded = ref<any>(null)
let prevCartState: Record<string, number> = {}
watch(
    () => cartStore.cart.map(item => ({ id: item.id, quantity: item.quantity })),
    (newCart) => {
      for (const item of newCart) {
        const prevQty = prevCartState[item.id] ?? 0
        if (item.quantity > prevQty) {
          lastItemAdded.value = cartStore.cart.find(c => c.id === item.id)
          break
        }
      }

      // Update the previous state
      prevCartState = {}
      newCart.forEach(item => {
        prevCartState[item.id] = item.quantity
      })
    },
    { deep: true, immediate: true }
)

const isOpen = computed({
  get: () => drawerStore.cartDrawerOpen,
  set: (val) => {
    if (val) drawerStore.openCartDrawer()
    else drawerStore.closeCartDrawer()
  }
})

let removeHook: (() => void) | null = null

onMounted(() => {
  // Add afterEach hook to close drawer
  const remove = route.afterEach(() => {
    drawerStore.closeCartDrawer()
  })
  removeHook = remove
})

onUnmounted(() => {
  // Cleanup the hook when component is destroyed
  removeHook?.()
})
</script>

<template>
  <Drawer v-model:open="isOpen">
    <DrawerContent>
      <div class="mx-auto w-full max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Successfull added to cart</DrawerTitle>
          <DrawerDescription>{{lastItemAdded?.title}} successfully added to your cart</DrawerDescription>
        </DrawerHeader>

        <div class="mx-auto px-4 items-center w-full flex flex-row gap-4">
          <div class="relative bg-gray-200 shrink-0 rounded-lg overflow-hidden w-14 h-14">
            <LazyImage :src="getImageUrl(lastItemAdded?.images)" />
          </div>
          <div class="flex flex-col gap-4">
            <span>{{lastItemAdded?.title}}</span>
          </div>
        </div>

        <DrawerFooter>
          <Button class="bg-accent" @click="route.push({ path: '/cart' })">View Cart</Button>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
