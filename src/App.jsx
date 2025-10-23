import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import ProjectDetail from "./ProjectDetail";
import ConfirmationModal from "./ConfirmationModal";
import { 
  Brain, 
  Code, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  Cloud, 
  Terminal, 
  Bug, 
  CreditCard,
  Zap,
  Monitor,
  Palette,
  ChevronDown,
  Search,
  Rocket,
  Users,
  Linkedin
} from "lucide-react";
/* SkillIcon and constants unchanged (kept as in original) */
const SkillIcon = ({ skill }) => {
  const iconProps = { width: 16, height: 16, className: "skill-icon" };
  switch (skill) {
    case "AI Engineer":
      return <Brain {...iconProps} />;
    case "Full‑stack Web Development":
      return <Monitor {...iconProps} />;
    case "React.js":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.099 2.21-.099zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.48-1.31-.648-1.95.154-.18.3-.338.435-.486.926-.01 1.863.055 2.552.102zm7.26 0c.695-.047 1.636-.111 2.565-.102.135.147.28.305.435.486-.17.64-.383 1.295-.648 1.95-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.16zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.48 1.312.648 1.951-.154.18-.3.338-.435.486-.926.01-1.863-.054-2.552-.101.24-.378.48-.763.705-1.161.225-.39.435-.788.634-1.175zm-7.26 0c.2.39.41.783.64 1.175.225.392.465.774.705 1.161-.695.047-1.636.111-2.565.101-.135-.147-.28-.305-.435-.486.17-.64.383-1.295.648-1.951zm-2.85 1.784c.95.239 1.997.42 3.104.538.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.254-1.444zm11.64 0c.112.5.195.974.254 1.444.23 1.868-.054 3.32-.714 3.708-.19.09-.4.127-.563.132-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.537 2.02-2.442 1.107-.118 2.154-.299 3.113-.54z"/>
        </svg>
      );
    case "Vite":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .189-.282.307.307 0 0 1 .332.067l6.684 6.684a.307.307 0 0 1-.183.525l-7.534.663z"/>
          <path d="m15.714 13.423-.512 8.657a.306.306 0 0 1-.189.282.307.307 0 0 1-.332-.067l-6.684-6.684a.307.307 0 0 1 .183-.525l7.534-.663z"/>
        </svg>
      );
    case "JavaScript":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      );
    case "HTML & CSS":
      return <Code {...iconProps} />;
    case "PHP":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.393.313-.27.47-.695.47-1.275 0-.427-.117-.736-.353-.926-.235-.19-.629-.285-1.181-.285v.231zm-2.603 5.891L5.924 8.285h2.705c.777 0 1.392.176 1.846.527.454.351.681.826.681 1.424 0 .777-.282 1.406-.845 1.887-.563.481-1.312.722-2.249.722h-1.379l-.681 3.591H3.407v-.338zM15.481 10.207h-.943l-.516 2.648h.838c.557 0 .982-.122 1.293-.393.312-.27.47-.695.47-1.275 0-.427-.118-.736-.354-.926-.234-.19-.629-.285-1.181-.285v.231zm-2.603 5.891L14.395 8.285h2.705c.777 0 1.392.176 1.846.527.454.351.681.826.681 1.424 0 .777-.282 1.406-.845 1.887-.563.481-1.312.722-2.249.722h-1.38l-.681 3.591H11.878v-.338zM8.175 16.098l1.515-7.813h4.035c.777 0 1.392.176 1.846.527.454.351.681.826.681 1.424 0 .777-.282 1.406-.845 1.887-.563.481-1.312.722-2.249.722h-1.38l-.681 3.591H8.175v-.338z"/>
        </svg>
      );
    case "Node.js / Express":
      return <Server {...iconProps} />;
    case "C++":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79z"/>
        </svg>
      );
    case "Python":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.20.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.10.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.20.44-.18.51-.15.58-.12.64-.10.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.20-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.30-.45-.33-.34-.34-.25-.34-.16-.33-.1-.30-.04-.25-.02-.20.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.30-.32.33-.24.35-.20.35-.14.33-.10.30-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.50-.21.41-.28.33-.32.27-.35.20-.36.15-.36.10-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.40.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.40-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22z"/>
        </svg>
      );
    case "Machine Learning":
      return <Brain {...iconProps} />;
    case "Deep Learning":
      return <Cpu {...iconProps} />;
    case "PyTorch":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 13.947 9.865 9.865 0 0013.947 0L12.005 0z"/>
        </svg>
      );
    case "TensorFlow":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.708 5.307l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.637 2.099v-3.674l-3.637-2.085V7.603l6.168 3.564z"/>
        </svg>
      );
    case "scikit‑learn":
      return <Zap {...iconProps} />;
    case "OpenCV (Computer Vision)":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.627 24a5.627 5.627 0 01-5.627-5.627V5.627A5.627 5.627 0 015.627 0h12.746A5.627 5.627 0 0124 5.627v12.746A5.627 5.627 0 0118.373 24H5.627zm6.186-21.333a9.333 9.333 0 100 18.666 9.333 9.333 0 000-18.666zm0 16a6.667 6.667 0 110-13.334 6.667 6.667 0 010 13.334zm0-10.667a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
      );
    case "Pandas & NumPy":
      return <Database {...iconProps} />;
    case "SQL / PostgreSQL":
      return <Database {...iconProps} />;
    case "Base de données":
      return <Database {...iconProps} />;
    case "FastAPI / Flask":
      return <Zap {...iconProps} />;
    case "Cloud":
      return <Cloud {...iconProps} />;
    case "Linux / Bash":
      return <Terminal {...iconProps} />;
    case "APIs":
      return <Globe {...iconProps} />;
    case "Testing & Debugging":
      return <Bug {...iconProps} />;
    case "SaaS":
      return <CreditCard {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
};

