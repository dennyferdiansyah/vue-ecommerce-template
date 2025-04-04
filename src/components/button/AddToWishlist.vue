<template>
  <Button
      :onclick="handleAddToFavorite"
      size="icon" :class="`!rounded-xl backdrop-blur-md ${productStore.isFavorite(data?.id) ? 'bg-pink-400' : variant === 'detail' ? 'bg-pink-500/40' : 'bg-pink-500/10'} hover:bg-pink-400 w-8 h-8`">
    <Icon icon="mdi:heart" />
  </Button>
</template>
<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/vue";
import {useProductStore} from "@/stores/products.ts";

const props = defineProps<{
  data: any,
  variant?: string,
}>()

const productStore = useProductStore()

const handleAddToFavorite = () => {
  productStore.toggleFavorite(props.data)
}
</script>