<template>
  <span class="text-2xl font-medium">{{formatPrice(props?.price || 0)}}</span>
</template>

<script setup lang="ts">
import {formatPrice} from "@/utils/common.ts";

const props = defineProps<{
  price: number
}>()
</script>