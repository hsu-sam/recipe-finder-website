import { computed } from "vue";
import { useReducedMotion } from "motion-v";

const EASE_OUT = [0.23, 1, 0.32, 1];
const UI_DURATION = 0.25;
const HERO_DURATION = 0.4;

export function usePageAnimations() {
  const prefersReducedMotion = useReducedMotion();
  const inViewOptions = { once: true, margin: "-50px" };

  const enterState = computed(() =>
    prefersReducedMotion.value
      ? { opacity: 0 }
      : {
          opacity: 0,
          transform: "translateY(8px)",
          filter: "blur(2px)",
        },
  );

  const visibleState = computed(() => ({
    opacity: 1,
    ...(prefersReducedMotion.value
      ? {}
      : { transform: "translateY(0px)", filter: "blur(0px)" }),
    transition: { duration: UI_DURATION, ease: EASE_OUT },
  }));

  const fadeUp = computed(() => ({
    hidden: enterState.value,
    visible: visibleState.value,
  }));

  const slideEnterState = computed(() =>
    prefersReducedMotion.value
      ? { opacity: 0 }
      : {
          opacity: 0,
          transform: "translateX(16px)",
          filter: "blur(2px)",
        },
  );

  const slideVisibleState = computed(() => ({
    opacity: 1,
    ...(prefersReducedMotion.value
      ? {}
      : { transform: "translateX(0px)", filter: "blur(0px)" }),
    transition: { duration: UI_DURATION, ease: EASE_OUT },
  }));

  const slideFromRight = computed(() => ({
    hidden: slideEnterState.value,
    visible: slideVisibleState.value,
  }));

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.03 },
    },
  };

  const heroTitleContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const heroTitleWord = computed(() => ({
    hidden: enterState.value,
    visible: {
      opacity: 1,
      ...(prefersReducedMotion.value
        ? {}
        : { transform: "translateY(0px)", filter: "blur(0px)" }),
      transition: { duration: HERO_DURATION, ease: EASE_OUT },
    },
  }));

  const delayedFadeUp = (delay) => ({
    hidden: enterState.value,
    visible: {
      opacity: 1,
      ...(prefersReducedMotion.value
        ? {}
        : { transform: "translateY(0px)", filter: "blur(0px)" }),
      transition: {
        duration: UI_DURATION,
        ease: EASE_OUT,
        delay: prefersReducedMotion.value ? 0 : delay,
      },
    },
  });

  return {
    prefersReducedMotion,
    inViewOptions,
    fadeUp,
    slideFromRight,
    staggerContainer,
    heroTitleContainer,
    heroTitleWord,
    delayedFadeUp,
    EASE_OUT,
  };
}
