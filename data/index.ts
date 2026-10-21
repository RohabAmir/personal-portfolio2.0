export const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Experience", link: "#professional-experience" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "My interests",
    description: "Technologies I love working with",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2 lg:min-h-[20vh] sm:min-h-[25vh] min-h-[40vh]",
    imgClassName: "",
    titleClassName: "align-center",
    img: "",
    spareImg: "",
    isOrbitingSkills: true,
  },
  {
    id: 5,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-3 md:col-span-3 md:row-span-1",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 6,
    title:
      "Intuitive and High-Performance Web Applications that drive business success",
    description: "Knack for creating",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 7,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-full text-center",
    img: "",
    spareImg: "",
  },
];

export type Project = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  ai: string[];
  img: string;
  video?: string;
  link: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Wateen",
    tagline: "AI-Powered Restaurant Operations Platform",
    description:
      "A bilingual AI-powered online marketplace and inventory management platform for F&B businesses in Saudi Arabia.",
    features: [
      "Led a cross-functional team to deliver a bilingual (EN/AR) restaurant operations platform for F&B businesses in Saudi Arabia",
      "AI-powered marketplace with smart inventory and order management",
      "Real-time operational dashboards for restaurants and suppliers",
      "Fully responsive, accessible experience across all devices",
    ],
    tech: [
      "Next.js v16",
      "React v19",
      "TypeScript v4.3",
      "Redux Toolkit",
      "Material UI",
      "Formik",
      'i18next',
    ],
    ai: ["GLM 5.3 Flash", "GPT-5.6"],
    img: "/project-images/wateen-blueprint.webp",
    video: "/project-videos/wateen.mp4",
    link: "https://wateen.ai/en",
  },
  {
    id: 2,
    title: "DARI",
    tagline: "Abu Dhabi's Digital Real-Estate Ecosystem",
    description:
      "A production-ready marketplace and management platform to handle ongoing real-estate services — your one-stop solution for all real-estate needs in Abu Dhabi.",
    features: [
      "Converted a legacy, fully manual property-services builder into an intelligent, automated platform using AI automation",
      "Interactive map-based property exploration with Google Maps integration",
      "Role-aware forms and state management for complex service workflows",
      "Built for government-backed client ADREC (Abu Dhabi Real Estate Centre)",
    ],
    tech: [
      "React v16",
      'JavaScript v17',
      "Redux v5.0",
      "Redux Thunk",
      "React Hook Form",
      "MUI Core",
      "google-map-react",
    ],
    ai: ["Claude Opus 5.5", "Claude Sonnet 5"],
    img: "/project-images/dari-blueprint.webp",
    link: "https://www.dari.ae",
  },
  {
    id: 3,
    title: "AI-Powered Headless CMS",
    tagline: "SaaS Content Management Dashboard",
    description:
      "An AI-powered headless CMS for a Saudi client, now running 4 live websites — pages and sections created and edited from one dashboard.",
    features: [
      "Python crawler turns any site's HTML sections into JSON content APIs",
      "RBAC with 2FA, drag-and-drop section ordering, and full audit logs",
      "SEO & blog management, lead and user management with super-admin controls",
      "Rich-text editing and theming for any tourism website from a single platform",
    ],
    tech: [
      "React v19",
      "TypeScript v5.6",
      "Python v3.12",
      "Tailwind CSS v4.3",
      "shadcn/ui",
      "Kokonut UI",
      "React Hook Form",
      "Zod",
      "TanStack Query",
      "Motion v12",
    ],
    ai: ["Claude Sonnet 5.5"],
    img: "/project-images/AI-Powered-Dashboard-blueprint.webp",
    link: "https://jigsaw-dashboard.jigsawtech.co/login",
  },
  {
    id: 4,
    title: "Dan (PIF)",
    tagline: "Saudi Government Tourism Project",
    description:
      "A Saudi government (PIF) project contributing to the development of the tourism sector, with a full website and admin panel.",
    features: [
      "Revamped and developed a Saudi tourism website + admin panel with 30+ landing pages from Figma wireframes",
      "Multi-language toggle (English/Arabic) with full RTL support",
      "Mapbox integration for dynamic location coordinates",
      "X/Twitter API for social feeds and blog content managed via Admin Panel",
    ],
    tech: [
      "Next.js v16",
      "TypeScript v4.3",
      "Tailwind CSS v4.0",
      "Chakra UI",
      "Motion v11.13",
    ],
    ai: ["Claude Opus 5", "Claude Sonnet 4.6"],
    img: "/project-images/dan-blueprint.webp",
    link: "https://dancompany.sa/ar",
  },
  {
    id: 5,
    title: "Jigsaw Digital Solutions",
    tagline: "All-in-One Ordering, Payment & Delivery",
    description:
      "Your all-in-one cloud-based solution for ordering, payment, and delivery — a multilingual platform with a scalable admin panel.",
    features: [
      "Defined and implemented the technical architecture of a multilingual Next.js platform (App Router, SSR/ISR)",
      "Rigorous SEO: structured data, canonical/hreflang, sitemaps",
      "Scalable Admin Panel with secure, versioned APIs",
      "Modular content workflows and social integrations",
    ],
    tech: ["Next.js v15", "TypeScript v4.3", "Tailwind CSS v4.0", "SSR/ISR"],
    ai: ["Grok 4.6", "GLM 5.3 Flash"],
    img: "/project-images/jigsaw-blueprint.webp",
    link: "https://www.jigsawme.io",
  },
  {
    id: 6,
    title: "Sharemundo",
    tagline: "Energy Consultant — Project Management Platform",
    description:
      "A dashboard for a Germany-based Project Management Platform (EC-PMP) — a complete ecosystem to boost your projects.",
    features: [
      "40+ landing and milestone screens built with pixel perfection and best practices for backend integration",
      "Secure authentication and authorization using Auth0 with streamlined user management",
      "Document and asset handling with AWS S3 and SharePoint",
      "Deployed on Vercel with RESTful API integrations",
    ],
    tech: [
      "Vue.js v3.5",
      "Nuxt v3.6",
      "TypeScript v5.6",
      "AWS S3",
      "SharePoint v2019",
      "Vercel",
    ],
    ai: ["Gemini 4 Argon"],
    img: "/project-images/shermundo-blueprint.webp",
    link: "https://sharemundo.com/en/",
  },
  {
    id: 7,
    title: "Tuaja Resorts",
    tagline: "Luxury Hospitality Platform",
    description:
      "A platform for a luxury hospitality brand in Saudi Arabia, developed end to end as one of two production Saudi tourism websites.",
    features: [
      "Luxury resorts platform developed end to end, from Figma designs to production",
      "Multilingual RTL/LTR experience with a seamless booking journey",
      "Pixel-perfect, fast and responsive web pages",
      "Immersive visuals showcasing resort experiences and amenities",
    ],
    tech: ["Next.js v15", "TypeScript v4.3", "Tailwind CSS v4.0", "Motion v11.13"],
    ai: ["Claude Opus 5", "GPT-5.6"],
    img: "/project-images/tuaja-blueprint.webp",
    link: "https://tuaja.com/en",
  },
  {
    id: 8,
    title: "Tribaja",
    tagline: "Talent Marketplace & Community",
    description:
      "A talent marketplace and community for undersupported tech talent, with a talent management portal and community platform.",
    features: [
      "Talent Management Portal dashboard with end-to-end responsiveness",
      "Google & LinkedIn OAuth authentication",
      "Efficient state management with Redux Toolkit and Redux-Saga",
      "Community platform connecting underrepresented tech talent with employers",
    ],
    tech: ["React v18", "TypeScript v4.3", "Sass v5.0", "Redux Toolkit v5.0", "Redux-Saga"],
    ai: ["Claude Opus 4.5", "Claude Sonnet 4.6", "OpenAI"],
    img: "/project-images/tribaja-blueprint.webp",
    link: "https://www.tribaja.co/",
  },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Rohab was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Rohab's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Rohab is the ideal partner.",
    name: "Alaa Farhat",
    title: "CEO & Co-Founder @Jigsaw Solutions",
  },
  {
    quote:
      "Working with Rohab has been a transformative experience for our company. His keen eye for design and exceptional coding skills brought our project to life. Our website is not only visually appealing but also highly functional, thanks to Rohab's meticulous attention to detail.",
    name: "Eman Ayyad",
    title: "Development Director @Jigsaw Solutions",
  },
  {
    quote:
      "Rohab's ability to translate complex requirements into seamless web experiences is unmatched. He delivered our project ahead of schedule and exceeded our expectations in terms of both aesthetics and performance. A true professional and a pleasure to work with!",
    name: "Shannon Morales",
    title: "CE0 @Tribaja",
  },
  {
    quote:
      "As a startup, we needed a website that could make a strong first impression, and Rohab delivered just that. His creative insights and technical prowess helped us achieve a web presence that truly stands out. I highly recommend Rohab for any frontend development needs!",
    name: "Mona Bin Shalhoub",
    title: "Digital Solutions Analyst @Dan - PIF Company",
  },
  {
    quote:
      "Rohab is a wizard with frontend technologies. He revamped our website with a fresh, modern design that has significantly increased our user engagement. His proactive approach to solving problems and optimizing performance made the entire redesign process smooth and stress-free.",
    name: "Abdulrahman Abaalkhail",
    title: "Chief Executive Officer @Dan - PIF Company",
  },
];

