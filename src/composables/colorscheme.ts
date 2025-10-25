import { useStyleTag } from '@vueuse/core';
import { type Ref, watch } from 'vue';

export const colorschemes = {
  light: {
    title: 'Default Light',
    styles: {
      '--colorscheme-main': '#313e67',
      '--colorscheme-secondary': '#ef6a18',
      '--colorscheme-content-background': '#eee',
      '--colorscheme-content-title-background': '#ddd',
      '--colorscheme-main-text': '#eee',
      '--colorscheme-secondary-text': '#222',
      '--colorscheme-content-text': '#111',
      '--colorscheme-content-title-text': '#111',
    },
  },
  dark: {
    title: 'Default Dark',
    styles: {
      '--colorscheme-main': '#313e67',
      '--colorscheme-secondary': '#ef6a18',
      '--colorscheme-content-background': '#222',
      '--colorscheme-content-title-background': '#334',
      '--colorscheme-main-text': '#fdfdfd',
      '--colorscheme-secondary-text': '#222',
      '--colorscheme-content-text': '#fdfdfd',
      '--colorscheme-content-title-text': '#fdfdfd',
    },
  },
  forest: {
    title: 'Forest',
    styles: {
      '--colorscheme-main': '#33f3b6ff',
      '--colorscheme-secondary': '#974329',
      '--colorscheme-content-background': '#f1fdff',
      '--colorscheme-content-title-background': '#e1f4f1',
      '--colorscheme-main-text': '#111',
      '--colorscheme-secondary-text': '#f1fdff',
      '--colorscheme-content-text': '#111',
      '--colorscheme-content-title-text': '#111',
    },
  },
  soda: {
    title: 'Soda',
    styles: {
      '--colorscheme-main': '#00e1ff',
      '--colorscheme-secondary': '#ff019b',
      '--colorscheme-content-background': '#f1fdff',
      '--colorscheme-content-title-background': '#feecfc',
      '--colorscheme-main-text': '#111',
      '--colorscheme-secondary-text': '#f1fdff',
      '--colorscheme-content-text': '#111',
      '--colorscheme-content-title-text': '#111',
    },
  },
  bw: {
    title: 'B&W',
    styles: {
      '--colorscheme-main': '#222',
      '--colorscheme-secondary': '#888',
      '--colorscheme-content-background': '#eee',
      '--colorscheme-content-title-background': '#ddd',
      '--colorscheme-main-text': '#f1fdff',
      '--colorscheme-secondary-text': '#eee',
      '--colorscheme-content-text': '#111',
      '--colorscheme-content-title-text': '#111',
    },
  },
};

export type ColorschemeId = keyof typeof colorschemes;

const transitionDurationMS = 250;
const style = `
html {
  --transition-duration: ${transitionDurationMS}ms;

  * {
    transition: all linear var(--transition-duration);
  }
}
`;

const {
  load,
  unload,
} = useStyleTag(style);

let timeoutId: ReturnType<typeof setTimeout>;
export const useTransition = (colorscheme: Ref<string>) => {
  watch(colorscheme, () => {
    clearTimeout(timeoutId);

    load();
    timeoutId = setTimeout(
      () => { unload(); },
      transitionDurationMS
    );
  }, {
    flush: 'sync',
  });
};
