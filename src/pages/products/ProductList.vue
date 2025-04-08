<template>
  <div class="grid grid-cols-12 gap-6 relative py-6">
    <!-- Sidebar -->
    <div class="col-span-3">
      <Suspense>
        <template #default>
          <KeepAlive>
            <CategoryWidget/>
          </KeepAlive>
        </template>
        <template #fallback>
          <Skeleton class="h-40 w-full"/>
        </template>
      </Suspense>
    </div>

    <!-- Main -->
    <div class="col-span-9">
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center gap-5">
          <div class="flex gap-2 relative overflow-hidden items-center">
            <LazyImage
                v-if="category"
                :src="getImageUrl((category || previousCategory)?.image)"
                class="!w-10 !h-10 rounded-xl overflow-hidden flex"
            />
            <span class="text-xl font-medium text-gray-800">
                {{ (category || previousCategory)?.name || search }}
              </span>
          </div>
          <div class="flex flex-row gap-2 items-center font-normal">
            <SortListButton @change="handleSortChange"/>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-4 gap-5">
          <CardProduct
              v-for="val in sortedProducts"
              :key="val?.slug || val?.id"
              :loading="loading"
              :title="val?.title"
              :slug="val?.slug"
              :price="val?.price"
              :images="val?.images"
              :category="val?.category"
              :id="val?.id"
          />
        </div>

        <div
            v-if="!loading && productStore.products.length === 0"
            class="text-gray-500 flex justify-center"
        >
          No products found in this category.
        </div>

        <div
            class="flex justify-between items-center gap-4 mt-6">
          <Button
              class="px-4 py-2 border rounded disabled:opacity-50"
              :disabled="currentPage <= 1"
              @click="goToPage(currentPage - 1)"
          >
            Previous
          </Button>

          <span class="font-medium">Page {{ currentPage }}</span>

          <Button
              class="px-4 py-2 border rounded"
              :disabled="productStore.products.length < productStore.pageSize"
              @click="goToPage(currentPage + 1)"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent, onBeforeMount, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCategoryStore} from "@/stores/category.store.ts";
import {useProductStore} from "@/stores/product.store.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import {Skeleton} from "@/components/ui/skeleton";
import SortListButton from "@/components/button/SortListButton.vue";
import {getImageUrl} from "@/utils/common.ts";
import CategoryWidget from "@/components/widgets/CategoryWidget.vue";
import {Button} from "@/components/ui/button";
const CardProduct = defineAsyncComponent(() => import("@/components/card/CardProduct.vue"));

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const category = ref<any>(null);
const search = ref<string>('');
const previousCategory = ref<any>(null);
const loading = ref(true);
const sortKey = ref("newest");

const placeholderProducts = Array(8).fill({id: Math.random()});

const goToPage = (page: number) => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: page.toString(),
    },
  });
};

const handleSortChange = (value: string) => {
  sortKey.value = value;
};

const sortedProducts = computed(() => {
  const products = loading.value ? placeholderProducts : [...productStore.products];

  switch (sortKey.value) {
    case "price_low":
      return products.sort((a, b) => a.price - b.price);
    case "price_high":
      return products.sort((a, b) => b.price - a.price);
    case "oldest":
      return products.sort((a, b) => a.id - b.id);
    case "newest":
    default:
      return products.sort((a, b) => b.id - a.id);
  }
});

const currentPage = computed(() => {
  const page = Number(route.query.page);
  return isNaN(page) || page < 1 ? 1 : page;
});

const loadData = async () => {
  const categorySlug = route.params?.categorySlug as string | undefined;
  const searchQuery = route.params?.query as string | undefined;
  const sortParam = route.query.sort as string;

  loading.value = true;
  if (sortParam) sortKey.value = sortParam;

  const page = currentPage.value;

  if (searchQuery) {
    const categoryId = route.query.categoryId ? Number(route.query.categoryId) : undefined;
    const filters: Record<string, any> = {};

    if (categoryId && !isNaN(categoryId) && categoryId !== 0) {
      filters.categoryId = categoryId;
    }
    search.value = searchQuery;
    category.value = null;
    previousCategory.value = null;

    await productStore.fetchProducts({title: searchQuery, page, ...filters});
  } else if (categorySlug) {
    if (category.value) {
      previousCategory.value = {...category.value};
    }

    await categoryStore.fetchCategoryBySlug(categorySlug);
    category.value = categoryStore.category;

    if (category.value?.id) {
      await productStore.fetchProductByCategory(category.value.id, page);
    } else {
      productStore.products = [];
    }
  }

  loading.value = false;
};

onBeforeMount(loadData);
watch(() => route.params, loadData, {deep: true});
watch(() => route.query.page, loadData);

</script>
