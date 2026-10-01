import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import ProjectDetail from "./ProjectDetail";
import ConfirmationModal from "./ConfirmationModal";
import {
  Brain,
  Code,
  Cpu,
  Terminal,
  Bug,
  ChevronDown,
  Search,
  Rocket,
  Users,
  Bot,
  Plane,
  Navigation,
  Crosshair,
  Map,
  Radio,
  Gauge,
  Box,
  Route,
  Layers,
  GitBranch,
  Radar,
  Zap,
  Satellite,
  Webcam,
  UserCheck,
  MessageSquare,
  FileText,
  FileSpreadsheet,
  Handshake,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Video,
  BookOpen,
  Target,
  Package,
  FlaskConical,
  CheckCircle2
} from "lucide-react";

/* ===================== Couleurs ===================== */
/* Couleur d'accent (gris) utilisée pour les boutons, le fond animé et les détails.
   Ajuste ces valeurs R,G,B pour changer la nuance de gris. */
const ACCENT_RGB = "107,114,128";       // gris (#6b7280)
const ACCENT_DARK_RGB = "75,85,99";     // gris foncé pour le survol (#4b5563)

/* ===================== Traduction ===================== */
/* L(v, lang) : renvoie la bonne langue si v = { fr, en }, sinon v tel quel */
function L(v, lang) {
  if (v == null || typeof v === "string" || Array.isArray(v)) return v;
  if (typeof v === "object" && ("fr" in v || "en" in v)) return v[lang] ?? v.fr;
  return v;
}

const UI = {
  fr: {
    nav: { experience: "Expérience", education: "Formation", skills: "Compétences", projects: "Projets", contact: "Contact" },
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    langLabel: "Changer de langue",
    heroTitle: "Ingénieur IA en robotique, systèmes autonomes & drones.",
    heroDesc:
      "Je conçois des systèmes intelligents pour robots et drones : perception par vision (détection et suivi d'objets), contrôle, navigation autonome, simulation et déploiement d'IA embarquée sur matériel.",
    heroCta1: "Voir projets",
    heroCta2: "Me contacter",
    cardTitle: "Expertise technique",
    cardText:
      "Spécialisé en intelligence artificielle appliquée à la robotique et aux drones - de la perception au contrôle, de la simulation au déploiement embarqué.",
    expTitle: "Expérience professionnelle",
    expSub: "Expériences en industrie, stages et réalisations",
    remote: " (à distance)",
    eduTitle: "Formation",
    eduSub: "Parcours académique et certifications pertinentes",
    skillsTitle: "Compétences",
    skillsSub:
      "Robotique, drones (UAV) et IA embarquée - perception, contrôle, navigation, simulation et déploiement sur matériel - complétés par des outils de travail et des compétences humaines.",
    projectsTitle: "Projets récents",
    projectsSub: "Une sélection de projets réalisés et en cours.",
    demo: "Démo",
    detail: "Détail",
    status: { "en-cours": "En cours", termine: "Terminé", "en-pause": "En pause" },
    methodTitle: "Ma méthode de travail",
    methodSub: "Du besoin au système déployé, une approche structurée",
    steps: [
      { t: "Analyse", d: "Besoins, contraintes matérielles et objectifs" },
      { t: "Simulation", d: "Prototypage dans Gazebo, AirSim ou PyBullet" },
      { t: "Modèle IA", d: "Perception, contrôle et architecture logicielle" },
      { t: "Tests", d: "Approche TDD, validation en simulation puis sur matériel" },
      { t: "Déploiement", d: "Optimisation et intégration embarquée" },
    ],
    collaborate: "Collaborons ensemble",
    contactTitle: "Contact",
    contactSub: "Disponible pour missions freelance, CDD ou CDI - parlons-en.",
    name: "Votre nom",
    email: "Votre email",
    message: "Votre message",
    send: "Envoyer",
    sending: "Envoi…",
    emailBtn: "Email",
    errSend: "Erreur lors de l'envoi. Réessayez plus tard.",
    errNetwork: "Erreur réseau. Vérifiez votre connexion.",
    faqTitle: "Questions fréquentes",
    footerLinks: "Liens",
  },
  en: {
    nav: { experience: "Experience", education: "Education", skills: "Skills", projects: "Projects", contact: "Contact" },
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langLabel: "Change language",
    heroTitle: "AI Engineer in robotics, autonomous systems & drones.",
    heroDesc:
      "I design intelligent systems for robots and drones: vision-based perception (object detection and tracking), control, autonomous navigation, simulation and deployment of embedded AI on hardware.",
    heroCta1: "View projects",
    heroCta2: "Contact me",
    cardTitle: "Technical expertise",
    cardText:
      "Specialized in artificial intelligence for robotics and drones - from perception to control, from simulation to embedded deployment.",
    expTitle: "Professional experience",
    expSub: "Industry experience, internships and achievements",
    remote: " (remote)",
    eduTitle: "Education",
    eduSub: "Academic background and relevant certifications",
    skillsTitle: "Skills",
    skillsSub:
      "Robotics, drones (UAV) and embedded AI - perception, control, navigation, simulation and hardware deployment - complemented by workplace tools and soft skills.",
    projectsTitle: "Recent projects",
    projectsSub: "A selection of completed and ongoing projects.",
    demo: "Demo",
    detail: "Details",
    status: { "en-cours": "In progress", termine: "Completed", "en-pause": "On hold" },
    methodTitle: "How I work",
    methodSub: "From requirements to a deployed system, a structured approach",
    steps: [
      { t: "Analysis", d: "Requirements, hardware constraints and goals" },
      { t: "Simulation", d: "Prototyping in Gazebo, AirSim or PyBullet" },
      { t: "AI model", d: "Perception, control and software architecture" },
      { t: "Testing", d: "TDD approach, validation in simulation, then on hardware" },
      { t: "Deployment", d: "Optimization and embedded integration" },
    ],
    collaborate: "Let's work together",
    contactTitle: "Contact",
    contactSub: "Available for freelance missions, fixed-term or permanent positions - let's talk.",
    name: "Your name",
    email: "Your email",
    message: "Your message",
    send: "Send",
    sending: "Sending…",
    emailBtn: "Email",
    errSend: "Error while sending. Please try again later.",
    errNetwork: "Network error. Please check your connection.",
    faqTitle: "Frequently asked questions",
    footerLinks: "Links",
  },
};

/* ===================== Icônes personnalisées ===================== */
function OpenCVIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.627 24a5.627 5.627 0 01-5.627-5.627V5.627A5.627 5.627 0 015.627 0h12.746A5.627 5.627 0 0124 5.627v12.746A5.627 5.627 0 0118.373 24H5.627zm6.186-21.333a9.333 9.333 0 100 18.666 9.333 9.333 0 000-18.666zm0 16a6.667 6.667 0 110-13.334 6.667 6.667 0 010 13.334zm0-10.667a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>
  );
}
function PyTorchIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 13.947 9.865 9.865 0 0013.947 0L12.005 0z"/>
    </svg>
  );
}
function CppIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79z"/>
    </svg>
  );
}

