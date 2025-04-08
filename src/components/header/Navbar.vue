<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import DefaultHeader from "@/components/header/DefaultHeader.vue";
import {Icon} from "@iconify/vue";
import { cva } from 'class-variance-authority'
import {Button} from '@/components/ui/button'
import AccountNavigation from "@/components/navigation/AccountNavigation.vue";
import {useCartStore} from "@/stores/cart.store.ts";
import { ref } from 'vue'
import {useRouter} from "vue-router";
import {routePaths} from "@/utils/path.utils.ts";
import {useCategories} from "@/composable/useCategories.ts";
import LazyImage from "@/components/image/LazyImage.vue";
import {getImageUrl} from "@/utils/common.ts";

const cartStore = useCartStore()
const menuStyle = cva('!bg-transparent data-[state=open]:text-white group/navigation:text-white text-white focus:text-white hover:text-gray-300 active:text-gray-300')
const router = useRouter()
const {categories} = useCategories()
const brands: { title: string, image: string, description: string }[] = [
  {
    title: 'Adidas',
    image: '/assets/images/brands/adidas.png',
    description: 'A global leader in sportswear, Adidas is known for innovative athletic apparel, footwear, and accessories that combine performance with style.',
  },
  {
    title: 'Gucci',
    image: '/assets/images/brands/gucci.png',
    description: 'An iconic Italian luxury brand, Gucci blends modern fashion with rich heritage, offering high-end clothing, bags, and accessories.',
  },
  {
    title: 'H&M',
    image: '/assets/images/brands/h&m.png',
    description: 'H&M delivers affordable and trendy fashion for everyone, offering a wide range of clothing, accessories, and collaborations with top designers.',
  },
  {
    title: 'Louis Vuitton',
    image: '/assets/images/brands/lv.png',
    description: 'Renowned for its luxury leather goods and timeless elegance, Louis Vuitton stands at the forefront of high fashion and craftsmanship.',
  },
  {
    title: 'Nike',
    image: '/assets/images/brands/nike.png',
    description: 'Nike leads the world in athletic innovation, empowering athletes with cutting-edge sportswear, sneakers, and equipment.',
  },
  {
    title: 'Zara',
    image: '/assets/images/brands/zara.png',
    description: 'Zara is a fast fashion powerhouse offering stylish, high-quality clothing and accessories inspired by the latest global trends.',
  },
]



const cartIconRef = ref<HTMLElement | null>(null)

defineExpose({ cartIconRef })

</script>

<template>
  <DefaultHeader>
    <template v-slot:account>
      <div class="flex items-center justify-center gap-8 mr-3">
        <router-link to="#" class="flex gap-1 whitespace-nowrap items-center hover:text-accent transition duration-200">
          <span class="text-[14px] ">About Us</span>
        </router-link>
        <router-link to="#" class="flex gap-1 whitespace-nowrap items-center hover:text-accent transition duration-200">
          <span class="text-[14px] ">Contact</span>
        </router-link>
      </div>

      <Button
          :onclick="() => router.push({ path: routePaths.favorites() })"
          size="lg"
          variant="default"
          class="flex cart-button group/favorites relative w-8 h-8 !p-0 aspect-square !rounded-full font-display bg-transparent border-2 border-accent-light hover:bg-accent-light/80 items-center cursor-pointer">
        <Icon class="size-5 text-accent-light p-0.5 group-hover/favorites:text-white" icon="mdi:heart"/>
      </Button>

      <Button
          :onclick="() => router.push({ path: routePaths.cart() })"
          ref="cartIconRef"
          size="lg"
          variant="default"
              class="flex cart-button relative w-8 h-8 !p-0 aspect-square !rounded-full font-display bg-accent-light text-accent hover:bg-accent-light/80 items-center cursor-pointer">
        <Icon class="size-5 text-neutral-700" icon="mdi:cart"/>
        <span v-if="cartStore.totalQuantity > 0" class="absolute bg-neutral-700 rounded-full border-2 border-neutral-800 h-5 min-w-[20px] px-1 -top-1 -right-2 flex items-center justify-center text-[11px] text-white">
          {{cartStore.totalQuantity > 99 ? '99+' : cartStore.totalQuantity}}
        </span>
      </Button>

      <AccountNavigation />
    </template>
    <template v-slot:navigation>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem :class="menuStyle()">
            <NavigationMenuTrigger :class="menuStyle()">Brands</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
                <li
                    v-for="(brand) in brands"
                    class="row-span-3">
                  <NavigationMenuLink as-child>
                    <router-link
                        class="flex items-center flex-row gap-2"
                        to="#">
                      <div class="relative p-2 shrink-0 bg-gray-200 rounded-md h-10 w-10 flex overflow-hidden">
                        <LazyImage class="h-full w-full" :src="getImageUrl(brand.image)" />
                      </div>
                      <span class="text-sm block overflow-hidden whitespace-nowrap text-ellipsis leading-none">{{ brand.title }}</span>
                    </router-link>
                  </NavigationMenuLink>
                </li>

              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger :class="menuStyle()">Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <li v-for="component in categories" :key="component.name">
                  <NavigationMenuLink as-child>
                    <router-link
                        class="flex items-center flex-row gap-2"
                        :to="routePaths.category(component.slug)">
                      <div class="relative shrink-0 bg-gray-200 rounded-md h-10 w-10 flex overflow-hidden">
                        <LazyImage class="h-full w-full" :src="getImageUrl(component.image)" />
                      </div>
                      <span class="text-sm block overflow-hidden whitespace-nowrap text-ellipsis leading-none">{{ component.name }}</span>
                    </router-link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/deals" :class="menuStyle()">
              Deals
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </template>
  </DefaultHeader>
</template>