Here's an updated version of the README with the added `rules.json` configuration and instructions on how to use the `cssGenerator.ts` with class declarations. I’ve also added an example of how to use the CSS generator with class declarations for Vue 3 and Nuxt 3 projects.

---

# CSS Generator for Vue 3 and Nuxt 3 Projects

## Overview

The `cssGenerator.ts` script is a TypeScript utility designed to dynamically generate CSS rules for Vue 3 or Nuxt 3 projects. It processes Vue components, extracts class names from `class="..."` attributes, and generates CSS rules in `mastorscdn/newmastors.css` based on the configuration in `mastorscdn/rules.json`. 

The script leverages `mastorscdn/mastors.css` for base styles and supports margins, paddings, borders, backgrounds, and text styles with features like percentage-based units, media queries, and `!important` flags.

---

## Key Features

- **Dynamic CSS Generation**: Creates CSS rules for classes used in Vue/Nuxt templates.
- **Prefix-Based Units**:
  - `pad-tb-50` → `padding-top: 5rem; padding-bottom: 5rem;`
  - `pad-tb--50` → `padding-top: 50%; padding-bottom: 50%;`
- **Media Queries**:
  - `pad-tb-50:sm` → applies `calc(4.5rem - 10%)` at `max-width: 640px`.
- **File Watching**: Monitors `.vue` files for changes using `chokidar`, updating `newmastors.css` automatically.

---

## File Structure

```
mastorscdn/
├── cssGenerator.ts      # Main script
├── mastors.css          # Source CSS base styles
├── newmastors.css       # Output CSS with generated rules
└── rules.json           # Rules configuration
```

- **Vue 3**: Components in `src/components` or `src/pages`.
- **Nuxt 3**: Components in `components/` or `pages/`.

---

## Prerequisites

- **Node.js**: v16 or higher
- **TypeScript**
- **Dependencies** (add to `package.json`):
  ```bash
  npm install chokidar css @vue/compiler-sfc
  ```

- **Vue 3**:
  ```bash
  npm install vue @vitejs/plugin-vue vite
  ```

- **Nuxt 3**:
  ```bash
  npm install nuxt
  ```

---

## Vue 3 Setup

