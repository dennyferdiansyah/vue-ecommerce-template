<template>
  <div class="container mx-auto px-4">
    <SimpleTable
        caption="A list of your favorite products." :columns="columns" :rows="productStore.favorites" />
  </div>
</template>
<script setup lang="ts">
import { h } from 'vue'
import {useProductStore} from "@/stores/products.ts";
import SimpleTable from "@/components/table/SimpleTable.vue";
import {formatPrice, getImageUrl} from "@/utils/common.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import { RouterLink } from 'vue-router'

const productStore = useProductStore()


const columns = [
  { key: 'image', label: 'Image',
    render: (row: any) =>
        h(
            RouterLink,
            { to: `/product/${row.slug}` },
            {
              default: () =>
                  h(LazyImage, {
                    src: getImageUrl(row.image),
                    alt: row.title,
                    class: '!w-16 !h-16 object-cover overflow-hidden !rounded-xl',
                  }),
            }
        ),
  },
  { key: 'title', label: 'Name',
    render: (row: any) =>
        h(RouterLink, {
          to: `/product/${row.slug}`,
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