<template>
  <div class="flex flex-col gap-6">
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
        <div class="flex flex-col gap-2">
          <div class="flex">
            <router-link class="flex items-center gap-2 relative overflow-hidden" :to="routePaths.category(product?.category?.slug)">
              <LazyImage class="!w-6 !h-6 relative overflow-hidden rounded-md" :src="product?.category?.image" />
              <h2 class="m-0 text-gray-500 text-sm">{{product?.category?.name}}</h2>
            </router-link>
          </div>
          <div class="flex flex-col gap-8 justify-between">
            <Skeleton v-if="isLoading" class="w-3/4 h-6 rounded-full bg-gray-300" />
            <h1 v-else class="text-4xl text-gray-800">{{ product?.title }}</h1>

            <div v-if="isLoading" class="flex flex-col gap-3">
              <Skeleton class="w-full h-3 rounded-full bg-gray-300" />
              <Skeleton class="w-3/4 h-3 rounded-full bg-gray-300" />
              <Skeleton class="w-1/4 h-3 rounded-full bg-gray-300" />
            </div>
            <p v-else class="text-neutral-600">
              {{ product?.description || 'No description available for this product.' }}
            </p>
            <div v-if="!isLoading" class="flex flex-col gap-2">
              <Swatches
                  @update:selected="handleSelectedVariant"
                  title="Size" :data="[
                { label: 'S', value: 's' },
                { label: 'M', value: 'm' },
                { label: 'L', value: 'l' },
                { label: 'XL', value: 'xl' },
                ]" />
              <Swatches
                  @update:selected="handleSelectedVariant"
                  title="Color" :data="[ { label: 'Red', value: 'red', color: '#FF0000' }, { label: 'Teal', value: 'teal', color: '#71d885' }]" />
            </div>
          </div>
        </div>

        <!-- Price & Actions -->
        <div class="flex flex-col gap-7">
          <Skeleton v-if="isLoading" class="w-12 h-6 rounded-full bg-gray-300" />
          <div v-else class="flex gap-2 items-center">
            <span class="text-sm font-medium text-gray-600">Price</span>
            <PriceText :price="product?.price" />
          </div>

          <div v-if="isLoading" class="flex flex-row gap-2 items-center">
            <Skeleton class="w-20 h-9 rounded-xl bg-gray-300" />
            <Skeleton class="w-32 h-9 bg-gray-300" />
            <Skeleton class="w-12 h-9 bg-gray-300" />
          </div>
          <div v-else class="flex flex-row gap-2 items-center">
            <QuantityButton @change="handleQuantityChange"/>
            <AddToCart :data="product" :quantity="quantity" />
            <AddToWishlist :data="product" variant="detail" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-12">
      <SectionProducts
          title="Related Products"
          variant="related" :slug="slug" />
      <SectionProducts title="You may also like" :filters="{ categoryId: 2 }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'

import AddToCart from '@/components/button/AddToCart.vue'
import AddToWishlist from '@/components/button/AddToWishlist.vue'
import PriceText from '@/components/typography/PriceText.vue'
import LazyImage from '@/components/image/LazyImage.vue'
import {Skeleton} from '@/components/ui/skeleton'

import {useProductStore} from '@/stores/product.store.ts'
import QuantityButton from "@/components/button/QuantityButton.vue";
import Swatches from "@/components/swatches/Swatches.vue";
import SectionProducts from "@/components/section/SectionProducts.vue";
import {routePaths} from "@/utils/path.utils.ts";

const route = useRoute()
const productStore = useProductStore()
const product = ref<any>(null)
const quantity = ref<number>(1)
const slug = ref<string>('')
const selectedImage = ref<string | null>(null)

const isLoading = computed(() => productStore.loading)
const thumbnails = computed(() =>
    isLoading.value ? Array(3).fill(null) : product.value?.images || []
)

const handleQuantityChange = (qty: number) => {
  quantity.value = qty
}

const handleSelectedVariant = (variant: any) => {
  console.log(variant, 'variant selected')
}

const loadProduct = async () => {
  slug.value = route.params.slug as string
  if (slug.value) {
    await productStore.fetchProductBySlug(slug.value)
    product.value = productStore.product
    selectedImage.value = product.value?.images?.[0] || null
  }
}

onMounted(loadProduct)
watch(() => route.params.slug, loadProduct)
</script>
