

const CATALOG = [
  { id: "react-nextjs",   title: "React & Next.js — Production Grade", instr: "Sara Ahmed", cat: "Frontend", diff: "Intermediate", duration: "42h", lessons: 96,  rating: 4.9, students: 12480, price: "$149", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop" },
  { id: "python-backend", title: "Python for Modern Backends",         instr: "Bilal Raza", cat: "Backend",  diff: "Beginner",     duration: "38h", lessons: 84,  rating: 4.8, students: 9820,  price: "$129", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop" },
  { id: "applied-ml",     title: "Applied Machine Learning",           instr: "Dr. Fatima", cat: "AI",       diff: "Advanced",     duration: "56h", lessons: 120, rating: 4.9, students: 7310,  price: "$199", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop" },
  { id: "flutter-apps",   title: "Flutter Cross-Platform Apps",        instr: "Omar Iqbal", cat: "Mobile",   diff: "Intermediate", duration: "34h", lessons: 72,  rating: 4.7, students: 5640,  price: "$119", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&auto=format&fit=crop" },
  { id: "aws-architect",  title: "AWS Cloud Architect Path",           instr: "Hina Malik", cat: "DevOps",   diff: "Intermediate", duration: "46h", lessons: 104, rating: 4.8, students: 8150,  price: "$179", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop" },
  { id: "cyber-basics",   title: "Cybersecurity Fundamentals",         instr: "Zain Abbas", cat: "Security", diff: "Beginner",     duration: "40h", lessons: 88,  rating: 4.6, students: 6420,  price: "$139", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop" },
  { id: "typescript",     title: "TypeScript Deep Dive",               instr: "Sara Ahmed", cat: "Frontend", diff: "Intermediate", duration: "28h", lessons: 64,  rating: 4.9, students: 10230, price: "$129", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop" },
  { id: "system-design",  title: "System Design Interview",            instr: "Bilal Raza", cat: "Backend",  diff: "Advanced",     duration: "32h", lessons: 58,  rating: 4.8, students: 14110, price: "$199", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop" },
  { id: "graphql",        title: "GraphQL for Product Devs",           instr: "Hina Malik", cat: "Backend",  diff: "Intermediate", duration: "24h", lessons: 52,  rating: 4.7, students: 4380,  price: "$149", img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop" },
  { id: "docker-k8s",     title: "Docker & Kubernetes",                instr: "Zain Abbas", cat: "DevOps",   diff: "Advanced",     duration: "44h", lessons: 98,  rating: 4.9, students: 9040,  price: "$179", img: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop" },
  { id: "prompt-eng",     title: "Prompt Engineering",                 instr: "Dr. Fatima", cat: "AI",       diff: "Beginner",     duration: "16h", lessons: 40,  rating: 5.0, students: 18760, price: "$99",  img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop" },
  { id: "css-motion",     title: "Advanced CSS & Motion",              instr: "Sara Ahmed", cat: "Frontend", diff: "Intermediate", duration: "22h", lessons: 56,  rating: 4.9, students: 7620,  price: "$119", img: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&auto=format&fit=crop" },
];

const DUMMY_DESCRIPTION = `This hands-on program takes you from the core fundamentals all the way to
shipping real, production-ready work. Every module mixes short video lessons, guided practice files and a
small project so the ideas actually stick. You will build a portfolio piece by the end, get downloadable
resources for each section, and finish with a TechNova Academy certificate of completion.`;

const DUMMY_LEARN = [
  "Build confidently from the first principles up to advanced patterns",
  "Work through 6 guided projects with step-by-step walkthroughs",
  "Debug, test and optimise like a professional developer",
  "Follow industry best practices used by real product teams",
  "Prepare for technical interviews with practice questions",
  "Earn a shareable certificate of completion",
];

const DUMMY_OUTLINE = [
  {
    title: "Getting Started",
    lessons: [
      { t: "Welcome & how to use this course", d: "04:12" },
      { t: "Setting up your environment",      d: "11:38" },
      { t: "Your first hands-on exercise",     d: "15:20" },
    ],
  },
  {
    title: "Core Foundations",
    lessons: [
      { t: "Key concepts explained simply", d: "18:05" },
      { t: "Working with real examples",    d: "22:47" },
      { t: "Common mistakes to avoid",      d: "09:56" },
      { t: "Practice lab #1",               d: "26:10" },
    ],
  },
  {
    title: "Going Deeper",
    lessons: [
      { t: "Intermediate patterns & structure", d: "24:33" },
      { t: "Performance and clean code",        d: "19:41" },
      { t: "Mini project walkthrough",          d: "31:08" },
    ],
  },
  {
    title: "Real World Project",
    lessons: [
      { t: "Planning the project",        d: "12:24" },
      { t: "Building the main features",  d: "38:52" },
      { t: "Polishing and deploying",     d: "21:17" },
    ],
  },
  {
    title: "Wrap Up",
    lessons: [
      { t: "Interview prep & next steps", d: "14:03" },
      { t: "Claim your certificate",      d: "03:45" },
    ],
  },
];

const DUMMY_REQUIREMENTS = [
  "A laptop or desktop computer with an internet connection",
  "Basic computer literacy — no prior experience required",
  "Curiosity and a few hours per week to practice",
];

const getCourseById = (id) => CATALOG.find((c) => c.id === id) || null;
