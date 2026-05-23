# Icon System Documentation

## Overview

The Spectorly frontend uses a custom icon system that dynamically converts local SVG files into an Iconify collection. This approach combines the flexibility of custom SVGs with the seamless integration of the Iconify Vue library.

---

## How It Works

### 1. **Setup & Registration** (`src/main.ts`)

The icon plugin is registered as a Vue plugin during app initialization:

```typescript
import { icon } from './plugins/icon'

const app = createApp(App)
  .use(validation)
  .use(router)
  .use(i18n)
  .use(pinia)
  .use(icon)  // Installed here
```

The plugin loads and processes all local SVG files before the app mounts.

---

### 2. **Icon Plugin System** (`src/plugins/icon.ts`)

The plugin performs three main operations:

#### **A. Dynamic SVG Collection**

```typescript
const svgFiles = import.meta.glob<{ default: string }>('../icons/*.svg', {
  query: '?raw',
  eager: true
})
```

- **`import.meta.glob()`**: Vite feature that dynamically imports all SVG files from `src/icons/`
- **`?raw`**: Query parameter that returns SVG content as plain strings (not modules)
- **`eager: true`**: All SVGs are loaded at build time (not lazy-loaded)

#### **B. SVG Parsing**

```typescript
for (const path in svgFiles) {
  const name = path?.split('/')?.pop()?.replace('.svg', '')
  const width = Number(svgFiles[path]?.default.match(/width="(\d+)"/)?.[1])
  const height = Number(
    svgFiles[path]?.default.match(/height="(\d+)"/)?.[1]
  )
  
  localIcons[name!] = {
    body: svgFiles[path]?.default!,
    width,
    height
  }
}
```

- Extracts the SVG filename (without `.svg` extension) as the icon name
- Uses regex to parse `width` and `height` attributes from the SVG markup
- Stores the full SVG body along with dimensions in the `localIcons` object

#### **C. Iconify Registration**

```typescript
addCollection({
  prefix: 'local',
  icons: localIcons
})
```

- Registers all processed SVGs as an Iconify collection
- Uses the `local:` prefix to distinguish them from external Iconify icons
- This integrates seamlessly with the `@iconify/vue` library

---

### 3. **SVG Assets** (`src/icons/`)

The project includes 35 custom SVG files:

```
dashboard.svg
setting.svg
campaign.svg
chart-presentation.svg
users-tracking.svg
duration.svg
video.svg
quizz.svg
plus.svg
filter.svg
envelope.svg
// ... and more
```

Each SVG must have `width` and `height` attributes in the root `<svg>` tag for proper parsing.

---

### 4. **Usage in Components**

#### **Direct Icon Component Usage**

```typescript
import { Icon } from '@iconify/vue'

// In template:
<Icon icon="local:dashboard" />
<Icon icon="local:duration" />
<Icon icon="local:setting" />
```

#### **In Data/Config Objects**

```typescript
// Navigation items in ManagersLayout.vue
const navigation = [
  { label: 'Dashboard', icon: 'local:dashboard' },
  { label: 'Analytics', icon: 'local:chart-presentation' },
  { label: 'Users', icon: 'local:users-tracking' },
  { label: 'Settings', icon: 'local:setting' }
]

// In template:
<Icon :icon="item.icon" />
```

#### **Dynamic Icon Names**

```typescript
// Language selector
<Icon :icon="`local:${option}`" />
```

#### **Mixed with Iconify Icons**

```typescript
// Custom SVG icon
<Icon icon="local:duration" />

// External Iconify Material Icons
<Icon icon="mi:options-vertical" />

// Both work seamlessly together
```

---

## Implementation for Nuxt 4

To implement this icon system in a Nuxt 4 project, follow these steps:

### **1. Install Dependency**

```bash
npm install @iconify/vue
```

### **2. Create Icon Plugin**

Create `plugins/icon.ts`:

