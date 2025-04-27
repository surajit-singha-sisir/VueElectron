# VueElectron Template

A modern template for building cross-platform desktop applications using **Electron** and **Vue 3**. This project integrates **Vite** for fast development, **Electron Forge** for streamlined packaging, and **Vue Router** for navigation. It includes TypeScript support and a clean project structure to help you get started quickly.

## Features

- **Electron**: Create desktop apps for Windows, macOS, and Linux.
- **Vue 3**: Utilize the Composition API for reactive UI development.
- **Vite**: Enjoy a fast development server and optimized builds.
- **Electron Forge**: Simplify app packaging and distribution with makers for DEB, RPM, Squirrel, and ZIP.
- **Vue Router**: Built-in routing for single-page applications.
- **TypeScript**: Optional type safety for robust code.
- **Custom Window Controls**: iOS-style minimize, maximize, and close buttons.

## Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/surajit-singha-sisir/VueElectron.git
cd VueElectron
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

Start the Electron app with Vite’s development server:

```bash
npm start
```

This launches the app with hot-reloading for Vue components.

### 4. Package the Application

Create a distributable package:

```bash
npm run package
```

The output will be in the `out` folder.

### 5. Build Installers

Generate platform-specific installers (e.g., DEB, RPM, EXE):

```bash
npm run make
```

Artifacts will be in the `out/make` folder.

### 6. Publish the Application

Publish the app to a configured platform (requires additional setup):

```bash
npm run publish
```

## Project Structure

```
VueElectron/
├── src/                    # Vue 3 source code
│   ├── components/         # Vue components
│   │   ├── Controls.vue    # Window control buttons (minimize, maximize, close)
│   │   └── Headers.vue     # Header component (optional, not used in current setup)
│   ├── layouts/            # Layout components
│   │   └── DefaultLayout.vue  # Default layout with iOS-style header
│   ├── pages/              # Page components
│   │   ├── About.vue       # About page
│   │   └── Index.vue       # Home page
│   ├── App.vue             # Main Vue component
│   ├── index.css           # Global styles
│   ├── main.js             # Vue entry point
│   ├── preload.js          # Preload script for IPC
│   ├── renderer.js         # Renderer process script
│   └── router.js           # Vue Router configuration
├── forge.config.js         # Electron Forge configuration
├── index.html              # HTML entry point
├── package-lock.json       # Dependency lock file
├── package.json            # Project metadata and scripts
├── README.md               # This file
├── vite.main.config.mjs    # Vite config for Electron main process
├── vite.preload.config.mjs # Vite config for preload scripts
└── vite.renderer.config.mjs # Vite config for renderer process
```

## Available Scripts

- `npm start`: Runs the Electron app with Vite’s dev server.
- `npm run package`: Packages the app into the `out` folder.
- `npm run make`: Builds platform-specific installers (DEB, RPM, Squirrel, ZIP).
- `npm run publish`: Publishes the app (requires configuration).
- `npm run lint`: Placeholder for linting (not configured).

## Dependencies

### Production Dependencies

- `electron-squirrel-startup`: Handles Windows installer shortcuts.
- `vue`: Vue 3 for building the UI.
- `vue-router`: Routing for single-page applications.

### Development Dependencies

- `@electron-forge/cli`: CLI for Electron Forge.
- `@electron-forge/maker-*`: Makers for DEB, RPM, Squirrel, and ZIP.
- `@electron-forge/plugin-auto-unpack-natives`: Unpacks native modules.
- `@electron-forge/plugin-fuses`: Configures Electron Fuses for security.
- `@electron-forge/plugin-vite`: Integrates Vite with Electron Forge.
- `@vitejs/plugin-vue`: Vue 3 support for Vite.
- `electron`: Electron framework (v35.2.1).
- `vite`: Fast build tool (v5.4.18).

## Customization

### Adding Vue Features

To add plugins like Pinia or Vuex:

```bash
npm install pinia
```

Then configure in `src/main.js` or a dedicated module.

### Extending Electron

To add features like system trays or custom menus:

- Update `src/main.js` with Electron APIs.
- Expose new IPC methods in `src/preload.js`.
- Add type declarations in `src/types/electron.d.ts`.

### Disabling TypeScript

- Remove `lang="ts"` from Vue components.
- Delete `tsconfig.json` if TypeScript isn’t needed.

## Troubleshooting

- **Electron doesn’t start**: Verify `electron` is installed and check `src/main.js` for errors.
- **TypeScript errors**: Ensure `src/types/electron.d.ts` exists and is included in `tsconfig.json`.
- **Packaging fails**: Clear the `out` folder and reinstall dependencies.

_For help, open an issue._

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a branch:

    ```bash
    git checkout -b feature/my-feature
    ```

3. Commit changes:

    ```bash
    git commit -m "Add my feature"
    ```

4. Push to the branch:

    ```bash
    git push origin feature/my-feature
    ```

5. Open a pull request.

Follow the Code of Conduct and adhere to linting rules (if configured).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Electron for desktop app development.
- Vue 3 for reactive UIs.
- Vite for fast builds.
- Electron Forge for packaging.
- Vue Router for navigation.

---

Built with 💻 by Surajit Singha Sisir.
