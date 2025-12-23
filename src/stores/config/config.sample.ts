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
    filter: {
      date: {
        min: '2015',
      },
      id: [
        'engineering',
        'engineeringETS',
      ],
    },
  },

  experience: {
    filter: {
      date: {
        min: '2015',
      },
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
