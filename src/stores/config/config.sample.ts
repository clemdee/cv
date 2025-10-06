import type { Config } from '.';

export default {
  education: {
    date: {
      from: "2015",
    },
    show: {
      id: [
        "engineering",
        "engineeringETS",
        "prepa",
        "highschool",
      ],
    },
  },

  experience: {
    date: {
      from: "2015",
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
    level: {
      min: 0.6,
    },
  },

} as const satisfies Config;