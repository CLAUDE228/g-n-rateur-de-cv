import React, { useState, useRef } from 'react';
import { 
  User, Briefcase, GraduationCap, Code2, Globe2, Heart, Paintbrush, 
  Plus, Trash2, RotateCcw, Sparkles, Upload, X, Check, ArrowRight
} from 'lucide-react';
import { CvData, Experience, Education, Skill, Language } from '../types';
import { INITIAL_CV_DATA } from '../defaultData';

interface CvFormProps {
  data: CvData;
  onChange: (newData: CvData) => void;
  onPreview: () => void;
}

type FormTab = 'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'interests' | 'design';

const ACCENT_COLORS = [
  { name: 'Ardoise Sombre', hex: '#0f172a' },
  { name: 'Bleu Cosmique', hex: '#1e3a8a' },
  { name: 'Émeraude Impérial', hex: '#064e3b' },
  { name: 'Bordeaux Velours', hex: '#701a75' },
  { name: 'Automne Brûlé', hex: '#7c2d12' },
  { name: 'Indigo Profond', hex: '#4338ca' },
];

export default function CvForm({ data, onChange, onPreview }: CvFormProps) {
  const [activeTab, setActiveTab] = useState<FormTab>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tabs structure with labels
  const tabs: { id: FormTab; label: string; icon: any }[] = [
    { id: 'personal', label: 'Profil', icon: User },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'education', label: 'Formations', icon: GraduationCap },
    { id: 'skills', label: 'Compétences', icon: Code2 },
    { id: 'languages', label: 'Langues', icon: Globe2 },
    { id: 'interests', label: 'Intérêts', icon: Heart },
    { id: 'design', label: 'Design', icon: Paintbrush },
  ];

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    let errorMsg = '';
    if (field === 'email') {
      const re = /^\S+@\S+\.\S+$/;
      if (value && !re.test(value)) {
        errorMsg = "Format d'e-mail invalide (ex: nom@domaine.com)";
      }
    } else if (field === 'phone') {
      const re = /^[+0-9\s.-]{8,20}$/;
      if (value && !re.test(value)) {
        errorMsg = 'Format de téléphone invalide (8-20 chiffres, espaces, -, +)';
      }
    } else if (field === 'website') {
      const re = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      if (value && !re.test(value)) {
        errorMsg = "Format d'adresse URL invalide (ex: https://site.com)";
      }
    } else if (field === 'firstName' || field === 'lastName') {
      if (!value.trim()) {
        errorMsg = 'Ce champ est requis';
      } else if (value.trim().length < 2) {
        errorMsg = 'Doit contenir au moins 2 caractères';
      }
    }
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  // Helper to deep modify properties safely
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
    validateField(field, value);
  };

  // Profile image upload reader
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La photo est trop volumineuse (limite: 2 Mo).");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updatePersonalInfo('photoUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonalInfo('photoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // EXPERIENCE ACTIONS
  const addExperience = () => {
    const newExp: Experience = {
      id: 'exp_' + Date.now(),
      jobTitle: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({
      ...data,
      experiences: [...data.experiences, newExp]
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onChange({ ...data, experiences: updated });
  };

  const deleteExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id)
    });
  };

  // EDUCATION ACTIONS
  const addEducation = () => {
    const newEdu: Education = {
      id: 'edu_' + Date.now(),
      degree: '',
      school: '',
      city: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({
      ...data,
      educations: [...data.educations, newEdu]
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = data.educations.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onChange({ ...data, educations: updated });
  };

  const deleteEducation = (id: string) => {
    onChange({
      ...data,
      educations: data.educations.filter((edu) => edu.id !== id)
    });
  };

  // SKILL ACTIONS
  const addSkill = () => {
    const newSkill: Skill = {
      id: 'sk_' + Date.now(),
      name: '',
      level: 70
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    const updated = data.skills.map((skill) => {
      if (skill.id === id) {
        return { ...skill, [field]: value };
      }
      return skill;
    });
    onChange({ ...data, skills: updated });
  };

  const deleteSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id)
    });
  };

  // LANGUAGE ACTIONS
  const addLanguage = () => {
    const newLang: Language = {
      id: 'la_' + Date.now(),
      name: '',
      level: 'Intermédiaire'
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    const updated = data.languages.map((lang) => {
      if (lang.id === id) {
        return { ...lang, [field]: value };
      }
      return lang;
    });
    onChange({ ...data, languages: updated });
  };

  const deleteLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id)
    });
  };

  // INTEREST ACTIONS
  const [newInterest, setNewInterest] = useState('');
  const addInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim()) {
      onChange({
        ...data,
        interests: [...data.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const deleteInterest = (index: number) => {
    onChange({
      ...data,
      interests: data.interests.filter((_, idx) => idx !== index)
    });
  };

  // Loader and Reset helpers
  const handleLoadDemo = () => {
    if (confirm("Charger les données de démonstration ? Cela remplacera votre contenu actuel.")) {
      onChange({
        ...INITIAL_CV_DATA,
        templateId: data.templateId // Preserve selected template state
      });
    }
  };

  const handleClearForm = () => {
    if (confirm("Vider entièrement le formulaire et recommencer à zéro ?")) {
      onChange({
        templateId: data.templateId,
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
        themeColor: '#0f172a'
      });
    }
  };

  return (
    <div id="cv-form-container" className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row min-h-[580px] overflow-hidden">
      
      {/* Side Tabs for navigating between forms (Compact Desktop List & Horizontal Mobile) */}
      <div className="w-full md:w-56 bg-slate-50 border-r border-slate-100 p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0 scrollbar-none">
        <div className="text-slate-400 text-[10px] font-mono tracking-widest uppercase p-2 hidden md:block">
          Sections du CV
        </div>

        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <IconComponent className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* Form Quick Utilities separated for easy access */}
        <div className="hidden md:flex flex-col gap-2 mt-auto pt-6 border-t border-slate-200/60 p-2">
          <button
            onClick={handleLoadDemo}
            className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-indigo-600 font-semibold transition-colors cursor-pointer text-left"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Exemple de démo
          </button>
          <button
            onClick={handleClearForm}
            className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-red-500 font-semibold transition-colors cursor-pointer text-left"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Vider le formulaire
          </button>
        </div>
      </div>

      {/* Main active sub-form workspace */}
      <div className="flex-1 p-6 sm:p-8">
        
        {/* PERSONAL INFOS */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Informations Personnelles
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Saisissez vos coordonnées de contact et chargez votre plus belle photo professionnelle.
              </p>
            </div>

            {/* Profile image picker block */}
            <div className="flex flex-col sm:flex-row gap-5 items-center bg-slate-50 border border-slate-100 p-4 rounded-xl">
              {data.personalInfo.photoUrl ? (
                <div className="relative group">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-slate-300 shadow bg-slate-200">
                    <img 
                      src={data.personalInfo.photoUrl} 
                      alt="Profil" 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button 
                    onClick={removePhoto}
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow cursor-pointer transition-colors"
                    title="Supprimer la photo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-16 w-16 rounded-full border-2 border-dashed border-slate-300 hover:border-slate-500 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 bg-white cursor-pointer transition-colors shadow-sm"
                  title="Ajouter une photo"
                >
                  <Upload className="h-5 w-5" />
                  <span className="text-[8px] font-semibold mt-1">Image</span>
                </div>
              )}

              <div className="text-center sm:text-left">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden" 
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  {data.personalInfo.photoUrl ? "Changer de photo" : "Ajouter une photo de profil"}
                </button>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  Formats supportés : JPEG, PNG. Taille maximale recommandée : 2 Mo.
                </p>
              </div>
            </div>

            {/* Content Fields inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom</label>
                <input 
                  type="text" 
                  value={data.personalInfo.firstName}
                  onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                  placeholder="Ex: Jean"
                  className={`w-full text-sm px-3.5 py-2 border rounded-lg text-slate-800 transition-colors focus:ring-2 focus:ring-slate-900 focus:outline-none ${errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-slate-800'}`}
                />
                {errors.firstName && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de famille</label>
                <input 
                  type="text" 
                  value={data.personalInfo.lastName}
                  onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                  placeholder="Ex: Dupont"
                  className={`w-full text-sm px-3.5 py-2 border rounded-lg text-slate-800 transition-colors focus:ring-2 focus:ring-slate-900 focus:outline-none ${errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-slate-800'}`}
                />
                {errors.lastName && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.lastName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Titre du profil ou profession</label>
                <input 
                  type="text" 
                  value={data.personalInfo.title}
                  onChange={(e) => updatePersonalInfo('title', e.target.value)}
                  placeholder="Ex: Développeur Full Stack Senior"
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-800 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail de contact</label>
                <input 
                  type="email" 
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="Ex: jean.dupont@email.com"
                  className={`w-full text-sm px-3.5 py-2 border rounded-lg text-slate-800 transition-colors focus:ring-2 focus:ring-slate-900 focus:outline-none ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-slate-800'}`}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone mobile</label>
                <input 
                  type="tel" 
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="Ex: +33 6 12 34 56 78"
                  className={`w-full text-sm px-3.5 py-2 border rounded-lg text-slate-800 transition-colors focus:ring-2 focus:ring-slate-900 focus:outline-none ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-slate-800'}`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse ou Ville d'activité</label>
                <input 
                  type="text" 
                  value={data.personalInfo.address}
                  onChange={(e) => updatePersonalInfo('address', e.target.value)}
                  placeholder="Ex: Paris, France"
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Site Web ou Portfolio / LinkedIn</label>
                <input 
                  type="text" 
                  value={data.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="Ex: https://jeandupont.dev"
                  className={`w-full text-sm px-3.5 py-2 border rounded-lg text-slate-800 transition-colors focus:ring-2 focus:ring-slate-900 focus:outline-none ${errors.website ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-slate-800'}`}
                />
                {errors.website && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.website}</p>}
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-baseline mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Phrase d'accroche / Résumé de profil</label>
                  <span className={`text-[10px] font-bold ${(data.personalInfo.summary || '').length > 450 ? 'text-amber-600' : 'text-slate-400'}`}>
                    {(data.personalInfo.summary || '').length} / 500 caractéres
                  </span>
                </div>
                <textarea 
                  rows={4}
                  maxLength={500}
                  value={data.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                  placeholder="Ex: Développeur passionné avec plus de 5 ans d'expérience..."
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 rounded-lg text-slate-800 resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Footer triggers */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveTab('experience')}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm ml-auto"
              >
                Suivant : Expériences
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* WORK EXPERIENCES LIST */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Expérience Professionnelle
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Listez vos emplois récents en détaillant brièvement vos accomplissements.
                </p>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 px-3 py-1.5 border border-slate-900 text-slate-900 bg-white hover:bg-slate-50 text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter
              </button>
            </div>

            <div className="space-y-5">
              {data.experiences.length === 0 ? (
                <div className="text-center py-10 border border-dashed rounded-xl bg-slate-50/50 border-slate-200">
                  <Briefcase className="h-8 w-8 text-slate-350 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-semibold">Aucune expérience n'a été répertoriée.</p>
                  <button 
                    onClick={addExperience}
                    className="mt-3.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold px-3 py-1.5 rounded-lg border border-indigo-150 cursor-pointer"
                  >
                    Ajouter ma première expérience
                  </button>
                </div>
              ) : (
                data.experiences.map((exp, idx) => (
                  <div key={exp.id} className="border border-slate-200 rounded-xl p-5 relative bg-white shadow-sm space-y-4">
                    <button 
                      onClick={() => deleteExperience(exp.id)}
                      className="absolute top-4 right-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg p-1.5 cursor-pointer transition-colors border border-red-100"
                      title="Supprimer cette expérience"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="text-xs font-bold text-slate-400">
                      Poste #{idx + 1}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Intitulé du poste</label>
                        <input 
                          type="text" 
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                          placeholder="Ex: Développeur Full Stack Senior"
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Entreprise ou Employeur</label>
                        <input 
                          type="text" 
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Ex: Tech Solutions SAS"
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Ville</label>
                        <input 
                          type="text" 
                          value={exp.city}
                          onChange={(e) => updateExperience(exp.id, 'city', e.target.value)}
                          placeholder="Ex: Paris"
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Début (Mois / Année)</label>
                          <input 
                            type="text" 
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="Ex: 2023-01 ou Jan 2023"
                            className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1 text-slate-400">Fin (Mois / Année)</label>
                          <input 
                            type="text" 
                            value={exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder={exp.current ? 'Présent' : 'Ex: 2024-12'}
                            className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-850 disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 flex items-center">
                        <input 
                          type="checkbox" 
                          id={`exp-curr-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="h-4 w-4 text-slate-900 border-slate-300 rounded cursor-pointer"
                        />
                        <label htmlFor={`exp-curr-${exp.id}`} className="ml-2 text-xs text-slate-600 font-medium cursor-pointer">
                          J'occupe actuellement ce poste
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Description des tâches (Séparez vos puces par des retours à la ligne)</label>
                        <textarea 
                          rows={4}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="• Direction technique d'une équipe de 5 developpeurs...&#10;• Amélioration de l'UX en React..."
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800 resize-none leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('personal')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Précédent
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
              >
                Suivant : Éducation
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* EDUCATIONS LIST (STUDIES) */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Formations & Diplômes
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Listez vos écoles supérieures, d'ingénierie, universités ou formations certifiantes.
                </p>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-1 px-3 py-1.5 border border-slate-900 text-slate-900 bg-white hover:bg-slate-50 text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter
              </button>
            </div>

            <div className="space-y-5">
              {data.educations.length === 0 ? (
                <div className="text-center py-10 border border-dashed rounded-xl bg-slate-50/50 border-slate-200">
                  <GraduationCap className="h-8 w-8 text-slate-350 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-semibold">Aucun diplôme répertorié.</p>
                  <button 
                    onClick={addEducation}
                    className="mt-3.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold px-3 py-1.5 rounded-lg border border-indigo-150 cursor-pointer"
                  >
                    Ajouter ma première formation
                  </button>
                </div>
              ) : (
                data.educations.map((edu, idx) => (
                  <div key={edu.id} className="border border-slate-200 rounded-xl p-5 relative bg-white shadow-sm space-y-4">
                    <button 
                      onClick={() => deleteEducation(edu.id)}
                      className="absolute top-4 right-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg p-1.5 cursor-pointer transition-colors border border-red-100"
                      title="Supprimer ce diplôme"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="text-xs font-bold text-slate-400">
                      Diplôme #{idx + 1}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Nom du diplôme ou certification</label>
                        <input 
                          type="text" 
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="Ex: Master en Ingénierie Informatique"
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Université / École d'études</label>
                        <input 
                          type="text" 
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          placeholder="Ex: EPITECH Paris"
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Ville</label>
                        <input 
                          type="text" 
                          value={edu.city}
                          onChange={(e) => updateEducation(edu.id, 'city', e.target.value)}
                          placeholder="Ex: Paris"
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Début (Année)</label>
                          <input 
                            type="text" 
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            placeholder="Ex: 2018"
                            className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1 text-slate-400">Fin (Année)</label>
                          <input 
                            type="text" 
                            value={edu.endDate}
                            disabled={edu.current}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            placeholder={edu.current ? 'Présent' : 'Ex: 2021'}
                            className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-850 disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 flex items-center">
                        <input 
                          type="checkbox" 
                          id={`edu-curr-${edu.id}`}
                          checked={edu.current}
                          onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                          className="h-4 w-4 text-slate-900 border-slate-300 rounded cursor-pointer"
                        />
                        <label htmlFor={`edu-curr-${edu.id}`} className="ml-2 text-xs text-slate-600 font-medium cursor-pointer">
                          J'étudie actuellement dans cet établissement
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Mention ou spécialité (Optionnel)</label>
                        <input 
                          type="text" 
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                          placeholder="Ex: Spécialisation développement web, mention Bien."
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('experience')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Précédent
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
              >
                Suivant : Compétences
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TECHNICAL SKILLS AND LEVELS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Compétences Techniques
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Listez vos aptitudes clés et donnez une jauge de maîtrise de 0 à 100%.
                </p>
              </div>
              <button
                onClick={addSkill}
                className="flex items-center gap-1 px-3 py-1.5 border border-slate-900 text-slate-900 bg-white hover:bg-slate-50 text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter
              </button>
            </div>

            <div className="space-y-3">
              {data.skills.length === 0 ? (
                <div className="text-center py-10 border border-dashed rounded-xl bg-slate-50/50 border-slate-200">
                  <Code2 className="h-8 w-8 text-slate-350 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-semibold">Aucune compétence listée.</p>
                  <button 
                    onClick={addSkill}
                    className="mt-3.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold px-3 py-1.5 rounded-lg border border-indigo-150 cursor-pointer"
                  >
                    Ajouter ma première compétence
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="border border-slate-200 rounded-xl p-4 bg-slate-100/30 flex flex-col gap-2 relative group pr-12 shadow-sm">
                      <button 
                        onClick={() => deleteSkill(skill.id)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 rounded p-1 transition-colors cursor-pointer"
                        title="Supprimer la compétence"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="w-full">
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Technologie / Outil</label>
                        <input 
                          type="text" 
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                          placeholder="Ex: React / Next.js"
                          className="w-full text-xs px-3 py-1.5 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800 bg-white"
                        />
                      </div>

                      <div className="w-full mt-1.5">
                        <div className="flex justify-between items-baseline text-[10px] text-slate-500 font-bold mb-1">
                          <span className="uppercase tracking-widest">Niveau de maîtrise</span>
                          <span className="text-indigo-655 font-mono text-xs">{skill.level}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="100" 
                          step="5"
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('education')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Précédent
              </button>
              <button
                onClick={() => setActiveTab('languages')}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
              >
                Suivant : Langues
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* LANGUAGES SPOKEN */}
        {activeTab === 'languages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Langues Étrangères
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Mentionnez les langues parlées et votre niveau de certification européen ou général.
                </p>
              </div>
              <button
                onClick={addLanguage}
                className="flex items-center gap-1 px-3 py-1.5 border border-slate-900 text-slate-900 bg-white hover:bg-slate-50 text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter
              </button>
            </div>

            <div className="space-y-3">
              {data.languages.length === 0 ? (
                <div className="text-center py-10 border border-dashed rounded-xl bg-slate-50/50 border-slate-200">
                  <Globe2 className="h-8 w-8 text-slate-350 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-semibold">Aucune langue n'a été insérée.</p>
                  <button 
                    onClick={addLanguage}
                    className="mt-3.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold px-3 py-1.5 rounded-lg border border-indigo-150 cursor-pointer"
                  >
                    Ajouter ma première langue
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="border border-slate-200 rounded-xl p-4 bg-slate-100/30 flex flex-col gap-2 relative group pr-12 shadow-sm">
                      <button 
                        onClick={() => deleteLanguage(lang.id)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 rounded p-1 transition-colors cursor-pointer"
                        title="Supprimer la langue"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="w-full">
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Langue</label>
                        <input 
                          type="text" 
                          value={lang.name}
                          onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                          placeholder="Ex: Anglais"
                          className="w-full text-xs px-3 py-1.5 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800 bg-white"
                        />
                      </div>

                      <div className="w-full mt-1">
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Niveau estimé ou score</label>
                        <select
                          value={lang.level}
                          onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                          className="w-full text-xs px-2 py-1.5 border border-slate-200 rounded-lg text-slate-800 bg-white"
                        >
                          <option value="Langue maternelle">Langue maternelle</option>
                          <option value="C2 - Bilingue / Master">C2 - Bilingue / Master</option>
                          <option value="C1 - Avancé / Courant">C1 - Avancé / Courant</option>
                          <option value="B2 - Intermédiaire Supérieur">B2 - Intermédiaire Supérieur</option>
                          <option value="B1 - Intermédiaire">B1 - Intermédiaire</option>
                          <option value="A2 - Niveau de survie scolaire">A2 - Niveau de survie scolaire</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('skills')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Précédent
              </button>
              <button
                onClick={() => setActiveTab('interests')}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
              >
                Suivant : Intérêts
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* INTERESTS (LOISIRS) */}
        {activeTab === 'interests' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Centres d'intérêt & Loisirs
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Affichez vos hobbies clés pour attirer l'intérêt plus personnel des recruteurs (puces rapides).
              </p>
            </div>

            {/* Adding tag form */}
            <form onSubmit={addInterest} className="flex gap-2 max-w-sm">
              <input 
                type="text" 
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Ex: Randonnée en montagne, Échecs..."
                className="flex-1 text-xs px-3.5 py-2 border border-slate-200 focus:outline-slate-800 rounded-lg text-slate-800"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg cursor-pointer transition-colors shadow-sm whitespace-nowrap"
              >
                Ajouter
              </button>
            </form>

            {/* Active interests list */}
            <div>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                Vos activités enregistrées ({data.interests.length})
              </div>
              
              {data.interests.length === 0 ? (
                <div className="py-6 text-center border border-dashed rounded-xl bg-slate-100/30 border-slate-200">
                  <p className="text-xs text-slate-400">Aucun centre d'intérêt n'a encore été inséré.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-slate-50 border border-slate-250 text-slate-705 text-xs font-semibold rounded-lg shadow-sm"
                    >
                      <span>{interest}</span>
                      <button 
                        type="button"
                        onClick={() => deleteInterest(idx)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('languages')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-750 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Précédent
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
              >
                Suivant : Style
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* DESIGN & THEMES SETTINGS */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Choix de Style & Couleur d'Accent
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Personnalisez la couleur d'en-tête, des indicateurs de compétences et des décors clés de votre document.
              </p>
            </div>

            <div className="space-y-6">
              {/* Color Preset selectors */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Palette recommandée</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACCENT_COLORS.map((color) => {
                    const isSelected = data.themeColor.toLowerCase() === color.hex.toLowerCase();
                    return (
                      <button
                        key={color.hex}
                        onClick={() => onChange({ ...data, themeColor: color.hex })}
                        className={`p-3 border rounded-xl flex items-center gap-2.5 transition-all cursor-pointer text-left ${
                          isSelected ? 'ring-2 ring-slate-900 border-slate-900 shadow-sm font-semibold' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span 
                          className="h-4.5 w-4.5 rounded-full border border-black/10 shrink-0 inline-block shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs text-slate-705 truncate">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free-form Custom Color Picker */}
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Sélecteur de couleur personnalisé</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Assurez-vous de garder une bonne lisibilité d'impression contrastée.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={data.themeColor}
                    onChange={(e) => onChange({ ...data, themeColor: e.target.value })}
                    className="h-10 w-16 bg-white border rounded cursor-pointer p-1"
                  />
                  <input 
                    type="text" 
                    value={data.themeColor.toUpperCase()}
                    onChange={(e) => {
                      if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                        onChange({ ...data, themeColor: e.target.value });
                      }
                    }}
                    className="w-24 text-xs font-mono text-center px-2 py-1.5 border rounded-lg bg-white"
                  />
                </div>
              </div>

              {/* Current template switcher on the fly */}
              <div className="border-t pt-5 border-slate-150">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Mise en page actuelle du document</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => onChange({ ...data, templateId: 'professional' })}
                    className={`p-4 border rounded-xl flex flex-col text-left transition-all cursor-pointer ${
                      data.templateId === 'professional' ? 'ring-2 ring-slate-900 border-slate-900 bg-slate-50/20' : 'border-slate-200 hover:bg-slate-50/40'
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-800">Modèle Professionnel / ATS</span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-relaxed">Layout unicolore épuré à une colonne pour recruteurs méthodiques.</span>
                  </button>

                  <button
                    onClick={() => onChange({ ...data, templateId: 'modern' })}
                    className={`p-4 border rounded-xl flex flex-col text-left transition-all cursor-pointer ${
                      data.templateId === 'modern' ? 'ring-2 ring-violet-600 border-violet-600 bg-violet-50/15' : 'border-slate-200 hover:bg-slate-50/40'
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-850">Modèle Moderne Bicolore</span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-relaxed">Layout contrasté asymétrique avec colonne gauche et barres visuelles.</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6 border-t border-slate-100 mt-8">
              <button
                onClick={() => setActiveTab('interests')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Précédent
              </button>
              <button
                onClick={onPreview}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm ml-auto animate-pulse"
              >
                Passer à l'Aperçu Final !
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