/* ===================== Compétences (par catégorie) ===================== */
const SKILL_GROUPS = [
  {
    title: { fr: "IA & vision par ordinateur", en: "AI & computer vision" },
    Icon: Brain,
    items: [
      { label: { fr: "Ingénierie IA", en: "AI engineering" }, Icon: Brain },
      { label: "Deep Learning", Icon: Brain },
      { label: "PyTorch", Icon: PyTorchIcon },
      { label: { fr: "OpenCV (vision par ordinateur)", en: "OpenCV (computer vision)" }, Icon: OpenCVIcon },
      { label: { fr: "Détection & suivi d'objets (YOLO)", en: "Object detection & tracking (YOLO)" }, Icon: Crosshair },
      { label: "Edge AI (ONNX, NCNN, TensorRT)", Icon: Zap },
    ],
  },
  {
    title: { fr: "Robotique, drones & systèmes autonomes", en: "Robotics, drones & autonomous systems" },
    Icon: Bot,
    items: [
      { label: { fr: "Robotique", en: "Robotics" }, Icon: Bot },
      { label: "UAV / Drones", Icon: Plane },
      { label: "ROS / ROS 2", Icon: Layers },
      { label: "PX4 / ArduPilot", Icon: Navigation },
      { label: "MAVLink / MAVSDK", Icon: Radio },
      { label: { fr: "Contrôle PID & automatique", en: "PID & control systems" }, Icon: Gauge },
      { label: { fr: "Fusion de capteurs (IMU, GPS, Kalman)", en: "Sensor fusion (IMU, GPS, Kalman)" }, Icon: Radar },
      { label: { fr: "SLAM & localisation", en: "SLAM & localization" }, Icon: Map },
      { label: { fr: "Planification de trajectoire", en: "Path planning" }, Icon: Route },
      { label: "Simulation (Gazebo, AirSim, PyBullet)", Icon: Box },
    ],
  },
  {
    title: { fr: "Programmation & systèmes embarqués", en: "Programming & embedded systems" },
    Icon: Cpu,
    items: [
      { label: { fr: "Systèmes embarqués (Raspberry Pi, Jetson)", en: "Embedded systems (Raspberry Pi, Jetson)" }, Icon: Cpu },
      { label: "C++", Icon: CppIcon },
      { label: "Python", Icon: Code },
      { label: "Linux / Bash", Icon: Terminal },
      { label: "Git", Icon: GitBranch },
      { label: { fr: "Tests & débogage", en: "Testing & debugging" }, Icon: Bug },
      { label: { fr: "TDD (développement piloté par les tests)", en: "TDD (Test-Driven Development)" }, Icon: CheckCircle2 },
    ],
  },
  {
    title: { fr: "Outils & bureautique", en: "Tools & productivity" },
    Icon: Briefcase,
    items: [
      { label: "Odoo (ERP)", Icon: Package },
      { label: "Microsoft Teams", Icon: Video },
      { label: "Notion", Icon: BookOpen },
      { label: "Microsoft Excel", Icon: FileSpreadsheet },
      { label: "Microsoft Word & PowerPoint", Icon: FileText },
      { label: "Google Workspace", Icon: FileText },
    ],
  },
  {
    title: { fr: "Compétences humaines & management", en: "Soft skills & management" },
    Icon: Users,
    items: [
      { label: { fr: "Travail en équipe", en: "Teamwork" }, Icon: Handshake },
      { label: { fr: "Gestion d'équipe", en: "Team management" }, Icon: Users },
      { label: { fr: "Recrutement & entretiens techniques", en: "Recruiting & technical interviews" }, Icon: UserCheck },
      { label: { fr: "Formation & encadrement", en: "Training & mentoring" }, Icon: GraduationCap },
      { label: { fr: "Communication", en: "Communication" }, Icon: MessageSquare },
      { label: { fr: "Résolution de problèmes", en: "Problem solving" }, Icon: Lightbulb },
      { label: { fr: "Autonomie & adaptabilité", en: "Autonomy & adaptability" }, Icon: Target },
    ],
  },
];

/* ===================== Projets ===================== */
const PROJECTS = [
  {
    title: { fr: "Unnamed - Gestion de chantiers", en: "Unnamed - Construction Management" },
    pre: {
      fr: "Plateforme IA pour la gestion de projets BTP, automatisant les tâches et optimisant coordination et précision.",
      en: "AI platform for construction project management, automating tasks and improving coordination and accuracy.",
    },
    description: {
      fr: "Plateforme de gestion et d’estimation de projets BTP intégrant l’IA pour automatiser les tâches, assurer le suivi en temps réel et améliorer la coordination des équipes. Objectif : simplifier le travail, gagner du temps et accroître la précision.",
      en: "Construction project management and estimation platform using AI to automate tasks, provide real-time tracking and improve team coordination. Goal: simplify the work, save time and increase accuracy.",
    },
    link: "https://fieldops.example.com/",
    image: `${import.meta.env.BASE_URL}images/const.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/const.jpg`,
      `${import.meta.env.BASE_URL}images/const1.jpg`,
    ],
    slug: "construction-management",
    status: "en-cours",
    technos: ["React.js", "Vite", "Node.js / Express", "SQL / PostgreSQL", "OCR", "Python (ML backend)", "OpenCV"],
    notes: {
      fr: [
        "Intégration de modèles de détection d'objets pour le suivi de chantier.",
        "Pipeline ETL pour le traitement des métriques en temps réel.",
        "OCR pour l'extraction automatique de devis/factures depuis des images.",
        "Déploiement conteneurisé pour la scalabilité et la CI/CD.",
      ],
      en: [
        "Object detection models integrated for construction site monitoring.",
        "ETL pipeline for real-time metrics processing.",
        "OCR for automatic extraction of quotes/invoices from images.",
        "Containerized deployment for scalability and CI/CD.",
      ],
    },
  },
  {
    title: { fr: "Solution de prestation des cours de langues et services", en: "Language courses and services platform" },
    pre: {
      fr: "Une plateforme de cours de langues avec réservations en ligne, ressources pédagogiques, entraînement aux tests, visioconférences et suivi personnalisé des progrès.",
      en: "A language learning platform with online booking, learning resources, test preparation, video sessions and personalized progress tracking.",
    },
    description: {
      fr: "Site de cours de langues proposant : gestion dynamique d'un calendrier partagé (prof / étudiant), espace pour documents et livres à acheter, préparation et entraînement aux tests, et intégration de sessions vidéo via Google Meet. Plateforme conçue pour offrir une expérience fluide - réservations en ligne, espace professeur pour préparer le cours et suivi des progrès de l'étudiant.",
      en: "Language course website offering: a dynamic shared calendar (teacher / student), a store for documents and books, test preparation and practice, and video sessions through Google Meet. Designed for a smooth experience - online booking, a teacher space to prepare lessons and student progress tracking.",
    },
    link: "https://scorexplorer.com/",
    image: `images/aaaaa.jpg`,
    images: [`images/aaaaa.jpg`, `images/aaaa.jpg`, `images/aaa.jpg`, `images/a.jpg`],
    slug: "ScoreXplorer",
    status: "termine",
    technos: ["React.js", "Vite", "Node.js / Express", "SQL", "AI Agent"],
    notes: {
      fr: [
        "Calendrier dynamique synchronisé pour professeurs et étudiants.",
        "Espace boutique pour documents et livres numériques/physiques.",
        "Modules de préparation aux tests et suivi des performances.",
        "Intégration avec Google Meet pour les sessions en ligne.",
        "Intégration de l’IA pour la correction de la production écrite de l’utilisateur, sans intervention d’aucun professeur.",
      ],
      en: [
        "Dynamic calendar synchronized between teachers and students.",
        "Store for digital and physical documents and books.",
        "Test preparation modules and performance tracking.",
        "Google Meet integration for online sessions.",
        "AI-powered correction of the user's written work, with no teacher involvement.",
      ],
    },
  },
  {
    title: { fr: "DKB Learning - Plateforme d'apprentissage en ligne (DKB Finance)", en: "DKB Learning - E-learning platform (DKB Finance)" },
    description: {
      fr: "Plateforme de formation dédiée aux collaborateurs de DKB Finance : modules de cours, quiz interactifs et suivi de la progression des employés.",
      en: "Training platform for DKB Finance employees: course modules, interactive quizzes and employee progress tracking.",
    },
    link: "https://dkb-tools.com/learning/index.php",
    image: `${import.meta.env.BASE_URL}images/dkb.jpg`,
    images: [`${import.meta.env.BASE_URL}images/dkb.jpg`],
    slug: "dkb-tools-learning",
    period: { fr: "Juin 2024 - Juillet 2024", en: "June 2024 - July 2024" },
    status: "termine",
    technos: ["PHP", "MySQL", "JavaScript", "Bootstrap", "OAuth", "HTML & CSS"],
    notes: {
      fr: [
        "Modules de cours avec quiz et suivi des progrès par employé.",
        "Interface d'administration permettant le CRUD sur les cours et chapitres.",
        "Rapports et tableaux de bord pour le suivi de performance des apprenants.",
      ],
      en: [
        "Course modules with quizzes and per-employee progress tracking.",
        "Admin interface with full CRUD on courses and chapters.",
        "Reports and dashboards to track learner performance.",
      ],
    },
  },
];