```typescript
import { addCollection } from '@iconify/vue'

export default defineNuxtPlugin(() => {
  console.info('icon plugin loaded')
  
  const svgFiles = import.meta.glob<{ default: string }>('../assets/icons/*.svg', {
    query: '?raw',
    eager: true
  })

  const localIcons: Record<
    string,
    { body: string; width: number; height: number }
  > = {}

  for (const path in svgFiles) {
    const name = path?.split('/')?.pop()?.replace('.svg', '')
    const width = Number(svgFiles[path]?.default.match(/width="(\d+)"/)?.[1])
    const height = Number(
      svgFiles[path]?.default.match(/height="(\d+)"/)?.[1]
    )
    localIcons[name!] = {
      body: svgFiles[path]?.default!,
      width,
      height
    }
  }

  addCollection({
    prefix: 'local',
    icons: localIcons
  })
})
```

### **3. Create Global Icon Component** (Optional but Recommended)

Create `components/Icon.vue`:

```vue
<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

defineProps<{
  icon: string
}>()
</script>

<template>
  <IconifyIcon :icon="icon" v-bind="$attrs" />
</template>
```

This allows you to use `<Icon />` directly without imports throughout your app.

### **4. Store SVG Files**

Create the `assets/icons/` directory and place all SVG files there:

```
assets/
  └── icons/
      ├── dashboard.svg
      ├── setting.svg
      ├── campaign.svg
      └── ... (other SVGs)
```

### **5. Use in Components**

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
// Or use the global <Icon /> component if created
</script>

<template>
  <Icon icon="local:dashboard" />
</template>
```

### **6. Nuxt Configuration**

No additional configuration needed in `nuxt.config.ts`. Nuxt 4 handles `import.meta.glob()` automatically, and plugins in the `plugins/` folder are auto-discovered.

---

## Comparison: Vue 3 vs Nuxt 4

| Aspect | Vue 3 (Current) | Nuxt 4 |
|--------|-----------------|--------|
| Plugin Registration | Manual `.use()` in `main.ts` | Auto-discovery in `plugins/` folder |
| SVG Path | `../icons/` | `../assets/icons/` |
| Component Import | Manual import required | Can be auto-imported if in `components/` |
| Plugin Syntax | Vue plugin object with `install()` | Nuxt composable `defineNuxtPlugin()` |
| Configuration | None required | None required (auto-handled) |

---

## Key Features

✅ **Dynamic Loading**: SVGs are loaded at build time, not runtime  
✅ **Seamless Integration**: Works with Iconify Vue library  
✅ **Mixed Icon Support**: Use both local SVGs and external Iconify icons  
✅ **Type-Safe**: Full TypeScript support  
✅ **Performance**: All icons embedded, no external requests  
✅ **Scalable**: Add new SVGs without code changes  

---

## Troubleshooting

### Icon Not Appearing?

1. Ensure the SVG file has `width` and `height` attributes:
   ```xml
   <svg width="24" height="24" viewBox="0 0 24 24" ...>
   ```

2. Check the file is in `src/icons/` (Vue 3) or `assets/icons/` (Nuxt 4)

3. Verify the icon name matches the filename:
   - File: `dashboard.svg` → Icon: `local:dashboard`

4. Check browser console for plugin load confirmation:
   ```
   "icon plugin loaded"
   ```

### Performance Considerations

- All SVGs are eager-loaded at build time (not lazy)
- This is optimal for small-to-medium icon sets (< 100 SVGs)
- For very large icon sets, consider lazy loading with `eager: false`

---

## Best Practices

1. **SVG Format**: Always include width/height in the root `<svg>` tag
2. **Naming**: Use kebab-case for file names: `my-icon.svg` → `local:my-icon`
3. **Size**: Keep SVGs under 5KB each
4. **Organization**: Group related icons in the same directory if needed
5. **Documentation**: List available icons in a separate file as your project grows

---

## Example: Adding a New Icon

1. Create SVG file with width/height:
   ```xml
   <!-- src/icons/new-feature.svg -->
   <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <!-- Your SVG content -->
   </svg>
   ```

2. Use in any component:
   ```vue
   <Icon icon="local:new-feature" />
   ```

No rebuild needed—the plugin automatically picks it up on next development server restart!

---

## Resources

- [Iconify Vue Documentation](https://iconify.design/docs/icon-components/vue/)
- [Vite `import.meta.glob()`](https://vite.dev/guide/features.html#glob-import)
- [Nuxt Plugins](https://nuxt.com/docs/guide/directory-structure/plugins)
- [SVG Best Practices](https://www.w3.org/TR/SVG2/)
