<template>
  <Card v-if="loading" class="p-0 group/product !gap-0 font-heading rounded-2xl border-0 shadow-lg overflow-hidden">
    <CardHeader class="p-3 shrink-0 aspect-square flex relative overflow-hidden relative">
      <Skeleton class="w-full h-full rounded-xl" />
    </CardHeader>
    <CardContent class="px-4 pb-3 flex flex-col  h-full justify-between gap-1">
      <div class="flex flex-col gap-2">
        <Skeleton class="w-1/4 h-2" />
        <Skeleton class="w-3/4 h-4" />
      </div>
      <div class="flex justify-between gap-3 items-center">
        <Skeleton class="w-1/4 h-4" />
        <Skeleton class="w-8 h-8 shrink-0 rounded-full" />
      </div>
    </CardContent>
  </Card>
  <Card v-else class="p-0 group/product !gap-0 font-heading rounded-2xl border-0 shadow-lg overflow-hidden">
    <CardHeader class="p-3 shrink-0 aspect-square flex relative overflow-hidden relative">
      <router-link
          class="relative flex rounded-2xl overflow-hidden p-3 h-full w-full"
          :to="routePaths.productDetail(slug)">
        <LazyImage
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover min-w-full min-h-full w-auto h-auto transition duration-300 group-hover/product:scale-110"
            :src="getImageUrl(images)" />
      </router-link>
      <div class="absolute right-4 top-4 flex items-center gap-1">
        <AddToWishlist :data="props" />
      </div>
    </CardHeader>
    <CardContent class="px-4 pb-3 flex flex-col  h-full justify-between gap-1">
      <div class="flex flex-col gap-1">
        <h4 class="m-0 text-sm text-neutral-500 whitespace-nowrap text-ellipsis overflow-hidden block">
          <router-link :to="routePaths.category(category?.slug)">
            {{ category?.name }}
          </router-link>
        </h4>
        <h3 class="m-0 text-[16px] text-neutral-700 font-medium overflow-hidden block">
          <router-link :to="routePaths.productDetail(slug)">
            {{title}}
          </router-link>
        </h3>
      </div>
      <div class="flex justify-between gap-3 w-full items-center">
        <span class="font-semibold block overflow-hidden text-xl whitespace-nowrap text-ellipsis">{{ formatPrice(price) }}</span>
        <div class="shrink-0">
          <AddToCart size="icon" :data="props" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {formatPrice, getImageUrl} from "@/utils/common.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import AddToCart from "@/components/button/AddToCart.vue";
import {Skeleton} from "@/components/ui/skeleton";
import AddToWishlist from "@/components/button/AddToWishlist.vue";
import {routePaths} from "@/utils/path.utils.ts";

const props = defineProps<{
  id: number
  title: string
  slug: string
  price: number
  images: string[] | string
  category: {
    id: number
    name: string
    slug: string
  }
  loading?: boolean
}>()
</script>