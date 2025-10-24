import type { JSONData } from '.';

export default {
  profile: {
    name: "Clément Desableau",
    birthdate: {
      year: 1998,
      month: 5,
      day: 25,
    },
    nationality: "fr",
    address: {
      number: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    phone: "",
    email: "",
    linkedin: {
      name: "Clément Desableau",
      link: "https://www.linkedin.com/in/cl%C3%A9ment-desableau-92a411170",
    },
    github: {
      name: "ClemDee",
      link: "https://github.com/ClemDee",
    },
  },

  locations: [
    {
      id: "primarySchool",
      map: [48.99998437699585, 2.3220332073531447],
    },
    {
      id: "juniorHighschool",
      map: [48.99763416117978, 2.3194116250746593],
    },
    {
      id: "highschool",
      map: [48.99049029968197, 2.3187750829431444],
    },
    {
      id: "eisti",
      map: [49.03475585223083, 2.07003187890194],
    },
    {
      id: "xwiki",
      map: [48.8710945, 2.3454203],
    },
    {
      id: "ets",
      map: [45.49501912362286, -73.56163925173976],
    },
  ],

  education: [
    {
      id: "engineering",
      date: {
        from: "2018-09",
        to: "2021-07",
      },
      location: "eisti",
      certifications: ["engineering"],
    },
    {
      id: "engineeringETS",
      date: {
        from: "2020-01",
        to: "2020-04",
      },
      location: "ets",
    },
    {
      id: "prepa",
      date: {
        from: "2016-09",
        to: "2018-07",
      },
      location: "eisti",
    },
    {
      id: "highschool",
      date: {
        from: "2013-09",
        to: "2016-07",
      },
      location: "highschool",
      certifications: ["baccalaureat"],
    },
    {
      id: "juniorHighschool",
      date: {
        from: "2009-09",
        to: "2013-07",
      },
      location: "juniorHighschool",
      certifications: ["brevet"],
    },
    {
      id: "primarySchool",
      date: {
        from: "2004-09",
        to: "2009-07",
      },
      location: "primarySchool",
    },
  ],

  experience: [
    {
      id: "sabbatical",
      date: {
        from: "2024",
        to: "2025",
      },
    },
    {
      id: "xwiki-cdi",
      date: {
        from: "2021-09",
        to: "2023-12",
      },
      location: "xwiki",
      skills: [
        "html",
        "css",
        "javascript",
        "vue",
        "java",
        "ui",
        "ux",
        "git",
      ],
    },
    {
      id: "google-hash-code-2021",
      date: {
        from: "2021-02-25",
        to: "2021-02-25",
      },
      skills: [
        "python",
      ],
    },
    {
      id: "eisti-alternance",
      date: {
        from: "2020-09",
        to: "2021-08",
      },
      location: "xwiki",
      skills: [
        "html",
        "css",
        "javascript",
        "vue",
        "java",
        "ui",
        "ux",
        "git",
      ],
    },
    {
      id: "eisti-internship-ing2",
      date: {
        from: "2020-05",
        to: "2020-08",
      },
      location: "xwiki",
      skills: [
        "html",
        "css",
        "javascript",
        "vue",
        "ui",
        "ux",
        "git",
      ],
    },
    {
      id: "eistikathon-2",
      date: {
        from: "2019-12",
        to: "2019-12",
      },
      location: "eisti",
      skills: [
        "html",
        "css",
        "javascript",
        "angular",
        "git",
      ],
    },
    {
      id: "eisti-internship-ing1",
      date: {
        from: "2019-05",
        to: "2019-08",
      },
      location: "xwiki",
      skills: [
        "html",
        "css",
        "javascript",
        "jquery",
        "ui",
        "ux",
        "git",
      ],
    },
    {
      id: "eistikathon-1",
      date: {
        from: "2018-12",
        to: "2018-12",
      },
      location: "eisti",
      skills: [
        "mysql",
        "git",
        "cicd",
      ],
    },
    {
      id: "eisti-vdsa",
      date: {
        from: "2018-09",
        to: "2018-12",
      },
      location: "eisti",
      skills: [
        "html",
        "css",
        "javascript",
        "jquery",
        "responsiveDesign",
        "git",
      ],
    },
    {
      id: "eisti-footbet",
      date: {
        from: "2018-06",
        to: "2018-07",
      },
      location: "eisti",
      skills: [
        "html",
        "css",
        "javascript",
        "responsiveDesign",
        "php",
        "git",
      ],
    },
    {
      id: "eisti-LabVIEW",
      date: {
        from: "2018-05",
        to: "2018-06",
      },
      location: "eisti",
      skills: [
        "ocaml",
      ],
    },
    {
      id: "eisti-TSP",
      date: {
        from: "2017-12",
        to: "2018-01",
      },
      location: "eisti",
      skills: [
        "ocaml",
      ],
    },
    {
      id: "eisti-oh-hell",
      date: {
        from: "2017-10",
        to: "2017-10",
      },
      location: "eisti",
      skills: [
        "ocaml",
      ],
    },
    {
      id: "eisti-bezier",
      date: {
        from: "2017-05",
        to: "2017-06",
      },
      location: "eisti",
      skills: [
        "python",
      ],
    },
    {
      id: "eisti-turtle",
      date: {
        from: "2017-01",
        to: "2017-01",
      },
      location: "eisti",
      skills: [
        "python",
      ],
    },
    {
      id: "eisti-TIPE",
      date: {
        from: "2016-09",
        to: "2018-07",
      },
      location: "eisti",
      skills: [
        "csharp",
        "unity",
      ],
    },
  ],

  hobbies: [
    {
      id: "music",
    },
    {
      id: "projects",
    },
    {
      id: "projects-cv",
      date: {
        from: "2023",
      },
      url: "https://clemdee.github.io/cv",
      skills: [
        "html",
        "css",
        "typescript",
        "vue",
        "vite",
        "ui",
        "git",
        "cicd",
      ],
    },
    {
      id: "projects-enalion",
      date: {
        from: "2024",
      },
      url: "https://enalion.fr",
      skills: [
        "html",
        "css",
        "typescript",
        "vue",
        "ui",
        "a11y",
        "vite",
        "git",
        "cicd",
      ],
    },
    {
      id: "projects-amalgamemusic",
      date: {
        from: "2025",
      },
      url: "https://amalgamemusic.com",
      skills: [
        "html",
        "css",
        "typescript",
        "vue",
        "ui",
        "ux",
        "a11y",
        "vite",
        "git",
        "cicd",
      ],
    },
  ],

  skills: [
    {
      id: "fr",
      level: 1,
      tags: [
        "language",
      ],
    },
    {
      id: "en",
      level: 0.9,
      tags: [
        "language",
      ],
    },
    {
      id: "es",
      level: 0.6,
      tags: [
        "language",
      ],
    },

    {
      id: "html",
      level: 0.95,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "main",
      ],
    },
    {
      id: "css",
      level: 0.95,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "main",
      ],
    },
    {
      id: "javascript",
      level: 0.95,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "main",
      ],
    },
    {
      id: "typescript",
      level: 0.85,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "main",
      ],
    },
    {
      id: "jquery",
      level: 0.85,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "framework",
      ],
    },
    {
      id: "vue",
      level: 0.92,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "framework",
        "main",
      ],
    },
    {
      id: "angular",
      level: 0.4,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "framework",
      ],
    },
    {
      id: "nodejs",
      level: 0.75,
      tags: [
        "programming",
        "webdev",
        "backend",
        "tool",
        "main",
      ],
    },
    {
      id: "vite",
      level: 0.75,
      tags: [
        "programming",
        "webdev",
        "backend",
        "tool",
        "main",
      ],
    },
    {
      id: "php",
      level: 0.65,
      tags: [
        "programming",
        "webdev",
        "backend",
      ],
    },
    {
      id: "jee",
      level: 0.5,
      tags: [
        "programming",
        "webdev",
        "backend",
        "framework",
      ],
    },
    {
      id: "mysql",
      level: 0.75,
      tags: [
        "programming",
        "webdev",
        "database",
        "main",
      ],
    },
    {
      id: "oracleSql",
      level: 0.7,
      tags: [
        "programming",
        "webdev",
        "database",
      ],
    },
    {
      id: "c",
      level: 0.7,
      tags: [
        "programming",
      ],
    },
    {
      id: "cpp",
      level: 0.75,
      tags: [
        "programming",
      ],
    },
    {
      id: "csharp",
      level: 0.65,
      tags: [
        "programming",
      ],
    },
    {
      id: "java",
      level: 0.75,
      tags: [
        "programming",
      ],
    },
    {
      id: "python",
      level: 0.85,
      tags: [
        "programming",
      ],
    },
    {
      id: "ocaml",
      level: 0.6,
      tags: [
        "programming",
      ],
    },
    {
      id: "sh",
      level: 0.85,
      tags: [
        "programming",
        "shell",
      ],
    },
    {
      id: "ui",
      level: 0.9,
      tags: [
        "programming",
        "design",
        "main",
      ],
    },

    {
      id: "ux",
      level: 0.8,
      tags: [
        "programming",
        "design",
        "main",
      ],
    },
    {
      id: "responsiveDesign",
      level: 0.95,
      tags: [
        "programming",
        "webdev",
        "frontend",
        "design",
        "main",
      ],
    },
    {
      id: "a11y",
      level: 0.75,
      tags: [
        "programming",
        "design",
        "main",
      ],
    },
    {
      id: "git",
      level: 0.8,
      tags: [
        "programming",
        "software",
        "collaboration",
        "main",
      ],
    },
    {
      id: "cicd",
      level: 0.75,
      tags: [
        "programming",
        "devops",
        "main",
      ],
    },

    {
      id: "debian",
      level: 0.9,
      tags: [
        "os",
        "linux",
      ],
    },
    {
      id: "ubuntu",
      level: 0.9,
      tags: [
        "os",
        "linux",
      ],
    },
    {
      id: "windows10",
      level: 0.7,
      tags: [
        "os",
        "windows",
      ],
    },
    {
      id: "windows11",
      level: 0.7,
      tags: [
        "os",
        "windows",
      ],
    },

    {
      id: "msOffice",
      level: 0.9,
      tags: [
        "software",
        "office",
      ],
    },
    {
      id: "libreOffice",
      level: 0.7,
      tags: [
        "software",
        "office",
      ],
    },
    {
      id: "vim",
      level: 0.85,
      tags: [
        "software",
        "editor",
      ],
    },
    {
      id: "gitlab",
      level: 0.8,
      tags: [
        "software",
        "collaboration",
      ],
    },
    {
      id: "github",
      level: 0.8,
      tags: [
        "software",
        "collaboration",
      ],
    },
  ]
} as const satisfies JSONData;
