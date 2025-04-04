<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import CtaButton from "@/components/button/CtaButton.vue";

const isFocus = defineModel({ default: false})

const handleFocus = () => {
  isFocus.value = !isFocus.value
}
</script>

<template>
  <header class="sticky z-20 text-white top-0 bg-[#191919] w-full shadow-lg">
    <div class="relative h-14 flex gap-3 items-center justify-between container mx-auto pt-2">
      <router-link to="/" class="relative flex shrink-0 overflow-hidden w-auto h-full p-3 items-center">
        <img class="h-full w-auto invert grayscale" src="/amazon-logo.png" alt="Amazon Logo" />
      </router-link>
      <div class="flex relative container mx-auto items-center justify-between">
        <slot name="navigation"></slot>
      </div>
      <div class="relative flex gap-4 items-center">
        <slot name="account"></slot>
      </div>
    </div>
    <div class="container mx-auto h-[70px] shrink-0 relative overflow-hidden flex gap-1 items-center justify-between pb-4 pt-2">
      <div
          @click="handleFocus"
          :class="`w-3/4 ml-1 shrink-0   transition-all duration-200 ${isFocus ? 'outline-2 outline-white' : 'hover:outline-1 hover:outline-gray-400'} relative flex flex-row overflow-hidden items-center bg-neutral-700 h-full rounded-full`">
        <div class="flex items-center content-center p-3 h-full justify-between w-1/8">
          <Button variant="secondary" class="block w-full text-sm text-white">All Categories</Button>
          <Separator orientation="vertical" class="bg-neutral-500" label="Or" />
        </div>
        <Input class="h-full text-white w-7/8 py-2 px-2 outline-0" placeholder="Search your products"/>
      </div>
      <CtaButton />

    </div>
  </header>
</template>