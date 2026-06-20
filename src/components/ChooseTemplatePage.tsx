import { motion } from 'motion/react';
import { ArrowLeft, Check, Compass, FileText, Sparkles, UserCheck } from 'lucide-react';
import { CvData } from '../types';

interface ChooseTemplatePageProps {
  onSelect: (templateId: 'modern' | 'professional') => void;
  onBack: () => void;
  currentSelection: 'modern' | 'professional';
}

export default function ChooseTemplatePage({ onSelect, onBack, currentSelection }: ChooseTemplatePageProps) {
  return (
    <div className="min-h-screen bg-indigo-50/30 py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-semibold cursor-pointer group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform text-indigo-500" />
            Retour à l'accueil
          </button>

          <span className="text-xs font-mono text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Étape 1 sur 2
          </span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quel design convient à votre profil ?
          </h1>
          <p className="text-slate-600 mt-3 text-sm leading-relaxed">
            Choisissez la structure de départ. Vous pourrez ajuster la couleur d'accentuation, charger une photo de profil et enrichir vos informations plus tard.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-16">
          {/* Option: Professionnel */}
          <div
            onClick={() => onSelect('professional')}
            className={`bg-white border rounded-[32px] cursor-pointer p-8 transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-xl shadow-indigo-100/30 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-300 ${
              currentSelection === 'professional' ? 'ring-2 ring-indigo-600 border-indigo-600 bg-indigo-50/10' : 'border-slate-100'
            }`}
          >
            {currentSelection === 'professional' && (
              <div className="absolute top-6 right-6 bg-indigo-600 text-white rounded-full p-1 shadow">
                <Check className="h-4 w-4" />
              </div>
            )}

            <div>
              {/* Graphic Icon Header */}
              <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 mb-6">
                <UserCheck className="h-6 w-6" />
              </div>

              <h2 className="text-xl font-black text-slate-800">Modèle Professionnel / ATS</h2>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                Structure Classique • Unicolore
              </span>

              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                Ce modèle met l'accent sur la lisibilité brute et une présentation chronologique sans superflu. Idéal pour les intégrations logicielles de recrutement automatique (ATS).
              </p>

              {/* Feature Bullet points */}
              <ul className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-indigo-50 pt-5">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  Mise en page épurée à une colonne
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  Repères de section très contrastés
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  Idéal pour la finance, droit, administration, ingénierie
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <span className={`w-full py-2.5 rounded-full border font-bold text-xs flex justify-center items-center transition-colors ${
                currentSelection === 'professional' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}>
                {currentSelection === 'professional' ? 'Modèle Sélectionné' : 'Choisir le modèle Professionnel'}
              </span>
            </div>
          </div>

          {/* Option: Moderne */}
          <div
            onClick={() => onSelect('modern')}
            className={`bg-white border rounded-[32px] cursor-pointer p-8 transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-xl shadow-indigo-100/30 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-300 ${
              currentSelection === 'modern' ? 'ring-2 ring-indigo-600 border-indigo-600 bg-indigo-50/10' : 'border-slate-100'
            }`}
          >
            {currentSelection === 'modern' && (
              <div className="absolute top-6 right-6 bg-indigo-600 text-white rounded-full p-1 shadow">
                <Check className="h-4 w-4" />
              </div>
            )}

            <div>
              {/* Graphic Icon Header */}
              <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 mb-6">
                <Compass className="h-6 w-6" />
              </div>

              <h2 className="text-xl font-black text-slate-800">Modèle Moderne</h2>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg">
                Structure Multi-colonnes • Graphique
              </span>

              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                Ce modèle propose un visuel bicolore avec une colonne latérale contrastée. Parfait pour se démarquer visuellement, exprimer sa créativité et afficher des indicateurs de niveau de compétence.
              </p>

              {/* Feature Bullet points */}
              <ul className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-indigo-50 pt-5">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  Mise en page asymétrique à deux colonnes
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  Barres de niveau de compétences dynamiques
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  Idéal pour la tech, marketing, design, communication
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <span className={`w-full py-2.5 rounded-full border font-bold text-xs flex justify-center items-center transition-colors ${
                currentSelection === 'modern' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}>
                {currentSelection === 'modern' ? 'Modèle Sélectionné' : 'Choisir le modèle Moderne'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button to Resume builder */}
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(currentSelection)}
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-full shadow-lg shadow-indigo-100 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            Continuer vers la saisie
            <Sparkles className="h-5 w-5 text-yellow-355" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
