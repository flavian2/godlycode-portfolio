// Central data file for all projects
export const projects = [
  {
    id: 'banking',
    title: 'Full-Stack Banking & Fintech Platform',
    shortDescription: 'A complete digital banking application with real transaction processing, multi-role authentication, and comprehensive admin dashboards.',
    category: 'Fintech',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST API'],
    liveUrl: 'https://bank.godlycode.com',
    githubUrl: 'https://github.com/godlycode', // TODO: Update with real GitHub repo URL
    featured: true,
    status: 'live', // live, development, completed
    description: 'A complete digital banking application built from the ground up. Features real transaction processing, multi-role authentication, account management, fund transfers, statement generation, ATM card management, and comprehensive admin dashboards. Every feature mirrors real-world banking operations with security and reliability at its core.',
    keyFeatures: [
      'User registration & KYC verification',
      'Multi-role authentication (Admin, Staff, Customer)',
      'Deposit, Withdrawal & Fund Transfer processing',
      'Transaction history with advanced filtering',
      'Bank statement generation (PDF)',
      'ATM/Debit card management system',
      'Admin dashboard with analytics',
      'Responsive design for all devices'
    ],
    techStack: {
      frontend: ['JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
      backend: ['PHP'],
      database: ['MySQL'],
      apis: ['REST API']
    },
    // TODO: Replace with actual screenshots
    screenshots: [
      'Screenshot of dashboard',
      'Screenshot of transaction page',
      'Screenshot of admin panel',
      'Screenshot of card management'
    ],
    color: '#D4AF37' // Gold
  },
  {
    id: 'delivery',
    title: 'GPS-Integrated Logistics & Delivery Platform',
    shortDescription: 'A comprehensive logistics management system with real-time GPS tracking, automated courier dispatch, and delivery analytics.',
    category: 'Logistics',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Google Maps API', 'Bootstrap', 'WebSocket'],
    liveUrl: 'https://delivery.godlycode.com',
    githubUrl: 'https://github.com/godlycode', // TODO: Update with real GitHub repo URL
    featured: true,
    status: 'live',
    description: 'A comprehensive logistics management system with real-time GPS tracking, automated courier dispatch, route optimization, and delivery analytics. Built to handle the complexity of real-world delivery operations — from package pickup to final delivery confirmation.',
    keyFeatures: [
      'Real-time GPS tracking with interactive map visualization',
      'Automated dispatch & route management',
      'Live delivery status updates with notifications',
      'Customer tracking portal with timeline display',
      'Driver/courier management & performance tracking',
      'Package management with barcode/ID system',
      'Admin analytics dashboard with delivery metrics',
      'Multi-location support'
    ],
    techStack: {
      frontend: ['JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
      backend: ['PHP'],
      database: ['MySQL'],
      apis: ['Google Maps API', 'WebSocket']
    },
    screenshots: [
      'Screenshot of tracking map',
      'Screenshot of dispatch dashboard',
      'Screenshot of delivery timeline',
      'Screenshot of analytics'
    ],
    color: '#00B4D8' // Electric Blue
  },
  {
    id: 'education',
    title: 'Comprehensive Education Management System',
    shortDescription: 'A full-featured educational institution management platform handling everything from student enrollment to graduation.',
    category: 'Education',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://school.godlycode.com',
    githubUrl: 'https://github.com/godlycode', // TODO: Update with real GitHub repo URL
    featured: true,
    status: 'live',
    description: 'A full-featured educational institution management platform handling everything from student enrollment to graduation. Designed for schools and institutions that need a centralized system to manage students, teachers, courses, grades, and administrative operations.',
    keyFeatures: [
      'Student enrollment & profile management',
      'Course creation & class scheduling',
      'Grade management with GPA calculation',
      'Attendance tracking system',
      'Report card generation',
      'Multi-role access (Admin, Teacher, Student, Parent)',
      'Administrative reporting & analytics',
      'Communication tools'
    ],
    techStack: {
      frontend: ['JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
      backend: ['PHP'],
      database: ['MySQL'],
      apis: []
    },
    screenshots: [
      'Screenshot of student dashboard',
      'Screenshot of grade management',
      'Screenshot of attendance system',
      'Screenshot of admin panel'
    ],
    color: '#9333EA' // Purple
  },
  {
    id: 'trading',
    title: 'AI-Powered Cryptocurrency Trading Platform',
    shortDescription: 'An intelligent trading platform that leverages Claude AI for market analysis, pattern recognition, and automated trade execution.',
    category: 'AI/Trading',
    tags: ['Node.js', 'React', 'Python', 'MongoDB', 'Claude API', 'WebSocket'],
    liveUrl: 'https://trade.godlycode.com',
    githubUrl: 'https://github.com/godlycode', // TODO: Update with real GitHub repo URL
    featured: true,
    status: 'development', // 80% complete
    description: 'An intelligent trading platform that leverages Claude AI for market analysis, pattern recognition, and automated trade execution. Features real-time price feeds, portfolio management, risk assessment, and historical backtesting — all powered by AI to give traders a strategic edge.',
    keyFeatures: [
      'AI trading agent powered by Claude API',
      'Real-time cryptocurrency price feeds via WebSocket',
      'Automated trade execution with risk management',
      'Portfolio tracking & P&L analytics',
      'Historical data backtesting',
      'Multi-level referral system',
      'Admin dashboard with user management',
      'Real-time notifications & alerts'
    ],
    techStack: {
      frontend: ['React', 'HTML5', 'CSS3', 'JavaScript'],
      backend: ['Node.js', 'Python'],
      database: ['MongoDB'],
      apis: ['Claude API', 'WebSocket', 'Crypto Price APIs']
    },
    screenshots: [
      'Screenshot of trading terminal',
      'Screenshot of portfolio',
      'Screenshot of AI analytics',
      'Screenshot of backtesting'
    ],
    color: '#10B981' // Green
  }
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

// Helper function to get featured projects
export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Get all unique categories
export const getCategories = () => {
  const categories = ['all', ...new Set(projects.map(project => project.category))];
  return categories;
};
