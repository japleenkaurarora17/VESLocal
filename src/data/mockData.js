// VESLocal Mock Database - Initial Static Data

export const initialCurrentUser = {
  id: "student-1",
  name: "Japleen Kaur",
  email: "japleen.kaur@ves.ac.in",
  department: "Information Technology",
  year: "Third Year",
  skills: ["UI/UX", "React", "Product Management", "Figma", "Graphic Design"],
  bio: "IT undergrad passionate about building user-centered products. Freelance designer, hackathon enthusiast, and coffee lover. Let's build something cool!",
  businessId: "biz-1",
  projects: [
    { id: "p1", name: "VESIT Portal Redesign", role: "Lead UI Designer", description: "A revamped portal layout for student attendance, syllabus, and marks tracking." },
    { id: "p2", name: "Campus RideShare", role: "Frontend Dev", description: "A simple web app for VESIT students to carpool from Chembur station." }
  ],
  connectCount: 42,
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Japleen&backgroundColor=f5d0a9"
};

export const initialStudents = [
  {
    id: "student-2",
    name: "Rahul Mehta",
    email: "rahul.mehta@ves.ac.in",
    department: "Computer Engineering",
    year: "Fourth Year",
    skills: ["Video Editing", "After Effects", "DaVinci Resolve", "Cinematography"],
    bio: "Passionate filmmaker and editor. If you need a cinematic reel for your startup, event, or campaign, hit me up! Looking for creators to collaborate with.",
    businessId: "biz-2",
    projects: [
      { id: "p3", name: "Vistara Film Festival Main Video", role: "Director & Editor", description: "Created the official teaser for the college film festival." }
    ],
    connectCount: 89,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahul&backgroundColor=b6e3f4"
  },
  {
    id: "student-3",
    name: "Sakshi Patil",
    email: "sakshi.patil@ves.ac.in",
    department: "Electronics & Telecommunication",
    year: "Second Year",
    skills: ["IoT", "Embedded Systems", "Python", "Arduino", "C++"],
    bio: "Always tinkering with sensors and microcontrollers. Working on automated home systems and looking for web developers to build dashboards for my hardware projects.",
    businessId: null,
    projects: [
      { id: "p4", name: "VESIT Library Entry Tracker", role: "Hardware Dev", description: "An automated RFID card entry system prototype." }
    ],
    connectCount: 24,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sakshi&backgroundColor=ffd5dc"
  },
  {
    id: "student-4",
    name: "Yash Shinde",
    email: "yash.shinde@ves.ac.in",
    department: "Artificial Intelligence & Data Science",
    year: "Third Year",
    skills: ["Python", "TensorFlow", "React", "Machine Learning", "FastAPI"],
    bio: "Data science student fascinated by neural networks and LLMs. Building custom models and connecting them to React frontends. Let's partner up for hackathons!",
    businessId: "biz-3",
    projects: [
      { id: "p5", name: "Automated Placement Predictor", role: "ML Engineer", description: "A model predicting placement likelihood based on student profiles." }
    ],
    connectCount: 56,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Yash&backgroundColor=d1f4c9"
  },
  {
    id: "student-5",
    name: "Hrishikesh Joshi",
    email: "hrishikesh.joshi@ves.ac.in",
    department: "Information Technology",
    year: "Third Year",
    skills: ["Photography", "Lightroom", "Photoshop", "Graphic Design"],
    bio: "Capturing moments and colors. Specializing in portraits, event coverage, and street photography. Ready to capture your startup team or student events.",
    businessId: "biz-4",
    projects: [
      { id: "p6", name: "Utsav Festival Coverage", role: "Lead Photographer", description: "Official photography coverage for the annual college cultural festival." }
    ],
    connectCount: 71,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Hrishikesh&backgroundColor=e8e8e8"
  },
  {
    id: "student-6",
    name: "Sneha Nair",
    email: "sneha.nair@ves.ac.in",
    department: "Instrumentation Engineering",
    year: "Fourth Year",
    skills: ["PLC Programming", "LabVIEW", "UI/UX", "Technical Writing"],
    bio: "bridging the gap between industrial automation and user experience. Currently designing modern HMIs for PLC systems.",
    businessId: null,
    projects: [],
    connectCount: 19,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sneha&backgroundColor=ffdfb3"
  },
  {
    id: "student-7",
    name: "Amit Sharma",
    email: "amit.sharma@ves.ac.in",
    department: "Computer Engineering",
    year: "Third Year",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    bio: "Full stack developer who loves turning ideas into clean code. Let's partner up to build SaaS products or hackathon submissions.",
    businessId: "biz-5",
    projects: [
      { id: "p7", name: "VESIT Canteen Pre-order System", role: "Fullstack Dev", description: "A digital token-based pre-ordering system for our college canteen." }
    ],
    connectCount: 112,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amit&backgroundColor=c9c9ff"
  }
];

