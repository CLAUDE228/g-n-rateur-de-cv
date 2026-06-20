import { defineStore } from 'pinia';
import axios from 'axios';

export const useCvStore = defineStore('cv', {
  state: () => ({
    templateId: 'professional', // 'professional' | 'modern'
    themeColor: '#0f172a',
    personalInfo: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      summary: '',
      photoUrl: ''
    },
    experiences: [],
    educations: [],
    skills: [],
    languages: [],
    interests: [],
    
    // Status indicators
    loading: false,
    errors: {},
    saveStatus: 'idle' // 'idle' | 'saving' | 'saved' | 'failed'
  }),

  getters: {
    isFormValid: (state) => {
      // Basic core constraints validation
      return (
        state.personalInfo.firstName.trim().length >= 2 &&
        state.personalInfo.lastName.trim().length >= 2 &&
        /^\S+@\S+\.\S+$/.test(state.personalInfo.email)
      );
    }
  },

  actions: {
    // Validation individual blocks
    validateField(field, value) {
      if (field === 'email') {
        const re = /^\S+@\S+\.\S+$/;
        this.errors.email = (value && !re.test(value)) ? "Adresse e-mail de contact invalide" : "";
      } else if (field === 'phone') {
        const re = /^[+0-9\s.-]{8,20}$/;
        this.errors.phone = (value && !re.test(value)) ? "Numéro de téléphone invalide" : "";
      } else if (field === 'firstName' || field === 'lastName') {
        if (!value.trim()) {
          this.errors[field] = "Ce champ est obligatoire";
        } else if (value.trim().length < 2) {
          this.errors[field] = "Doit faire au moins 2 caractères";
        } else {
          this.errors[field] = "";
        }
      }
    },

    setPersonalInfo(field, value) {
      this.personalInfo[field] = value;
      this.validateField(field, value);
      this.triggerAutosave();
    },

    // Experiences helper
    addExperience() {
      this.experiences.push({
        id: 'exp_' + Date.now(),
        jobTitle: '',
        company: '',
        city: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
      this.triggerAutosave();
    },

    removeExperience(id) {
      this.experiences = this.experiences.filter(exp => exp.id !== id);
      this.triggerAutosave();
    },

    // Educations helper
    addEducation() {
      this.educations.push({
        id: 'edu_' + Date.now(),
        degree: '',
        school: '',
        city: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
      this.triggerAutosave();
    },

    removeEducation(id) {
      this.educations = this.educations.filter(edu => edu.id !== id);
      this.triggerAutosave();
    },

    // Skills helper
    addSkill() {
      this.skills.push({
        id: 'sk_' + Date.now(),
        name: '',
        level: 80
      });
      this.triggerAutosave();
    },

    removeSkill(id) {
      this.skills = this.skills.filter(sk => sk.id !== id);
      this.triggerAutosave();
    },

    // Languages helper
    addLanguage() {
      this.languages.push({
        id: 'la_' + Date.now(),
        name: '',
        level: 'B2 - Intermédiaire'
      });
      this.triggerAutosave();
    },

    removeLanguage(id) {
      this.languages = this.languages.filter(la => la.id !== id);
      this.triggerAutosave();
    },

    // Interests helper
    addInterest(name) {
      if (name && name.trim()) {
        this.interests.push(name.trim());
        this.triggerAutosave();
      }
    },

    removeInterest(index) {
      this.interests.splice(index, 1);
      this.triggerAutosave();
    },

    // Load template data for instant setup
    loadDemoData() {
      this.personalInfo = {
        firstName: 'Jean',
        lastName: 'Dupont',
        title: 'Développeur Full Stack Senior',
        email: 'jean.dupont@email.com',
        phone: '+33 6 12 34 56 78',
        address: 'Paris, France',
        website: 'https://jeandupont.dev',
        summary: 'Développeur passionné avec plus de 5 ans d\'expérience dans la conception d\'applications de haute intensité.',
        photoUrl: ''
      };
      this.experiences = [
        {
          id: 'exp_demo_1',
          jobTitle: 'Développeur Full-Stack',
          company: 'Tech Startup SAS',
          city: 'Paris',
          startDate: '2022-03',
          endDate: '',
          current: true,
          description: '• Pilotage de l\'architecture logicielle\n• Amélioration des temps de chargement de 40%'
        }
      ];
      this.educations = [
        {
          id: 'edu_demo_1',
          degree: 'Master en Informatique',
          school: 'Université d\'Ingénierie',
          city: 'Paris',
          startDate: '2019',
          endDate: '2022',
          current: false,
          description: 'Spécialisation Génie Logiciel.'
        }
      ];
      this.skills = [
        { id: 'sk_demo_1', name: 'Vue.js / Vite', level: 90 },
        { id: 'sk_demo_2', name: 'Node.js / Laravel', level: 85 }
      ];
      this.languages = [
        { id: 'la_demo_1', name: 'Anglais', level: 'C1 - Avancé / Courant' }
      ];
      this.interests = ['Nouvelles Technologies', 'Randonnée en montagne'];
      this.triggerAutosave();
    },

    clearForm() {
      this.personalInfo = { firstName: '', lastName: '', title: '', email: '', phone: '', address: '', website: '', summary: '', photoUrl: '' };
      this.experiences = [];
      this.educations = [];
      this.skills = [];
      this.languages = [];
      this.interests = [];
      this.errors = {};
    },

    // Automatic or manual backup trigger from store to Laravel
    async triggerAutosave() {
      this.saveStatus = 'saving';
      try {
        await axios.post('/api/cv', {
          templateId: this.templateId,
          themeColor: this.themeColor,
          personalInfo: this.personalInfo,
          experiences: this.experiences,
          educations: this.educations,
          skills: this.skills,
          languages: this.languages,
          interests: this.interests
        });
        this.saveStatus = 'saved';
      } catch (err) {
        this.saveStatus = 'failed';
      }
    }
  }
});
