<script setup>
import patternSquiggle2 from "~/assets/illustrations/pattern-squiggle-2.svg";
import { ref } from "vue";
import Icon from "~/components/ui/Icon.vue";

const imgMissionLarge = "/images/image-about-our-mission-large.webp";
const imgMissionSmall = "/images/image-about-our-mission-small.webp";
const imgPhilosophyLarge = "/images/image-about-beyond-the-plate-large.webp";
const imgPhilosophySmall = "/images/image-about-beyond-the-plate-small.webp";

const QAs = ref([
  {
    title: "Cut through the noise.",
    description:
      "The internet is bursting with recipes, yet most busy cooks still default to take-away or packaged foods. We curate a tight collection of fool-proof dishes so you can skip the scrolling and start cooking.",
  },

  {
    title: "Empower home kitchens.",
    description:
      "When you control what goes into your meals, you control how you feel. Every recipe is built around unrefined ingredients and ready in about half an hour of active prep.",
  },
  {
    title: "Make healthy look good.",
    description:
      "High-resolution imagery shows you exactly what success looks like—because we eat with our eyes first, and confidence matters.",
  },
]);

const philosophies = ref([
  {
    title: "Whole ingredients first.",
    description:
      "Fresh produce, grains, legumes, herbs, and quality fats form the backbone of every recipe.",
  },

  {
    title: "Flavor without compromise.",
    description:
      "Spices, citrus, and natural sweetness replace excess salt, sugar, and additives.",
  },
  {
    title: "Respect for time.",
    description:
      "Weeknight meals should slot into real schedules; weekend cooking can be leisurely but never wasteful.",
  },
  {
    title: "Sustainable choices.",
    description:
      "Short ingredient lists cut down on food waste and carbon footprint, while plant-forward dishes keep things planet-friendly.",
  },
]);
</script>

<template>
  <div class="pt-600 px-200 md:px-400">
    <section class="overflow-hidden">
      <div
        class="flex flex-col gap-800 pb-1200 items-center lg:flex-row lg:max-w-298 mx-auto"
      >
        <div class="flex flex-col gap-300">
          <div class="w-fit bg-orange-500 px-075 py-025 rounded-6">
            <p class="text-preset-3 font-bold">Our Mission</p>
          </div>
          <h2 class="text-preset-2-mobile md:text-preset-2 font-bold">
            Help more people cook nourishing meals, more often.
          </h2>
          <div class="flex flex-col gap-200 text-neutral-800 text-preset-6">
            <p>
              Healthy Recipe Finder was created to prove that healthy eating can
              be convenient, affordable, and genuinely delicious.
            </p>
            <p>
              We showcase quick, whole-food dishes that anyone can master—no
              fancy equipment, no ultra-processed shortcuts—just honest
              ingredients and straightforward steps.
            </p>
          </div>
        </div>
        <div class="relative">
          <picture class="mx-auto rounded-8">
            <source media="(min-width: 43.75em)" :srcset="imgMissionLarge" />
            <img
              class="rounded-16"
              :src="imgMissionSmall"
              alt="cheerful woman holding cut cucumber cutting board while cooking salad kitchen"
            />
          </picture>
          <img
            :src="patternSquiggle2"
            alt=""
            class="absolute top-75 -right-20"
          />
        </div>
      </div>
    </section>
    <section>
      <div
        class="flex flex-col gap-800 py-1200 items-start lg:flex-row lg:max-w-298 mx-auto border-y border-neutral-200"
      >
        <h2 class="text-preset-2-mobile md:text-preset-2 font-bold flex-none">
          Why we exist
        </h2>

        <div class="flex flex-col gap-300">
          <div
            v-for="QA in QAs"
            :key="QA.title"
            class="flex flex-row items-start justify-center gap-300 flex-1"
          >
            <div class="flex flex-row items-start justify-center gap-250">
              <Icon
                icon="local:icon-bullet-point"
                width="40"
                height="40"
                class="shrink-0 mt-2"
              />
              <div class="flex flex-col gap-200">
                <h4 class="text-preset-4 font-bold">{{ QA.title }}</h4>
                <p class="text-preset-6 text-neutral-600">
                  {{ QA.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-800 py-1200 items-start lg:flex-row lg:max-w-298 mx-auto"
      >
        <h2 class="text-preset-2-mobile md:text-preset-2 font-bold flex-none">
          Our food philosophy
        </h2>

        <div class="flex flex-col gap-300">
          <div
            v-for="philosophy in philosophies"
            :key="philosophy.title"
            class="flex flex-row items-start gap-300 flex-1"
          >
            <div class="flex flex-row items-start gap-250">
              <Icon
                icon="local:icon-bullet-point"
                width="40"
                height="40"
                class="shrink-0 mt-2"
              />
              <div class="flex flex-col gap-200">
                <h4 class="text-preset-4 font-bold">{{ philosophy.title }}</h4>
                <p class="text-preset-6 text-neutral-600">
                  {{ philosophy.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div
        class="flex flex-col gap-800 py-1200 items-center border-t border-t-neutral-200 lg:flex-row lg:max-w-298 mx-auto"
      >
        <div class="flex flex-col gap-300">
          <h2 class="text-preset-2-mobile md:text-preset-2 font-bold">
            Beyond the plate
          </h2>
          <div class="flex flex-col gap-200 text-neiutral-800">
            <p>
              We believe food is a catalyst for community and well-being. By
              sharing approachable recipes, we hope to:
            </p>
            <ul class="list-disc pl-4">
              <li>Encourage family dinners and social cooking.</li>
              <li>
                Reduce reliance on single-use packaging and delivery waste.
              </li>
              <li>
                Spark curiosity about seasonal produce and local agriculture.
              </li>
            </ul>
          </div>
        </div>
        <div class="">
          <picture class="mx-auto rounded-8">
            <source media="(min-width: 43.75em)" :srcset="imgPhilosophyLarge" />
            <img
              class="rounded-16"
              :src="imgPhilosophySmall"
              alt="cheerful woman holding cut cucumber cutting board while cooking salad kitchen"
            />
          </picture>
        </div>
      </div>
    </section>
    <Ready />
  </div>
</template>