/* Projet traduit dans la langue active (passé tel quel à ProjectDetail) */
function localizeProject(p, lang) {
  return {
    ...p,
    title: L(p.title, lang),
    pre: L(p.pre, lang),
    description: L(p.description, lang),
    period: L(p.period, lang),
    notes: L(p.notes, lang),
  };
}

/* ===================== Formation ===================== */
const EDUCATION = [
  {
    degree: {
      fr: "MASTER 2 SYSTÈMES AUTONOMES (ROBOTS, DRONES) ET INTERACTIONS",
      en: "MASTER'S DEGREE (M2) IN AUTONOMOUS SYSTEMS (ROBOTS, DRONES) AND INTERACTIONS",
    },
    period: { fr: "En cours", en: "In progress" },
    institution: { fr: "Université de Bordeaux", en: "University of Bordeaux" },
    image: `${import.meta.env.BASE_URL}images/UB.png`,
  },
  {
    degree: {
      fr: "MASTER EN INTELLIGENCE ARTIFICIELLE ET TRAITEMENT DES DONNÉES",
      en: "MASTER'S DEGREE IN ARTIFICIAL INTELLIGENCE AND DATA PROCESSING",
    },
    period: "2023 - 2025",
    institution: { fr: "Université Badji Mokhtar Annaba", en: "Badji Mokhtar University, Annaba" },
    image: `${import.meta.env.BASE_URL}images/ubma.png`,
  },
  {
    degree: { fr: "LICENCE EN INFORMATIQUE", en: "BACHELOR'S DEGREE IN COMPUTER SCIENCE" },
    period: "2020 - 2023",
    institution: { fr: "Université Badji Mokhtar Annaba", en: "Badji Mokhtar University, Annaba" },
    image: `${import.meta.env.BASE_URL}images/ubma.png`,
  },
  {
    degree: { fr: "CERTIFICAT EN MACHINE LEARNING AVEC PYTHON", en: "MACHINE LEARNING WITH PYTHON CERTIFICATE" },
    period: { fr: "Octobre 2024", en: "October 2024" },
    institution: { fr: "IBM (en ligne)", en: "IBM (online)" },
    image: `${import.meta.env.BASE_URL}images/IBM.png`,
  },
  {
    degree: {
      fr: "CERTIFICAT EN SPÉCIALISATION EN PROGRAMMATION C++ POUR LE DÉVELOPPEMENT DE JEUX UNREAL ENGINE",
      en: "C++ PROGRAMMING FOR UNREAL ENGINE GAME DEVELOPMENT SPECIALIZATION CERTIFICATE",
    },
    period: { fr: "Août 2024", en: "August 2024" },
    institution: { fr: "Université du Colorado Boulder (en ligne)", en: "University of Colorado Boulder (online)" },
    image: `${import.meta.env.BASE_URL}images/uc.png`,
  },
  {
    degree: {
      fr: "CERTIFICAT EN SURVEILLANCE DES RISQUES DE CATASTROPHES À L'AIDE DE L'IMAGERIE SATELLITAIRE",
      en: "DISASTER RISK MONITORING USING SATELLITE IMAGERY CERTIFICATE",
    },
    period: { fr: "Juillet 2024", en: "July 2024" },
    institution: { fr: "NVIDIA Deep Learning Institute (en ligne)", en: "NVIDIA Deep Learning Institute (online)" },
    image: `${import.meta.env.BASE_URL}images/nvidia.png`,
  },
];

/* ===================== Expérience ===================== */
const EXPERIENCE = [
  {
    title: { fr: "Développeur IA & Responsable du pôle IT", en: "AI Developer & Head of IT" },
    company: "Cabinet OXO",
    link: "https://www.cabinet-oxo.com/",
    duration: { fr: "Décembre 2025 – Présent", en: "December 2025 – Present" },
    remote: false,
    image: `${import.meta.env.BASE_URL}images/OXO.webp`,
    description: {
      fr: "Startup qui gère plusieurs services pour des restaurants français : comptabilité, ressources humaines, administratif, logiciel de point de vente, site web, communication et marketing.",
      en: "Startup providing multiple services to French restaurants: accounting, human resources, administration, point-of-sale software, website, communication and marketing.",
    },
    groups: [
      {
        title: { fr: "Responsabilité du pôle IT & management", en: "IT department leadership & management" },
        bullets: {
          fr: [
            "Responsable du pôle IT de l’entreprise.",
            "Recrutement : conduite d’entretiens techniques avec les candidats.",
            "Formation et gestion d’une petite équipe de 3 personnes au sein du pôle IT.",
            "Travail en collaboration avec une équipe française et avec les dirigeants de l’entreprise.",
          ],
          en: [
            "Head of the company's IT department.",
            "Recruiting: conducting technical interviews with candidates.",
            "Training and managing a small team of 3 people in the IT department.",
            "Working closely with a French team and with the company's executives.",
          ],
        },
      },
      {
        title: { fr: "IA & automatisation", en: "AI & automation" },
        bullets: {
          fr: [
            "Développement de solutions d’automatisation B2B end-to-end dans Odoo.",
            "Conception de modèles de scoring basés sur l’IA pour identifier les leads les plus pertinents et automatiser leur qualification, afin d’optimiser les actions commerciales et l’efficacité opérationnelle.",
            "Mise en place d’un système de prospection automatique pour capter les restaurants de la région de la Moselle et lancer des campagnes de diffusion automatisées, en collaboration avec le pôle marketing et communication.",
          ],
          en: [
            "Development of end-to-end B2B automation solutions in Odoo.",
            "Design of AI-based scoring models to identify the most relevant leads and automate their qualification, improving sales actions and operational efficiency.",
            "Set up an automated prospecting system to reach restaurants in the Moselle region and launch automated outreach campaigns, together with the marketing and communication team.",
          ],
        },
      },
      {
        title: { fr: "Développement Odoo & web", en: "Odoo & web development" },
        bullets: {
          fr: [
            "Conception du site web de la startup via le module Website d’Odoo (backend et frontend), automatisation des processus entre le client et l’entreprise et mise en place d’un chatbot.",
            "Développement et automatisation du logiciel de point de vente du restaurant, et centralisation de toute la gestion du restaurant sur Odoo.",
            "Développement d’un template de site web pour restaurants dans Odoo.",
          ],
          en: [
            "Built the startup's website with Odoo's Website module (backend and frontend), automated client–company processes and added a chatbot.",
            "Developed and automated the restaurant point-of-sale software, centralizing all restaurant management in Odoo.",
            "Developed a website template for restaurants in Odoo.",
          ],
        },
      },
      {
        title: { fr: "Documentation", en: "Documentation" },
        bullets: {
          fr: [
            "Documentation des processus métier de l’entreprise (flux clients, commerciaux et opérationnels).",
            "Rédaction de la documentation technique des solutions développées (architecture, modules Odoo, automatisations, guides d’utilisation et de maintenance).",
          ],
          en: [
            "Documented the company's business processes (client, sales and operational workflows).",
            "Wrote technical documentation for the solutions built (architecture, Odoo modules, automations, user and maintenance guides).",
          ],
        },
      },
    ],
  },
  {
    title: { fr: "Ingénieur IA (Stage)", en: "AI Engineer (Internship)" },
    company: { fr: "AI Drones / Université Tech de Nanjing", en: "AI Drones / Nanjing Tech University" },
    duration: { fr: "3 mois", en: "3 months" },
    location: { fr: "Nanjing, Chine", en: "Nanjing, China" },
    remote: true,
    image: `${import.meta.env.BASE_URL}images/nan.png`,
    groups: [
      {
        bullets: {
          fr: [
            "Développement d'un système de suivi de drone à l'aide du modèle de nano architecture amélioré de YOLOv11, entraîné sur le jeu de données VisDrone.",
            "Mise en œuvre d'un contrôleur PID avancé pour obtenir un suivi à grande vitesse sans oscillations.",
            "Intégration d'un système de caméra pan-tilt pour la détection et le suivi d'objets stabilisés.",
            "Utilisation de PyBullet et AirSim pour la simulation et des tests de drones réalistes.",
            "Émulation d'un environnement Raspberry Pi 4 pour évaluer les performances du système dans des limites matérielles réelles.",
            "Conversion du modèle PyTorch vers ONNX puis vers NCNN pour l'optimisation matérielle.",
          ],
          en: [
            "Developed a drone tracking system using an improved YOLOv11 nano architecture trained on the VisDrone dataset.",
            "Implemented an advanced PID controller for high-speed tracking without oscillations.",
            "Integrated a pan-tilt camera system for stabilized object detection and tracking.",
            "Used both PyBullet and AirSim for realistic drone simulation and testing.",
            "Emulated a Raspberry Pi 4 environment to evaluate system performance under real hardware limits.",
            "Converted the PyTorch model to ONNX, then to NCNN, for hardware optimization.",
          ],
        },
      },
    ],
  },
];

