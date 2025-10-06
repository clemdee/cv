import type { Config } from '.';

export default {
  education: {
    date: {
      from: "2015",
    },
    show: {
      id: [
        "highschool",
        "prepa",
        "engineering",
        "engineeringETS",
      ],
    },
  },

  experience: {
    date: {
      from: "2015",
    },
    show: {
      id: [
        "eisti-internship-ing1",
        "eisti-internship-ing2",
        "eisti-alternance",
        "xwiki-cdi"
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