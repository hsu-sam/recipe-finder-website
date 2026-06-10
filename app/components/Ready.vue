<script setup>
import patternKnife from "../assets/illustrations/pattern-knife.svg";
import patternFork from "../assets/illustrations/pattern-fork.svg";
import { Motion } from "motion-v";

const { inViewOptions, fadeUp, staggerContainer, delayedFadeUp } =
  usePageAnimations();
</script>

<template>
  <footer>
    <Motion
      class="relative bg-neutral-200 py-1200 rounded-16 lg:max-w-298 lg:mx-auto overflow-hidden"
      :initial="'hidden'"
      :whileInView="'visible'"
      :variants="staggerContainer"
      :inViewOptions="inViewOptions"
    >
      <Motion
        class="hidden md:block absolute md:-bottom-15 md:-left-20 lg:top-4 lg:-left-15"
        :animate="{ y: [0, -18, 0] }"
        :transition="{
          duration: 4,
          repeat: Infinity,
          easing: 'ease-in-out',
        }"
      >
        <img :src="patternFork" alt="" class="w-44.75 h-auto md:w-50 lg:w-75" />
      </Motion>

      <Motion
        class="flex flex-col gap-400 items-center z-10"
        :variants="staggerContainer"
      >
        <Motion class="flex flex-col gap-400 items-center" :variants="fadeUp">
          <h2 class="text-preset-2 font-bold text-center">
            Ready to cook smarter?
          </h2>
          <p class="text-preset-6 text-neutral-600 text-center">
            Hit the button, pick a recipe, and get dinner on the table—fast.
          </p>
        </Motion>
        <Motion :variants="delayedFadeUp(0.15)">
          <NuxtLink to="/recipes" class="lg:self-center">
            <button
              class="rounded-10 bg-green-900 px-200 py-150 text-preset-8 font-bold text-neutral-0 transition-all duration-200 hover:bg-neutral-800 hover:shadow-md active:scale-95 w-49.5 lg:mx-auto text-center"
            >
              Browse recipes
            </button>
          </NuxtLink>
        </Motion>
      </Motion>

      <Motion
        class="hidden md:block absolute md:-top-8 md:right-0 lg:bottom-4 -right-15"
        :animate="{ y: [0, -18, 0] }"
        :transition="{
          duration: 4,
          repeat: Infinity,
          easing: 'ease-in-out',
          delay: 1,
        }"
      >
        <img
          :src="patternKnife"
          alt=""
          class="w-44.75 h-auto md:w-45 lg:w-75"
        />
      </Motion>
    </Motion>
  </footer>
</template>