/* ===================== FAQ ===================== */
const FAQ_DATA = [
  {
    question: { fr: "Quels sont mes domaines d'expertise ?", en: "What are my areas of expertise?" },
    answer: {
      fr: "L'intelligence artificielle appliquée à la robotique, aux drones et aux systèmes autonomes : vision par ordinateur (détection et suivi d'objets), contrôle, navigation, simulation et IA embarquée. Je réalise aussi des applications web et des automatisations métier.",
      en: "Artificial intelligence for robotics, drones and autonomous systems: computer vision (object detection and tracking), control, navigation, simulation and embedded AI. I also build web applications and business automations.",
    },
  },
  {
    question: { fr: "Comment démarrer un projet avec moi ?", en: "How do we start a project together?" },
    answer: {
      fr: "Contactez-moi via le formulaire ou par email : j'analyse vos besoins, je propose une solution technique et un planning, puis nous validons un prototype avant le développement complet.",
      en: "Reach out through the form or by email: I analyze your needs, propose a technical solution and a timeline, then we validate a prototype before full development.",
    },
  },
  {
    question: { fr: "Est-ce que je travaille sur du matériel réel ?", en: "Do I work with real hardware?" },
    answer: {
      fr: "Oui. Je valide d'abord en simulation (Gazebo, AirSim, PyBullet), puis j'optimise les modèles (ONNX, NCNN, TensorRT) pour les cartes embarquées comme le Raspberry Pi ou la Jetson.",
      en: "Yes. I first validate in simulation (Gazebo, AirSim, PyBullet), then optimize models (ONNX, NCNN, TensorRT) for embedded boards such as the Raspberry Pi or Jetson.",
    },
  },
  {
    question: { fr: "Combien de temps prend un projet ?", en: "How long does a project take?" },
    answer: {
      fr: "Cela dépend de la complexité : un prototype en simulation peut être prêt en quelques semaines, l'intégration et les tests sur matériel demandent davantage de temps.",
      en: "It depends on the complexity: a simulation prototype can be ready in a few weeks, while hardware integration and testing take longer.",
    },
  },
  {
    question: { fr: "Est-ce que je fournis des révisions ?", en: "Do I provide revisions?" },
    answer: {
      fr: "Oui - j'inclus en général 2 cycles de révisions et je travaille de manière itérative avec des validations fréquentes.",
      en: "Yes - I usually include 2 rounds of revisions and work iteratively with frequent check-ins.",
    },
  },
  {
    question: { fr: "Sur quels secteurs j'interviens ?", en: "Which sectors do I work in?" },
    answer: {
      fr: "Robotique, drones et systèmes autonomes en priorité, ainsi que les startups et entreprises qui ont besoin d'IA, d'automatisation ou d'applications sur mesure.",
      en: "Robotics, drones and autonomous systems first, as well as startups and companies that need AI, automation or custom applications.",
    },
  },
];

/* Numéro de téléphone (affichage + lien tel:) */
const PHONE_DISPLAY = "+33 759314185";
const PHONE_LINK = "tel:+33759314185";

/* Styles ajoutés : boutons gris à angles droits, sélecteur de langue, catégories.
   Les règles !important remplacent l'orange défini dans index.css. */
