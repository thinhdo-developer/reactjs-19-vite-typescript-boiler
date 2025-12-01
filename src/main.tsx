import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
// Service Worker
import { APP_ENV } from "@configs/env";
import "./registerServiceWorker";

// App version from package.json (injected at build time via vite.config.ts)
const APP_VERSION = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "0.0.0";
const VERSION_STORAGE_KEY = "app_version";
const CACHE_VERSION_KEY = "cache_version";

/**
 * Clear workbox cache based on version tracking
 * - Always clears in dev mode
 * - Clears in prod/qa when version changes (new deployment)
 */
async function clearCacheIfNeeded(): Promise<void> {
  const isDev = APP_ENV === "development" || import.meta.env.MODE === "development";
  
  try {
    // Get stored version from localStorage
    const storedVersion = localStorage.getItem(VERSION_STORAGE_KEY);
    const versionChanged = storedVersion !== APP_VERSION;
    
    // Always clear in dev mode, or if version changed in prod/qa
    const shouldClear = isDev || versionChanged;
    
    if (!shouldClear) {
      console.log(`[Cache] Version ${APP_VERSION} - No cache clear needed`);
      return;
    }
    
    if (versionChanged && !isDev) {
      console.log(
        `[Cache] Version changed: ${storedVersion || "unknown"} → ${APP_VERSION}`
      );
    }
    
    if (isDev) {
      console.log(`[Cache] Dev mode - Clearing all caches...`);
    }
    
    // Clear all browser caches
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      console.log(`[Cache] Found ${cacheNames.length} cache(s):`, cacheNames);
      
      const deletePromises = cacheNames.map(async (cacheName) => {
        const deleted = await caches.delete(cacheName);
        console.log(
          `[Cache] ${deleted ? "✓" : "✗"} Deleted cache: ${cacheName}`
        );
        return deleted;
      });
      
      await Promise.all(deletePromises);
      console.log(`[Cache] ✓ All caches cleared`);
    }
    
    // Unregister all service workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log(`[Cache] Found ${registrations.length} service worker(s)`);
      
      const unregisterPromises = registrations.map(async (registration) => {
        const unregistered = await registration.unregister();
        console.log(
          `[Cache] ${unregistered ? "✓" : "✗"} Unregistered: ${registration.scope}`
        );
        return unregistered;
      });
      
      await Promise.all(unregisterPromises);
      console.log(`[Cache] ✓ All service workers unregistered`);
    }
    
    // Update stored version after successful cache clear
    localStorage.setItem(VERSION_STORAGE_KEY, APP_VERSION);
    localStorage.setItem(CACHE_VERSION_KEY, APP_VERSION);
    console.log(`[Cache] ✓ Version ${APP_VERSION} stored`);
    
    // Reload page if version changed in production (to get fresh assets)
    if (versionChanged && !isDev) {
      console.log(`[Cache] Reloading page to load new version...`);
      window.location.reload();
      return;
    }
  } catch (error) {
    console.error("[Cache] ✗ Error clearing cache:", error);
  }
}

// Clear cache on app load
clearCacheIfNeeded();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
