// ─── Hardcoded Portfolio Data ─────────────────────────────────────────────────
// Edit this file to update your portfolio content without needing a backend.

export const SITE_CONTENT = {
  heroTexts: ['Developer', 'Designer', 'Student'],
  aboutContent: `The Foundation\n"I am an aspiring web developer with a passion for crafting seamless digital experiences. My journey into technology began with curiosity — a desire to understand how beautiful websites are built and how they come to life on a screen."\n\nCommunity & Leadership\n"Much of my practical experience comes from being deeply involved in my college's Toastmasters club, where I've honed not just my public speaking, but also my ability to collaborate, lead, and organize — skills that I carry directly into my development work."\n\nDesign Philosophy\n"For me, development is not just about writing logic — it's about creating experiences. I believe the best applications are the ones that feel invisible to the user: intuitive, fast, and beautiful."`,
  featuredTitle: 'Featured',
  featuredSubtitle: 'A selection of my recent full-stack applications and functional frontends.',
  timelineTitle: 'My Journey',
  timelineSubtitle: 'A timeline of my academic background and educational milestones.',
  contactHeading: "Let's",
  contactSubtitle: "Have a project in mind, or just want to say hi? I'm always open to discussing new opportunities and creative ideas.",
  contactEmail: 'mullamasoom50@gmail.com',
  footerLinks: {
    linkedin: { url: 'https://linkedin.com/in/masoom-mulla', visible: true },
    github: { url: 'https://github.com/masoompersonal3', visible: true },
    instagram: { url: '', visible: false },
  },
};

export const PROJECTS = [
  {
    _id: '1',
    title: 'ZenMind Mini',
    description: 'A comprehensive mental wellness application built with the MERN stack. Features guided meditation sessions, mood tracking, journaling, and personalized wellness recommendations powered by AI insights.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    link: 'https://zenmind.onrender.com',
    github: '',
    imageUrl: '/projects/mini.png',
    visible: true,
    order: 0,
  },
  {
    _id: '2',
    title: 'Toastmasters Portal',
    description: 'A full-featured club management portal for KLE Toastmasters. Includes member management, speech tracking, role assignments, meeting agendas, and achievement badges — streamlining the entire club operation.',
    tech: ['React', 'TypeScript', 'Express', 'MongoDB', 'JWT Auth'],
    link: '',
    github: '',
    imageUrl: '/projects/tm.png',
    visible: true,
    order: 1,
  },
  {
    _id: '3',
    title: 'ZenMind Major',
    description: 'The full-scale version of ZenMind with advanced features including real-time community forums, therapist booking system, progress analytics dashboard, and a subscription-based premium tier.',
    tech: ['MERN Stack', 'Socket.io', 'Stripe', 'Redis', 'Framer Motion'],
    link: 'https://zenmind-india.onrender.com/',
    github: '',
    imageUrl: '/projects/major.png',
    visible: true,
    order: 2,
  },
];

export const EDUCATION = [
  {
    _id: '1',
    degree: 'SSLC',
    institution: 'Volart Academy High School',
    year: '2019 - 2020',
    percentage: '80.16%',
    status: 'Completed',
    visible: true,
    order: 0,
  },
  {
    _id: '2',
    degree: 'Pre-University (PUC)',
    institution: 'KLE Society C.S. Angadi College',
    year: '2020 - 2022',
    percentage: '91.33%',
    status: 'Completed',
    visible: true,
    order: 1,
  },
  {
    _id: '3',
    degree: 'B.E. Computer Science',
    institution: 'KLECET Chikodi',
    year: '2023 - 2027',
    percentage: 'CGPA 8.4',
    status: 'In Progress',
    visible: true,
    order: 2,
  },
];
