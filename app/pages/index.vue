<script setup>
import { ref } from "vue";
import PatternSquiggle1 from "~/assets/illustrations/PatternSquiggle1.vue";
import imgLarge from "../assets/images/image-home-hero-large.webp";
import imgSmall from "../assets/images/image-home-hero-small.webp";

const features = ref([
  {
    title: "Whole-food recipes",
    description: "Each dish uses everyday, unprocessed ingredients.",
    icon: "local:icon-whole-food-recipes",
  },

  {
    title: "Minimum fuss",
    description:
      "All recipes are designed to make eating healthy quick and easy.",
    icon: "local:icon-minimum-fuss",
  },
  {
    title: "Search in seconds",
    description:
      "Filter by name or ingredient and jump straight to the recipe you need.",
    icon: "local:icon-search-in-seconds",
  },
]);
</script>

<template>
  <div class="pt-600 px-200 md:px-400">
    <section>
      <div class="relative">
        <div class="flex flex-col gap-600 lg:gap-1000 lg:max-w-298 mx-auto">
          <div class="flex flex-col gap-400">
            <div>
              <h1
                class="text-preset-1-mobile md:text-preset-1-tablet relative lg:text-preset-1 lg:text-center font-bold"
              >
                <span class="relative inline-block">
                  Healthy
                  <span
                    class="absolute bottom-[0.35em] -z-10 left-0 w-full h-[0.44em] bg-orange-500 rounded-4"
                  ></span>
                </span>
                meals, zero fuss
              </h1>
            </div>
            <p
              class="text-green-800 text-preset-5 lg:text-center lg:w-145 lg:mx-auto"
            >
              Discover eight quick, whole-food recipes that you can cook
              tonight—no processed junk, no guesswork.
            </p>
            <NuxtLink to="/recipes" class="lg:self-center">
              <button
                class="rounded-10 bg-green-900 px-200 py-150 text-preset-8 font-bold text-neutral-0 transition-all duration-200 hover:bg-neutral-800 hover:shadow-md active:scale-95 w-49.5 lg:mx-auto text-center"
              >
                Browse recipes
              </button>
            </NuxtLink>
          </div>

          <div class="absolute bottom-18 left-0 -z-10 w-screen">
            <PatternSquiggle1 class="w-full h-auto opacity-60" />
          </div>

          <div class="flex flex-col gap-400 lg:pb-1200">
            <picture class="mx-auto bg-neutral-0 p-2 rounded-8">
              <source media="(min-width: 43.75em)" :srcset="imgLarge" />
              <img
                class="rounded-8"
                :src="imgSmall"
                alt="cheerful woman holding cut cucumber cutting board while cooking salad kitchen"
                width="1080"
                height="960"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="lg:pt-1200">
        <h2 class="text-preset-2">What you'll get</h2>

        <div v-for="feature in features" :key="feature.title">
          <Icon :icon="feature.icon" width="32" height="32" />
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
