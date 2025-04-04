<template>
  <div class="font-display antialiased">
    <Navbar />
    <main class="bg-gray-100 min-h-screen font-heading pb-12">
      <slot></slot>
    </main>
    <SectionFooter />
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
</script>