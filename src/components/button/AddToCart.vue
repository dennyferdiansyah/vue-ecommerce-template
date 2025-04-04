<template>
  <Button v-if="variant === 'icon'" size="icon"
          :onclick="handleAddToCart"
          :disabled="!props.data"
          class="w-8 h-8 bg-accent/30 hover:bg-accent/50 !rounded-lg">
    <Icon icon="mdi:cart" class="text-neutral-700" />
  </Button>
  <Button v-else
          class="bg-accent/50 hover:bg-accent/80 px-8 !rounded-xl text-gray-700"
          :disabled="!props.data"
          :onclick="handleAddToCart">Add to Cart</Button>
</template>
<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useCartStore} from "@/stores/cartStore.ts";
import {Icon} from "@iconify/vue";
const props = defineProps<{
  data: any,
  variant?: string,
  quantity?: number
}>()
const cartStore = useCartStore()

const handleAddToCart = async (event: MouseEvent) => {
  if (props.data) {
    const target = event.currentTarget as HTMLElement
    const cartIcon = document.querySelector('.cart-button') as HTMLElement

    if (cartIcon) animateFlyToCart(target, cartIcon)

    cartStore.addToCart({
      ...props.data,
      quantity: props.quantity || 1
    })
  }
}

const animateFlyToCart = (fromEl: HTMLElement, toEl: HTMLElement) => {
  const fromRect = fromEl.getBoundingClientRect()
  const toRect = toEl.getBoundingClientRect()

  const flyIcon = fromEl.cloneNode(true) as HTMLElement
  flyIcon.style.position = 'fixed'
  flyIcon.style.left = `${fromRect.left}px`
  flyIcon.style.top = `${fromRect.top}px`
  flyIcon.style.width = `${fromRect.width}px`
  flyIcon.style.height = `${fromRect.height}px`
  flyIcon.style.zIndex = '9999'
  flyIcon.style.transition = 'all 0.7s cubic-bezier(0.65, 0, 0.35, 1)'
  flyIcon.style.pointerEvents = 'none'
  flyIcon.classList.add('opacity-80')

  document.body.appendChild(flyIcon)

  requestAnimationFrame(() => {
    flyIcon.style.left = `${toRect.left}px`
    flyIcon.style.top = `${toRect.top}px`
    flyIcon.style.transform = 'scale(0.3)'
    flyIcon.style.opacity = '0.5'
  })

  setTimeout(() => {
    document.body.removeChild(flyIcon)
  }, 800)
}
</script>