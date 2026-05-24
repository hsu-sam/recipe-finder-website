<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Icon from "~/components/ui/Icon.vue";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label?: string;
  modelValue?: string | number | null;
  options?: Option[];
}

interface Emits {
  (e: "update:modelValue", value: string | number | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: "Select",
  modelValue: null,
  options: () => [
    { label: "0 minutes", value: 0 },
    { label: "5 minutes", value: 5 },
    { label: "10 minutes", value: 10 },
    { label: "15 minutes", value: 15 },
    { label: "20 minutes", value: 20 },
  ],
});

const emit = defineEmits<Emits>();

const componentRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const selectedValue = ref<string | number | null>(props.modelValue);

watch(selectedValue, (newValue) => {
  emit("update:modelValue", newValue);
  isOpen.value = false;
});

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  },
);

const handleClear = () => {
  selectedValue.value = null;
  isOpen.value = false;
};

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      componentRef.value &&
      !componentRef.value.contains(e.target as HTMLElement)
    ) {
      isOpen.value = false;
    }
  };
  document.addEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="componentRef" class="relative w-full">
    <!-- Chip Button -->
    <button
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between md:gap-100 px-200 py-125 border-2 border-neutral-300 rounded-10 bg-neutral-0 hover:bg-gray-50 transition-colors"
      :class="{ 'border-blue-500': isOpen }"
    >
      <span class="text-gray-900 font-medium">{{ label }}</span>
      <Icon
        icon="local:icon-chevron-down"
        class="w-4 h-4"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
      @click.stop
    >
      <div class="px-2 space-y-3">
        <!-- Options -->
        <label
          v-for="option in options"
          :key="option.value"
          class="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="selectedValue"
            class="w-4 h-4 font-bold"
          />
          <span
            class="text-neutral-900 text-preset-7 font-bold group-hover:text-gray-900"
          >
            {{ option.label }}
          </span>
        </label>

        <!-- Clear Button -->
        <button
          @click="handleClear"
          class="w-full text-left text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="radio"]:checked {
  accent-color: var(--color-neutral-900);
}
</style>
