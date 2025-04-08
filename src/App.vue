<template>
  <component :is="layout">
    <Suspense>
      <template #default>
          <router-view />
      </template>
      <template #fallback>
        <div class="page-loader">
          <!-- Replace with your skeleton loader or animation -->
          Loading...
        </div>
      </template>
    </Suspense>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const route = useRoute();

const layouts = {
  default: DefaultLayout,
  auth: AuthLayout,
};
const layout = computed(() => layouts[route.meta.layout as keyof typeof layouts] || DefaultLayout);
</script>

<style scoped>
.page-loader {
  padding: 2rem;
  text-align: center;
}
</style>
