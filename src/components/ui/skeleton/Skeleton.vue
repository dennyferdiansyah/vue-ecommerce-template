<script setup lang="ts">
import type {HTMLAttributes, VNodeRef} from 'vue'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  class?: HTMLAttributes['class']
  ref?: VNodeRef | undefined
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div
    data-slot="skeleton"
    :class="cn('animate-pulse rounded-md bg-accent/10', props.class)"
  />
</template>
