# Electron TypeScript App

A modern Electron application built with TypeScript, Webpack, and Yarn.

## Features

- ⚡ **Electron** - Cross-platform desktop app framework
- 🔷 **TypeScript** - Type-safe JavaScript development
- 📦 **Webpack** - Module bundler and build tool
- 🧶 **Yarn** - Fast, reliable package manager
- 🎨 **Modern UI** - Clean and responsive interface
- 🔧 **ESLint** - Code linting and formatting
- 🔄 **Hot Reload** - Development with live reloading

## Project Structure

```
├── src/
│   ├── main/           # Main process (Electron)
│   │   └── main.ts
│   └── renderer/       # Renderer process (UI)
│       ├── index.html
│       ├── renderer.ts
│       ├── preload.ts
│       └── styles.css
├── dist/               # Build output
├── webpack.config.js   # Webpack configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Project dependencies
└── .eslintrc.js      # ESLint configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

### Development

1. Start the development server:
   ```bash
   yarn dev
   ```

   This will:
   - Build the TypeScript code with Webpack
   - Start Electron with hot reloading
   - Open DevTools automatically

### Building

1. Build for production:
   ```bash
   yarn build
   ```

2. Run the built application:
   ```bash
   yarn start
   ```

### Other Commands

- **Lint code**: `yarn lint`
- **Fix linting issues**: `yarn lint:fix`
- **Clean build directory**: `yarn clean`

## Development Notes

### Main Process vs Renderer Process

- **Main Process** (`src/main/main.ts`): Controls application lifecycle and creates renderer processes
- **Renderer Process** (`src/renderer/renderer.ts`): Handles the UI and user interactions
- **Preload Script** (`src/renderer/preload.ts`): Safely exposes Electron APIs to the renderer

### Security

This project follows Electron security best practices:
- Context isolation enabled
- Node integration disabled in renderer
- Preload script for safe API exposure
- Content Security Policy configured

### TypeScript Configuration

The project uses strict TypeScript settings for better code quality and type safety. Configuration can be found in `tsconfig.json`.

### Webpack Configuration

Webpack is configured to handle both main and renderer processes with separate configurations for optimal bundling.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `yarn lint:fix`
5. Test your changes: `yarn dev`
6. Submit a pull request

## License

MIT License - see LICENSE file for details.