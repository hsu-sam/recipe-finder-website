<script setup lang="ts">
import SearchInput from "~/components/ui/SearchInput.vue";
import Select from "~/components/ui/Select.vue";
</script>

<template>
  <div class="pt-600 px-200 md:px-400">
    <section class="">
      <div class="flex flex-col gap-400 pb-800">
        <div>
          <h1
            class="text-preset-2-mobile md:text-preset-2 lg:text-center font-bold"
          >
            Explore our simple, healthy recipes
          </h1>
        </div>
        <p
          class="text-green-600 text-preset-5 lg:text-center lg:w-145 lg:mx-auto"
        >
          Discover eight quick, whole-food dishes that fit real-life schedules
          and taste amazing. Use the search bar to find a recipe by name or
          ingredient, or simply scroll the list and let something delicious
          catch your eye.
        </p>
      </div>

      <div class="lg:max-w-298 mx-auto">
        <RecipeList />
      </div>
    </section>
  </div>
</template>