const SKILLS = [
  "AI Engineer",
  "Full‑stack Web Development",
  "React.js",
  "Vite",
  "JavaScript",
  "HTML & CSS",
  "PHP",
  "Node.js / Express",
  "C++",
  "Python",
  "Machine Learning",
  "Deep Learning",
  "PyTorch",
  "TensorFlow",
  "scikit‑learn",
  "OpenCV (Computer Vision)",
  "Pandas & NumPy",
  "SQL / PostgreSQL",
  "Base de données",
  "FastAPI / Flask",
  "Cloud",
  "Linux / Bash",
  "APIs",
  "Testing & Debugging",
  "SaaS",
];

const PROJECTS = [
  {
    title: "Unnamed - Construction Management",
   pre:"Plateforme IA pour la gestion de projets BTP, automatisant les tâches et optimisant coordination et précision.",
    description: "Plateforme de gestion et d’estimation de projets BTP intégrant l’IA pour automatiser les tâches, assurer le suivi en temps réel et améliorer la coordination des équipes. Objectif : simplifier le travail, gagner du temps et accroître la précision.",
    link: "https://fieldops.example.com/",
    image: `${import.meta.env.BASE_URL}images/const.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/const.jpg`,
      `${import.meta.env.BASE_URL}images/const1.jpg`,
    ],
    slug: "construction-management",
    status: "en-cours",
    technos: ["React.js", "Vite", "Node.js / Express", "SQL / PostgreSQL", "OCR processing", "Python (backend ML)", "OpenCV"],
    notes: [
      "Intégration de modèles de détection d'objets pour suivi chantier.",
      "Pipeline ETL pour traitement des métriques temps réel.",
      "OCR processing pour extraction automatique de devis/factures depuis images.",
      "Déploiement conteneurisé pour scalabilité et CI/CD."
    ]
  },
  {
    title: "Solution de prestation des cours de langues et services",
    pre:"Une plateforme de cours de langues avec réservations en ligne, ressources pédagogiques, entraînement aux tests, visioconférences et suivi personnalisé des progrès.",
    description: "Site de cours de langues proposant : gestion dynamique d'un calendrier partagé (prof / étudiant), espace pour documents et livres à acheter, préparation et entraînement aux tests, et intégration de sessions vidéo via Google Meet. Plateforme conçue pour offrir une expérience fluide — réservations en ligne, espace professeur pour préparer le cours et suivi des progrès de l'étudiant.",
    link: "https://scorexplorer.com/",
    image: `${import.meta.env.BASE_URL}images/cal2.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/cal2.jpg`,
      `${import.meta.env.BASE_URL}images/cal1.jpg`,
      `${import.meta.env.BASE_URL}images/cal3.jpg`,
      `${import.meta.env.BASE_URL}images/cal4.jpg`
    ],
    slug: "ScoreXplorer",
    status: "termine",
    technos: ["React.js", "Vite", "Node.js / Express", "SQL","AI Agent"],
    notes: [
      "Calendrier dynamique synchronisé pour professeurs et étudiants.",
      "Espace boutique pour documents et livres numériques/physiques.",
      "Modules de préparation aux tests et suivi des performances.",
      "Intégration avec Google Meet pour sessions en ligne.",
      "Intégration de l’IA pour la correction de la production écrite de l’utilisateur, sans intervention d’aucun professeur."
    ]
  },
  {
    title: "QuickAid - Plateforme de service (Quick Aid Canada)",
    description: "Développement d'une plateforme de services reliant clients canadiens et techniciens certifiés pour l'entretien à la demande, avec gestion de devis et panneau d'administration.",
    link: "https://quickaid.ca/",
    image: `${import.meta.env.BASE_URL}images/quick.png`,
    images: [
      `${import.meta.env.BASE_URL}images/quick.png`,
    ],
    slug: "quickaid-prototype",
    period: "Nov 2024 – Dec 2024",
    status: "termine",
    technos: [
      "HTML & CSS",
      "JavaScript",
      "Bootstrap",
      "PHP",
      "SQL"
    ],
    notes: [
      "Mise en place du flux client → technicien avec devis à prix fixe.",
      "Système de gestion de projet complet (création, suivi, clôture).",
      "Panneau d'administration pour gestion des utilisateurs, services et facturation."
    ]
  },
  {
    title: "DKB Learning - Plateforme d'apprentissage en ligne (DKB Finance)",
    description: "Plateforme de formation dédiée aux collaborateurs de DKB Finance : modules de cours, quizzes interactifs et suivi de la progression des employés.",
    link: "https://dkb-tools.com/learning/index.php",
    image: `${import.meta.env.BASE_URL}images/dkb.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/dkb.jpg`,
    ],
    slug: "dkb-tools-learning",
    period: "Juin 2024 - Juillet 2024",
    status: "termine",
    technos: [
      "PHP",
      "MySQL",
      "JavaScript",
      "Bootstrap",
      "OAuth (authentification)",
      "HTML & CSS"
    ],
    notes: [
      "Modules de cours avec quiz et suivi des progrès par employé.",
      "Interface d'administration permettant CRUD sur cours et chapitres.",
      "Rapports et dashboards pour suivi de performance des apprenants."
    ]
  },
];

