<template>
  <div class="container mx-auto flex flex-col gap-6">
    <div class="flex justify-between items-start">
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl text-[#191919] font-heading font-normal">Top Rated Products</h3>
        <span class="font-neutral-600">lorem ipsum dolor sit amet</span>
      </div>

      <Button variant="ghost" size="default" class="!rounded-full">
        View More
      </Button>
    </div>

    <div class="grid grid-cols-6 gap-6">
      <CardProduct
          v-for="val in (loading ? placeholderProducts : productStore.products)"
          :key="`product_${val?.id}`"
        :title="val.title"
                   :id="val.id"
                   :loading="productStore.loading"
                   :slug="val.slug"
                   :price="val.price"
                   :image="val.images"
                   :category="val.category"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {Button} from '@/components/ui/button'
import CardProduct from "@/components/card/CardProduct.vue";
import {useProductStore} from "@/stores/products.ts";
import {onMounted, ref} from "vue";

const productStore = useProductStore()
const loading = ref(true);
const placeholderProducts = Array(12).fill({ id: Math.random() });

const loadData = async () => {
  loading.value = true;

  await productStore.fetchProducts(1, 12)

  loading.value = false;
};

onMounted(loadData)
</script>