<template>
  <div
      class="flex gap-2 items-center rounded-2xl bg-gray-200 overflow-hidden"
      :class="sizeClasses.wrapper"
  >
    <Button
        @click="decreaseQuantity"
        :class="[baseBtnClass, sizeClasses.button]"
    >
      <Icon icon="mdi:minus" :class="sizeClasses.icon" />
    </Button>
    <Input
        readonly
        type="text"
        :value="quantity"
        :default-value="quantity"
        class="text-center border-0 bg-transparent"
        :class="sizeClasses.input"
    />
    <Button
        @click="increaseQuantity"
        :class="[baseBtnClass, sizeClasses.button]"
    >
      <Icon icon="mdi:plus" :class="sizeClasses.icon" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import Input from "@/components/ui/input/Input.vue"; // or your Input path

const props = defineProps<{
  modelValue?: number;
  size?: "small" | "medium" | "large";
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const quantity = ref(props.modelValue ?? 1);

watch(
    () => props.modelValue,
    (val) => {
      quantity.value = val ?? 1;
    }
);

const increaseQuantity = () => {
  if (quantity.value < 99) {
    quantity.value++;
    emit("update:modelValue", quantity.value);
    emit("change", quantity.value);
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    emit("update:modelValue", quantity.value);
    emit("change", quantity.value);
  }
};

const baseBtnClass = "!rounded-full !p-0 bg-white hover:bg-gray-300";

const sizeClasses = computed(() => {
  const sizes = {
    small: {
      wrapper: "px-2 py-0",
      button: "!h-5 !w-5 !py-0",
      icon: "!h-3 !w-3 text-gray-500",
      input: "w-8 h-8 text-sm text-gray-800",
    },
    medium: {
      wrapper: "px-2 py-0",
      button: "!h-6 !w-6 !py-0",
      icon: "!h-3 !w-3 text-gray-500",
      input: "w-8 h-9 text-sm text-gray-800 outline-0 focus:border-0",
    },
    large: {
      wrapper: "px-3 py-3",
      button: "!h-8 !w-8",
      icon: "!h-5 !w-5",
      input: "w-12 text-lg",
    },
  };
  return sizes[props.size || "medium"];
});
</script>
