/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly LOGIN_URL: string
  readonly COMPUTE_URL: string
  readonly GRAVITY_USERNAME: string
  readonly GRAVITY_PASSWORD: string
  readonly GRAVITY_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
