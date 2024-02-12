/**
 * If store data is not found, load sample data
 */
import type { Plugin } from 'vite';

import { existsSync } from 'fs';
import { resolve, dirname } from 'path';

export default function fallbackPlugin (): Plugin {
  return {
    name: 'vite-plugin-fallback',
    enforce: 'pre',

    async resolveId (source, importer) {
      const filePath = resolve(importer ? dirname(importer) : process.cwd(), source);
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
