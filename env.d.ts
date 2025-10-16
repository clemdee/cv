/// <reference types="vite/client" />

declare module "config"
declare module "data"

declare module 'virtual:ls*' {
  const paths: string[];
  export default paths;
}
