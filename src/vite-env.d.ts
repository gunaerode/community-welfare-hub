/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the optional API server (see src/config/runtime.ts). Empty = static mode. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
