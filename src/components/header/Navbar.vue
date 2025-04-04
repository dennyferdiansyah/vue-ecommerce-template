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
import {useCartStore} from "@/stores/cartStore.ts";
import { ref } from 'vue'

const cartStore = useCartStore()
const menuStyle = cva('!bg-transparent data-[state=open]:text-white group/navigation:text-white text-white focus:text-white hover:text-gray-300 active:text-gray-300')

const components: { title: string, href: string, description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/components/alert-dialog',
    description:
        'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/components/hover-card',
    description:
        'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/components/progress',
    description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/components/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/components/tabs',
    description:
        'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/components/tooltip',
    description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]


const cartIconRef = ref<HTMLElement | null>(null)

defineExpose({ cartIconRef })

</script>

<template>
  <DefaultHeader>
    <template v-slot:account>
      <div class="flex items-center justify-center gap-8 mr-3">
        <router-link to="/favorites" class="flex gap-1 items-center hover:text-accent transition duration-200">
          <Icon class="size-5 -ml-1 text-accent" icon="line-md:star-pulsating-loop"/>
          <span class="text-[14px] ">Favorites</span>
        </router-link>
        <router-link to="/about" class="flex gap-1 whitespace-nowrap items-center hover:text-accent transition duration-200">
          <span class="text-[14px] ">About Us</span>
        </router-link>
        <router-link to="/contact" class="flex gap-1 whitespace-nowrap items-center hover:text-accent transition duration-200">
          <span class="text-[14px] ">Contact</span>
        </router-link>
      </div>

      <Button
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
                <li class="row-span-3">
                  <NavigationMenuLink as-child>
                    <a
                        class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                    >
                      <img src="https://www.reka-ui.com/logo.svg" class="h-6 w-6">
                      <div class="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p class="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>

                <li>
                  <NavigationMenuLink as-child>
                    <a
                        href="/docs/introduction"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">Introduction</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                        href="/docs/installation"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">Installation</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        How to install dependencies and structure your app.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                        href="/docs/typography"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">Typography</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Styles for headings, paragraphs, lists...etc
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger :class="menuStyle()">Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <li v-for="component in components" :key="component.title">
                  <NavigationMenuLink as-child>
                    <a
                        :href="component.href"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {{ component.description }}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs/introduction" :class="menuStyle()">
              Deals
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </template>
  </DefaultHeader>
</template>