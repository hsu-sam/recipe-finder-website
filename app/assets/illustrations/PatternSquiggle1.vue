<script setup>
import { useId } from "vue";
import { Motion } from "motion-v";

defineOptions({ inheritAttrs: false });

const { prefersReducedMotion, EASE_OUT } = usePageAnimations();

const squigglePath =
  "M-132.333 886.836c-33.909-110.402-67.008-229.564-38.542-345.161 35.02-142.326 149.005-219.257 293.325-212.932 212.829 9.351 383.197 173.418 582.749 231.651 414.671 121.04 698.261-201.37 783.701-576.929 5.26-23.105-30.21-33.776-35.51-10.49-53.05 233.245-174.62 474.699-416.85 555.019-256.308 84.97-473.205-77.177-694.696-177.9-136.599-62.132-316.78-96.086-443.616 7.114-163.319 132.877-120.221 364.579-66.462 538.732 7.027 22.711 42.909 13.698 35.901-9.104Z";

const uid = useId().replace(/:/g, "");
const clipId = `squiggle-clip-${uid}`;
const maskId = `squiggle-mask-${uid}`;
</script>

<template>
  <svg
    v-bind="$attrs"
    xmlns="http://www.w3.org/2000/svg"
    width="1440"
    height="616"
    fill="none"
    viewBox="0 0 1440 616"
    class="w-full h-auto block"
  >
    <defs>
      <clipPath :id="clipId">
        <path fill="#fff" d="M0 0h1440v616H0z" />
      </clipPath>
      <mask :id="maskId">
        <Motion
          as="path"
          :d="squigglePath"
          fill="none"
          stroke="white"
          stroke-width="280"
          stroke-linecap="round"
          stroke-linejoin="round"
          :initial="{ pathLength: prefersReducedMotion ? 1 : 0 }"
          :animate="{ pathLength: 1 }"
          :transition="
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.8, ease: EASE_OUT, delay: 0.3 }
          "
        />
      </mask>
    </defs>
    <g :clip-path="`url(#${clipId})`">
      <path
        :d="squigglePath"
        fill="#697DDB"
        opacity="0.4"
        :mask="`url(#${maskId})`"
      />
    </g>
  </svg>
</template>
