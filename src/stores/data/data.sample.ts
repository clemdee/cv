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
      link: "https://www.linkedin.com/in/cl%C3%A9ment-desableau-92a411170/",
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
      id: "primarySchool",
      date: {
        from: "2004-09",
        to: "2009-07",
      },
      location: "primarySchool",
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
      id: "highschool",
      date: {
        from: "2013-09",
        to: "2016-07",
      },
      location: "highschool",
      certifications: ["baccalaureat"],
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
  ],

  experience: [
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
        "bootstrap",
        "responsiveDesign",
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
        "responsiveDesign",
        "ux",
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
        "jquery",
        "vue",
        "ux",
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
        "jquery",
        "vue",
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
        "jquery",
        "java",
      ],
    },
  ],

  skills: {
    languages: [
      {
        id: "fr",
        level: 1,
        tags: [
          "mothertongue",
        ],
      },
      {
        id: "en",
        level: 0.9,
      },
      {
        id: "es",
        level: 0.6,
      },
    ],

    programmingLanguages: [
      {
        id: "html",
        level: 0.95,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "language",
        ],
      },
      {
        id: "css",
        level: 0.95,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "language",
        ],
      },
      {
        id: "javascript",
        level: 0.95,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "language",
        ],
      },
      {
        id: "typescript",
        level: 0.85,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "language",
        ],
      },
      {
        id: "responsiveDesign",
        level: 0.95,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "practise",
        ],
      },
      {
        id: "jQuery",
        level: 0.85,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "framework",
        ],
      },
      {
        id: "bootstrap",
        level: 0.75,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "framework",
        ],
      },
      {
        id: "vue",
        level: 0.92,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "framework",
        ],
      },
      {
        id: "angular",
        level: 0.4,
        tags: [
          "programation",
          "webdev",
          "frontend",
          "framework",
        ],
      },
      {
        id: "nodejs",
        level: 0.75,
        tags: [
          "programation",
          "webdev",
          "backend",
          "tool",
        ],
      },
      {
        id: "php",
        level: 0.65,
        tags: [
          "programation",
          "webdev",
          "backend",
          "language",
        ],
      },
      {
        id: "jee",
        level: 0.5,
        tags: [
          "programation",
          "webdev",
          "backend",
          "framework",
        ],
      },
      {
        id: "mysql",
        level: 0.75,
        tags: [
          "programation",
          "webdev",
          "database",
          "language",
        ],
      },
      {
        id: "oracleSql",
        level: 0.7,
        tags: [
          "programation",
          "webdev",
          "database",
          "language",
        ],
      },
      {
        id: "c",
        level: 0.8,
        tags: [
          "programation",
          "language",
        ],
      },
      {
        id: "cpp",
        level: 0.85,
        tags: [
          "programation",
          "language",
        ],
      },
      {
        id: "csharp",
        level: 0.65,
        tags: [
          "programation",
          "language",
        ],
      },
      {
        id: "java",
        level: 0.75,
        tags: [
          "programation",
          "language",
        ],
      },
      {
        id: "python",
        level: 0.85,
        tags: [
          "programation",
          "language",
        ],
      },
      {
        id: "ocaml",
        level: 0.6,
        tags: [
          "programation",
          "language",
        ],
      },
      {
        id: "sh",
        level: 0.85,
        tags: [
          "programation",
          "language",
          "shell",
        ],
      },
    ],

    os: [
      {
        id: "windows",
        level: 0.7,
      },
      {
        id: "linux",
        level: 0.9,
      },
    ],

    softwares: [
      {
        id: "msOffice",
        level: 0.9,
        tags: [
          "office",
        ],
      },
      {
        id: "libreOffice",
        level: 0.7,
        tags: [
          "office",
        ],
      },
      {
        id: "vim",
        level: 0.85,
        tags: [
          "editor",
        ],
      },
      {
        id: "git",
        level: 0.8,
        tags: [
          "collaboration",
        ],
      },
      {
        id: "gitlab",
        level: 0.8,
        tags: [
          "collaboration",
        ],
      },
      {
        id: "github",
        level: 0.8,
        tags: [
          "collaboration",
        ],
      },
    ],
  }
} as const satisfies JSONData;
