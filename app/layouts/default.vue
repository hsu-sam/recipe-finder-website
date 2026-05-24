<script setup lang="ts">
import Header from "~/components/ui/Header.vue";
import Footer from "~/components/ui/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
