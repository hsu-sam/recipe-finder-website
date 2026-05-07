<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <header class="border-b border-neutral-200">
    <div class="flex items-center justify-between px-6 py-4 md:px-10">
      <!-- Logo -->
      <img src="/logo.svg" alt="Healthy Recipe Finder" class="h-10" />

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-8 lg:flex">
        <nav class="flex items-center gap-6">
          <a href="#" class="text-preset-8">Home</a>
          <a href="#" class="text-preset-8">Recipes</a>
          <a href="#" class="text-preset-8">About</a>
        </nav>

        <button class="rounded-full bg-black px-5 py-3 text-white">
          Browse recipes
        </button>
      </div>

      <!-- Mobile Hamburger -->
      <button class="lg:hidden" @click="isOpen = !isOpen">
        <img src="/assets/icons/icon-hamburger-menu.svg" alt="menu" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isOpen"
      class="flex flex-col gap-4 border-t border-neutral-200 px-6 py-6 md:hidden"
    >
      <a href="#" class="text-preset-8">Home</a>
      <a href="#" class="text-preset-8">Recipes</a>
      <a href="#" class="text-preset-8">About</a>

      <button class="rounded-full bg-black px-5 py-3 text-white">
        Browse recipes
      </button>
    </div>
  </header>
</template>