### 1. Create Project

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
```

### 2. Add Generator Script

- Create `mastorscdn/` directory.
- Place `cssGenerator.ts` inside it.
- Ensure paths in `cssGenerator.ts`:
  ```ts
  const vueFilesPath = path.join(__dirname, '../src');
  const mastorsCssPath = path.join(__dirname, 'mastors.css');
  const newMastorsCssPath = path.join(__dirname, 'newmastors.css');
  const rulesJsonPath = path.join(__dirname, 'rules.json');
  ```

### 3. Configuration Files

- Create `mastorscdn/rules.json` using the configuration below.
- Create `mastorscdn/mastors.css` (optional with base styles).
- Ensure `mastorscdn/newmastors.css` exists (can be empty).

### 4. Update `package.json`

```json
"scripts": {
  "cssme": "ts-node src/cssGenerator.ts",
  "dev": "vite",
  "build": "vite build"
}
```

> 🔧 **Install `ts-node`** if missing:
```bash
npm install ts-node
```

### 5. Import CSS

- In `src/main.ts`:
  ```ts
  import './mastorscdn/newmastors.css';
  ```

- Or in a component:
  ```html
  <style>
    @import '~/mastorscdn/newmastors.css';
  </style>
  ```

---

## Nuxt 3 Setup

### 1. Create Project

```bash
npx nuxi@latest init my-nuxt-app
cd my-nuxt-app
npm install
```

### 2. Add Generator Script

- Place `cssGenerator.ts` in `mastorscdn/`.
- Update paths:
  ```ts
  const vueFilesPath = path.join(__dirname, '../'); // pages/ + components/
  ```

### 3. Configuration Files

- Create `mastorscdn/rules.json`
- Add `mastorscdn/mastors.css` (can be empty)
- Ensure `mastorscdn/newmastors.css` exists

### 4. Update `package.json`

```json
"scripts": {
  "cssme": "ts-node src/cssGenerator.ts",
  "dev": "nuxt dev",
  "build": "nuxt build"
}
```

### 5. Import CSS

- In `nuxt.config.ts`:
  ```ts
  export default defineNuxtConfig({
    css: ['~/mastorscdn/newmastors.css']
  });
  ```

- Or in a component:
  ```html
  <style>
    @import '~/mastorscdn/newmastors.css';
  </style>
  ```

---

## Rules Configuration (`rules.json`)

The `rules.json` file defines the configuration for how the CSS classes should be processed. It includes media queries, positions, margin/padding values, colors, and text styles. Below is an example of the configuration used by `cssGenerator.ts`:

```json
{
  "media-screens": {
    "xxsm": "220px",
    "xsm": "320px",
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "xxl": "1536px",
    "xxxl": "1920px",
    "xxxxl": "2420px"
  },
  "positions": {
    "all": "left, right, top, bottom",
    "l": "left",
    "t": "top",
    "r": "right",
    "b": "bottom"
  },
  "margins": {
    "property": "margin",
    "combinations": {
      "all": "margin-left, margin-right, margin-top, margin-bottom",
      "lr": "margin-left, margin-right",
      "rl": "margin-right, margin-left",
      "tb": "margin-top, margin-bottom",
      "bt": "margin-bottom, margin-top",
      "lrt": "margin-left, margin-right, margin-top",
      "rlt": "margin-right, margin-left, margin-top",
      "trl": "margin-top, margin-right, margin-left",
      "tlr": "margin-top, margin-left, margin-right",
      "ltr": "margin-left, margin-top, margin-right",
      "tbr": "margin-top, margin-bottom, margin-right",
      "btr": "margin-bottom, margin-top, margin-right",
      "lbr": "margin-left, margin-bottom, margin-right",
      "lrb": "margin-left, margin-right, margin-bottom",
      "rbl": "margin-right, margin-bottom, margin-left"
    },
    "prefix": ["m-", "m--"],
    "important": true,
    "media": ["sm", "md", "lg", "xl"]
  },
  "ColorName": {
    "AliceBlue": "#f0f8ff",
    "AntiqueWhite": "#faebd7",
    "Aqua": "#00ffff",
    "Blue": "#0000ff",
    "Red": "#ff0000"
    // Add more colors as needed
  },
  "paddings": {
    "property": "padding",
    "combinations": {
      "all": "padding-left, padding-right, padding-top, padding-bottom",
      "lr": "padding-left, padding-right",
      "rl": "padding-right, padding-left",
      "tb": "padding-top, padding-bottom",
      "bt": "padding-bottom, padding-top",
      "lrt": "padding-left, padding-right, padding-top",
      "rlt": "padding-right, padding-left, padding-top",
      "trl": "padding-top, padding-right, padding-left",
      "tlr": "padding-top, padding-left, padding-right",
      "ltr": "padding-left, padding-top, padding-right",
      "tbr": "padding-top, padding-bottom, padding-right",
      "btr": "padding-bottom, padding-top, padding-right",
      "lbr": "padding-left, padding-bottom, padding-right",
      "lrb": "padding-left, padding-right, padding-bottom",
      "rbl": "padding-right, padding-bottom, padding-left"
    },

    "prefix": ["pad-", "pad--"],
    "important": true,
    "media": ["sm", "md", "lg", "xl"]
  },
  "backgrounds": {
    "property": "background",
    "combinations": {
      "bg-[ColorName]": "background-color",
      "bg-[Positions]": ["left", "top", "right", "bottom", "center"]
    },
    "prefix": ["bg-", "bg--"],
    "important": true,
    "media": ["sm", "md", "lg", "xl"]
  },
  "texts": {
    "property": "text",
    "combinations": {
      "text-[ColorName]": "color",
      "text-xs": "font-size: 0.75rem",
      "text-sm": "font-size: 0.875rem",
      "text-md": "font-size: 1rem",
      "text-lg": "font-size: 1.125rem"
    },
    "prefix": ["text-"],
    "important": true,
    "media": ["sm", "md", "lg", "xl"]
  },
  "border": {
    "property": "border",
    "combinations": {
      "b": "border",
      "b-t": "border-top",
      "b-r": "border-right",
      "b-b": "border-bottom",
      "b-l": "border-left"
    },
    "prefix": ["border-", "border--"],
    "important": true,
    "media": ["sm", "md", "lg", "xl"]
  }
}
```

---

## Example Component (Vue or Nuxt)

```vue
<template>
  <div class="my-component">
    <button class="pad-tb-50 pad-tb--50 pad-t-10 m-10i bg-Blue:sm text-sm">
      Click Me
    </button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.my-component {
  text-align: center;
  padding: 20px;
}
</style>
```

In this example, the classes such as `pad-tb-50`, `pad-tb--50`, `pad-t-10`, `m-10i`, `bg-Blue:sm`, and `text-sm` will automatically be converted into their corresponding CSS rules based on the configuration in `rules.json`.

---

## Testing & Debugging

### Test Steps

1. Create a test component and use test classes.
2. Clear previous output:
   ```bash
   rm mastorscdn/newmastors.css
   ```
3. Run:
   ```bash
   npm run cssme
   ```

### Common Debug Tips

- **Wrong Class** → Check `rules.json`
- **Duplicate Rules** → Check `seenClasses` logs
- **No Output** → Ensure `.vue` file is in correct watched directory
- **Regex Debug**:
  ```ts
  const ruleRegex = /^(m-|m--|pad-|pad--|border-|border--|bg-|bg--|text-)((?:[a-z]+(?:--)?)?)-?([0-9]{1,3}|[A-Za-z]+|xs|sm|md|lg|xl|xxl|xxxl)(i)?(?::(xxsm|xsm|sm|md|lg|xl|xxl|xxxl|xxxxl))?$/;
  ```

---

## Output Example

```css
.pad-tb-50 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.pad-tb--50 {
  padding-top: 50%;
  padding-bottom: 50%;
}
.m-10i {
  margin: 1rem !important;
}
.text-sm {
  font-size: 0.875rem;
}
@media screen and (max-width: 640px) {
  .bg-Blue:sm {
    background-color: #0000ff;
  }
}
```

---

## License

MIT
