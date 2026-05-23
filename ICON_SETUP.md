# Icon System Setup Guide

A comprehensive guide for implementing a custom icon system in Nuxt 4 that dynamically converts local SVG files into an Iconify collection.

## Quick Start

This icon system integrates local SVG files with the Iconify Vue library, allowing you to:

- ✅ Use custom SVG icons without external requests
- ✅ Maintain full control over icon assets
- ✅ Combine local SVGs with external Iconify icons
- ✅ Get icons auto-discovered at build time

---

## Implementation Steps

### 1. Install Dependencies

```bash
pnpm install @iconify/vue
```

### 2. Create Icon Plugin (`plugins/icon.ts`)

```typescript
import { addCollection } from "@iconify/vue";

export default defineNuxtPlugin(() => {
  console.info("icon plugin loaded");

  const svgFiles = import.meta.glob<{ default: string }>(
    "../assets/icons/*.svg",
    {
      query: "?raw",
      eager: true,
    },
  );

  const localIcons: Record<
    string,
    { body: string; width: number; height: number }
  > = {};

  for (const path in svgFiles) {
    const name = path?.split("/")?.pop()?.replace(".svg", "");
    const svgString = svgFiles[path]?.default!;
    const width = Number(svgString.match(/width="(\d+)"/)?.[1]);
    const height = Number(svgString.match(/height="(\d+)"/)?.[1]);

    // Extract just the inner SVG content (remove <svg> wrapper tags)
    const bodyMatch = svgString.match(/<svg[^>]*>(.*)<\/svg>/s);
    const body = bodyMatch?.[1] || svgString;

    localIcons[name!] = {
      body,
      width,
      height,
    };
  }

  addCollection({
    prefix: "local",
    icons: localIcons,
  });

  // Debug: log all registered icons
  console.log("Registered icons:", Object.keys(localIcons));
});
```

**Critical Implementation Detail:**

- ⚠️ **Extract only the inner SVG content** - Remove the `<svg>` wrapper tags using regex
- This is essential for Iconify to render the icons correctly
- Width and height are parsed from SVG attributes

### 3. Create Global Icon Component (`components/Icon.vue`)

```vue
<script setup lang="ts">
import { Icon as IconifyIcon } from "@iconify/vue";

defineProps<{
  icon: string;
}>();
</script>

<template>
  <IconifyIcon
    :icon="icon"
    v-bind="$attrs"
    style="display: inline-flex; width: 1em; height: 1em; color: currentColor"
  />
</template>

<style scoped>
:deep(svg) {
  display: inline-block;
  vertical-align: -0.125em;
}
</style>
```

**Benefits:**

- Auto-imported by Nuxt (no manual imports needed)
- Supports all `@iconify/vue` props via `v-bind="$attrs"`
- Proper sizing and alignment out of the box

### 4. Organize SVG Files

Create the `assets/icons/` directory and place your SVG files:

```
assets/
  └── icons/
      ├── icon-dashboard.svg
      ├── icon-settings.svg
      ├── icon-search.svg
      ├── icon-chevron-down.svg
      └── ... (other SVGs)
```

### 5. SVG Requirements

Each SVG **must** have `width` and `height` attributes:

```xml
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="#000" d="..." />
  <!-- More SVG content -->
</svg>
```

**Why?**

- The plugin parses these attributes to register icon dimensions with Iconify
- Without them, icons may not display at the correct size

---

## Usage

### Basic Usage

```vue
<template>
  <Icon icon="local:icon-search" width="24" height="24" />
</template>
```

### In Data Objects

```vue
<script setup>
const features = ref([
  {
    title: "Dashboard",
    icon: "local:icon-dashboard",
  },
  {
    title: "Settings",
    icon: "local:icon-settings",
  },
]);
</script>

<template>
  <div v-for="feature in features" :key="feature.title">
    <Icon :icon="feature.icon" width="32" height="32" />
    <h3>{{ feature.title }}</h3>
  </div>
</template>
```

### Icon Naming Convention

Icon names are based on your **filename** (without `.svg`):

| Filename                | Icon Name                 |
| ----------------------- | ------------------------- |
| `icon-search.svg`       | `local:icon-search`       |
| `icon-chevron-down.svg` | `local:icon-chevron-down` |
| `dashboard.svg`         | `local:dashboard`         |
| `my-custom-icon.svg`    | `local:my-custom-icon`    |

The `local:` prefix is defined in the plugin's `addCollection()` call.

---

## Common Issues & Solutions

### Issue: Icons Not Displaying

**Solution Checklist:**

1. ✅ **Check Console**

   ```
   ✓ Should see: "icon plugin loaded"
   ✓ Should see: "Registered icons: [...]"
   ```

2. ✅ **Verify SVG Attributes**

   ```xml
   <!-- ✓ Correct -->
   <svg width="24" height="24" viewBox="0 0 24 24">

   <!-- ✗ Wrong (missing width/height) -->
   <svg viewBox="0 0 24 24">
   ```

