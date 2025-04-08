<script setup lang="ts">
import CtaButton from "@/components/button/CtaButton.vue";
import SearchInput from "@/components/input/SearchInput.vue";
import {routePaths} from "@/utils/path.utils.ts";

</script>

<template>
  <header class="sticky z-20 text-white top-0 bg-[#191919] w-full shadow-lg">
    <div class="relative h-14 flex gap-3 items-center justify-between container mx-auto pt-2">
      <router-link :to="routePaths.home()" class="relative flex shrink-0 overflow-hidden w-auto h-full p-1 items-center">
        <img class="h-full w-auto" src="/logo.png" alt="Amazon Logo" />
      </router-link>
      <div class="flex relative container mx-auto items-center justify-between">
        <slot name="navigation"></slot>
      </div>
      <div class="relative flex gap-4 items-center">
        <slot name="account"></slot>
      </div>
    </div>
    <div class="container mx-auto h-[70px] shrink-0 relative overflow-hidden flex gap-1 items-center justify-between pb-4 pt-2">
      <SearchInput />
      <CtaButton />
    </div>
  </header>
</template>