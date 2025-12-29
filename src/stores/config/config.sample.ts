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
        min: 0.61,
      },
    },

    groups: [
      {
        title: {
          en: 'Main Stack',
          fr: 'Stack Principale',
        },
        filter: {
          tag: ['programming', 'main'],
        },
      },
      {
        title: {
          en: 'Secondary Stack',
          fr: 'Stack Secondaire',
        },
        filter: {
          tag: ['programming', '!main'],
        },
      },
      {
        title: {
          en: 'Operating Systems',
          fr: 'Systèmes d\'exploitations',
        },
        filter: {
          tag: ['os'],
        },
      },
    ],
  },

} as const satisfies Config;
