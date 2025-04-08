<template>
  <div class="flex flex-row items-center gap-10 mt-3">
    <!-- Swatch Title -->
    <div class="w-16">
      <span class="text-sm font-medium text-gray-600">{{ title }}</span>
    </div>

    <!-- Swatch Options -->
    <div class="flex gap-2 flex-wrap">
      <Button
          v-for="(val, i) in data"
          :key="`swatch_${title.toLowerCase()}_${i}`"
          :class="[
          '!w-10 !h-10 border-2 text-sm cursor-pointer !rounded-xl overflow-hidden flex items-center justify-center',
          val.color ? '!bg-transparent !p-0' : 'bg-white hover:bg-gray-100',
          selectedSwatch?.value === val?.value ? ' !border-2 !border-accent text-accent' : 'text-gray-500'
        ]"
          @click="selectSwatch(val)"
      >
        <!-- Show color or label -->
        <span v-if="!val.color">{{ val.label }}</span>
        <div  v-if="val.color"
              class=" h-full w-full p-1.5 relative overflow-hidden flex items-center justify-center">
        <span
            class="w-full h-full rounded-full flex items-center justify-center"
              :style="val.color ? { backgroundColor: val.color } : {}">
          <Icon v-if="selectedSwatch?.value === val?.value" icon="mdi:check" class="text-white !h-4 !w-4 text-shadow-lg" />
        </span>
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { swatchesType } from "@/types/swatches.types.ts";
import { Button } from "@/components/ui/button";
import {Icon} from "@iconify/vue";

// Props
const props = defineProps<{
  data: swatchesType[];
  title: string;
}>();

const emit = defineEmits(["update:selected"]);

const selectedSwatch = ref<swatchesType | null>(null);

const selectSwatch = (val: swatchesType) => {
  console.log(val, 'swatches change');
  selectedSwatch.value = val;
  emit("update:selected", {
    [props.title.toLowerCase()]: val,
  });
};
</script>