const BUTTON_CSS = `
:root {
  --accent: rgb(${ACCENT_RGB});
  --accent-dark: rgb(${ACCENT_DARK_RGB});
  --primary: rgb(${ACCENT_RGB});
  --orange: rgb(${ACCENT_RGB});
}
.btn, .btn.primary, .btn.ghost, .btn.mini, .btn.large, .form-action {
  border-radius: 0 !important;
}
.btn.primary, .btn.mini {
  background: rgb(${ACCENT_RGB}) !important;
  border-color: rgb(${ACCENT_RGB}) !important;
  color: #fff !important;
  box-shadow: none !important;
}
.btn.primary:hover, .btn.mini:hover {
  background: rgb(${ACCENT_DARK_RGB}) !important;
  border-color: rgb(${ACCENT_DARK_RGB}) !important;
}
.btn.ghost {
  background: transparent !important;
  border: 1px solid rgb(${ACCENT_RGB}) !important;
  color: inherit !important;
}
.btn.ghost:hover {
  background: rgba(${ACCENT_RGB},0.15) !important;
}
.btn:disabled { opacity: .6; cursor: not-allowed; }

.project-badge.badge-orange { background: rgb(${ACCENT_RGB}) !important; color:#fff !important; }
.nav a.active, .nav a:hover, .footer-links a:hover { color: rgb(${ACCENT_RGB}) !important; }
.nav a.active::after { background: rgb(${ACCENT_RGB}) !important; }
.step-icon { color: rgb(${ACCENT_RGB}) !important; border-color: rgb(${ACCENT_RGB}) !important; background: rgba(${ACCENT_RGB},0.12) !important;
  box-shadow: 0 0 18px 2px rgba(${ACCENT_RGB},0.55) !important; }
.process-step:hover .step-icon { box-shadow: 0 0 24px 4px rgba(${ACCENT_RGB},0.7) !important; }
.step-icon::before, .step-icon::after { background: rgba(${ACCENT_RGB},0.25) !important; box-shadow: 0 0 18px rgba(${ACCENT_RGB},0.5) !important; border-color: rgb(${ACCENT_RGB}) !important; }
.process-arrow { color: rgb(${ACCENT_RGB}) !important; }
.faq-question.active, .faq-chevron { color: rgb(${ACCENT_RGB}) !important; }
.skill-icon { color: rgb(${ACCENT_RGB}) !important; }
.skill-chip:hover { border-color: rgb(${ACCENT_RGB}) !important; }
.timeline-bullets li::marker { color: rgb(${ACCENT_RGB}); }

.header-actions { display:flex; align-items:center; gap:12px; }
.lang-switch { display:inline-flex; border:1px solid rgba(${ACCENT_RGB},.7); border-radius:0; overflow:hidden; }
.lang-switch button {
  background:transparent; border:0; border-radius:0; color:inherit; cursor:pointer;
  font:inherit; font-size:.8rem; font-weight:600; letter-spacing:.04em; padding:6px 10px; opacity:.75;
}
.lang-switch button:hover { opacity:1; }
.lang-switch button.active { background:rgb(${ACCENT_RGB}); color:#fff; opacity:1; }
.skill-groups { display:grid; gap:28px; }
.skill-group-title { display:flex; align-items:center; gap:8px; font-size:1rem; font-weight:600; margin:0 0 12px; }
.skill-group-title svg { color: rgb(${ACCENT_RGB}); }
.exp-group-title { font-weight:600; margin:16px 0 6px; font-size:.95rem; color: rgb(${ACCENT_RGB}); }
`;

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/* TypingSpeech : affiche chaque phrase mot par mot et boucle */
function TypingSpeech({ phrases = [], wordDelay = 380, phraseDelay = 900 }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let active = true;
    let wordIndex = 0;
    setDisplay("");
    const words = (phrases[idx] || "").split(" ").filter(Boolean);

    function step() {
      if (!active) return;
      const word = words[wordIndex];
      if (word !== undefined) {
        setDisplay((prev) => (prev ? prev + " " + word : word));
        wordIndex++;
        timeoutRef.current = setTimeout(step, wordDelay);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (!active) return;
          setIdx((s) => (phrases.length ? (s + 1) % phrases.length : 0));
        }, phraseDelay);
      }
    }

    step();

    return () => {
      active = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [idx, phrases, wordDelay, phraseDelay]);

  return (
    <div className="typing-wrap" aria-live="polite">
      <div className="conversation-bg" aria-hidden="true">
        <span className="conv-dot dot-a" />
        <span className="conv-dot dot-b" />
        <span className="conv-dot dot-c" />
      </div>

      <div className="speech-bubble" role="status">
        <span className="bubble-text">{display}</span>
        <span className="typing-cursor" aria-hidden>▍</span>
      </div>
    </div>
  );
}

/* Icône LinkedIn en SVG (les icônes de marques ont été retirées des versions récentes de lucide-react) */
function Linkedin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
    </svg>
  );
}

/* ===== Fond animé robotique / drones / IA ===== */
// Couleur des éléments du fond : même gris que les boutons.
const ROBO_RGB = ACCENT_RGB;

const ROBO_BG_CSS = `
.robo-bg { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
.robo-grid {
  position:absolute; inset:-50%;
  background-image:
    linear-gradient(rgba(${ROBO_RGB},0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(${ROBO_RGB},0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  transform: perspective(600px) rotateX(60deg);
  transform-origin: center top;
  animation: robo-grid-move 18s linear infinite;
  mask-image: linear-gradient(to bottom, transparent 0%, #000 55%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 55%, transparent 100%);
  top: 45%;
}
@keyframes robo-grid-move { from { background-position: 0 0; } to { background-position: 0 48px; } }

.robo-icon { position:absolute; color: rgba(${ROBO_RGB},0.2); animation: robo-float 14s ease-in-out infinite; }
.robo-icon.violet { color: rgba(${ROBO_RGB},0.2); }
@keyframes robo-float {
  0%,100% { transform: translate(0,0) rotate(0deg); }
  25% { transform: translate(18px,-22px) rotate(6deg); }
  50% { transform: translate(-10px,-40px) rotate(-4deg); }
  75% { transform: translate(-22px,-14px) rotate(3deg); }
}

.robo-drone { position:absolute; top:14%; left:-120px; color: rgba(${ROBO_RGB},0.26);
  animation: robo-fly 26s linear infinite; }
.robo-drone .rotor { transform-box: fill-box; transform-origin: center; animation: robo-spin .25s linear infinite; }
@keyframes robo-fly {
  0% { transform: translate(0,0); }
  25% { transform: translate(30vw,6vh); }
  50% { transform: translate(60vw,-2vh); }
  75% { transform: translate(90vw,8vh); }
  100% { transform: translate(calc(100vw + 240px),0); }
}
@keyframes robo-spin { to { transform: rotate(360deg); } }


.robo-net { position:absolute; left:4%; bottom:18%; width:260px; height:180px; opacity:.5; }
.robo-net line { stroke: rgba(${ROBO_RGB},0.3); stroke-width:1; stroke-dasharray:4 6; animation: robo-dash 3s linear infinite; }
.robo-net circle { fill: rgba(${ROBO_RGB},0.4); animation: robo-pulse 2.4s ease-in-out infinite; }
@keyframes robo-dash { to { stroke-dashoffset: -20; } }
@keyframes robo-pulse { 0%,100% { opacity:.35; } 50% { opacity:1; } }

.robo-scan { position:absolute; left:0; right:0; height:2px; top:0;
  background: linear-gradient(90deg, transparent, rgba(${ROBO_RGB},0.3), transparent);
  animation: robo-scan 9s linear infinite; }
@keyframes robo-scan { from { transform: translateY(0); } to { transform: translateY(100vh); } }

/* Robot à roues (rover) */
.robo-rover { position:absolute; bottom:3%; left:-160px; color: rgba(${ROBO_RGB},0.32);
  animation: robo-drive 30s linear infinite; }
.robo-rover .wheel { transform-box: fill-box; transform-origin: center; animation: robo-spin 1s linear infinite; }
.robo-rover .body { animation: robo-bump .35s ease-in-out infinite; }
.robo-rover .sensor { animation: robo-pulse 1.2s ease-in-out infinite; }
@keyframes robo-drive { from { transform: translateX(0); } to { transform: translateX(calc(100vw + 320px)); } }
@keyframes robo-bump { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }

/* Robot qui marche (droite → gauche) - cycle de marche articulé */
.robo-walker { position:absolute; bottom:3%; right:-120px; color: rgba(${ROBO_RGB},0.34);
  animation: robo-walk-across 26s linear infinite; animation-delay:-11s; }
.robo-walker .j { transform-box: view-box; }
.robo-walker .hip  { transform-origin: 30px 56px; animation: rw-hip 1s ease-in-out infinite; }
.robo-walker .knee { transform-origin: 30px 72px; animation: rw-knee 1s ease-in-out infinite; }
.robo-walker .ankle{ transform-origin: 30px 88px; animation: rw-ankle 1s ease-in-out infinite; }
.robo-walker .shoulder { transform-origin: 30px 33px; animation: rw-shoulder 1s ease-in-out infinite; }
.robo-walker .elbow { transform-origin: 30px 45px; animation: rw-elbow 1s ease-in-out infinite; }
.robo-walker .far { opacity: .45; }
.robo-walker .far .hip, .robo-walker .far .knee, .robo-walker .far .ankle,
.robo-walker .far .shoulder, .robo-walker .far .elbow { animation-delay: -.5s; }
.robo-walker .upper { animation: rw-bob .5s ease-in-out infinite; }
.robo-walker .head  { transform-box: view-box; transform-origin: 30px 26px; animation: rw-head 1s ease-in-out infinite; }
.robo-walker .eye   { animation: robo-pulse 1.6s ease-in-out infinite; }
.robo-walker .scan  { animation: rw-scan 2s ease-in-out infinite; }
/* hanche : avant (+) → arrière (−) pendant l'appui, retour pendant la phase aérienne */
@keyframes rw-hip {
  0%   { transform: rotate(24deg); }
  50%  { transform: rotate(-22deg); }
  70%  { transform: rotate(-4deg); }
  100% { transform: rotate(24deg); }
}
/* genou : quasi tendu à l'appui, plié pendant la phase aérienne */
@keyframes rw-knee {
  0%   { transform: rotate(0deg); }
  15%  { transform: rotate(-10deg); }
  35%  { transform: rotate(-2deg); }
  55%  { transform: rotate(-35deg); }
  72%  { transform: rotate(-58deg); }
  90%  { transform: rotate(-8deg); }
  100% { transform: rotate(0deg); }
}
/* cheville : attaque talon, puis poussée sur la pointe */
@keyframes rw-ankle {
  0%   { transform: rotate(-14deg); }
  12%  { transform: rotate(0deg); }
  45%  { transform: rotate(10deg); }
  60%  { transform: rotate(22deg); }
  85%  { transform: rotate(-6deg); }
  100% { transform: rotate(-14deg); }
}
@keyframes rw-shoulder {
  0%,100% { transform: rotate(-22deg); }
  50%     { transform: rotate(24deg); }
}
@keyframes rw-elbow {
  0%,100% { transform: rotate(12deg); }
  50%     { transform: rotate(38deg); }
}
/* le corps monte au milieu de chaque pas et descend à l'attaque du talon */
@keyframes rw-bob {
  0%,100% { transform: translateY(1.5px); }
  50%     { transform: translateY(-2px); }
}
@keyframes rw-head {
  0%,100% { transform: rotate(-3deg); }
  50%     { transform: rotate(3deg); }
}
@keyframes rw-scan {
  0%,100% { transform: translateX(0); }
  50%     { transform: translateX(6px); }
}
@keyframes robo-walk-across { from { transform: translateX(0); } to { transform: translateX(calc(-100vw - 260px)); } }

@media (max-width: 700px) { .robo-net { display:none; } }
@media (prefers-reduced-motion: reduce) {
  .robo-bg * , .robo-bg *::after { animation: none !important; }
}
`;

