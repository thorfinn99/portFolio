import jobHuntImg from '../assets/jobHunt.png';
import guestHouseImg from '../assets/guestHouse.png';
import k27Img from '../assets/k27.png';
import endlessRunnerImg from '../assets/endlessRunner.png';
import cinemaniaImg from '../assets/cinemania.png';

// Sample data structure - can be edited through the admin panel
export const defaultData = {
  hero: {
    firstName: 'Mohd',
    lastName: 'Anas',
    badgeText: 'Available for opportunities',
    typingStrings: ['Full-Stack Developer', 'MERN Stack Specialist', 'Problem Solver', 'Frontend Developer'],
    description: 'Computer Science Engineering student passionate about Web Development and building scalable applications. Experienced in MERN stack development with a track record of delivering high-performance solutions.',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/thorfinn99',
    email: 'mohdanas4189@gmail.com',
  },
  about: {
    brandName: 'Mohd Anas',
    heading: 'About Me',
    bio1: 'I am a passionate Computer Science Engineering student with expertise in full-stack web development using the MERN stack.',
    bio2: 'I love building scalable applications, optimizing performance, and solving complex problems through innovative code solutions.',
    location: 'Bareilly, India',
    degree: 'Bachelor of Computer Science and Engineering',
    focus: 'Full-Stack Development, MERN Stack, Performance Optimization',
    passion: 'Creating high-performance web applications with excellent user experience',
    photoUrl: '',
  },
  skills: [
  // Languages — raw languages only, not frameworks
  { id: '1', name: 'Java', category: 'Languages', level: 'Intermediate' },
  { id: '2', name: 'JavaScript (ES6+)', category: 'Languages', level: 'Advanced' },
  { id: '3', name: 'SQL', category: 'Languages', level: 'Intermediate' },

  // Frontend — markup, styling, frontend frameworks/libraries
  { id: '4', name: 'HTML5', category: 'Frontend', level: 'Advanced' },
  { id: '5', name: 'CSS3', category: 'Frontend', level: 'Advanced' },
  { id: '6', name: 'React', category: 'Frontend', level: 'Advanced' },
  { id: '7', name: 'Redux Toolkit', category: 'Frontend', level: 'Intermediate' },
  { id: '8', name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced' },
  { id: '9', name: 'Bootstrap', category: 'Frontend', level: 'Advanced' },
  { id: '10', name: 'Material UI', category: 'Frontend', level: 'Intermediate' },

  // Backend — server runtime, framework, API-layer libraries
  { id: '11', name: 'Node.js', category: 'Backend', level: 'Advanced' },
  { id: '12', name: 'Express.js', category: 'Backend', level: 'Advanced' },
  { id: '13', name: 'REST API', category: 'Backend', level: 'Advanced' },
  { id: '14', name: 'Multer', category: 'Backend', level: 'Intermediate' },
  { id: '15', name: 'Node Mailer', category: 'Backend', level: 'Intermediate' },
  { id: '16', name: 'Post Man', category: 'Backend', level: 'Intermediate' },

  // Database
  { id: '17', name: 'MongoDB', category: 'Database', level: 'Advanced' },
  { id: '18', name: 'MySQL', category: 'Database', level: 'Intermediate' },

  // Tools — editors, version control (local dev tooling)
  { id: '19', name: 'Git', category: 'Tools', level: 'Advanced' },
  { id: '20', name: 'Github', category: 'Tools', level: 'Advanced' },
  { id: '21', name: 'Visual Studio Code', category: 'Tools', level: 'Advanced' },
  { id: '22', name: 'IntelliJ IDEA', category: 'Tools', level: 'Intermediate' },

  // Deployment — hosting/deployment platforms
  { id: '23', name: 'Vercel', category: 'Deployment', level: 'Advanced' },
  { id: '24', name: 'Render', category: 'Deployment', level: 'Advanced' },
],
  projects: [
    {
      id: '1',
      title: 'JobHunt',
      description: 'A full-stack job portal for job posting and application management, streamlining recruiter–candidate interactions.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/thorfinn99/jobHunt1',
      liveUrl: 'https://job-hunt1.vercel.app/',
      imageUrl: jobHuntImg,
      featured: true,
    },
    {
      id: '2',
      title: 'Guest-House',
      description: 'A hotel booking website with room search, duration selection, and optional meals. Includes booking approval workflow and authenticity verification via Aadhaar ID.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/thorfinn99/guest-house-react',
      liveUrl: 'https://guest-house-react-aug.vercel.app/',
      imageUrl: guestHouseImg,
      featured: true,
    },
    {
      id: '3',
      title: 'K27',
      description: 'A portfolio website designed to showcase design and UI/UX skills with responsive layouts and interactive elements.',
      technologies: ['React', 'Tailwind CSS', 'JavaScript'],
      githubUrl: 'https://github.com/thorfinn99/K27',
      liveUrl: 'https://k27-six.vercel.app/',
      imageUrl: k27Img,
      featured: true,
    },
    {
      id: '4',
      title: 'Endless-Runner',
      description: 'A Sonic-inspired endless runner game built in JavaScript with fluid jump/double-jump controls and dynamic obstacle challenges.',
      technologies: ['JavaScript', 'Canvas API', 'Game Design'],
      githubUrl: 'https://github.com/thorfinn99/Endless-Runner',
      liveUrl: 'https://thorfinn99.github.io/Endless-Runner/',
      imageUrl: endlessRunnerImg,
      featured: true,
    },
    {
      id: '5',
      title: 'Cinemania',
      description: 'A web platform to explore trending and genre-based movies with detailed information, search and filtering features for enhanced movie discovery.',
      technologies: ['React', 'REST API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/thorfinn99/Cinemania',
      liveUrl: 'https://cinemania-ten.vercel.app/',
      imageUrl: cinemaniaImg,
      featured: true,
    },
  ],
  training: [
    {
      id: '1',
      title: 'Frontend Developer',
      organization: 'Lux Swipe - Internship',
      description: 'Built and deployed a dynamic web platform using MERN stack, boosting company\'s online presence and operational efficiency. Developed intuitive React + Tailwind CSS interfaces and optimized MongoDB queries, improving page load speed by 40%. Designed and integrated RESTful APIs with Node.js and Express.js, reducing backend response time by 30%.',
      startDate: '2024-05-01',
      endDate: '2024-07-31',
      type: 'Experience',
      location: 'Bareilly',
    },
  ],
  certificates: [
    {
      id: '1',
      title: 'JavaScript Mastery',
      issuer: 'Online Platform',
      issuedDate: '2024-03-15',
      credentialUrl: '',
      imageUrl: '',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Computer Science and Engineering',
      institution: 'Mjp Rohilkhand University',
      location: 'Bareilly, India',
      startYear: '2022',
      endYear: '2026',
      grade: '6.8 CGPA',
      description: 'Specializing in Full-Stack Web Development and Software Engineering',
    },
  ],
  resume: {
    url: 'https://drive.google.com/uc?export=view&id=1vCWWW9b7mzDmo1v4sYtnkUow0-OneiNQ',
    fileName: 'resume.pdf',
  },
  contact: {
    email: 'mohdanas4189@gmail.com',
    phone: '+91-8923126995',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/thorfinn99',
  },
  footer: {
    brandName: 'Mohd Anas',
    description: 'Full Stack Developer | MERN Stack Specialist | Problem Solver',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/thorfinn99',
      email: 'mohdanas4189@gmail.com',
    },
  },
};
