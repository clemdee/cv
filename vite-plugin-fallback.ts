/**
 * If store data is not found, load sample data
 */
import type { Plugin } from 'vite';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { cwd } from 'node:process';

export default function fallbackPlugin (): Plugin {
  return {
    name: 'vite-plugin-fallback',
    enforce: 'pre',

    async resolveId (source, importer) {
      const filePath = resolve(importer ? dirname(importer) : cwd(), source);
      if (
        filePath.endsWith('src/stores/data/data')
        || filePath.endsWith('src/stores/config/config')
      ) {
        if (!existsSync(`${filePath}.ts`)) {
          const fallbackFile = `${filePath}.sample.ts`;
          return fallbackFile;
        }
      }
      return null;
    },
  };
}