export const companies = [
  {
    id: 1,
    name: "Vercel",
    img: "/vercel.svg",
    nameImg: "/vercelName.svg",
    iconClassName: "w-7 md:w-10",
    nameClassName: "w-20 md:w-24",
    nameWidth: 84,
  },
  {
    id: 2,
    name: "Claude",
    img: "/claude.svg",
    nameImg: "/claudeName.svg",
    iconClassName: "w-7 md:w-10",
    nameClassName: "w-20 md:w-24",
    nameWidth: 90,
  },
  {
    id: 3,
    name: "Framer Motion",
    img: "/framer-motion.svg",
    nameImg: "/framer-motion-name.svg",
    iconClassName: "w-7 md:w-10",
    nameClassName: "w-28 md:w-[8.5rem]",
    nameWidth: 174,
  },
  {
    id: 4,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
    iconClassName: "w-7 md:w-10",
    nameClassName: "w-20 md:w-24",
    nameWidth: 131,
  },
  {
    id: 5,
    name: "Aceternity",
    img: "/Aceternity.svg",
    nameImg: "/AceternityName.svg",
    iconClassName: "w-7 md:w-10",
    nameClassName: "w-20 md:w-24",
    nameWidth: 100,
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Developer Lead",
    desc: "Completed an intensive React bootcamp and led frontend development on the team's live project, translating designs into production-ready UI.",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Associate Software Engineer",
    desc: "Contributed to a web-based platform using Next.js and React, implementing features and resolving issues across the stack.",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Software Engineer",
    desc: "Delivered features across small- and large-scale projects, owning development from implementation to production release.",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Senior Software Engineer",
    desc: "Architect and maintain production-ready applications with modern technologies while mentoring developers and driving code quality.",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    link: "https://github.com/RohabAmir",
    img: "/git.svg",
  },
  {
    id: 2,
    link: "https://leetcode.com/u/rohabamir2/",
    img: "/leetcode.svg",
  },
  {
    id: 3,
    link: "https://www.linkedin.com/in/rohab-aamir2/",
    img: "/link.svg",
  },
];

