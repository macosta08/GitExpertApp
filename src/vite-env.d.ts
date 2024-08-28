// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KEY_API_GIF: string;
  // otras variables de entorno que utilices
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