3. ✅ **Check File Location**
   - SVGs must be in `assets/icons/` directory
   - File name must match icon reference exactly

4. ✅ **Inspect HTML**
   - Open browser DevTools → Elements
   - Look for `<svg>` tags in the DOM
   - If you see inline SVG, the icon loaded!

### Issue: Icon Name Mismatch

**Example:**

- File: `icon-dashboard.svg`
- Wrong: `<Icon icon="local:dashboard" />` ❌
- Correct: `<Icon icon="local:icon-dashboard" />` ✅

The plugin uses the **full filename** (including prefixes) as the icon name.

### Issue: Icons Show But Wrong Size

**Solution:**
Add explicit width and height props:

```vue
<!-- Specify size -->
<Icon icon="local:icon-search" width="24" height="24" />

<!-- Or use CSS -->
<Icon icon="local:icon-search" class="w-6 h-6" />
```

---

## Advanced Usage

### Dynamic Icon Names

```vue
<script setup>
const getIcon = (name) => `local:icon-${name}`;
</script>

<template>
  <Icon :icon="getIcon('search')" />
</template>
```

### Mixing Local & External Icons

```vue
<template>
  <!-- Local custom SVG -->
  <Icon icon="local:icon-dashboard" />

  <!-- External Iconify Material Icons -->
  <Icon icon="mi:settings" />

  <!-- Both work seamlessly! -->
</template>
```

### Styled Icons

```vue
<template>
  <Icon
    icon="local:icon-search"
    width="24"
    height="24"
    style="color: #FF6B6B;"
  />
</template>
```

---

## Performance

### Build Time Loading

- All SVGs are eager-loaded at build time (not lazy)
- No runtime performance impact
- Optimal for small-to-medium icon sets (< 100 icons)

### For Large Icon Sets

If you have 100+ SVG files, consider lazy loading:

```typescript
// In plugins/icon.ts
const svgFiles = import.meta.glob<{ default: string }>(
  "../assets/icons/*.svg",
  {
    query: "?raw",
    eager: false, // Change to lazy load
  },
);
```

---

## Best Practices

1. **SVG Structure**
   - Always include width/height in root `<svg>` tag
   - Use consistent dimensions (e.g., all 24x24)

2. **File Naming**
   - Use kebab-case: `my-icon.svg` (not `myIcon.svg`)
   - Consider prefixes for organization: `icon-search.svg`, `icon-dashboard.svg`

3. **File Size**
   - Keep SVGs under 5KB each
   - Optimize SVGs using tools like SVGO

4. **Color Handling**
   - Remove hardcoded colors from SVGs if you want to change them via CSS
   - Use `fill="currentColor"` to inherit from CSS color property

5. **Documentation**
   - As your icon set grows, document available icons
   - Keep a list in a separate file or comments

---

## File Structure Reference

```
project-root/
├── app/
│   ├── assets/
│   │   └── icons/
│   │       ├── icon-search.svg
│   │       ├── icon-chevron-down.svg
│   │       ├── icon-dashboard.svg
│   │       └── ... more SVGs
│   ├── components/
│   │   └── Icon.vue          ← Global Icon component
│   ├── plugins/
│   │   └── icon.ts           ← Icon plugin
│   ├── pages/
│   └── ...
├── README.md
└── ICON_SETUP.md             ← This file
```

---

## Debugging

### Enable Console Logging

The plugin includes debug logging. Check your browser console:

```javascript
// You should see these messages:
"icon plugin loaded";
"Registered icons: ['icon-search', 'icon-dashboard', 'icon-settings', ...]";
```

### Inspect Registered Icons

In the browser console:

```javascript
// Icons are stored in Iconify's storage
// Check the Network tab to verify SVG loads with 200 status
```

---

## Troubleshooting Checklist

- [ ] Did you install `@iconify/vue`?
- [ ] Is the plugin file at `plugins/icon.ts`?
- [ ] Is the Icon component at `components/Icon.vue`?
- [ ] Do your SVG files have width/height attributes?
- [ ] Are your SVG files in `assets/icons/` folder?
- [ ] Do your icon names match the filenames exactly?
- [ ] Is your dev server running?
- [ ] Did you refresh the browser?
- [ ] Check browser console for "icon plugin loaded" message?

---

## Resources

- [Iconify Vue Documentation](https://iconify.design/docs/icon-components/vue/)
- [Vite `import.meta.glob()`](https://vite.dev/guide/features.html#glob-import)
- [Nuxt Plugins Guide](https://nuxt.com/docs/guide/directory-structure/plugins)
- [SVG Best Practices](https://www.w3.org/TR/SVG2/)
- [SVGO - SVG Optimizer](https://github.com/svg/svgo)

---

## Support

If icons aren't showing:

1. Check browser console for errors
2. Verify SVG file names and location
3. Ensure SVG files have width/height attributes
4. Check that icon names in templates match filenames
5. Restart your dev server

Happy coding! 🎉
