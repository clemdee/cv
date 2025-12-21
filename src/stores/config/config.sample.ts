import type { Config } from '.';

export default {

  colorscheme: {
    preset: 'light',
  },

  profile: {
    filename: 'profile-2.jpg',
    frame: 'roundedHalf',
  },

  coordinates: {
    showPronouns: false,
  },

  education: {
    date: {
      min: '2015',
    },
    filter: {
      id: [
        'engineering',
        'engineeringETS',
      ],
    },
  },

  experience: {
    date: {
      min: '2015',
    },
    filter: {
      id: [
        'sabbatical',
        'xwiki-cdi',
        'eisti-alternance',
        'eisti-internship-ing2',
        'eisti-internship-ing1',
        'eistikathon-1',
      ],
    },
  },

  hobbies: {

  },

  skills: {
    filter: {
      level: {
        min: 0.6,
      },
    },
  },

} as const satisfies Config;