function DroneSVG({ size = 90 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="20" y1="15" x2="42" y2="28" />
      <line x1="80" y1="15" x2="58" y2="28" />
      <line x1="20" y1="45" x2="42" y2="32" />
      <line x1="80" y1="45" x2="58" y2="32" />
      <rect x="40" y="24" width="20" height="12" rx="3" fill="currentColor" fillOpacity="0.3" />
      <ellipse className="rotor" cx="20" cy="15" rx="12" ry="2.5" />
      <ellipse className="rotor" cx="80" cy="15" rx="12" ry="2.5" />
      <ellipse className="rotor" cx="20" cy="45" rx="12" ry="2.5" />
      <ellipse className="rotor" cx="80" cy="45" rx="12" ry="2.5" />
      <circle cx="50" cy="40" r="2.5" fill="currentColor" />
    </svg>
  );
}

function RoverSVG({ size = 120 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 120 84" fill="none" stroke="currentColor" strokeWidth="2">
      <g className="body">
        {/* mât + capteur LIDAR */}
        <line x1="84" y1="40" x2="84" y2="16" />
        <rect className="sensor" x="76" y="8" width="16" height="9" rx="2" fill="currentColor" fillOpacity="0.4" />
        {/* antenne */}
        <line x1="30" y1="40" x2="24" y2="20" />
        <circle cx="24" cy="18" r="2.5" fill="currentColor" />
        {/* châssis */}
        <rect x="14" y="40" width="92" height="20" rx="4" fill="currentColor" fillOpacity="0.15" />
        <line x1="24" y1="50" x2="96" y2="50" strokeDasharray="3 4" />
      </g>
      {/* roues */}
      {[26, 60, 94].map((cx) => (
        <g key={cx} className="wheel">
          <circle cx={cx} cy="68" r="11" />
          <line x1={cx - 11} y1="68" x2={cx + 11} y2="68" />
          <line x1={cx} y1="57" x2={cx} y2="79" />
        </g>
      ))}
    </svg>
  );
}

function WalkerSVG({ size = 70 }) {
  // Vue de profil, le robot regarde vers la gauche (sens de la marche).
  const Leg = ({ far }) => (
    <g className={far ? "far" : undefined}>
      <g className="j hip">
        <line x1="30" y1="56" x2="30" y2="72" strokeWidth="4" />
        <circle cx="30" cy="72" r="2.6" fill="currentColor" />
        <g className="j knee">
          <line x1="30" y1="72" x2="30" y2="88" strokeWidth="3.4" />
          <g className="j ankle">
            <path d="M34 88 L23 88 Q21 88 21 90 L34 90 Z" fill="currentColor" fillOpacity="0.5" />
          </g>
        </g>
      </g>
    </g>
  );
  const Arm = ({ far }) => (
    <g className={far ? "far" : undefined}>
      <g className="j shoulder">
        <line x1="30" y1="33" x2="30" y2="45" strokeWidth="3.4" />
        <circle cx="30" cy="45" r="2.2" fill="currentColor" />
        <g className="j elbow">
          <line x1="30" y1="45" x2="30" y2="55" strokeWidth="3" />
          <path d="M27 55 L30 58 L33 55" strokeWidth="1.6" />
        </g>
      </g>
    </g>
  );
  return (
    <svg width={size} height={size * (100 / 60)} viewBox="0 0 60 100" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         style={{ overflow: "visible" }}>
      <g className="upper">
        <Arm far />
        <Leg far />
        {/* bassin */}
        <rect x="24" y="52" width="12" height="7" rx="2" fill="currentColor" fillOpacity="0.2" />
        <Leg />
        {/* torse */}
        <rect x="21" y="28" width="18" height="25" rx="5" fill="currentColor" fillOpacity="0.15" />
        <line x1="24" y1="36" x2="24" y2="46" strokeWidth="1.2" />
        <circle cx="33" cy="40" r="2" />
        {/* cou + tête */}
        <line x1="30" y1="24" x2="30" y2="28" />
        <g className="head">
          <rect x="19" y="8" width="21" height="16" rx="5" fill="currentColor" fillOpacity="0.15" />
          {/* visière (face à gauche) */}
          <rect x="17" y="12" width="11" height="6" rx="3" fill="currentColor" fillOpacity="0.25" />
          <circle className="eye scan" cx="21" cy="15" r="1.8" fill="currentColor" />
          <line x1="33" y1="8" x2="35" y2="2" />
          <circle className="eye" cx="35" cy="2" r="1.5" fill="currentColor" />
        </g>
        <Arm />
      </g>
    </svg>
  );
}

const ROBO_ICONS = [
  { Icon: Cpu, top: "62%", left: "14%", size: 40, delay: "-6s" },
  { Icon: Satellite, top: "8%", left: "62%", size: 38, delay: "-8s" },
  { Icon: Webcam, top: "86%", left: "36%", size: 36, delay: "-10s" },
  { Icon: Navigation, top: "40%", left: "24%", size: 30, delay: "-4s" },
];

