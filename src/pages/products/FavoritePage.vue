<template>
    <SimpleTable
        caption="A list of your favorite products." :columns="columns" :rows="productStore.favorites" />
</template>
<script setup lang="ts">
import {h, type VNode} from 'vue'
import {useProductStore} from "@/stores/product.store.ts";
import SimpleTable from "@/components/table/SimpleTable.vue";
import {formatPrice, getImageUrl} from "@/utils/common.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import { RouterLink } from 'vue-router'
import {routePaths} from "@/utils/path.utils.ts";

const productStore = useProductStore()

type Column = {
  key: string
  label: string
  align?: 'right' | 'left' | 'center'
  render?: (row: Record<string, any>) => VNode
}

const columns: Column[] = [
  { key: 'image', label: 'Image',
    render: (row: any) =>
        h(
            RouterLink,
            {
              to: `/product/${row.slug}`,
            class: 'h-16 w-16 relative overflow-hidden',
            },
            {
              default: () =>
                  h(LazyImage, {
                    src: getImageUrl(row.images),
                    alt: row.title,
                    class: '!w-16 !h-16 object-cover overflow-hidden !rounded-xl',
                  }),
            }
        ),
  },
  { key: 'title', label: 'Name',
    render: (row: any) =>
        h(RouterLink, {
          to: routePaths.productDetail(row.slug),
          class: 'text-gray-800 hover:underline',
        }, { default: () => row.title }),
  },
  { key: 'price', label: 'Price',
    render: (row: any) =>  h('span', `${formatPrice(row.price)}`),
  },
  { key: 'actions', label: 'Action',
    align: 'right',
    render: (row: any) =>
        h('button', {
          class: 'text-red-500 hover:underline cursor-pointer',
          onClick: () => productStore.toggleFavorite(row),
        }, 'Remove'),
  }
]
</script>