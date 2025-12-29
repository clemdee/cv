import type { JSONData } from '.';

export default {
  profile: {
    name: 'Clément Desableau',
    birthdate: {
      year: 1998,
      month: 5,
      day: 25,
    },
    nationality: 'fr',
    address: {
      number: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    phone: '',
    email: '',
    cv: {
      link: 'https://clemdee.github.io/cv/',
    },
    linkedin: {
      link: 'https://www.linkedin.com/in/cl%C3%A9ment-desableau-92a411170',
    },
    github: {
      link: 'https://github.com/ClemDee',
    },
  },

  locations: [
    {
      id: 'primarySchool',
      title: {
        en: 'Ferdinand Buisson Primary School',
        fr: 'École Primaire Ferdinand Buisson',
      },
      location: 'Montmorency, France',
      map: [48.99998437699585, 2.3220332073531447],
    },

    {
      id: 'juniorHighschool',
      title: {
        en: 'Pierre de Ronsard Junior High School',
        fr: 'Collège Pierre de Ronsard',
      },
      location: 'Montmorency, France',
      map: [48.99763416117978, 2.3194116250746593],
    },

    {
      id: 'highschool',
      title: {
        en: 'Jean-Jacques Rousseau High School',
        fr: 'Lycée Jean-Jacques Rousseau',
      },
      location: 'Montmorency, France',
      map: [48.99049029968197, 2.3187750829431444],
    },

    {
      id: 'eisti',
      title: {
        en: 'EISTI (Graduate School in Computer Science and Mathematics Engineering)',
        fr: 'EISTI (École Internationale des Sciences du Traitement de l\'Information)',
      },
      location: 'Cergy, France',
      map: [49.03475585223083, 2.07003187890194],
    },

    {
      id: 'xwiki',
      title: 'XWiki',
      location: 'Paris, France',
      map: [48.8710945, 2.3454203],
    },

    {
      id: 'ets',
      title: {
        en: 'ÉTS',
        fr: 'ÉTS (École de Technologie Supérieure)',
      },
      location: 'Montréal, Canada',
      map: [45.49501912362286, -73.56163925173976],
    },
  ],

  education: [
    {
      id: 'engineering',
      title: {
        en: 'Engineering School',
        fr: 'Cycle Ingénieur - Génie Informatique',
      },
      description: {
        en: 'Three years in Engineering school in Computer and Information Sciences. Specialized in Cyber Security for last year',
        fr: 'Cycle ingénieur Informatique. Spécialisation Cyber Security pour la dernière année',
      },
      date: {
        from: '2018-09',
        to: '2021-07',
      },
      location: 'eisti',
      certifications: ['engineering'],
    },

    {
      id: 'engineeringETS',
      title: 'Engineering School',
      description: {
        en: 'Semester abroad',
        fr: 'Semestre à l\'étranger',
      },
      date: {
        from: '2020-01',
        to: '2020-04',
      },
      location: 'ets',
    },

    {
      id: 'prepa',
      title: {
        en: 'Prepa',
        fr: 'Cycle Préparatoire Intégré',
      },
      description: {
        en: 'Two-years post secondary programme in preparation for nation-wide competitive entrance exams to french engineering',
        fr: 'Prépa Intégrée, Équivalence L2 Mathématiques / Informatique',
      },
      date: {
        from: '2016-09',
        to: '2018-07',
      },
      location: 'eisti',
    },

    {
      id: 'highschool',
      title: {
        en: 'High School',
        fr: 'Lycée',
      },
      description: {
        en: 'Baccalauréat (equivalent to A levels) in Sciences with highest honours, European section',
        fr: 'Baccalauréat Scientifique mention Très Bien, section Européenne',
      },
      date: {
        from: '2013-09',
        to: '2016-07',
      },
      location: 'highschool',
      certifications: ['baccalaureat'],
    },

    {
      id: 'juniorHighschool',
      title: {
        en: 'Junior High School',
        fr: 'Collège',
      },
      date: {
        from: '2009-09',
        to: '2013-07',
      },
      location: 'juniorHighschool',
      certifications: ['brevet'],
    },

    {
      id: 'primarySchool',
      title: {
        en: 'Primary School',
        fr: 'École Primaire',
      },
      date: {
        from: '2004-09',
        to: '2009-07',
      },
      location: 'primarySchool',
    },
  ],

  experience: [
    {
      id: 'sabbatical',
      title: {
        en: 'Sabbatical time',
        fr: 'Temps sabbatique',
      },
      description: {
        en: 'Taking sabbatical time to explore different projects in music and programming.',
        fr: 'Prise d\'un temps sabbatique afin de pouvoir explorer différents projets, dans la musique et la programmation',
      },
      date: {
        from: '2024',
        to: '2025',
      },
    },

    {
      id: 'xwiki-cdi',
      title: {
        en: 'R&D Engineer at XWikiSAS',
        fr: 'Ingénieur R&D à XWikiSAS',
      },
      description: {
        en: 'Working in Client Team, customizing software to meet client needs.',
        fr: 'Travail dans l\'équipe Client de XWiki, personnalisant le logiciel afin de répondre aux besoins clients.',
      },
      date: {
        from: '2021-09',
        to: '2023-12',
      },
      location: 'xwiki',
      skills: [
        'html',
        'css',
        'javascript',
        'vue',
        'java',
        'ui',
        'ux',
        'git',
      ],
    },

    {
      id: 'google-hash-code-2021',
      title: {
        en: 'Participation at the 2021 Google Hash Code hackathon',
        fr: 'Participation au hackathon Google Hash Code de 2021',
      },
      description: {
        en: 'Our "from random import *" team ranked 559th!',
        fr: 'Notre équipe "from random import *" s\'est positionnée 559ème !',
      },
      date: {
        from: '2021-02-25',
        to: '2021-02-25',
      },
      skills: [
        'python',
      ],
    },

    {
      id: 'eisti-alternance',
      title: {
        en: 'Work-student at XWikiSAS',
        fr: 'Contrat de professionnalisation à XWikiSAS',
      },
      description: {
        en: 'Continuing the development of the real-time data aggregator component from previous internship. Starting to work in Client team.',
        fr: 'Poursuite du développement du composant d\'agrégation de données en temps réel du stage précédent. Début du travail dans l\'équipe Client',
      },
      date: {
        from: '2020-09',
        to: '2021-08',
      },
      location: 'xwiki',
      skills: [
        'html',
        'css',
        'javascript',
        'vue',
        'java',
        'ui',
        'ux',
        'git',
      ],
    },

    {
      id: 'eisti-internship-ing2',
      title: {
        en: 'Second programmation internship at XWikiSAS',
        fr: 'Second stage de programmation à XWikiSAS',
      },
      description: {
        en: 'Implementing a real-time data aggregator component on the Open Source software XWiki',
        fr: 'Implémentation d\'un composant d\'agrégation et de présentation de données en temps réel sur le logiciel Open Source XWiki',
      },
      date: {
        from: '2020-05',
        to: '2020-08',
      },
      location: 'xwiki',
      skills: [
        'html',
        'css',
        'javascript',
        'vue',
        'ui',
        'ux',
        'git',
      ],
    },

    {
      id: 'eistikathon-2',
      title: {
        en: 'Participation of the second edition of the EISTIKATHON, hackathon organized by CAPFI and EISTI',
        fr: 'Participation à la seconde édition de l\'EISTIKATHON, hackathon organisé par CAPFI et l\'EISTI',
      },
      description: {
        en: 'Development of an application for reporting incidents, and keep track of the intervention',
        fr: 'Development pendant 24h d\'un application de report d\'incidents, permettant de suivre l\'avancement de l\'intervention',
      },
      date: {
        from: '2019-12',
        to: '2019-12',
      },
      location: 'eisti',
      skills: [
        'html',
        'css',
        'javascript',
        'angular',
        'git',
      ],
    },

    {
      id: 'eisti-internship-ing1',
      title: {
        en: 'First programmation internship at XWikiSAS',
        fr: 'Premier stage de programmation à XWikiSAS',
      },
      description: {
        en: 'Development on the Open Source software CryptPad.',
        fr: 'Développement sur le logiciel Open Source CryptPad.',
      },
      date: {
        from: '2019-05',
        to: '2019-08',
      },
      location: 'xwiki',
      skills: [
        'html',
        'css',
        'javascript',
        'jquery',
        'ui',
        'ux',
        'git',
      ],
    },

    {
      id: 'eistikathon-1',
      title: {
        en: 'Winner of the EISTIKATHON, a hackathon organized by CAPFI and EISTI',
        fr: 'Équipe gagnante de l\'EISTIKATHON, hackathon organisé par CAPFI et l\'EISTI',
      },
      description: {
        en: '24-H hackathon where teams develop an accessibility application to help disabled people',
        fr: 'Développement en 24h d\'une application d\'aide pour personnes en situation de handicap',
      },
      date: {
        from: '2018-12',
        to: '2018-12',
      },
      location: 'eisti',
      skills: [
        'mysql',
        'git',
        'cicd',
      ],
    },

    {
      id: 'eisti-vdsa',
      title: {
        en: 'Development of a dashboard to monitor sells',
        fr: 'Développement d\'un tableau de bord pour une entreprise',
      },
      description: {
        en: 'Use of web technologies to implement a dashboard, meeting the real needs of the VDSA enterprise',
        fr: 'Projet d\'école en langage web répondant aux besoins réels de l\'entreprise VDSA',
      },
      date: {
        from: '2018-09',
        to: '2018-12',
      },
      location: 'eisti',
      skills: [
        'html',
        'css',
        'javascript',
        'jquery',
        'responsiveDesign',
        'git',
      ],
    },

    {
      id: 'eisti-footbet',
      title: {
        en: 'Development of a website to bet for the football world cup 2018',
        fr: 'Développement d\'un site de pari pour la coupe du monde de football 2018',
      },
      description: {
        en: 'Website selected by school among other projects, and hosted on its servers during the event',
        fr: 'Projet sélectionné par l\'école et hébergé sur ses serveurs durant l\'évènement',
      },
      date: {
        from: '2018-06',
        to: '2018-07',
      },
      location: 'eisti',
      skills: [
        'html',
        'css',
        'javascript',
        'responsiveDesign',
        'php',
        'git',
      ],
    },

    {
      id: 'eisti-LabVIEW',
      title: {
        en: 'Creation of a synthesizer in LabVIEW',
        fr: 'Création d\'un synthétiseur avec LabVIEW',
      },
      description: {
        en: 'Creation of a triple oscillator synthesizer using the LabVIEW visual programming language.',
        fr: 'Création d\'un synthétiseur triple oscillateurs, à l\'aide du langage de programmation visuelle LabVIEW.',
      },
      date: {
        from: '2018-05',
        to: '2018-06',
      },
      location: 'eisti',
      skills: [
        'ocaml',
      ],
    },

    {
      id: 'eisti-TSP',
      title: 'Traveling Salesman Problem (TSP)',
      description: {
        en: 'Implementation of the Little Algorithm, using the Ocaml programming language',
        fr: 'Implémentation de l\'algorithme de Little, en langage Ocaml',
      },
      date: {
        from: '2017-12',
        to: '2018-01',
      },
      location: 'eisti',
      skills: [
        'ocaml',
      ],
    },

    {
      id: 'eisti-oh-hell',
      title: {
        en: 'Implementation of the Oh Hell card game',
        fr: 'Implémentation du jeu de cartes de l\'ascenseur',
      },
      description: {
        en: 'Use of the Ocaml programming language to implement a TUI version of the Oh Hell card game',
        fr: 'Utilisation du langage de programmation Ocaml afin d\'implémenter une version TUI du jeu de l\'ascenseur',
      },
      date: {
        from: '2017-10',
        to: '2017-10',
      },
      location: 'eisti',
      skills: [
        'ocaml',
      ],
    },

    {
      id: 'eisti-bezier',
      title: {
        en: 'Bezier curves editor in python',
        fr: 'Editeur de courbes de Bézier en python',
      },
      description: {
        en: 'GUI to draw Bezier curves using tkinter',
        fr: 'Interface graphique permettant de dessiner des courbes de Bézier avec tkinter',
      },
      date: {
        from: '2017-05',
        to: '2017-06',
      },
      location: 'eisti',
      skills: [
        'python',
      ],
    },

    {
      id: 'eisti-turtle',
      title: {
        en: 'L-system generator in python',
        fr: 'Générateur de L-Systèmes en python',
      },
      description: {
        en: 'Generation of Lindenmayer systems using turtle',
        fr: 'Génération de systèmes Lindenmayer avec turtle',
      },
      date: {
        from: '2017-01',
        to: '2017-01',
      },
      location: 'eisti',
      skills: [
        'python',
      ],
    },

    {
      id: 'eisti-TIPE',
      title: {
        en: 'TIPE - Making an AI for the board game Quoridor',
        fr: 'Réalisation d\'une Intelligence Artificielle pour le jeu de plateau Quoridor',
      },
      description: {
        en: 'Use of C# language and Unity Game Engine',
        fr: 'Prise en main du logiciel Unity et du langage C#',
      },
      date: {
        from: '2016-09',
        to: '2018-07',
      },
      location: 'eisti',
      skills: [
        'csharp',
        'unity',
      ],
    },
  ],

  hobbies: [
    {
      id: 'music',
      title: {
        en: 'Music',
        fr: 'Musique',
      },
    },

    {
      id: 'projects',
      title: {
        en: 'Programing - personal projects',
        fr: 'Programmation - projets personnels',
      },
      description: {
        en: 'I program a lot in my spare time, experimenting and learning in the web ecosystem.',
        fr: 'Je programme beaucoup pendant mon temps libre afin d\'expérimenter et d\'apprendre.',
      },
    },

    {
      id: 'projects-cv',
      title: 'CV',
      description: {
        en: 'I made my CV using Vue because why not',
        fr: 'Programmation de mon CV en Vue, parce que finalement pourquoi pas',
      },
      date: {
        from: '2023',
      },
      url: 'https://clemdee.github.io/cv',
      skills: [
        'html',
        'css',
        'typescript',
        'vue',
        'vite',
        'ui',
        'git',
        'cicd',
      ],
    },

    {
      id: 'projects-enalion',
      title: {
        en: 'Enalion website',
        fr: 'Site web Enalion',
      },
      description: {
        en: 'Website for my band Enalion.',
        fr: 'Site web pour mon groupe de musique Enalion.',
      },
      date: {
        from: '2024',
      },
      url: 'https://enalion.fr',
      skills: [
        'html',
        'css',
        'typescript',
        'vue',
        'ui',
        'a11y',
        'vite',
        'git',
        'cicd',
      ],
    },

    {
      id: 'projects-amalgamemusic',
      title: {
        en: 'Amalgame website',
        fr: 'Site web Amalgame',
      },
      description: {
        en: 'Website for my music project Amalgame',
        fr: 'Site web pour mon projet de musique Amalgame',
      },
      date: {
        from: '2025',
      },
      url: 'https://amalgamemusic.com',
      skills: [
        'html',
        'css',
        'typescript',
        'vue',
        'ui',
        'ux',
        'a11y',
        'vite',
        'git',
        'cicd',
      ],
    },
  ],

  skills: [
    {
      id: 'fr',
      title: {
        en: 'French',
        fr: 'Français',
      },
      level: 1,
      tags: [
        'language',
      ],
    },
    {
      id: 'en',
      title: {
        en: 'English',
        fr: 'Anglais',
      },
      level: 0.9,
      tags: [
        'language',
      ],
    },
    {
      id: 'es',
      title: {
        en: 'Spanish',
        fr: 'Espagnol',
      },
      level: 0.6,
      tags: [
        'language',
      ],
    },

    {
      id: 'html',
      title: 'HTML',
      level: 0.95,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'main',
      ],
    },
    {
      id: 'css',
      title: 'CSS',
      level: 0.95,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'main',
      ],
    },
    {
      id: 'javascript',
      title: 'Javascript',
      level: 0.95,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'main',
      ],
    },
    {
      id: 'typescript',
      title: 'Typescript',
      level: 0.85,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'main',
      ],
    },
    {
      id: 'jquery',
      title: 'JQuery',
      level: 0.85,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'framework',
      ],
    },
    {
      id: 'vue',
      title: 'Vue',
      level: 0.92,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'framework',
        'main',
      ],
    },
    {
      id: 'angular',
      title: 'Angular',
      level: 0.4,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'framework',
      ],
    },
    {
      id: 'nodejs',
      title: 'Node',
      level: 0.75,
      tags: [
        'programming',
        'webdev',
        'backend',
        'tool',
        'main',
      ],
    },
    {
      id: 'vite',
      title: 'Vite',
      level: 0.75,
      tags: [
        'programming',
        'webdev',
        'backend',
        'tool',
        'main',
      ],
    },
    {
      id: 'php',
      title: 'PHP',
      level: 0.65,
      tags: [
        'programming',
        'webdev',
        'backend',
      ],
    },
    {
      id: 'jee',
      title: 'JEE',
      level: 0.5,
      tags: [
        'programming',
        'webdev',
        'backend',
        'framework',
      ],
    },
    {
      id: 'mysql',
      title: 'MySQL',
      level: 0.75,
      tags: [
        'programming',
        'webdev',
        'database',
        'main',
      ],
    },
    {
      id: 'oracleSql',
      title: 'Oracle SQL',
      level: 0.7,
      tags: [
        'programming',
        'webdev',
        'database',
      ],
    },
    {
      id: 'c',
      title: 'C',
      level: 0.7,
      tags: [
        'programming',
      ],
    },
    {
      id: 'cpp',
      title: 'C++',
      level: 0.75,
      tags: [
        'programming',
      ],
    },
    {
      id: 'csharp',
      title: 'C#',
      level: 0.5,
      tags: [
        'programming',
      ],
    },
    {
      id: 'java',
      title: 'Java',
      level: 0.75,
      tags: [
        'programming',
      ],
    },
    {
      id: 'python',
      title: 'Python',
      level: 0.85,
      tags: [
        'programming',
      ],
    },
    {
      id: 'ocaml',
      title: 'Ocaml',
      level: 0.6,
      tags: [
        'programming',
      ],
    },
    {
      id: 'sh',
      title: 'POSIX Shell',
      level: 0.85,
      tags: [
        'programming',
        'shell',
      ],
    },
    {
      id: 'ui',
      title: 'UI',
      level: 0.9,
      tags: [
        'programming',
        'design',
        'main',
      ],
    },

    {
      id: 'ux',
      title: 'UX',
      level: 0.8,
      tags: [
        'programming',
        'design',
        'main',
      ],
    },
    {
      id: 'responsiveDesign',
      title: 'Responsive Design',
      level: 0.95,
      tags: [
        'programming',
        'webdev',
        'frontend',
        'design',
        'main',
      ],
    },
    {
      id: 'a11y',
      title: 'A11y',
      level: 0.75,
      tags: [
        'programming',
        'design',
        'main',
      ],
    },
    {
      id: 'git',
      title: 'Git',
      level: 0.8,
      tags: [
        'programming',
        'software',
        'collaboration',
        'main',
      ],
    },
    {
      id: 'cicd',
      title: 'CI/CD',
      level: 0.75,
      tags: [
        'programming',
        'devops',
        'main',
      ],
    },

    {
      id: 'debian',
      title: 'Debian',
      level: 0.9,
      tags: [
        'os',
        'linux',
      ],
    },
    {
      id: 'ubuntu',
      title: 'Ubuntu',
      level: 0.9,
      tags: [
        'os',
        'linux',
      ],
    },
    {
      id: 'windows10',
      title: 'Windows 10',
      level: 0.7,
      tags: [
        'os',
        'windows',
      ],
    },
    {
      id: 'windows11',
      title: 'Windows 11',
      level: 0.7,
      tags: [
        'os',
        'windows',
      ],
    },

    {
      id: 'msOffice',
      title: 'Microsoft Office',
      level: 0.9,
      tags: [
        'software',
        'office',
      ],
    },
    {
      id: 'libreOffice',
      title: 'Libre Office',
      level: 0.7,
      tags: [
        'software',
        'office',
      ],
    },
    {
      id: 'vim',
      title: 'Vim',
      level: 0.85,
      tags: [
        'software',
        'editor',
      ],
    },
    {
      id: 'gitlab',
      title: 'Gitlab',
      level: 0.8,
      tags: [
        'software',
        'collaboration',
      ],
    },
    {
      id: 'github',
      title: 'Github',
      level: 0.8,
      tags: [
        'software',
        'collaboration',
      ],
    },
  ],
} as const satisfies JSONData;