function RoboticsBackground() {
  return (
    <div className="robo-bg">
      <style>{ROBO_BG_CSS}</style>
      <div className="robo-grid" />
      <div className="robo-scan" />
      {ROBO_ICONS.map(({ Icon, top, left, size, delay, violet }, i) => (
        <Icon
          key={i}
          className={`robo-icon${violet ? " violet" : ""}`}
          style={{ top, left, animationDelay: delay }}
          width={size}
          height={size}
          strokeWidth={1.4}
        />
      ))}
      <div className="robo-drone"><DroneSVG /></div>
      <div className="robo-drone" style={{ top: "58%", animationDelay: "-13s", animationDuration: "34s" }}>
        <DroneSVG size={60} />
      </div>
      <div className="robo-rover"><RoverSVG /></div>
      <div className="robo-walker"><WalkerSVG /></div>
      <svg className="robo-net" viewBox="0 0 260 180">
        <line x1="20" y1="30" x2="120" y2="20" /><line x1="20" y1="30" x2="120" y2="90" />
        <line x1="20" y1="150" x2="120" y2="90" /><line x1="20" y1="150" x2="120" y2="160" />
        <line x1="120" y1="20" x2="230" y2="60" /><line x1="120" y1="90" x2="230" y2="60" />
        <line x1="120" y1="90" x2="230" y2="130" /><line x1="120" y1="160" x2="230" y2="130" />
        <circle cx="20" cy="30" r="5" /><circle cx="20" cy="150" r="5" style={{ animationDelay: ".6s" }} />
        <circle cx="120" cy="20" r="5" style={{ animationDelay: ".3s" }} /><circle cx="120" cy="90" r="5" style={{ animationDelay: "1s" }} />
        <circle cx="120" cy="160" r="5" style={{ animationDelay: "1.4s" }} />
        <circle cx="230" cy="60" r="5" style={{ animationDelay: ".8s" }} /><circle cx="230" cy="130" r="5" style={{ animationDelay: "1.8s" }} />
      </svg>
    </div>
  );
}


