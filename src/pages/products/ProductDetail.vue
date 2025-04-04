<template>
  <div class="container mx-auto py-5 flex flex-col gap-6">
    <BreadCrumbs />

    <div class="grid grid-cols-1 lg:grid-cols-9 gap-10">
      <!-- Product Image Preview -->
      <div class="lg:col-span-4 flex gap-4 sticky top-30">
        <!-- Thumbnails -->
        <div class="flex flex-col gap-3">
          <div
              v-for="(img, index) in thumbnails"
              :key="index"
              :class="`relative cursor-pointer overflow-hidden h-20 w-20 bg-white rounded-xl ${selectedImage && selectedImage === img ? 'outline-2 outline-accent' : ''}`"
              @click="() => selectedImage = img"
          >
            <Skeleton v-if="isLoading" class="w-full h-full bg-gray-300" />
            <LazyImage v-else
                       :src="img" />
          </div>
        </div>

        <!-- Main Image -->
        <div class="relative flex justify-center overflow-hidden w-full h-[500px] bg-white rounded-xl">
          <Skeleton v-if="isLoading" class="w-full h-full bg-gray-300" />
          <LazyImage
              v-else
              :alt="product?.title"
              :src="selectedImage || product?.images?.[0]"
              class-name="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <!-- Product Info -->
      <div class="lg:col-span-5 flex flex-col gap-10 justify-between bg-white rounded-xl p-8">
        <!-- Title & Description -->
        <div class="flex flex-col gap-5">
          <Skeleton v-if="isLoading" class="w-3/4 h-6 rounded-full bg-gray-300" />
          <h1 v-else class="text-3xl text-gray-800">{{ product?.title }}</h1>

          <div v-if="isLoading" class="flex flex-col gap-3">
            <Skeleton class="w-full h-3 rounded-full bg-gray-300" />
            <Skeleton class="w-3/4 h-3 rounded-full bg-gray-300" />
            <Skeleton class="w-1/4 h-3 rounded-full bg-gray-300" />
          </div>
          <p v-else class="text-neutral-600">
            {{ product?.description || 'No description available for this product.' }}
          </p>
        </div>

        <!-- Price & Actions -->
        <div class="flex flex-col gap-7">
          <Skeleton v-if="isLoading" class="w-12 h-6 rounded-full bg-gray-300" />
          <div v-else class="flex gap-2 items-center">
            <span class="text-neutral-500">Price</span>
            <PriceText :price="product?.price" />
          </div>

          <div v-if="isLoading" class="flex flex-row gap-2 items-center">
            <Skeleton class="w-20 h-9 rounded-xl bg-gray-300" />
            <Skeleton class="w-32 h-9 bg-gray-300" />
            <Skeleton class="w-12 h-9 bg-gray-300" />
          </div>
          <div v-else class="flex flex-row gap-2 items-center">
            <span>QTY</span>
            <AddToCart :data="product" />
            <AddToWishlist :data="product" variant="detail" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'

import AddToCart from '@/components/button/AddToCart.vue'
import AddToWishlist from '@/components/button/AddToWishlist.vue'
import PriceText from '@/components/typography/PriceText.vue'
import BreadCrumbs from '@/components/navigation/BreadCrumbs.vue'
import LazyImage from '@/components/image/LazyImage.vue'
import {Skeleton} from '@/components/ui/skeleton'

import {useProductStore} from '@/stores/products.ts'

const route = useRoute()
const productStore = useProductStore()
const product = ref<any>(null)
const selectedImage = ref<string | null>(null)

const isLoading = computed(() => productStore.loading)
const thumbnails = computed(() =>
    isLoading.value ? Array(3).fill(null) : product.value?.images || []
)

const loadProduct = async () => {
  const slug = route.params.slug as string
  if (slug) {
    await productStore.fetchProductBySlug(slug)
    product.value = productStore.product
    selectedImage.value = product.value?.images?.[0] || null
  }
}

onMounted(loadProduct)
watch(() => route.params.slug, loadProduct)
</script>
