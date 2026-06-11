<script setup>
import { ref, computed } from "vue";
import Icon from "~/components/ui/Icon.vue";
import SearchInput from "./ui/SearchInput.vue";
import Select from "./ui/Select.vue";
import recipes from "../data/data.json";
import { Motion } from "motion-v";

const { inViewOptions, fadeUp } = usePageAnimations();

const searchQuery = ref("");
const maxPrepTime = ref(null);
const maxCookTime = ref(null);

const filteredRecipes = computed(() => {
  return recipes.filter((recipe) => {
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchLower));

    const matchesPrepTime =
      maxPrepTime.value === null || recipe.prepMinutes <= maxPrepTime.value;

    const matchesCookTime =
      maxCookTime.value === null || recipe.cookMinutes <= maxCookTime.value;

    return matchesSearch && matchesPrepTime && matchesCookTime;
  });
});
</script>

<template>
  <div class="flex flex-col gap-300">
    <Motion
      class="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-0"
      :initial="'hidden'"
      :whileInView="'visible'"
      :variants="fadeUp"
      :inViewOptions="inViewOptions"
    >
      <div
        class="flex flex-col md:flex-row items-center gap-200 w-full md:w-auto"
      >
        <Select
          v-model="maxPrepTime"
          label="Max Prep Time"
          class="w-full md:w-auto"
        />
        <Select
          v-model="maxCookTime"
          label="Max Cook Time"
          class="w-full md:w-auto"
        />
      </div>
      <SearchInput
        v-model="searchQuery"
        placeholder="Search by name or ingredient…"
        class="w-full md:w-fit"
      />
    </Motion>

    <div class="grid grid-col-3">
      <div class="grid lg:grid-cols-3 gap-400">
        <div
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          class="bg-neutral-0 rounded-10 border border-neutral-300 p-100 flex flex-col items-center justify-between gap-200"
        >
          <picture class="mx-auto rounded-8">
            <source media="(min-width: 43.75em)" :srcset="recipe.image.large" />
            <img
              class="rounded-16"
              :src="recipe.image.small"
              :alt="recipe.title"
            />
          </picture>
          <div class="flex flex-col gap-200">
            <div>
              <h5 class="text-preset-5 font-bold">{{ recipe.title }}</h5>
              <p class="text-preset-9 text-neutral-600">
                {{ recipe.overview }}
              </p>
            </div>
            <div class="flex flex-wrap gap-200">
              <p>
                <Icon icon="local:icon-servings" /> Servings:
                <span>{{ recipe.servings }}</span>
              </p>
              <p>
                <Icon icon="local:icon-prep-time" /> Prep Time:
                <span>{{ recipe.prepMinutes }} min</span>
              </p>
              <p>
                <Icon icon="local:icon-cook-time" /> Cook Time:
                <span>{{ recipe.cookMinutes }} min</span>
              </p>
            </div>
          </div>
          <NuxtLink :to="`/recipes/${recipe.slug}`" class="w-full">
            <div
              class="btn-press w-full px-400 py-150 rounded-full bg-green-900 text-center text-white font-bold cursor-pointer hover:bg-neutral-800"
            >
              View Recipe
            </div>
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="filteredRecipes.length === 0"
        class="col-span-full flex flex-col items-center justify-center py-800"
      >
        <p class="text-preset-5 text-neutral-600">
          No recipes found. Try adjusting your filters or search query.
        </p>
      </div>
    </div>
  </div>
</template>