/* FAQ Component */
function FAQ({ lang }) {
  const [openIndex, setOpenIndex] = useState(null);
  const t = UI[lang];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h3 className="faq-title">{t.faqTitle}</h3>
      <div className="faq-list">
        {FAQ_DATA.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{L(faq.question, lang)}</span>
              <ChevronDown className={`faq-chevron ${openIndex === index ? "rotated" : ""}`} size={20} />
            </button>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              <p>{L(faq.answer, lang)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Langue initiale : choix enregistré, sinon langue du navigateur, sinon français */
function getInitialLang() {
  try {
    const saved = window.localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch (_) {}
  try {
    if (navigator.language && navigator.language.toLowerCase().startsWith("en")) return "en";
  } catch (_) {}
  return "fr";
}

const STEP_ICONS = [Search, FlaskConical, Brain, Bug, Rocket];

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [mounted, setMounted] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const headerRef = useRef(null);

  const t = UI[lang];

  // Langue : attribut <html lang> + mémorisation du choix
  useEffect(() => {
    document.documentElement.lang = lang;
    try { window.localStorage.setItem("lang", lang); } catch (_) {}
    setFormError("");
  }, [lang]);

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(tm);
  }, []);

  // set CSS variable for nav offset to correct anchor jumps
  useEffect(() => {
    const hdr = headerRef.current;
    function setOffset() {
      const h = hdr ? hdr.offsetHeight : 80;
      document.documentElement.style.setProperty("--nav-offset", `${h + 12}px`);
    }
    setOffset();
    window.addEventListener("resize", setOffset);
    return () => window.removeEventListener("resize", setOffset);
  }, []);

  // Apply scroll-margin-top to each section so native scrollIntoView respects header offset
  useEffect(() => {
    function applyScrollMargin() {
      const offset = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset") || "80px";
      document.querySelectorAll("main section[id]").forEach((s) => {
        s.style.scrollMarginTop = offset.trim();
      });
    }
    applyScrollMargin();
    window.addEventListener("resize", applyScrollMargin);
    return () => window.removeEventListener("resize", applyScrollMargin);
  }, []);

  // IntersectionObserver with debouncing to prevent rapid active state changes
  useEffect(() => {
    const hdr = headerRef.current;
    const offset = hdr ? hdr.offsetHeight + 20 : 80;
    const sections = document.querySelectorAll("main section[id]");
    if (!sections.length) return;

    let debounceTimer = null;

    const obs = new IntersectionObserver(
      (entries) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length > 0) {
            visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            const topSection = visible[0];
            if (topSection.intersectionRatio > 0.3) {
              setActiveSection(topSection.target.id);
            }
          }
        }, 150);
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: [0.3, 0.5, 0.7, 1],
      }
    );

    sections.forEach((s) => obs.observe(s));

    return () => {
      obs.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, []);

  // Handle hash routing for project detail pages: #/projects/:slug
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || "";
      const parts = hash.replace(/^#\/?/, "").split("/");
      if (parts[0] === "projects" && parts[1]) {
        const slug = parts[1];
        const proj = PROJECTS.find(
          (p) => p.slug === slug || slugify(L(p.title, "fr")) === slug || slugify(L(p.title, "en")) === slug
        );
        if (proj) {
          setSelectedSlug(proj.slug);
          return;
        }
      }
      setSelectedSlug(null);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const selectedRaw = selectedSlug ? PROJECTS.find((p) => p.slug === selectedSlug) : null;
  const selectedProject = selectedRaw ? localizeProject(selectedRaw, lang) : null;

  const openDetail = (proj) => {
    const newHash = `/projects/${proj.slug}`;
    setSelectedSlug(proj.slug);
    if (window.location.hash !== `#${newHash}`) {
      window.location.hash = newHash;
    } else {
      window.history.replaceState(null, "", `#${newHash}`);
    }
  };

  const closeDetail = () => {
    try {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch (err) {
      if (window.location.hash) window.location.hash = "";
    }
    setSelectedSlug(null);
  };

  // small inline transparent gif data URI used as fallback to avoid broken image icon
  const TRANSPARENT_PLACEHOLDER =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  const getBadgeClass = (status) => {
    switch (status) {
      case "en-cours":
        return "badge-orange";
      case "termine":
        return "badge-green";
      case "en-pause":
        return "badge-gray";
      default:
        return "";
    }
  };

  const handleNavClick = (e, id) => {
    setMobileNavOpen(false);
    if (!e) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        try { window.location.hash = `#${id}`; } catch (_) {}
      }
    }
  };

  // Formspree endpoint: use Vite env var or fallback placeholder.
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/xrbajkbd";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setShowConfirmation(true);
        form.reset();
      } else {
        let text = t.errSend;
        try {
          const json = await res.json();
          if (json && json.error) text = json.error;
        } catch (_) {}
        setFormError(text);
        console.error("Formspree error:", res.status, res.statusText);
      }
    } catch (err) {
      console.error("Network error:", err);
      setFormError(t.errNetwork);
    } finally {
      setSubmitting(false);
    }
  };

  const NAV_IDS = ["experience", "education", "skills", "projects", "contact"];

  return (
    <div className={`app-root ${mounted ? "is-mounted" : ""}`}>
      <style>{BUTTON_CSS}</style>

      {/* Fond animé robotique / drones / IA */}
      <div className="bg-animated" aria-hidden="true">
        <RoboticsBackground />
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <div className="brand">
            <h1 className="brand-name">Ilyes Mekersi</h1>
          </div>

          <nav className={`nav ${mobileNavOpen ? "open" : ""}`}>
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={activeSection === id ? "active" : ""}
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            {/* Sélecteur de langue FR / EN */}
            <div className="lang-switch" role="group" aria-label={t.langLabel}>
              <button
                type="button"
                className={lang === "fr" ? "active" : ""}
                aria-pressed={lang === "fr"}
                onClick={() => setLang("fr")}
                lang="fr"
                title="Français"
              >
                FR
              </button>
              <button
                type="button"
                className={lang === "en" ? "active" : ""}
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
                lang="en"
                title="English"
              >
                EN
              </button>
            </div>

            {/* Hamburger / mobile toggle */}
            <button
              className={`mobile-toggle ${mobileNavOpen ? "is-open" : ""}`}
              aria-label={mobileNavOpen ? t.menuClose : t.menuOpen}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((s) => !s)}
            >
              <span className="bar bar1" />
              <span className="bar bar2" />
              <span className="bar bar3" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero container" id="top">
          <div className="hero-left">
            <h2 className="hero-title">{t.heroTitle}</h2>
            <p className="hero-desc">{t.heroDesc}</p>

            <div className="hero-actions">
              <a className="btn primary" href="#projects" onClick={(e) => handleNavClick(e, "projects")}>{t.heroCta1}</a>
              <a className="btn ghost" href="#contact" onClick={(e) => handleNavClick(e, "contact")}>{t.heroCta2}</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="mock-window elevated">
              <div className="mock-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>

              <div className="mock-content avatar-section">
                <div className="mock-card">
                  <h4>{t.cardTitle}</h4>
                  <p>{t.cardText}</p>
                </div>

                <div className="avatar-wrap">
                  <div className="profile-avatar" aria-hidden={false}>
                    <img
                      src={`${import.meta.env.BASE_URL}images/icon.png`}
                      alt="Ilyes Mekersi"
                      className="profile-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="container experience-section">
          <h3 className="section-title">{t.expTitle}</h3>
          <p className="section-sub">{t.expSub}</p>

          <div className="timeline">
            {EXPERIENCE.map((exp, i) => {
              const company = L(exp.company, lang);
              const location = L(exp.location, lang);
              const description = L(exp.description, lang);
              return (
                <div key={i} className="timeline-item">
                  <div className="timeline-header">
                    <img
                      src={exp.image}
                      alt={company}
                      className="exp-logo"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                      }}
                    />
                    <div className="timeline-content">
                      <div className="timeline-title">
                        <strong>{L(exp.title, lang)}</strong> -{" "}
                        {exp.link ? (
                          <a
                            className="muted"
                            href={exp.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "inherit", textDecoration: "none" }}
                            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                          >
                            {company} ↗
                          </a>
                        ) : (
                          <span className="muted">{company}</span>
                        )}
                      </div>
                      <div className="timeline-meta">
                        <span className="muted">{L(exp.duration, lang)}</span>
                        {location && (
                          <span className="muted">
                            {" "}| {location}{exp.remote ? t.remote : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {description && (
                    <p className="muted" style={{ marginTop: 8 }}>{description}</p>
                  )}

                  {exp.groups && exp.groups.map((g, gi) => {
                    const bullets = L(g.bullets, lang) || [];
                    return (
                      <div key={gi} className="exp-group">
                        {g.title && <div className="exp-group-title">{L(g.title, lang)}</div>}
                        <ul className="timeline-bullets">
                          {bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="container education-section">
          <h3 className="section-title">{t.eduTitle}</h3>
          <p className="section-sub">{t.eduSub}</p>

          <div className="edu-grid">
            {EDUCATION.map((e, idx) => (
              <div key={idx} className="edu-card">
                <div className="edu-header">
                  <img
                    src={e.image}
                    alt={L(e.institution, lang)}
                    className="edu-logo"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                    }}
                  />
                  <div className="edu-meta">
                    <div className="edu-degree">{L(e.degree, lang)}</div>
                    <div className="edu-period">{L(e.period, lang)}</div>
                  </div>
                </div>
                <div className="edu-institution">{L(e.institution, lang)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS (par catégorie) */}
        <section id="skills" className="container skills-section">
          <h3 className="section-title">{t.skillsTitle}</h3>
          <p className="section-sub">{t.skillsSub}</p>

          <div className="skill-groups">
            {SKILL_GROUPS.map((group, gi) => {
              const GroupIcon = group.Icon;
              return (
                <div key={gi} className="skill-group">
                  <h4 className="skill-group-title">
                    <GroupIcon width={18} height={18} />
                    {L(group.title, lang)}
                  </h4>
                  <div className="skills-grid">
                    {group.items.map((item, ii) => {
                      const ItemIcon = item.Icon || Code;
                      return (
                        <div key={ii} className="skill-chip">
                          <ItemIcon width={16} height={16} className="skill-icon" />
                          <span>{L(item.label, lang)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="container projects-section">
          <h3 className="section-title">{t.projectsTitle}</h3>
          <p className="section-sub">{t.projectsSub}</p>

          <div className="projects-grid">
            {PROJECTS.map((raw) => {
              const p = localizeProject(raw, lang);
              return (
                <article key={p.slug} className="project-card">
                  {p.status === "en-cours" && (
                    <div className={`project-badge ${getBadgeClass(p.status)}`}>
                      {t.status[p.status]}
                    </div>
                  )}

                  <div className="project-media">
                    <img
                      className="project-screenshot"
                      src={p.image}
                      alt={p.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                      }}
                    />
                  </div>

                  <div className="project-body">
                    <h4>{p.title}</h4>
                    <p>{p.pre || p.description}</p>
                    <div className="project-actions">
                      {p.status !== "en-cours" && p.link && (
                        <a className="btn ghost" href={p.link} target="_blank" rel="noreferrer">
                          {t.demo}
                        </a>
                      )}
                      <button className="btn mini" onClick={() => openDetail(p)}>
                        {t.detail}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="container cta-section">
          <div className="cta-card">
            <div className="cta-content">
              <div className="cta-header">
                <h4>{t.methodTitle}</h4>
                <p className="cta-subtitle">{t.methodSub}</p>
              </div>

              <div className="process-steps">
                {t.steps.map((step, i) => {
                  const StepIcon = STEP_ICONS[i];
                  return (
                    <React.Fragment key={i}>
                      {i > 0 && <div className="process-arrow">→</div>}
                      <div className="process-step">
                        <div className="step-icon">
                          <StepIcon size={20} />
                        </div>
                        <div className="step-content">
                          <h5>{step.t}</h5>
                          <p>{step.d}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="cta-action">
              <a className="btn primary large" href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                <Users size={18} />
                {t.collaborate}
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT with FAQ */}
        <section id="contact" className="container contact-section">
          <h3 className="section-title">{t.contactTitle}</h3>
          <p className="section-sub">{t.contactSub}</p>

          <div className="contact-container">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input required name="name" placeholder={t.name} />
              <input required name="email" placeholder={t.email} type="email" />
              <textarea name="message" rows={6} placeholder={t.message} />
              <div className="form-actions">
                <button type="submit" className="btn primary form-action" disabled={submitting}>
                  {submitting ? t.sending : t.send}
                </button>
                <a className="btn ghost form-action" href="mailto:mekersiilyes@gmail.com">{t.emailBtn}</a>
                <a className="btn ghost form-action" href={PHONE_LINK}>{PHONE_DISPLAY}</a>
              </div>
              {formError && (
                <div className="form-error" role="alert" style={{ color: "var(--danger, #c0392b)", marginTop: 10 }}>
                  {formError}
                </div>
              )}
            </form>

            <FAQ lang={lang} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-links-section">
            <div className="footer-links" aria-label={t.footerLinks}>
              {NAV_IDS.map((id) => (
                <a key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>{t.nav[id]}</a>
              ))}
            </div>
          </div>

          <div className="footer-contact">
            <a href="mailto:mekersiilyes@gmail.com">mekersiilyes@gmail.com</a>
            <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
            <a href="https://www.linkedin.com/in/ilyes-mekersi-134b6b24a/" target="_blank" rel="noreferrer" title="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={closeDetail} lang={lang} />
      )}

      {showConfirmation && (
        <ConfirmationModal onClose={() => setShowConfirmation(false)} lang={lang} />
      )}
    </div>
  );
}