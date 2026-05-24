<script setup>
import recipes from "~/data/data.json";
import { useRoute } from "vue-router";
import Icon from "~/components/ui/Icon.vue";

const route = useRoute();

// Find the matching recipe by slug
const recipe = recipes.find((r) => r.slug === route.params.slug);

// Redirect to 404 if not found
if (!recipe) {
  throw createError({ statusCode: 404, statusMessage: "Recipe not found" });
}

// Get 3 more recipes excluding the current one
const moreRecipes = recipes
  .filter((r) => r.slug !== route.params.slug)
  .slice(0, 3);
</script>

<template>
  <div class="pt-600 px-200 md:px-400">
    <div
      v-if="recipe"
      class="flex flex-col lg:flex-row gap-200 border-b border-b-neutral-300 pb-800"
    >
      <picture>
        <source media="(min-width: 43.75em)" :srcset="recipe.image.large" />
        <img
          :src="recipe.image.small"
          :alt="recipe.title"
          class="w-145 h-auto rounded-10"
        />
      </picture>

      <div class="flex flex-col gap-250">
        <h1 class="text-preset-2 font-bold">
          {{ recipe.title }}
        </h1>
        <p>{{ recipe.overview }}</p>

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

        <section>
          <h4 class="text-preset-4 font-bold">Ingredients:</h4>
          <ul class="flex flex-col gap-100">
            <li
              v-for="(ingredient, i) in recipe.ingredients"
              :key="i"
              class="flex flex-row items-center justify-start gap-100"
            >
              <Icon
                icon="local:icon-bullet-point"
                width="40"
                height="40"
                class="shrink-0"
              />
              <span>{{ ingredient }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-preset-4 font-bold">Instructions:</h2>
          <ol class="flex flex-col gap-100">
            <li
              v-for="(step, i) in recipe.instructions"
              :key="i"
              class="flex flex-row items-center justify-start gap-100"
            >
              <Icon
                icon="local:icon-bullet-point"
                width="40"
                height="40"
                class="shrink-0"
              />
              <span> {{ step }}</span>
            </li>
          </ol>
        </section>
      </div>
    </div>

    <div class="pt-800">
      <h3 class="text-preset-3 font-bold">More Recipes</h3>
      <div class="grid lg:grid-cols-3 gap-400 mt-400">
        <div
          v-for="rec in moreRecipes"
          :key="rec.id"
          class="bg-neutral-0 rounded-10 border border-neutral-300 p-100 flex flex-col items-center gap-200"
        >
          <picture class="mx-auto rounded-8 w-full">
            <source media="(min-width: 43.75em)" :srcset="rec.image.large" />
            <img
              class="rounded-16 w-full h-auto"
              :src="rec.image.small"
              :alt="rec.title"
            />
          </picture>
          <div class="flex flex-col gap-200 w-full">
            <div>
              <h5 class="text-preset-5 font-bold">{{ rec.title }}</h5>
              <p class="text-preset-9 text-neutral-600">
                {{ rec.overview }}
              </p>
            </div>
            <div class="flex flex-wrap gap-200">
              <p>
                <Icon icon="local:icon-servings" /> Servings:
                <span>{{ rec.servings }}</span>
              </p>
              <p>
                <Icon icon="local:icon-prep-time" /> Prep Time:
                <span>{{ rec.prepMinutes }} min</span>
              </p>
              <p>
                <Icon icon="local:icon-cook-time" /> Cook Time:
                <span>{{ rec.cookMinutes }} min</span>
              </p>
            </div>
          </div>
          <NuxtLink :to="`/recipes/${rec.slug}`" class="w-full">
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
