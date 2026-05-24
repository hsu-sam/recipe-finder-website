<script setup lang="ts">
import { Icon } from "@iconify/vue";

export interface InputProps {
  disabled?: boolean;
  placeholder?: string;
}
const props = defineProps<InputProps>();

const model = defineModel();
</script>
<template>
  <label
    :class="[
      'flex gap-4 rounded-10 has-disabled:opacity-40 text-preset-7 px-200 py-125 bg-neutral-0 border border-transparent focus-visible:border-secondary-gray items-center',
      $attrs.class,
    ]"
  >
    <Icon icon="lucide:search" size="40" />
    <input
      name="search"
      v-model="model"
      :placeholder
      :disabled
      type="search"
      class="flex-1 w-full focus-visible:outline-none placeholder:text-secondary-gray"
    />
  </label>
</template>
ss
