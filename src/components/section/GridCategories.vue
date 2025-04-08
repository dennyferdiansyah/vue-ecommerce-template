<template>
  <section class="relative block h-auto">
    <div class="container mx-auto py-10">
        <Carousel
            class="relative w-full"
        >
          <CarouselContent class="-ml-3">
            <CarouselItem v-for="(val, index) in categoryStore.categories" :key="index" class="md:basis-1/2 lg:basis-1/7 pl-3">
                <router-link :to="routePaths.category(val.slug)">
                  <Card class="p-0 group/category flex justify-center items-center border-0 bg-transparent  gap-0 relative">
                    <CardContent class="flex relative w-full aspect-square rounded-3xl overflow-hidden items-center justify-center p-0">
                      <LazyImage
                          class-name="block absolute left-1/2 top-1/2 w-auto h-auto min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2 rounded-3xl mx-auto object-cover" :src="getImageUrl(val.image)" alt="" />
                    </CardContent>
                    <CardAction class="py-2 transition duration-300 px-4 group-hover/category:bg-accent/20 text-center absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm w-7/8 rounded-full">
                      <span class="text-white text-shadow-sm/10 font-medium capitalize font-inter">{{ val.name.toLowerCase() }}</span>
                    </CardAction>
                  </Card>
                </router-link>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="!rounded-full -left-4 cursor-pointer" />
          <CarouselNext class="!rounded-full -right-4 cursor-pointer"  />
        </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Card, CardAction, CardContent} from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import {useCategoryStore} from "@/stores/category.store.ts";
import {onMounted} from "vue";
import {getImageUrl} from "@/utils/common.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import {routePaths} from "@/utils/path.utils.ts";

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>