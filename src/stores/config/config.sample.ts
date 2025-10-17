import type { Config } from '.';

export default {

  colorscheme: {
    preset: 'light',
  },

  profile: {
    frame: 'roundedHalf',
  },

  coordinates: {
    showPronouns: true,
  },

  education: {
    date: {
      min: "2015",
    },
    show: {
      id: [
        "engineering",
        "engineeringETS",
      ],
    },
  },

  experience: {
    date: {
      min: "2015",
    },
    show: {
      id: [
        "xwiki-cdi",
        "eisti-alternance",
        "eisti-internship-ing2",
        "eisti-internship-ing1",
        "eistikathon-1",
      ],
    },
  },

  hobbies: {

  },

  skills: {
    show: {
      level: {
        min: 0.6,
      },
    }
  },

} as const satisfies Config;