const EDUCATION = [
  {
    degree: "LICENCE EN INFORMATIQUE",
    period: "2020 - 2023",
    institution: "Université Badji Mokhtar Annaba",
    image: `${import.meta.env.BASE_URL}images/ubma.png`
  },
  {
    degree: "MASTER EN INTELLIGENCE ARTIFICIELLE ET TRAITEMENT DES DONNÉES",
    period: "2023 - 2025",
    institution: "Université Badji Mokhtar Annaba",
    image: `${import.meta.env.BASE_URL}images/ubma.png`
  },
  {
    degree:
      "CERTIFICAT EN SURVEILLANCE DES RISQUES DE CATASTROPHES À L'AIDE DE L'IMAGERIE SATELLITAIRE",
    period: "Juillet 2024",
    institution: "Nvidia Deep Learning Institute (en ligne)",
    image: `${import.meta.env.BASE_URL}images/nvidia.png`
  },
  {
    degree:
      "CERTIFICAT EN SPÉCIALISATION EN PROGRAMMATION C++ POUR LE DÉVELOPPEMENT DE JEUX UNREAL ENGINE",
    period: "Aout 2024",
    institution: "Université de Colorado Boulder (en ligne)",
    image: `${import.meta.env.BASE_URL}images/uc.png`
  },
  {
    degree: "CERTIFICAT EN MACHINE LEARNING AVEC PYTHON",
    period: "Octobre 2024",
    institution: "IBM (en ligne)",
    image: `${import.meta.env.BASE_URL}images/IBM.png`
  },
];