export const initialOpportunities = [
  {
    id: "opp-1",
    title: "Video Editor Needed",
    description: "Looking for an editor to help assemble a 2-minute promotional video/reel for our upcoming student startup pitch. Raw footage is shot in 4k; we just need slick editing, transitions, and audio sync.",
    authorId: "student-4", // Yash Shinde
    authorName: "Yash Shinde",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Yash&backgroundColor=d1f4c9",
    skillsNeeded: ["Video Editing", "After Effects"],
    type: "Freelance",
    date: "2026-08-18",
    status: "Open",
    interestedStudents: []
  },
  {
    id: "opp-2",
    title: "UI/UX Designer Needed",
    description: "We are participating in a Smart India Hackathon (SIH) internal round and need a designer to build interactive Figma prototypes for a smart traffic management system. The design must be extremely clean.",
    authorId: "student-7", // Amit Sharma
    authorName: "Amit Sharma",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amit&backgroundColor=c9c9ff",
    skillsNeeded: ["UI/UX", "Figma"],
    type: "Collaboration",
    date: "2026-08-19",
    status: "Open",
    interestedStudents: []
  },
  {
    id: "opp-3",
    title: "Hackathon Teammate Needed",
    description: "Need a solid frontend developer (React + Tailwind) for an upcoming 24h hackathon at VESIT. We have a ML model ready and need a stellar interface to showcase it. Let's win this together!",
    authorId: "student-3", // Sakshi Patil
    authorName: "Sakshi Patil",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sakshi&backgroundColor=ffd5dc",
    skillsNeeded: ["React", "Tailwind CSS"],
    type: "Hackathon",
    date: "2026-08-19",
    status: "Open",
    interestedStudents: []
  },
  {
    id: "opp-4",
    title: "Event Photographer Needed",
    description: "The VESIT Literary Association is hosting a poetry debate session and needs a student photographer for 2 hours. DSLR and lenses will be provided, but your own gear is welcome. Quick edit, soft color grading required.",
    authorId: "student-6", // Sneha Nair
    authorName: "Sneha Nair",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sneha&backgroundColor=ffdfb3",
    skillsNeeded: ["Photography", "Lightroom"],
    type: "Voluntary",
    date: "2026-08-17",
    status: "Open",
    interestedStudents: []
  },
  {
    id: "opp-5",
    title: "React Native Dev Wanted",
    description: "Building a campus-wide classifieds app where students can buy/sell used textbooks, drawing boards, and lab coats. Looking for a co-developer experienced in React Native and basic database handling.",
    authorId: "student-5", // Hrishikesh Joshi
    authorName: "Hrishikesh Joshi",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Hrishikesh&backgroundColor=e8e8e8",
    skillsNeeded: ["React Native", "JavaScript"],
    type: "Startup Partner",
    date: "2026-08-15",
    status: "Open",
    interestedStudents: []
  }
];

export const initialBusinesses = [
  {
    id: "biz-1",
    name: "Kaur Creative Studios",
    ownerId: "student-1", // Japleen Kaur
    ownerName: "Japleen Kaur",
    category: "Design Services",
    description: "Professional UI/UX wireframing, high-fidelity prototypes, brand logos, and presentation slide design. Specially catered to students pitching startup ideas and projects.",
    rating: 4.9,
    reviewsCount: 15,
    tags: ["UI/UX", "Figma", "Branding"],
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    links: { website: "kaurcreative.design", instagram: "@kaur.creatives" }
  },
  {
    id: "biz-2",
    name: "Mehta Media Reels",
    ownerId: "student-2", // Rahul Mehta
    ownerName: "Rahul Mehta",
    category: "Video & Editing",
    description: "End-to-end video shooting and post-production. Event videography, YouTube video editing, Instagram reel styling, and college festival trailers.",
    rating: 4.8,
    reviewsCount: 22,
    tags: ["Video Editing", "DaVinci", "Videography"],
    bannerUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    links: { website: "mehtamedia.com", instagram: "@mehta.reels" }
  },
  {
    id: "biz-3",
    name: "Shinde Data Solves",
    ownerId: "student-4", // Yash Shinde
    ownerName: "Yash Shinde",
    category: "Tech Services",
    description: "Custom web scrapers, automated Excel/Google Sheets setups, simple machine learning models, and automation script writing. Fast delivery, documented code.",
    rating: 4.7,
    reviewsCount: 8,
    tags: ["Web Scraping", "Python", "Data Entry"],
    bannerUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    links: { website: "shindedata.io", github: "yash-shinde" }
  },
  {
    id: "biz-4",
    name: "Joshi Frames",
    ownerId: "student-5", // Hrishikesh Joshi
    ownerName: "Hrishikesh Joshi",
    category: "Photography",
    description: "Professional portfolio shoots, group photos, graduation portraits, and event coverage. Fast photo delivery and customized editing presets.",
    rating: 5.0,
    reviewsCount: 31,
    tags: ["Portraits", "Event Shoot", "Lightroom"],
    bannerUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80",
    links: { website: "joshiframes.photo", instagram: "@joshi.frames" }
  },
  {
    id: "biz-5",
    name: "Canteen Token Assist",
    ownerId: "student-7", // Amit Sharma
    ownerName: "Amit Sharma",
    category: "Tech Services",
    description: "Pre-order dashboard widgets for campus canteens. Enabling rapid queuing and automated token generation for local snacks.",
    rating: 4.6,
    reviewsCount: 12,
    tags: ["React", "Express", "SaaS"],
    bannerUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    links: { website: "canteenassist.app", github: "amit-canteen" }
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    text: "Rahul Mehta expressed interest in your opportunity 'UI/UX Designer Needed'.",
    time: "2 hours ago",
    read: false,
    type: "interest"
  },
  {
    id: "notif-2",
    text: "Sakshi Patil accepted your connection request. You can now chat!",
    time: "5 hours ago",
    read: false,
    type: "connect"
  },
  {
    id: "notif-3",
    text: "Yash Shinde left a 5-star review for 'Kaur Creative Studios'.",
    time: "1 day ago",
    read: true,
    type: "review"
  },
  {
    id: "notif-4",
    text: "New Opportunity matching your skill 'React': 'Hackathon Teammate Needed' posted by Sakshi Patil.",
    time: "1 day ago",
    read: true,
    type: "match"
  }
];

