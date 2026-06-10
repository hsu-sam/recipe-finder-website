export function usePageAnimations() {
  const inViewOptions = { once: true, amount: 0.25 };

  const fadeUp = {
    hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 48, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const heroTitleContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const heroTitleWord = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const delayedFadeUp = (delay) => ({
    hidden: fadeUp.hidden,
    visible: {
      ...fadeUp.visible,
      transition: {
        ...fadeUp.visible.transition,
        delay,
      },
    },
  });

  return {
    inViewOptions,
    fadeUp,
    slideFromRight,
    staggerContainer,
    heroTitleContainer,
    heroTitleWord,
    delayedFadeUp,
  };
}
