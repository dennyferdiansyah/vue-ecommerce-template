<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-gray-700">Categories </h3>
    <div class="relative overflow-hidden flex flex-col gap-1">
      <Card
          v-for="(ct) in categoryStore.categories"
          class="flex flex-row rounded-full transition duration-200 hover:bg-accent/40 !p-2  items-center"
          :class="{ 'bg-accent/30': route.params.categorySlug === ct.slug }">
        <router-link
            class="flex items-center gap-2 w-full h-full"
            :to="routePaths.category(ct.slug)">
          <div class="relative bg-gray-200 rounded-xl overflow-hidden flex items-center w-6 h-6">
            <KeepAlive>
              <LazyImage :src="getImageUrl(ct.image)" />
            </KeepAlive>
          </div>
          <h3 class="text-sm font-medium text-neutral-800">{{ ct.name }}</h3>
        </router-link>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import {getImageUrl} from "@/utils/common.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import {Card} from "@/components/ui/card";
import {useCategoryStore} from "@/stores/category.store.ts";
import {useRoute} from "vue-router";
import {routePaths} from "@/utils/path.utils.ts";

const categoryStore = useCategoryStore()
const route = useRoute()
</script>