const EXPERIENCE = [
  {
    title: "Ingénieur IA (Stage)",
    company: "AI Drones / Université Tech Nanjing",
    duration: "3 mois",
    location: "Nanjing, Chine",
    image: `${import.meta.env.BASE_URL}images/nan.png`,
    bullets: [
      "Développement d'un système de suivi de drone à l'aide du modèle de nano architecture amélioré de YOLOv11, entraîné sur le jeu de données VisDrone.",
      "Mise en œuvre d'un contrôleur PID avancé pour obtenir un suivi à grande vitesse sans oscillations.",
      "Intégration d'un système de caméra pan-tilt pour la détection et le suivi d'objets stabilisés.",
      "Utilisé à la fois PyBullet et AirSim pour la simulation et les tests de drones réalistes.",
      "Émulation d'un environnement Raspberry Pi 4 pour évaluer les performances du système dans des limites matérielles réelles.",
      "Transformation du modèle PyTorch vers ONNX puis vers NCNN pour optimisation matérielle.",
    ],
  },
];

const FAQ_DATA = [
  {
    question: "Quels services est-ce que je propose ?",
    answer: "Je réalise des solutions d'intelligence artificielle (vision, NLP), je développe des applications web complètes (frontend + backend), j'intègre des APIs et je déploie sur le cloud avec Docker/Kubernetes."
  },
  {
    question: "Comment démarrer un projet avec moi ?",
    answer: "Contactez-moi via le formulaire ou par email, j'analyserai vos besoins, je propose une solution technique et un planning, puis nous lançons un prototype avant le développement complet."
  },

  {
    question: "Combien de temps prend un projet habituellement ?",
    answer: "Une application complète prend généralement 1-4 semaines. Un projet IA sur-mesure prend 4-12 semaines selon les jeux de données et la complexité."
  },
  {
    question: "Est-ce que je fournis des révisions ?",
    answer: "Oui — j'inclus en général 2 rounds de révisions et je travaille de manière itérative avec des validations fréquentes."
  },
  {
    question: "Sur quels secteurs j'interviens ?",
    answer: "Je travaille avec des startups et des entreprises tech, e‑commerce, santé et éducation. J'ai une expertise particulière en computer vision et pipelines data."
  },
  {
    question: "Est-ce que je propose du développement complet ?",
    answer: "Absolument : je construis le frontend, le backend, les APIs, l'intégration IA et je m'occupe du déploiement et de la monitoring."
  }
];

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
        // append only when word exists
        setDisplay((prev) => (prev ? prev + " " + word : word));
        wordIndex++;
        timeoutRef.current = setTimeout(step, wordDelay);
      } else {
        // finished phrase -> wait phraseDelay then advance index
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
      {/* animated conversation background (spheres) */}
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

/* FAQ Component */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h3 className="faq-title">Questions fréquentes</h3>
      <div className="faq-list">
        {FAQ_DATA.map((faq, index) => (
          <div key={index} className="faq-item">
            <button 
              className={`faq-question ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <ChevronDown className={`faq-chevron ${openIndex === index ? 'rotated' : ''}`} size={20} />
            </button>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const headerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
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

  // IMPROVED IntersectionObserver with debouncing to prevent rapid active state changes
  useEffect(() => {
    const hdr = headerRef.current;
    const offset = hdr ? hdr.offsetHeight + 20 : 80;
    const sections = document.querySelectorAll("main section[id]");
    if (!sections.length) return;

    let debounceTimer = null;
    
    const obs = new IntersectionObserver(
      (entries) => {
        // Clear existing timer
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        
        // Debounce the active section update to prevent rapid switching
        debounceTimer = setTimeout(() => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length > 0) {
            // Find the section that is most in view (highest intersection ratio)
            visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            const topSection = visible[0];
            
            // Only update if the intersection ratio is significant enough
            if (topSection.intersectionRatio > 0.3) {
              setActiveSection(topSection.target.id);
            }
          }
        }, 150); // 150ms debounce delay
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -50% 0px`, // Increased bottom margin to 50%
        threshold: [0.3, 0.5, 0.7, 1], // Simplified thresholds, higher minimum
      }
    );
    
    sections.forEach((s) => obs.observe(s));
    
    return () => {
      obs.disconnect();
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, []);

  // Handle hash routing for project detail pages: #/projects/:slug
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || "";
      // expected format: #/projects/:slug
      const parts = hash.replace(/^#\/?/, "").split("/");
      if (parts[0] === "projects" && parts[1]) {
        const slug = parts[1];
        const proj = PROJECTS.find((p) => p.slug === slug || slugify(p.title) === slug);
        if (proj) {
          setSelectedProject(proj);
          return;
        }
      }
      setSelectedProject(null);
    };

    // check on mount
    handleHash();

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const openDetail = (proj) => {
    // set hash which triggers the effect above
    const newHash = `/projects/${proj.slug || slugify(proj.title)}`;
    // set selected immediately so UI réagit même si le hash ne change pas
    setSelectedProject(proj);
    if (window.location.hash !== `#${newHash}`) {
      // push a new history entry so back/forward works
      window.location.hash = newHash;
    } else {
      // if hash already present, replace to force consistent history state
      window.history.replaceState(null, "", `#${newHash}`);
    }
  };

  const closeDetail = () => {
    // Instead of setting location.hash = "" (which can trigger a jump),
    // remove the hash using history.replaceState so the page doesn't scroll.
    try {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch (err) {
      // fallback: try to clear hash without jumping
      if (window.location.hash) window.location.hash = "";
    }
    // clear selectedProject so overlay se ferme immédiatement
    setSelectedProject(null);
  };

  // small inline transparent gif data URI used as fallback to avoid broken image icon
  const TRANSPARENT_PLACEHOLDER =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  const getBadgeText = (status) => {
    switch (status) {
      case "en-cours":
        return "En cours";
      case "termine":
        return "Terminé";
      case "en-pause":
        return "En pause";
      default:
        return null;
    }
  };

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

  // Simplified and robust nav handler:
  // - do NOT preventDefault: allow native anchor behavior (relies on CSS scroll-margin-top and html scroll-behavior)
  // - close mobile menu UI
  // - if you want a delay for mobile menu animation you can add it (we keep it simple)
  const handleNavClick = (e, id) => {
    // Close mobile menu immediately (or you could delay this to allow an animation)
    setMobileNavOpen(false);

    // If element doesn't exist for some reason, we still update location.hash to let the browser try
    // (we don't call preventDefault so the native anchor click will normally do the right thing)
    // No explicit history manipulation here — keep behavior native and rely on CSS scroll-margin-top.
    // If the anchor was triggered programmatically without an event, scroll to element as fallback:
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

    // Optional: you can add a _subject or other special fields supported by Formspree:
    // formData.append("_subject", "Nouveau message depuis le portfolio");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (res.ok) {
        setShowConfirmation(true);
        form.reset();
      } else {
        // try to extract error message from JSON response
        let text = "Erreur lors de l'envoi. Réessayez plus tard.";
        try {
          const json = await res.json();
          if (json && json.error) text = json.error;
        } catch (_) {}
        setFormError(text);
        console.error("Formspree error:", res.status, res.statusText);
      }
    } catch (err) {
      console.error("Network error:", err);
      setFormError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`app-root ${mounted ? "is-mounted" : ""}`}>
      {/* Animated background with floating spheres */}
      <div className="bg-animated" aria-hidden="true">
        <div className="floating-sphere sphere-1"></div>
        <div className="floating-sphere sphere-2"></div>
        <div className="floating-sphere sphere-3"></div>
        <div className="floating-sphere sphere-4"></div>
        <div className="floating-sphere sphere-5"></div>
        <div className="floating-sphere sphere-6"></div>
        <div className="floating-sphere sphere-7"></div>
        <div className="floating-sphere sphere-8"></div>
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <div className="brand">
            <h1 className="brand-name">Ilyes Mekersi</h1>
          </div>

          <nav className={`nav ${mobileNavOpen ? "open" : ""}`}>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, "skills")}
              className={activeSection === "skills" ? "active" : ""}
            >
              Compétences
            </a>
            <a
              href="#education"
              onClick={(e) => handleNavClick(e, "education")}
              className={activeSection === "education" ? "active" : ""}
            >
              Formation
            </a>
            <a
              href="#experience"
              onClick={(e) => handleNavClick(e, "experience")}
              className={activeSection === "experience" ? "active" : ""}
            >
              Expérience
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "projects")}
              className={activeSection === "projects" ? "active" : ""}
            >
              Projets
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className={`${activeSection === "contact" ? "active" : ""}`}
            >
              Contact
            </a>
          </nav>

          {/* Hamburger / mobile toggle */}
          <button
            className={`mobile-toggle ${mobileNavOpen ? "is-open" : ""}`}
            aria-label={mobileNavOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((s) => !s)}
          >
            <span className="bar bar1" />
            <span className="bar bar2" />
            <span className="bar bar3" />
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero container" id="top">
          <div className="hero-left">
            <h2 className="hero-title">
              Ingénieur IA & Développeur Full‑stack Web - création d'applications modernes, rapides et fiables.
            </h2>
            <p className="hero-desc">
              Je conçois des solutions d'intelligence artificielle et des applications web complètes :
              prototypes rapides, pipelines data, modèles deep learning et déploiements conteneurisés.
            </p>

            <div className="hero-actions">
              <a className="btn primary" href="#projects" onClick={(e) => handleNavClick(e, "projects")}>Voir projets</a>
              <a className="btn ghost" href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Me contacter</a>
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
                  <h4>Expertise technique</h4>
                  <p>Spécialiste en Intelligence Artificielle et développement d'applications web sur mesure pour startups et entreprises innovantes.</p>
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
                    {/* If you want to enable the typing speech, uncomment and pass phrases */}
                    {/* <TypingSpeech phrases={["Bonjour ! Je suis Ilyes.", "Ingénieur IA & développeur full‑stack."]} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / SKILLS */}
        <section id="skills" className="container skills-section">
          <h3 className="section-title">Conçu pour la vitesse de collaboration</h3>
          <p className="section-sub">
            Compétences clés extraites du CV, présentées pour un portfolio moderne et lisible.
            (IA, Deep Learning, Computer Vision, Cloud, DevOps, Web)
          </p>

          <div  className="skills-grid">
            {SKILLS.map((s) => (
              <div key={s} className="skill-chip">
                <SkillIcon skill={s} />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="container education-section">
          <h3 className="section-title">Formation</h3>
          <p className="section-sub">Parcours académique et certifications pertinentes</p>

          <div className="edu-grid">
            {EDUCATION.map((e, idx) => (
              <div key={idx} className="edu-card">
                <div className="edu-header">
                  <img 
                    src={e.image} 
                    alt={e.institution}
                    className="edu-logo"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                    }}
                  />
                  <div className="edu-meta">
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-period">{e.period}</div>
                  </div>
                </div>
                <div className="edu-institution">{e.institution}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="container experience-section">
          <h3 className="section-title">Expérience professionnelle</h3>
          <p className="section-sub">Expériences en industrie, stages et réalisations</p>

          <div className="timeline">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-header">
                  <img 
                    src={exp.image} 
                    alt={exp.company}
                    className="exp-logo"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = TRANSPARENT_PLACEHOLDER;
                    }}
                  />
                  <div className="timeline-content">
                    <div className="timeline-title">
                      <strong>{exp.title}</strong> — <span className="muted">{exp.company}</span>
                    </div>
                    <div className="timeline-meta">
                      <span className="muted">{exp.duration}</span>
                      {exp.location && <span className="muted"> | {exp.location} (à distance)</span>}
                    </div>
                  </div>
                </div>

                <ul className="timeline-bullets">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="container projects-section">
          <h3 className="section-title">Projets récents</h3>
          <p className="section-sub">Cartes interactives pour chaque projet — ajoutez captures et liens.</p>

          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <article key={p.title} className="project-card">
                {p.status === "en-cours" && (
                  <div className={`project-badge ${getBadgeClass(p.status)}`}>
                    {getBadgeText(p.status)}
                  </div>
                )}
                
                <div className="project-media">
                  <img
                    className="project-screenshot"
                    src={p.image}
                    alt={`${p.title} screenshot`}
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
                    {/* Only show demo link when project is NOT "en-cours" */}
                    {p.status !== "en-cours" && p.link && (
                      <a className="btn ghost" href={p.link} target="_blank" rel="noreferrer">
                        Démo
                      </a>
                    )}
                    <button className="btn mini" onClick={() => openDetail(p)}>
                      Détail
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA - Improved Design */}
        <section className="container cta-section">
          <div className="cta-card">
            <div className="cta-content">
              <div className="cta-header">
                <h4>Ma méthode de travail</h4>
                <p className="cta-subtitle">Une approche structurée pour des résultats optimaux</p>
              </div>
              
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-icon">
                    <Search size={20} />
                  </div>
                  <div className="step-content">
                    <h5>Découverte</h5>
                    <p>Analyse des besoins et définition des objectifs</p>
                  </div>
                </div>
                
                <div className="process-arrow">→</div>
                
                <div className="process-step">
                  <div className="step-icon">
                    <Palette size={20} />
                  </div>
                  <div className="step-content">
                    <h5>Prototype</h5>
                    <p>Maquettes interactives et validation UX</p>
                  </div>
                </div>
                
                <div className="process-arrow">→</div>
                
                <div className="process-step">
                  <div className="step-icon">
                    <Brain size={20} />
                  </div>
                  <div className="step-content">
                    <h5>Modèle</h5>
                    <p>Développement IA et architecture technique</p>
                  </div>
                </div>
                
                <div className="process-arrow">→</div>
                
                <div className="process-step">
                  <div className="step-icon">
                    <Bug size={20} />
                  </div>
                  <div className="step-content">
                    <h5>Test</h5>
                    <p>Tests automatisés et assurance qualité</p>
                  </div>
                </div>
                
                <div className="process-arrow">→</div>
                
                <div className="process-step">
                  <div className="step-icon">
                    <Rocket size={20} />
                  </div>
                  <div className="step-content">
                    <h5>Déploiement</h5>
                    <p>Docker, Cloud et mise en production</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cta-action">
              <a className="btn primary large" href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                <Users size={18} />
                Collaborons ensemble
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT with FAQ */}
        <section id="contact" className="container contact-section">
          <h3 className="section-title">Contact</h3>
          <p className="section-sub">Disponible pour missions freelance ,CDD ou CDI — parlons-en.</p>

          <div className="contact-container">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input required name="name" placeholder="Votre nom" />
              <input required name="email" placeholder="Votre email" type="email" />
              <textarea name="message" rows={6} placeholder="Votre message" />
              <div className="form-actions">
                <button type="submit" className="btn primary form-action" disabled={submitting}>
                  {submitting ? "Envoi…" : "Envoyer"}
                </button>
                <a className="btn ghost form-action" href="mailto:mekersiilyes@gmail.com">Email</a>
                <a className="btn ghost form-action" href="tel:+213541981088">+213 541981088</a>
              </div>
              {formError && <div className="form-error" role="alert" style={{color: "var(--danger, #c0392b)", marginTop: 10}}>{formError}</div>}
            </form>
            
            <FAQ />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-links-section">
            <div className="footer-links" aria-label="Liens">
              <a href="#skills" onClick={(e) => handleNavClick(e, "skills")}>Compétences</a>
              <a href="#education" onClick={(e) => handleNavClick(e, "education")}>Formation</a>
              <a href="#experience" onClick={(e) => handleNavClick(e, "experience")}>Expérience</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, "projects")}>Projets</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contact</a>
            </div>

          </div>

          <div className="footer-contact">
            <a href="mailto:mekersiilyes@gmail.com">mekersiilyes@gmail.com</a>
            <a href="tel:+213541981088">+213 541981088</a>
                          <a href="https://www.linkedin.com/in/ilyes-mekersi-134b6b24a/" target="_blank" rel="noreferrer" title="LinkedIn">
                <Linkedin size={16} />
              </a>
          </div>
        </div>
      </footer>

      {/* Project detail overlay / full page */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={closeDetail} />
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal onClose={() => setShowConfirmation(false)} />
      )}
    </div>
  );  
}