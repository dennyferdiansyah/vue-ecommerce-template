<template>
  <div
      @click="handleFocus"
      @blur.capture="handleBlur"
      :class="[
      'w-3/4 ml-1 shrink-0 transition-all duration-200 relative flex flex-row overflow-hidden items-center bg-neutral-700 h-full rounded-full',
      isFocus ? 'outline-2 outline-white' : 'hover:outline-1 hover:outline-gray-400'
    ]"
  >
    <!-- Category Dropdown -->
    <div class="flex items-center p-3 h-full w-1/8 justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="block !bg-transparent !p-0 w-full text-sm text-white truncate">
            {{ selectedCategory.name }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56 left-0">
          <DropdownMenuItem
              v-for="category in categoryOptions"
              :key="category.id"
              @click="onCategoryChange(category)"
          >
            {{ category.name }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" class="bg-neutral-500" />
    </div>

    <!-- Search Input -->
    <input
        v-model="search"
        @keydown.enter="handleSearch"
        class="h-full text-white w-7/8 py-2 px-2 outline-none bg-transparent"
        placeholder="Search your products"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCategories } from '@/composable/useCategories.ts'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const isFocus = defineModel({ default: false })
const search = ref('')
const router = useRouter()
const { categories } = useCategories()

const ALL_CATEGORIES = { id: 0, name: 'All Categories', slug: 'all-categories' }
const selectedCategory = ref(ALL_CATEGORIES)

const categoryOptions = computed(() => [ALL_CATEGORIES, ...categories.value])

const handleFocus = () => {
  isFocus.value = true
}

const handleBlur = () => {
  isFocus.value = false
}

const handleSearch = () => {
  const trimmedQuery = search.value.trim()
  if (!trimmedQuery) return

  const query = encodeURIComponent(trimmedQuery)

  const queryParams = new URLSearchParams()
  if (selectedCategory.value.id !== 0) {
    queryParams.set('categoryId', selectedCategory.value.id.toString())
  }

  const queryString = queryParams.toString()
  router.push(`/search/${query}${queryString ? '?' + queryString : ''}`)
}


const onCategoryChange = (category: any) => {
  selectedCategory.value = category
}
</script>
