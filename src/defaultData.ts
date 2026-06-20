import { CvData } from './types';

export const INITIAL_CV_DATA: CvData = {
  templateId: 'professional',
  personalInfo: {
    firstName: 'Jean',
    lastName: 'Dupont',
    title: 'Développeur Full Stack Senior',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    address: 'Paris, France',
    website: 'https://jeandupont.dev',
    summary: 'Développeur passionné avec plus de 5 ans d\'expérience dans la conception et le développement d\'applications web modernes. Spécialisé en React, Node.js et architecture cloud. Motivé par la résolution de problèmes complexes et le travail en équipe agile.',
    photoUrl: ''
  },
  experiences: [
    {
      id: 'exp1',
      jobTitle: 'Développeur Full Stack Lead',
      company: 'Tech Solutions SAS',
      city: 'Paris',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: '• Direction technique d\'une équipe de 5 développeurs sur la refonte globale de la plateforme SaaS principale.\n• Migration de l\'architecture vers Next.js et Tailwind CSS, améliorant les performances SEO de 40%.\n• Automatisation des pipelines CI/CD et déploiement sous Docker, réduisant le temps de livraison de moitié.'
    },
    {
      id: 'exp2',
      jobTitle: 'Développeur Web Full Stack',
      company: 'Digital Factory',
      city: 'Lyon',
      startDate: '2021-03',
      endDate: '2022-12',
      current: false,
      description: '• Développement d\'API REST robustes avec Node.js/Express et intégration de bases de données PostgreSQL.\n• Amélioration de l\'expérience utilisateur sur les tableaux de bord clients en optimisant les requêtes React.\n• Collaboration étroite avec les équipes produit et UX/UI pour concevoir des parcours utilisateurs fluides.'
    }
  ],
  educations: [
    {
      id: 'edu1',
      degree: 'Master en Ingénierie Informatique',
      school: 'EPITECH',
      city: 'Paris',
      startDate: '2018',
      endDate: '2021',
      current: false,
      description: 'Spécialisation développement logiciel web et mobile. Projets de fin d\'études axés sur le cloud computing.'
    },
    {
      id: 'edu2',
      degree: 'Licence Informatique',
      school: 'Université de Lyon',
      city: 'Lyon',
      startDate: '2015',
      endDate: '2018',
      current: false,
      description: 'Bases algorithmiques, structures de données, programmation objet (Java, C++) et systèmes de réseaux.'
    }
  ],
  skills: [
    { id: 'sk1', name: 'React / Next.js', level: 90 },
    { id: 'sk2', name: 'TypeScript & JavaScript Backend', level: 85 },
    { id: 'sk3', name: 'Node.js / NestJS / SQL', level: 80 },
    { id: 'sk4', name: 'HTML5 & CSS3 / Tailwind', level: 95 },
    { id: 'sk5', name: 'Git / Docker / AWS', level: 75 }
  ],
  languages: [
    { id: 'la1', name: 'Français', level: 'Langue maternelle' },
    { id: 'la2', name: 'Anglais', level: 'C1 - Professionnel' },
    { id: 'la3', name: 'Espagnol', level: 'B1 - Intermédiaire' }
  ],
  interests: [
    'Contributions Open Source',
    'Randonnée et Alpinisme',
    'Photographie de paysage',
    'Nouvelles technologies & IA'
  ],
  themeColor: '#4f46e5' // Indigo for Vibrant Palette theme look
};
