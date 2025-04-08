<!-- components/common/SortButton.vue -->
<template>
  <DropdownMenu>
    <DropdownMenuTrigger
        class="bg-white hover:bg-accent/70 flex gap-2 shadow-sm !rounded-full !pl-2 !pr-5 py-1 w-auto h-7 items-center justify-center"
    >
      <Icon icon="iconamoon:sorting-center-bold" class="text-neutral-700 w-4 h-4" />
      <span class="font-normal text-sm">{{ selectedLabel }}</span>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem
          v-for="sort in sortlists"
          :key="sort.value"
          @click="selectSort(sort)"
          :class="{ 'bg-accent/10': selected === sort.value }"
      >
        {{ sort.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const emit = defineEmits(['change'])

const sortlists = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Price Low to High', value: 'price_low' },
  { label: 'Price High to Low', value: 'price_high' },
]

const selected = ref<string>('newest')

const selectedLabel = computed(() => {
  return sortlists.find((item) => item.value === selected.value)?.label || 'Sort'
})

function selectSort(sort: { label: string; value: string }) {
  selected.value = sort.value
  emit('change', sort.value)
}
</script>
