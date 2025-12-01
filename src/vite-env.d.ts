/// <reference types="vite/client" />

// Declare env variables for Vite
interface ImportMetaEnv {
  readonly VITE_HOST_API_URL: string;
  readonly VITE_HOST_API_VERSION: string;
  readonly MODE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global constants injected by Vite define
declare const __APP_VERSION__: string;
declare const __APP_ENV__: string;