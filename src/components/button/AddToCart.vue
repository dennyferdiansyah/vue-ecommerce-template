<template>
  <TooltipProvider>
    <Tooltip v-if="size === 'icon'">
      <TooltipTrigger as-child>
        <Button
            size="icon"
            variant="ghost"
            :disabled="!product || loading"
            class="w-8 h-8 bg-accent/30 hover:bg-accent/50 !rounded-lg"
            @click="onAddToCart"
        >
          <Icon icon="mdi:cart" class="text-neutral-700" />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="end">Add to Cart</TooltipContent>
    </Tooltip>

    <Button
        v-else
        :disabled="!product || loading"
        class="bg-accent/50 hover:bg-accent/80 px-8 !rounded-xl text-gray-700"
        @click="onAddToCart"
    >
      <template v-if="!loading">Add to Cart</template>
      <template v-else>
        <Icon icon="eos-icons:bubble-loading" class="animate-spin text-xl" />
      </template>
    </Button>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
import { toast } from 'vue-sonner'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useCartStore } from "@/stores/cart.store";
import {useDrawerStore} from "@/stores/cart-drawer.store.ts";

const props = defineProps<{
  data: any;
  size?: "icon" | "default";
  quantity?: number;
}>();

const loading = ref(false);
const product = computed(() => props.data);
const cartStore = useCartStore();
const drawerStore = useDrawerStore()


const onAddToCart = async (event: MouseEvent) => {
  if (!product.value || loading.value) return;

  loading.value = true;
  toast(`Successfully added to cart`, {
    description: `${product.value.title} is added to cart`,
  })
  const source = event.currentTarget as HTMLElement;
  const target = document.querySelector(".cart-button") as HTMLElement | null;

  if (target) animateFlyToCart(source, target);

  cartStore.addToCart({
    ...product.value,
    quantity: props.quantity || 1,
  });

  drawerStore.openCartDrawer()

  // Emit a custom event to trigger the toast
  window.dispatchEvent(
      new CustomEvent("cart:add", {
        detail: { product: product.value },
      })
  );

  loading.value = false;
};

const animateFlyToCart = (fromEl: HTMLElement, toEl: HTMLElement) => {
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  const clone = fromEl.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    position: "fixed",
    left: `${fromRect.left}px`,
    top: `${fromRect.top}px`,
    width: `${fromRect.width}px`,
    height: `${fromRect.height}px`,
    zIndex: "9999",
    transition: "all 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
    pointerEvents: "none",
    opacity: "0.8",
  });

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    Object.assign(clone.style, {
      left: `${toRect.left}px`,
      top: `${toRect.top}px`,
      transform: "scale(0.3)",
      opacity: "0.5",
    });
  });

  setTimeout(() => {
    clone.remove();
  }, 800);
};
</script>
