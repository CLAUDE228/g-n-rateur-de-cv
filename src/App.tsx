import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Printer, Eye, Sliders, FileText, Sparkles, 
  ZoomIn, ZoomOut, RotateCcw, HelpCircle, ChevronRight, Check, X
} from 'lucide-react';
import { CvData, AppStep } from './types';
import { INITIAL_CV_DATA } from './defaultData';
import SplashPage from './components/SplashPage';
import LandingPage from './components/LandingPage';
import ChooseTemplatePage from './components/ChooseTemplatePage';
import CvForm from './components/CvForm';
import CvPreviewProfessional from './components/CvPreviewProfessional';
import CvPreviewModern from './components/CvPreviewModern';

const LOCAL_STORAGE_KEY = 'cv_builder_draft_data';

export default function App() {
  const [step, setStep] = useState<AppStep>('splash');
  const [cvData, setCvData] = useState<CvData>(INITIAL_CV_DATA);
  const [previewScale, setPreviewScale] = useState<number>(0.85); // elegant scaling factor
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [showPrintTip, setShowPrintTip] = useState<boolean>(true);

  // Load draft state from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setCvData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erreur de lecture du LocalStorage", e);
    }
  }, []);

  // Save changes to local draft, offering simple robust offline persistence
  const handleCvDataChange = (newData: CvData) => {
    setCvData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Erreur d'écriture du LocalStorage", e);
    }
  };

  // Trigger high-fidelity browser print rendering
  const triggerPrint = () => {
    window.print();
  };

  // Preset quick zoom adjustments
  const handleZoomIn = () => {
    setPreviewScale((prev) => Math.min(1.2, prev + 0.1));
  };

  const handleZoomOut = () => {
    setPreviewScale((prev) => Math.max(0.5, prev - 0.1));
  };

  // Reset current document draft back to mock default
  const handleResetDraft = () => {
    if (confirm("Réinitialiser le brouillon avec le modèle d'exemple par défaut ?")) {
      const resetData = {
        ...INITIAL_CV_DATA,
        templateId: cvData.templateId // conserve model selected
      };
      handleCvDataChange(resetData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      
      {/* 1. SPLASH SCREEN WORKFLOW */}
      {step === 'splash' && (
        <SplashPage onComplete={() => setStep('landing')} />
      )}

      {/* 2. LANDING PRESENTATION WORKFLOW */}
      {step === 'landing' && (
        <LandingPage onStart={() => setStep('select-template')} />
      )}

      {/* 3. SELECT TEMPLATE WORKFLOW */}
      {step === 'select-template' && (
        <ChooseTemplatePage 
          currentSelection={cvData.templateId}
          onSelect={(id) => {
            handleCvDataChange({ ...cvData, templateId: id });
            setStep('builder');
          }}
          onBack={() => setStep('landing')}
        />
      )}

      {/* 4. MAIN INTEGRATED BUILDER WORKSPACE */}
      {step === 'builder' && (
        <div className="flex flex-col min-h-screen">
          
          {/* Builder Top Action Bar */}
          <header className="h-16 bg-white border-b border-indigo-100 sticky top-0 z-30 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
              
              {/* Back to selection & Branding */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep('select-template')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 rounded-xl cursor-pointer transition-colors"
                  title="Revenir au choix du style"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Changer de modèle</span>
                </button>
                <div className="h-4 w-px bg-indigo-100 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <span className="text-base font-extrabold text-slate-800 tracking-tight">
                    CV<span className="text-indigo-600">Forge</span>
                  </span>
                </div>
                <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize hidden sm:inline-block">
                  Style: {cvData.templateId === 'professional' ? 'Professionnel/ATS' : 'Moderne'}
                </span>
              </div>

              {/* Pulsing Save Indicator */}
              <div className="hidden md:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-500">Sauvegarde automatique</span>
              </div>

              {/* Main print & PDF trigger */}
              <div className="flex items-center gap-3">
                {/* Reset button trigger */}
                <button
                  onClick={handleResetDraft}
                  className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Recharger l'exemple démo"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                <button
                  onClick={triggerPrint}
                  className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                  title="Ouvrir l'impression systeme"
                >
                  <Printer className="h-4 w-4 shrink-0" />
                  <span>Générer PDF</span>
                </button>
              </div>

            </div>
          </header>

          {/* Builder Workspace Area */}
          <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-indigo-50/20">
            
            {/* LEFT WORKSPACE PANELS: Inputs Form */}
            <section className={`w-full lg:w-[50%] h-full p-4 sm:p-6 overflow-y-auto ${mobileView === 'edit' ? 'block' : 'hidden lg:block'}`}>
              <div className="max-w-2xl mx-auto space-y-6">
                
                {/* PDF Print optimization advice panel */}
                {showPrintTip && (
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex gap-3 relative shadow-sm">
                    <div className="bg-rose-100 p-1.5 rounded-xl h-fit text-rose-600 shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="text-xs text-rose-950 leading-relaxed">
                      <h4 className="font-extrabold mb-1 text-rose-750">Mode Premium & Exportation Parfaite</h4>
                      <p>
                        Dans le menu d'impression, cochez <b>"Plus de paramètres"</b> &gt; cochez <b>"Graphismes d'arrière-plan"</b> et décactivez <b>"En-têtes et pieds de page"</b> pour obtenir un rendu vectoriel impeccable sur une seule page.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowPrintTip(false)}
                      className="absolute top-3 right-3 text-rose-400 hover:text-rose-700 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {/* Sub-form container handles all user data changes */}
                <CvForm 
                  data={cvData} 
                  onChange={handleCvDataChange}
                  onPreview={() => setMobileView('preview')}
                />
              </div>
            </section>

            {/* RIGHT WORKSPACE PANELS: Live preview simulator with transform scaling */}
            <section className={`w-full lg:w-[50%] h-full bg-indigo-50/40 border-l border-indigo-100/80 flex flex-col relative overflow-hidden ${mobileView === 'preview' ? 'block' : 'hidden lg:block'}`}>
              
              {/* Scale/zoom control rail */}
              <div className="bg-white border-b border-indigo-100 px-4 py-2 flex items-center justify-between shrink-0">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Aperçu du modèle interactif
                </span>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleZoomOut}
                    className="p-1 px-1.5 bg-white border rounded hover:bg-slate-50 text-slate-600 cursor-pointer"
                    title="Zoom arrière"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold text-slate-600 bg-white border px-2.5 py-0.5 rounded shadow-sm">
                    {Math.round(previewScale * 100)}%
                  </span>
                  <button 
                    onClick={handleZoomIn}
                    className="p-1 px-1.5 bg-white border rounded hover:bg-slate-50 text-slate-600 cursor-pointer"
                    title="Zoom avant"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Centered Scroll Workspace for CV */}
              <div className="flex-grow p-4 sm:p-8 overflow-y-auto flex items-start justify-center">
                <div 
                  className="origin-top transition-transform shadow-2xl rounded-lg overflow-hidden bg-white mb-12 shrink-0 border border-slate-300/60"
                  style={{ 
                    width: '210mm', 
                    transform: `scale(${previewScale})`,
                  }}
                >
                  {cvData.templateId === 'professional' ? (
                    <CvPreviewProfessional data={cvData} />
                  ) : (
                    <CvPreviewModern data={cvData} />
                  )}
                </div>
              </div>
            </section>

          </main>

          {/* Floated Mobile view toggle (Floating action button) */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-slate-200 p-1 flex gap-1 z-30 lg:hidden">
            <button
              onClick={() => setMobileView('edit')}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                mobileView === 'edit' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              Saisie
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                mobileView === 'preview' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              Aperçu ({cvData.templateId === 'professional' ? 'Pro' : 'Moderne'})
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
