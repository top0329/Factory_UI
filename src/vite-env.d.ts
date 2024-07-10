/// <reference types="vite-plugin-svgr/client" />
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.webp';
declare module '*.css';
interface ImportMeta {
  readonly env: ImportMetaEnv;
}