<template>
  <div ref="imgRef" :class="className || 'w-full h-full object-cover'">
    <img
        v-if="visible"
        :src="src"
        :alt="alt"
        loading="lazy"
        @load="onLoad"
        :class="[
        className || 'w-full h-full object-cover',
        'transition-opacity duration-500 ease-in-out',
        loaded ? 'opacity-100' : 'opacity-0'
      ]"
    />
    <Skeleton
        v-if="!loaded && !visible"
        :class="'absolute inset-0 h-full w-full bg-gray-100 rounded animate-pulse'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'

defineProps<{
  src: string
  alt?: string
  className?: string
}>()

const visible = ref(false)
const loaded = ref(false)
const imgRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const onLoad = () => {
  loaded.value = true
}

onMounted(() => {
  if (!imgRef.value) return

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer?.disconnect()
    }
  }, { threshold: 0.1 })

  observer.observe(imgRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
