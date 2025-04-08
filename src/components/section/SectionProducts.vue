<script setup lang="ts">
import { useCartStore } from "@/stores/cart.store"
import { onMounted } from "vue"
import CardProduct from "@/components/card/CardProduct.vue"
import { Button } from "@/components/ui/button"
import {useScopedProducts} from "@/composable/useScopedProducts.ts";
import {useRouter} from "vue-router";

const props = defineProps<{
  title?: string
  description?: string
  variant?: 'general' | 'related'
  slug?: string
  href?: string
  filters?: Record<string, any>
  sortKey?: string
  random?: boolean
  limit?: number
}>()

const cartStore = useCartStore()
const router = useRouter()

const { products, loading, loadProducts, loadRelatedProducts } = useScopedProducts(props.filters || {}, {
  limit: props.limit || 12,
  random: props.random,
  sortKey: props.sortKey,
})

const placeholderProducts = Array(12).fill({ id: Math.random() })

const handleAddToCart = (item: any) => {
  cartStore.addToCart(item)
  console.log('Added to cart:', item)
}

onMounted(() => {
  if (props.variant === 'related' && props.slug) {
    loadRelatedProducts(props.slug)
  } else {
    loadProducts()
  }
})
</script>

<template>
  <div class="container mx-auto flex flex-col gap-6">
    <div class="flex justify-between items-start">
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl text-[#191919] font-heading font-normal">{{ title }}</h3>
        <span v-if="description" class="font-neutral-600">{{ description }}</span>
      </div>

      <Button v-if="href" @click="() => router.push({ path: href })" variant="ghost" size="default" class="!rounded-full">View More</Button>
    </div>

    <div class="grid grid-cols-6 gap-6">
      <CardProduct
          v-for="val in (loading ? placeholderProducts : products)"
          :key="`product_${val?.id}`"
          :title="val.title"
          :id="val.id"
          :loading="loading"
          :slug="val.slug"
          :price="val.price"
          :images="val.images"
          :category="val.category"
          @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>