export type TechStackItem = {
  name: string;
  img: string;
  tint?: string;
  colored?: boolean;
};

export const techStackRows: TechStackItem[][] = [
  [
    { name: "Cursor", img: "/logos/tech/cursor.svg", tint: "#FFFFFF" },
    { name: "Claude", img: "/logos/tech/claude.svg", tint: "#D97757" },
    { name: "OpenAI", img: "/logos/tech/openai.svg", tint: "#FFFFFF" },
    { name: "Gemini", img: "/logos/tech/gemini.svg", colored: true },
    { name: "GLM", img: "/logos/tech/glm.svg", colored: true },
    { name: "Grok", img: "/logos/tech/grok.svg", tint: "#FFFFFF" },
    { name: "Kimi", img: "/logos/tech/kimi.svg", colored: true },
    { name: "Figma", img: "/logos/tech/figma.svg", colored: true },
    { name: "Tailwind", img: "/logos/tech/tailwindcss.svg", tint: "#06B6D4" },
    { name: "Shadcn/ui", img: "/logos/tech/shadcnui.svg", tint: "#FFFFFF" },
    { name: "Material UI", img: "/logos/tech/materialui.svg", tint: "#007FFF" },
    { name: "Chakra UI", img: "/logos/tech/chakraui.svg", tint: "#319795" },
    { name: "Kokonut UI", img: "/logos/tech/kokonutui.svg", colored: true },
    { name: "SERA UI", img: "/logos/tech/seraui.svg", colored: true },
    { name: "Vercel", img: "/vercel.svg", tint: "" },
  ],
  [
    { name: "AWS", img: "/logos/tech/amazonwebservices.svg", tint: "#FF9900" },
    { name: "Azure", img: "/logos/tech/azure.svg", tint: "#0078D4" },
    { name: "Supabase", img: "/logos/tech/supabase.svg", tint: "#3FCF8E" },
    { name: "Firebase", img: "/logos/tech/firebase.svg", colored: true },
    { name: "Git", img: "/logos/tech/git.svg", tint: "#F05032" },
    { name: "Nginx", img: "/logos/tech/nginx.svg", tint: "#009639" },
    { name: "Strapi", img: "/logos/tech/strapi.svg", tint: "#4945FF" },
    { name: "Clerk", img: "/logos/tech/clerk.svg", tint: "#6C47FF" },
    { name: "Auth0", img: "/logos/tech/auth0.svg", tint: "#EB5424" },
    { name: "NextAuth", img: "/logos/tech/nextauth.png", colored: true },
    { name: "Aceternity", img: "/Aceternity.svg", tint: "" },
    { name: "GitHub", img: "/logos/tech/github.svg", tint: "#FFFFFF" },
    { name: "GitLab", img: "/logos/tech/gitlab.svg", tint: "#FC6D26" },
    { name: "Docker", img: "/logos/tech/docker.svg", tint: "#2496ED" },
    { name: "Cloudflare", img: "/logos/tech/cloudflare.svg", tint: "#F38020" },
  ],
  [
    { name: "Redux", img: "/logos/tech/redux.svg", tint: "#764ABC" },
    { name: "TanStack Query", img: "/logos/tech/tanstack.svg", tint: "#EF4154" },
    { name: "Zod", img: "/logos/tech/zod.svg", tint: "#3E67B1" },
    { name: "Jest", img: "/logos/tech/jest.svg", tint: "#C21325" },
    { name: "Vitest", img: "/logos/tech/vitest.svg", tint: "#6E9F18" },
    { name: "GSAP", img: "/logos/tech/gsap.svg", tint: "#0AE448" },
    { name: "Framer Motion", img: "/framer-motion.svg", tint: "" },
    { name: "Motion", img: "/logos/tech/motion.svg", tint: "#FFFFFF" },
    { name: "Highcharts", img: "/logos/tech/highcharts.svg", colored: true },
    { name: "WebSockets", img: "/logos/tech/websocket.svg", tint: '#1d9605' },
    { name: "WebRTC", img: "/logos/tech/webrtc.svg", colored: true },
    { name: "Cloudinary", img: "/cloud.svg", tint: "" },
    { name: "React Hook Form", img: "/logos/tech/reacthookform.svg", colored: true },
    { name: "Formik", img: "/logos/tech/formik.svg", tint: "#2563EB" },
    { name: "AG Grid", img: "/logos/tech/aggrid.png", colored: true },
  ],
];
