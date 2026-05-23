<script setup lang="ts">
import { Icon as IconifyIcon } from "@iconify/vue";

defineProps<{
  icon: string;
}>();
</script>

<template>
  <IconifyIcon
    :icon="icon"
    v-bind="$attrs"
    style="display: inline-flex; width: 1em; height: 1em; color: currentColor"
  />
</template>

<style scoped>
:deep(svg) {
  display: inline-block;
  vertical-align: -0.125em;
}
</style>
