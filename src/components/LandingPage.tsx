import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, FileSpreadsheet, LayoutTemplate, Palette, Printer, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-indigo-50/20 text-slate-950 flex flex-col justify-between font-sans">
      {/* Mini-Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-indigo-100/60 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span className="text-lg font-extrabold text-slate-800 tracking-tight">
              CV<span className="text-indigo-600">Forge</span>
            </span>
          </div>

          <button
            onClick={onStart}
            className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-100 transition-all group cursor-pointer"
          >
            Créer mon CV
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-indigo-200 rounded-full blur-3xl opacity-30 pointer-events-none -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-50 border border-indigo-100/80 rounded-full text-xs text-indigo-700 font-bold mb-6 shadow-sm animate-pulse"
          >
            <Sparkles className="h-3.5 w-3.5" />
            100% gratuit • Aucune inscription requise
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-slate-850 max-w-3xl mx-auto leading-tight"
          >
            Créez un CV professionnel <span className="bg-gradient-to-r from-indigo-600 via-purple-650 to-indigo-700 bg-clip-text text-transparent">qui retient l’attention</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Saisissez vos formations, compétences, expériences, puis générez instantanément un CV remarquable au format PDF vectoriel prêt pour l'impression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-full shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              Créer mon CV gratuitement
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#templates"
              className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-indigo-50/50 text-indigo-700 hover:text-indigo-800 font-bold text-base rounded-full border-2 border-indigo-100 shadow-sm transition-all text-center"
            >
              Découvrir les modèles
            </a>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 text-center mb-12">
              Pourquoi choisir notre générateur ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 p-3 rounded-lg h-fit">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Modèles sur-mesure</h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Optez pour le modèle <b>Moderne</b> dynamique ou le modèle <b>Professionnel / ATS</b> épuré, validés par les recruteurs.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="bg-blue-50 border border-blue-100 text-blue-600 p-3 rounded-lg h-fit">
                  <Palette className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Aperçu en temps réel</h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Visualisez instantanément chaque lettre saisie ou photo ajoutée sur votre modèle de CV en temps réel.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="bg-violet-50 border border-violet-100 text-violet-600 p-3 rounded-lg h-fit">
                  <Printer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Haute fidélité d'impression</h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Format PDF haute définition vectoriel, optimisé pour les imprimantes professionnelles et le tri automatisé des dossiers (ATS).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Catalog Preview */}
        <section id="templates" className="py-20 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Choisissez parmi nos modèles clés
            </h2>
            <p className="text-slate-600 mt-3 max-w-md mx-auto text-sm">
              Quel que soit votre domaine de travail, nous proposons la mise en page idéale pour maximiser vos entretiens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Template Card 1 */}
            <div className="bg-white border border-indigo-100/60 rounded-[32px] overflow-hidden shadow-xl shadow-indigo-100/30 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-300 transition-all flex flex-col justify-between group">
              <div className="bg-indigo-50/40 p-8 flex items-center justify-center min-h-[280px] relative overflow-hidden">
                {/* Visual Preview Simulator for Professional */}
                <div className="w-[180px] h-[240px] bg-white rounded shadow-lg border border-slate-200/50 p-4 font-mono text-[5px] text-slate-400 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="h-3 w-3 bg-indigo-600 rounded mb-1" />
                    <div className="h-2 w-20 bg-slate-800 rounded font-sans text-[7px] text-white pl-0.5" />
                    <div className="h-1 bg-slate-200 rounded w-1/2 mt-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-slate-300 rounded w-full" />
                    <div className="h-1 bg-slate-200 rounded w-5/6" />
                    <div className="h-1 bg-slate-200 rounded w-4/5" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-indigo-100 rounded w-1/3" />
                    <div className="grid grid-cols-3 gap-0.5">
                      <div className="h-1 bg-slate-200 rounded" />
                      <div className="h-1 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-indigo-950/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
              </div>
              <div className="p-8 border-t border-indigo-50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Modèle 1</span>
                    <h3 className="text-xl font-bold text-slate-850 mt-1">CV Professionnel / ATS</h3>
                  </div>
                  <span className="bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    Sûr / ATS
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Couleurs sobres (par défaut bleu nuit/ardoise), structure épurée à une colonne avec repères clairs. Conçu pour maximiser la lisibilité des parseurs automatiques.
                </p>
                <div className="mt-6">
                  <button
                    onClick={onStart}
                    className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs rounded-full transition-all cursor-pointer text-center"
                  >
                    Choisir ce modèle
                  </button>
                </div>
              </div>
            </div>

            {/* Template Card 2 */}
            <div className="bg-white border border-indigo-100/60 rounded-[32px] overflow-hidden shadow-xl shadow-indigo-100/30 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-300 transition-all flex flex-col justify-between group">
              <div className="bg-indigo-50/40 p-8 flex items-center justify-center min-h-[280px] relative overflow-hidden">
                {/* Visual Preview Simulator for Modern */}
                <div className="w-[180px] h-[240px] bg-white rounded shadow-lg border border-slate-200/50 font-mono text-[5px] text-slate-400 flex">
                  <div className="w-1/3 bg-indigo-950 p-2 flex flex-col gap-2 items-center text-center">
                    <div className="h-6 w-6 rounded-full bg-indigo-650" />
                    <div className="h-1 bg-indigo-100 rounded w-full" />
                    <div className="space-y-0.5 w-full">
                      <div className="h-[2px] bg-indigo-805 rounded" />
                      <div className="h-[2px] bg-indigo-805 rounded" />
                    </div>
                  </div>
                  <div className="w-2/3 p-3 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="h-2 w-12 bg-slate-900 rounded" />
                      <div className="h-1.5 w-16 bg-slate-200 rounded mt-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-[3px] bg-indigo-500 rounded w-1/3" />
                      <div className="h-1 bg-slate-200 rounded w-full" />
                      <div className="h-1 bg-slate-200 rounded w-5/6" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-[3px] bg-indigo-500 rounded w-1/4" />
                      <div className="h-1 bg-slate-200 rounded w-full" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-indigo-950/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
              </div>
              <div className="p-8 border-t border-indigo-50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Modèle 2</span>
                    <h3 className="text-xl font-bold text-slate-850 mt-1">CV Moderne</h3>
                  </div>
                  <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md shadow-indigo-100">
                    Populaire
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Design moderne à deux colonnes avec une barre latérale élégante, des barres de progression visuelles pour les compétences et des icônes indicatives.
                </p>
                <div className="mt-6">
                  <button
                    onClick={onStart}
                    className="w-full py-2.5 bg-indigo-55 hover:bg-indigo-600 text-indigo-750 hover:text-white font-bold text-xs rounded-full transition-all cursor-pointer text-center"
                  >
                    Choisir ce modèle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* Steps section */}
        <section className="py-20 bg-indigo-950 text-white border-y border-indigo-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-center mb-16">
              Votre CV en trois étapes simples
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="h-12 w-12 bg-indigo-600 text-white font-extrabold flex items-center justify-center rounded-full text-lg mx-auto mb-6 shadow-lg border border-indigo-400">
                  1
                </div>
                <h3 className="font-bold text-lg text-indigo-50">Choisissez un modèle</h3>
                <p className="text-indigo-200 text-sm mt-3 leading-relaxed">
                  Sélectionnez la structure (ATS ou bicolore Moderne) la plus adaptée à vos objectifs.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="h-12 w-12 bg-indigo-600 text-white font-extrabold flex items-center justify-center rounded-full text-lg mx-auto mb-6 shadow-lg border border-indigo-400">
                  2
                </div>
                <h3 className="font-bold text-lg text-indigo-50">Saisissez vos informations</h3>
                <p className="text-indigo-200 text-sm mt-3 leading-relaxed">
                  Renseignez vos coordonnées, proposez des descriptions, vos formations et vos compétences.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="h-12 w-12 bg-indigo-600 text-white font-extrabold flex items-center justify-center rounded-full text-lg mx-auto mb-6 shadow-lg border border-indigo-400">
                  3
                </div>
                <h3 className="font-bold text-lg text-indigo-50">Aperçu & Téléchargement</h3>
                <p className="text-indigo-200 text-sm mt-3 leading-relaxed">
                  Personnalisez la couleur d'accentuation, prévisualisez en direct et téléchargez votre PDF vectoriel.
                </p>
              </div>
            </div>

            <div className="text-center mt-16 pt-8 border-t border-indigo-900">
              <button
                onClick={onStart}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-full shadow-xl shadow-indigo-950 cursor-pointer transition-all"
              >
                Créer mon CV Maintenant
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-indigo-950 py-12 px-6 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span className="text-base font-extrabold text-slate-100 tracking-tight">
              CV<span className="text-indigo-400">Forge</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
            <span className="text-[11px] font-mono tracking-wider text-slate-500">SECURE • CLIENT PERSISTENCE • OFFLINE CAPABLE</span>
          </div>

          <p className="text-xs text-slate-500">
            © 2026. Tous droits réservés. Outil de recrutement académique autonome • CVForge.
          </p>
        </div>
      </footer>
    </div>
  );
}
