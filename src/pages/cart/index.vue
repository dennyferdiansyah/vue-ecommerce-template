<template>
  <div class="grid gap-4 lg:grid-cols-4 items-start">
    <!-- Cart Items -->
    <div class="col-span-3 flex flex-col gap-3">
      <div v-if="cartStore.cart.length === 0" class="py-10 text-center text-gray-500">
        Your cart is empty.
      </div>

      <Card
          v-for="item in cartStore.cart"
          :key="item.id"
          class="rounded-xl"
      >
        <CardContent class="flex justify-between">
          <div class="flex items-center gap-4">
            <div class="relative flex h-20 w-20 items-center overflow-hidden rounded-xl bg-gray-200">
              <LazyImage :src="getImageUrl(item?.images)" class="h-20 w-20 object-cover rounded"/>
            </div>
            <div>
              <h3 class="text-md font-medium text-neutral-700">{{ item.title }}</h3>
              <p class="text-sm text-gray-500">Price: {{ formatPrice(item.price) }}</p>
              <div class="mt-2 flex items-center gap-2">
                <label class="text-sm">Qty:</label>
                <QuantityButton
                    size="small"
                    v-model="item.quantity"
                    @change="updateQuantity(item.id, item.quantity)"
                />
              </div>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button
                  class="group/trashcart border bg-white hover:bg-red-600 !rounded-full"
                  size="icon"
                  aria-label="Remove item"
                  @click="itemToRemove = item"
              >
                <Icon icon="mdi:trash" class="text-red-500 group-hover/trashcart:text-white"/>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove item?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove <strong>{{ itemToRemove?.title }}</strong> from your cart?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel @click="itemToRemove = null">Cancel</AlertDialogCancel>
                <AlertDialogAction @click="handleConfirmRemove">Remove</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>

    <!-- Cart Summary -->
    <Card class="sticky top-40 flex h-auto flex-col gap-3 rounded-xl border p-4">
      <h2 class="text-xl font-bold">Order Summary</h2>
      <div class="flex justify-between">
        <span>Total Items:</span>
        <span>{{ cartStore.totalQuantity }}</span>
      </div>
      <div class="flex justify-between">
        <span>Total Price:</span>
        <span>{{ formatPrice(cartStore.total) }}</span>
      </div>

      <Button
          class="mt-4 bg-accent/50 px-4 py-2 text-neutral-900 hover:bg-accent/70"
          :disabled="cartStore.cart.length === 0"
      >
        Proceed to Checkout
      </Button>

      <AlertDialog v-if="cartStore.cart.length > 0">
        <AlertDialogTrigger as-child>
          <Button variant="ghost" class="text-sm text-gray-600 underline">
            Clear Cart
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="clearCart">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue"
import LazyImage from "@/components/image/LazyImage.vue"
import QuantityButton from "@/components/button/QuantityButton.vue"
import {useCartStore} from "@/stores/cart.store.ts"
import {formatPrice, getImageUrl} from "@/utils/common.ts"
import type {CartItemTypes} from "@/types/cart.ts"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Icon} from "@iconify/vue"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const cartStore = useCartStore()
const itemToRemove = ref<CartItemTypes | null>(null)

const handleConfirmRemove = () => {
  if (itemToRemove.value) {
    cartStore.removeFromCart(itemToRemove.value.id)
    itemToRemove.value = null
  }
}

const {updateQuantity, clearCart} = cartStore
</script>
