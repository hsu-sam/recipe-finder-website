<script setup lang="ts">
import Icon from "~/components/ui/Icon.vue";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "local:icon-instagram",
    width: 23,
    height: 22,
  },
  {
    label: "Bluesky",
    href: "https://bsky.app",
    icon: "local:icon-bluesky",
    width: 23,
    height: 22,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: "local:icon-tiktok",
    width: 23,
    height: 22,
  },
];
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-300 py-500 md:flex-row-reverse md:justify-between md:py-500 md:px-400 xl:px-0 xl:w-298 mx-auto"
  >
    <div class="flex items-center gap-300">
      <a
        v-for="social in socialLinks"
        :key="social.label"
        :href="social.href"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.label"
      >
        <Icon
          :icon="social.icon"
          :width="social.width"
          :height="social.height"
        />
        <span class="nav-link-underline" aria-hidden="true" />
      </a>
    </div>
    <p class="text-preset-9">Made with ❤️ and 🥑</p>
  </div>
</template>
