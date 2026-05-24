<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isOpen = ref(false);
const route = useRoute();

watch(
  () => route.path,
  () => {
    isOpen.value = false;
  },
);

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Recipes", to: "/recipes" },
];
</script>

<template>
  <header class="sticky top-0 z-50 bg-neutral-100 border-b border-neutral-200">
    <div class="relative lg:px-800 lg:py-250 px-200 py-150">
      <div class="flex items-center justify-between h-16">
        <!-- Left: Logo -->
        <NuxtLink
          to="/"
          class="flex items-center justify-start shrink-0"
          aria-label="Go to homepage"
        >
          <img
            src="/logo.svg"
            alt="Healthy Recipe Finder"
            class="h-auto w-[200px] md:w-[260px]"
          />
        </NuxtLink>

        <!-- Center: Desktop Nav Links -->
        <nav
          class="hidden lg:flex items-center justify-center"
          aria-label="Main navigation"
        >
          <ul class="flex items-center gap-1" role="list">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="relative px-3 py-0.5 text-preset-7 font-semi-bold transition-colors duration-200 rounded-md"
              >
                {{ link.label }}
                <span
                  v-if="route.path === link.to"
                  class="absolute inset-x-3 -bottom-px h-0.5 rounded-4 bg-orange-500"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Right: CTA Button + Hamburger -->
        <div class="flex items-center justify-end gap-3 shrink-0">
          <!-- Desktop CTA -->
          <NuxtLink
            to="/recipes"
            class="hidden lg:inline-flex items-center rounded-10 bg-green-900 px-200 py-150 text-preset-8 font-bold text-neutral-0 transition-all duration-200 hover:bg-neutral-800 hover:shadow-md active:scale-95"
          >
            Browse recipes
          </NuxtLink>

          <!-- Mobile Hamburger -->
          <button
            class="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-green-900 bg-green-300 transition-colors cursor-pointer"
            :aria-expanded="isOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            @click="isOpen = !isOpen"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="#163a2a"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <template v-if="!isOpen">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </template>
              <template v-else>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </template>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu: absolute so it floats over content -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isOpen"
          id="mobile-menu"
          class="lg:hidden absolute top-full left-0 right-0 bg-neutral-0 backdrop-blur-md border-b border-neutral-100 shadow-lg w-85.75 md:min-w-176 mx-auto rounded-8"
        >
          <nav class="px-100 py-100" aria-label="Mobile navigation">
            <ul class="flex flex-col gap-1" role="list">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="flex items-center py-150 text-preset-100 font-bold text-green-950 transition-colors hover:bg-neutral-50 hover:text-black"
                  active-class="bg-neutral-50 text-black"
                  exact-active-class="bg-neutral-50 text-black font-semibold"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
            <div class="mt-150">
              <NuxtLink
                to="/recipes"
                class="flex w-full items-center justify-center rounded-10 bg-green-900 px-5 py-3 text-preset-8 font-bold text-neutral-0 transition-all hover:bg-neutral-800 active:scale-95"
              >
                Browse recipes
              </NuxtLink>
            </div>
          </nav>
        </div>
      </Transition>
    </div>
  </header>

  <!-- Backdrop overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-4 lg:hidden"
      aria-hidden="true"
      @click="isOpen = false"
    />
  </Transition>
</template>
