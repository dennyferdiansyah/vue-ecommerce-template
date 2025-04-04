<template>
  <div class="container relative overflow-hidden px-4 mx-auto py-6">
    <BreadCrumbs />

    <div class="grid grid-cols-12 relative py-6">
      <!-- Sidebar -->
      <div class="col-span-3">
        <div class="flex flex-col gap-6">
          <h3 class="text-lg font-semibold text-gray-700">Filter</h3>
        </div>
      </div>

      <!-- Main -->
      <div class="col-span-9">
        <div class="flex flex-col gap-6">
          <div v-if="loading" class="text-gray-500">Loading category...</div>
          <div v-else-if="category" class="text-xl font-bold text-gray-800">
            Category: {{ category.name }}
          </div>

          <!-- Product Grid -->
          <div class="grid grid-cols-4 gap-5">
            <CardProduct
                v-for="val in (loading ? placeholderProducts : productStore.products)"
                :key="val?.slug || val?.id"
                :loading="loading"
                :title="val?.title"
                :slug="val?.slug"
                :price="val?.price"
                :image="val?.images"
                :category="val?.category"
                :id="val?.id"
            />
          </div>

          <div v-if="!loading && productStore.products.length === 0" class="text-gray-500">
            No products found in this category.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BreadCrumbs from "@/components/navigation/BreadCrumbs.vue";
const CardProduct = defineAsyncComponent(() => import("@/components/card/CardProduct.vue"));

import { useCategoryStore } from "@/stores/categories.ts";
import { useProductStore } from "@/stores/products.ts";

const route = useRoute();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const category = ref<any>(null);
const loading = ref(true);

// Optional: show 4 placeholders
const placeholderProducts = Array(8).fill({ id: Math.random() });

const loadData = async () => {
  loading.value = true;

  const slug = route.params?.categorySlug as string;
  if (slug) {
    await categoryStore.fetchCategoryBySlug(slug);
    category.value = categoryStore.category;

    if (category.value?.id) {
      await productStore.fetchProductByCategory(category.value.id);
    }
  }

  loading.value = false;
};

onBeforeMount(loadData);
watch(() => route.params?.categorySlug, loadData);
</script>
