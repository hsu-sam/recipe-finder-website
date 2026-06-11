<script setup>
import { ref } from "vue";
import PatternSquiggle1 from "~/assets/illustrations/PatternSquiggle1.vue";
import Icon from "~/components/ui/Icon.vue";
import { Motion } from "motion-v";

useHead({ title: "Recipe Fiinder" });

const {
  inViewOptions,
  fadeUp,
  slideFromRight,
  staggerContainer,
  heroTitleContainer,
  heroTitleWord,
  delayedFadeUp,
} = usePageAnimations();

const imgHomeLarge = "/images/image-home-hero-large.webp";
const imgHomeSmall = "/images/image-home-hero-small.webp";
const imgRealLarge = "/images/image-home-real-life-large.webp";
const imgRealSmall = "/images/image-home-real-life-small.webp";

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
              <Motion
                as="h1"
                class="text-preset-1-mobile md:text-preset-1-tablet relative lg:text-preset-1 lg:text-center font-bold"
                :initial="'hidden'"
                :animate="'visible'"
                :variants="heroTitleContainer"
              >
                <Motion
                  as="span"
                  class="relative inline-block"
                  :variants="heroTitleWord"
                >
                  Healthy
                  <span
                    class="absolute bottom-[0.35em] -z-10 left-0 w-full h-[0.44em] bg-orange-500 rounded-4"
                  ></span>
                </Motion>

                <Motion as="span" :variants="heroTitleWord">
                  meals, zero fuss
                </Motion>
              </Motion>
            </div>
            <Motion
              as="p"
              class="text-green-600 text-preset-5 lg:text-center lg:w-145 lg:mx-auto"
              :initial="'hidden'"
              :animate="'visible'"
              :variants="delayedFadeUp(0.15)"
            >
              Discover eight quick, whole-food recipes that you can cook
              tonight—no processed junk, no guesswork.
            </Motion>
            <Motion
              :initial="'hidden'"
              :animate="'visible'"
              :variants="delayedFadeUp(0.25)"
              class="lg:self-center"
            >
              <NuxtLink to="/recipes">
                <button
                  class="btn-press rounded-10 bg-green-900 px-200 py-150 text-preset-8 font-bold text-neutral-0 hover:bg-neutral-800 hover:shadow-md w-49.5 lg:mx-auto text-center"
                >
                  Browse recipes
                </button>
              </NuxtLink>
            </Motion>
          </div>

          <div class="absolute bottom-18 left-0 -z-10 w-full">
            <PatternSquiggle1 class="opacity-60" />
          </div>

          <Motion
            class="flex flex-col gap-400 lg:pb-1200"
            :initial="'hidden'"
            :whileInView="'visible'"
            :variants="fadeUp"
            :inViewOptions="inViewOptions"
          >
            <picture class="mx-auto bg-neutral-0 p-2 rounded-8">
              <source media="(min-width: 43.75em)" :srcset="imgHomeLarge" />
              <img
                class="rounded-8"
                :src="imgHomeSmall"
                alt="cheerful woman holding cut cucumber cutting board while cooking salad kitchen"
              />
            </picture>
          </Motion>
        </div>
      </div>
    </section>

    <section>
      <Motion
        class="flex flex-col gap-600 lg:max-w-298 lg:mx-auto"
        :initial="'hidden'"
        :whileInView="'visible'"
        :variants="staggerContainer"
        :inViewOptions="inViewOptions"
      >
        <Motion
          as="h2"
          class="text-preset-2 lg:text-center font-bold"
          :variants="fadeUp"
        >
          What you'll get
        </Motion>

        <Motion
          class="flex flex-col lg:flex-row gap-300 md:gap-400 lg:items-start lg:justify-center"
          :variants="staggerContainer"
        >
          <Motion
            v-for="feature in features"
            :key="feature.title"
            class="flex flex-col gap-300 flex-1"
            :variants="fadeUp"
          >
            <div class="bg-neutral-0 px-075 py-050 rounded-4 flex-1 w-fit">
              <Icon :icon="feature.icon" width="40" height="40" />
            </div>
            <h3 class="text-preset-3">{{ feature.title }}</h3>
            <p class="text-preset-6 text-neutral-600">
              {{ feature.description }}
            </p>
          </Motion>
        </Motion>
      </Motion>
    </section>

    <section>
      <Motion
        class="flex flex-col lg:flex-row lg:items-center gap-600 py-1000 lg:py-1200 lg:max-w-298 lg:mx-auto"
        :initial="'hidden'"
        :whileInView="'visible'"
        :variants="staggerContainer"
        :inViewOptions="inViewOptions"
      >
        <Motion class="flex flex-col justify-center gap-300" :variants="fadeUp">
          <h2 class="text-preset-2 font-bold">Built for real life</h2>
          <p class="text-neutral-600">
            Cooking shouldn’t be complicated. These recipes come in under
            <span class="relative inline-block font-bold text-neutral-900">
              30 Minutes
              <span
                class="absolute bottom-[0.35em] -z-10 left-0 w-full h-[0.60em] bg-orange-500 rounded-4"
              ></span>
            </span>
            of active time, fit busy schedules, and taste good enough to repeat.
          </p>
          <p class="text-neutral-600">
            Whether you’re new to the kitchen or just need fresh ideas, we’ve
            got you covered.
          </p>
        </Motion>
        <Motion :variants="slideFromRight">
          <picture class="mx-auto rounded-8">
            <source media="(min-width: 43.75em)" :srcset="imgRealLarge" />
            <img
              class="rounded-16"
              :src="imgRealSmall"
              alt="cheerful woman holding cut cucumber cutting board while cooking salad kitchen"
            />
          </picture>
        </Motion>
      </Motion>
    </section>

    <Ready />
  </div>
</template>
