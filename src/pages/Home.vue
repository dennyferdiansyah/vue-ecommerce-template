<template>
  <HeroSlider />
  <GridCategories />
  <SectionProducts />
</template>

<script setup>
import {defineAsyncComponent} from "vue";
const HeroSlider = defineAsyncComponent(() => import("@/components/hero/HeroSlider.vue"));
const GridCategories = defineAsyncComponent(() => import("@/components/section/GridCategories.vue"));
const SectionProducts = defineAsyncComponent(() => import("@/components/section/SectionProducts.vue"));
</script>
