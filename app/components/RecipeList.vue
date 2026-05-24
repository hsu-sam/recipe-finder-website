<script setup>
import Icon from "~/components/ui/Icon.vue";
import SearchInput from "./ui/SearchInput.vue";
import Select from "./ui/Select.vue";
import recipes from "../data/data.json";
</script>

<template>
  <div class="flex flex-col gap-300">
    <div
      class="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-0"
    >
      <div
        class="flex flex-col md:flex-row items-center md:gap-200 w-full md:w-auto"
      >
        <Select label="Max Prep Time" class="w-full md:w-auto" />
        <Select label="Max Cook Time" class="w-full md:w-auto" />
      </div>
      <SearchInput
        placeholder="Search by name or ingredient…"
        class="w-full md:w-fit"
      />
    </div>

    <div class="grid grid-col-3">
      <div class="grid lg:grid-cols-3 gap-400">
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="bg-neutral-0 rounded-10 border border-neutral-300 p-100 flex flex-col items-center gap-200"
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
              class="w-full px-400 py-150 rounded-full bg-green-900 text-center text-white font-bold cursor-pointer hover:bg-green-800"
            >
              View Recipe
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
