<template>
  <div class="font-display antialiased">
    <Navbar />
    <main class="bg-gray-100 min-h-screen font-heading pb-12">
      <div class="container mx-auto py-4 px-4">
        <BreadCrumbs  v-if="showBreadcrumbs"/>
        <slot></slot>
      </div>
    </main>
    <SectionFooter />
    <CartDrawer />
  </div>
</template>

<style scoped>
.header {
  background: #42b983;
  color: white;
  padding: 1rem;
  text-align: center;
}
nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}
</style>
<script setup lang="ts">
import Navbar from "@/components/header/Navbar.vue";
import SectionFooter from "@/components/section/SectionFooter.vue";
import {computed, onMounted} from "vue";
import CartDrawer from "@/components/drawer/CartDrawer.vue";
import BreadCrumbs from "@/components/navigation/BreadCrumbs.vue";
import {useRoute} from "vue-router";

const route = useRoute()

const showBreadcrumbs = computed(() => {
  return route.meta?.showBreadcrumbs !== false
})
onMounted(() => {
  window.addEventListener('cart:add', (e: any) => {
    const product = e.detail.product
    const toaster = document.querySelector('x-sonner')
    if (!toaster) return

    const div = document.createElement('div')
    div.className = 'text-sm text-gray-700 font-medium'
    div.innerText = `Added "${product?.name || product?.title || 'Product'}" to cart`
    toaster.appendChild(div)

    setTimeout(() => div.remove(), 3000)
  })
})
</script>