export const initialMessages = [
  {
    id: "chat-1",
    studentId: "student-2",
    studentName: "Rahul Mehta",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahul&backgroundColor=b6e3f4",
    department: "Computer Engineering",
    lastMessage: "Yeah, let's meet up in the IT building lobby during lunch tomorrow.",
    lastTimestamp: "1:42 PM",
    unread: true,
    conversation: [
      { sender: "student-2", text: "Hey Japleen! I saw your portfolio. Your UI designs are incredible.", time: "1:30 PM" },
      { sender: "student-1", text: "Hi Rahul! Thank you so much. I really appreciate it.", time: "1:35 PM" },
      { sender: "student-2", text: "I'm working on a promotional video for the film fest and need a cool logo/web design. Are you open to collaborating?", time: "1:38 PM" },
      { sender: "student-1", text: "Definitely! I'd love to design the assets. Let me know when you want to discuss details.", time: "1:40 PM" },
      { sender: "student-2", text: "Yeah, let's meet up in the IT building lobby during lunch tomorrow.", time: "1:42 PM" }
    ]
  },
  {
    id: "chat-2",
    studentId: "student-3",
    studentName: "Sakshi Patil",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sakshi&backgroundColor=ffd5dc",
    department: "Electronics & Telecommunication",
    lastMessage: "No problem, take your time! Let me know when you're free.",
    lastTimestamp: "Yesterday",
    unread: false,
    conversation: [
      { sender: "student-3", text: "Hey, are you free for the hackathon this weekend? We need a solid frontend partner.", time: "10:15 AM" },
      { sender: "student-1", text: "Hey Sakshi! Let me check my submission deadlines and get back to you by tonight.", time: "10:30 AM" },
      { sender: "student-3", text: "No problem, take your time! Let me know when you're free.", time: "10:32 AM" }
    ]
  },
  {
    id: "chat-3",
    studentId: "student-7",
    studentName: "Amit Sharma",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amit&backgroundColor=c9c9ff",
    department: "Computer Engineering",
    lastMessage: "Awesome, I'll send over the project document.",
    lastTimestamp: "2 days ago",
    unread: false,
    conversation: [
      { sender: "student-7", text: "Hey Japleen, did you check the Smart India Hackathon details? We want to set up the dashboard UI.", time: "3:00 PM" },
      { sender: "student-1", text: "Hey Amit! Yes, I read it. The wireframe flow is mostly ready.", time: "3:10 PM" },
      { sender: "student-7", text: "Awesome, I'll send over the project document.", time: "3:12 PM" }
    ]
  }
];

export const initialCollaborations = [
  {
    id: "collab-1",
    name: "VESIT Attendance Tracker",
    members: ["Japleen Kaur", "Amit Sharma"],
    description: "Developing a friendly dashboard that predicts attendance margin and sends reminders to students before they hit attendance default lists.",
    status: "In Progress",
    meetingTime: "Thursdays at 3:30 PM (Canteen)"
  },
  {
    id: "collab-2",
    name: "E-Cell Merch Design",
    members: ["Japleen Kaur", "Hrishikesh Joshi", "Sneha Nair"],
    description: "Creating premium VESIT-branded hoodies, stickers, and keychains for the entrepreneurship cell.",
    status: "Ideation",
    meetingTime: "Tuesdays at 4:30 PM (Google Meet)"
  }
];
