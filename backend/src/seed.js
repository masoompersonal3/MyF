require('dotenv').config();
const mongoose = require('mongoose');
const SiteContent = require('./models/SiteContent');
const Project = require('./models/Project');
const Education = require('./models/Education');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // 1. Seed SiteContent
    await SiteContent.deleteMany({});
    await SiteContent.create({});
    console.log('✅ Seeded SiteContent');

    // 2. Seed Projects
    await Project.deleteMany({});
    await Project.create([
      {
        title: "Zenmind (Mini Project)",
        description: "MERN stack project for teenagers mental health (basic version).",
        tech: ["React", "Node.js", "MongoDB Atlas", "Brevo", "Botpress"],
        link: "https://zen-mind-v-f.onrender.com/",
        github: "#",
        order: 1
      },
      {
        title: "Toastmasters Club Website",
        description: "(Under development) Official website for the college Toastmasters club.",
        tech: ["React", "Node.js", "MongoDB Atlas", "Framer Motion"],
        link: "https://tm-website-01.onrender.com/",
        github: "#",
        order: 2
      },
      {
        title: "ZenMind (Major Project)",
        description: "(Under development) Final year project: Adolescent mental wellness platform providing AI chat, advanced therapy booking, community, and more.",
        tech: ["React", "Node.js", "WebRTC", "MongoDB Atlas", "Machine Learning", "Chart.js", "Brevo"],
        link: "https://zenmind-india.onrender.com/",
        github: "#",
        order: 3
      }
    ]);
    console.log('✅ Seeded Projects');

    // 3. Seed Education
    await Education.deleteMany({});
    await Education.create([
      {
        degree: "SSLC",
        institution: "Volkart Academy",
        year: "2019-2020",
        percentage: "80.16%",
        status: "Completed",
        order: 1
      },
      {
        degree: "PUC",
        institution: "KLE Society C.S.Angadi",
        year: "2020-2022",
        percentage: "91.33%",
        status: "Completed",
        order: 2
      },
      {
        degree: "B.E. in Computer Science",
        institution: "Current University",
        year: "2023-2027",
        percentage: "CGPA 8.4",
        status: "In Progress",
        order: 3
      }
    ]);
    console.log('✅ Seeded Education');

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
