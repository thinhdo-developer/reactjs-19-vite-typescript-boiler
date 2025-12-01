import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";

import type { VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8")
);
const APP_VERSION = packageJson.version;

const getPwaOptions = (env: string): Partial<VitePWAOptions> => {
  return {
    mode: "development",
    base: "/",
    registerType: "autoUpdate",
    includeAssets: [
      "favicon.ico",
      "apple-touch-icon-180x180",
      "pwa-192x192.png",
      "pwa-512x512.png",
    ],
    manifest: {
      name: "Tiktak",
      short_name: "Tiktak",
      description: "Tiktak App for managing Buger's orders",
      theme_color: "#333c4d",
      background_color: "#0f172a",
      display: "standalone",
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      screenshots: [
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          form_factor: "narrow",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          form_factor: "wide",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*"],
      runtimeCaching: [
        {
          urlPattern: () => {
            return true;
          },
          handler: "CacheFirst" as const,
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: env === "development",
      /* when using generateSW the PWA plugin will switch to classic */
      type: "module",
      navigateFallback: "index.html",
      suppressWarnings: true,
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  const APP_ENV = env.APP_ENV;

  return {
    plugins: [react(), tailwindcss(), VitePWA(getPwaOptions(APP_ENV))],
    define: {
      __APP_ENV__: JSON.stringify(APP_ENV),
      __APP_VERSION__: JSON.stringify(APP_VERSION),
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "@assets",
          replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
        },
        {
          find: "@types",
          replacement: fileURLToPath(
            new URL("./src/common/types", import.meta.url)
          ),
        },
        {
          find: "@enums",
          replacement: fileURLToPath(
            new URL("./src/common/enums", import.meta.url)
          ),
        },
        {
          find: "@configs",
          replacement: fileURLToPath(new URL("./src/configs", import.meta.url)),
        },
        {
          find: "@routes",
          replacement: fileURLToPath(new URL("./src/routes", import.meta.url)),
        },
        {
          find: "@utils",
          replacement: fileURLToPath(new URL("./src/utils", import.meta.url)),
        },
        {
          find: "@services",
          replacement: fileURLToPath(
            new URL("./src/services", import.meta.url)
          ),
        },
        {
          find: "@layouts",
          replacement: fileURLToPath(new URL("./src/layouts", import.meta.url)),
        },
        {
          find: "@components",
          replacement: fileURLToPath(
            new URL("./src/components", import.meta.url)
          ),
        },
        {
          find: "@store",
          replacement: fileURLToPath(new URL("./src/store", import.meta.url)),
        },
        {
          find: "@hooks",
          replacement: fileURLToPath(new URL("./src/hooks", import.meta.url)),
        },
        {
          find: "@locales",
          replacement: fileURLToPath(new URL("./src/locales", import.meta.url)),
        },
        {
          find: "@pages",
          replacement: fileURLToPath(new URL("./src/pages", import.meta.url)),
        },
        {
          find: "@routes",
          replacement: fileURLToPath(new URL("./src/routes", import.meta.url)),
        },
        {
          find: "@guards",
          replacement: fileURLToPath(new URL("./src/guards", import.meta.url)),
        },
      ],
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
    },
    server: {
      port: 3005,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/setupTest.ts"],
      reporters: ["verbose", "vitest-sonar-reporter"],
      outputFile: {
        json: "my-json-report.json",
        "vitest-sonar-reporter": "sonar-report.xml",
      },
      coverage: {
        provider: "v8",
        reporter: ["text", "lcov"],
      },
    },
  };
});
