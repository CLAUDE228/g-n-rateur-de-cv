import { CvData } from '../types';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, BookOpen, User } from 'lucide-react';

interface CvPreviewModernProps {
  data: CvData;
}

export default function CvPreviewModern({ data }: CvPreviewModernProps) {
  const { personalInfo, experiences, educations, skills, languages, interests, themeColor } = data;

  return (
    <div 
      id="cv-template-modern" 
      className="bg-white shadow-md w-full min-h-[297mm] mx-auto text-slate-800 flex flex-col md:flex-row font-sans relative overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* LEFT SIDEBAR PANEL */}
      <div 
        className="w-full md:w-[35%] py-8 px-6 text-white flex flex-col justify-between shrink-0"
        style={{ backgroundColor: themeColor }}
      >
        <div>
          {/* Logo/Photo Block */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            {personalInfo.photoUrl ? (
              <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white/20 shadow-lg mb-4 bg-slate-800 flex-shrink-0">
                <img 
                  src={personalInfo.photoUrl} 
                  alt="Profil" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center text-white/60 mb-4 flex-shrink-0">
                <User className="h-10 w-10 text-white/50" />
              </div>
            )}

            {/* In-sidebar Identity on Mobile (fallback) */}
            <h1 className="text-xl font-extrabold uppercase tracking-tight md:hidden">
              {personalInfo.firstName || 'Jean'} {personalInfo.lastName || 'Dupont'}
            </h1>
            <p className="text-xs text-white/80 font-bold tracking-wide mt-1 md:hidden">
              {personalInfo.title || 'Développeur Full Stack'}
            </p>
          </div>

          {/* Contact Details Segment */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-white/50 border-b border-white/10 pb-1.5">
              Contact
            </h3>

            <div className="space-y-3 text-[11px] text-white/90">
              {personalInfo.email && (
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="h-3.5 w-3.5 opacity-70 shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 opacity-70 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 opacity-70 shrink-0" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2.5 min-w-0">
                  <Globe className="h-3.5 w-3.5 opacity-70 shrink-0" />
                  <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Segment with dynamic percentage level bars */}
          {skills && skills.length > 0 && (
            <div className="space-y-4 mb-8">
              <h3 className="text-xs uppercase tracking-widest font-extrabold text-white/50 border-b border-white/10 pb-1.5">
                Compétences
              </h3>

              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-[11px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-white/95">{skill.name}</span>
                      <span className="text-white/60 font-mono text-[9px]">{skill.level}%</span>
                    </div>
                    {/* Visual Progress Bar track */}
                    <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Segment */}
          {languages && languages.length > 0 && (
            <div className="space-y-4 mb-6">
              <h3 className="text-xs uppercase tracking-widest font-extrabold text-white/50 border-b border-white/10 pb-1.5">
                Langues
              </h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-white/90">{lang.name}</span>
                    <span className="bg-white/10 text-white/80 border border-white/5 px-2 py-0.5 rounded text-[9px] italic">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimal Academic Tag Footer */}
        <div className="text-center text-[8px] text-white/40 tracking-widest font-mono uppercase mt-12">
          MODÈLE CV MODERNE • VECTEUR
        </div>
      </div>

      {/* RIGHT MAIN PANEL */}
      <div className="w-full md:w-[65%] flex flex-col justify-between p-8 sm:p-10">
        <div>
          {/* Main Top Header Details */}
          <div className="border-b pb-5 mb-6 border-slate-100 hidden md:block">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
              {personalInfo.firstName || 'Jean'}{' '}
              <span className="font-light" style={{ color: themeColor }}>
                {personalInfo.lastName || 'Dupont'}
              </span>
            </h1>
            <p className="text-sm font-semibold tracking-wide uppercase mt-2 text-slate-600 block">
              {personalInfo.title || 'Développeur Full Stack'}
            </p>
          </div>

          {/* Short Profile block */}
          {personalInfo.summary && (
            <div className="mb-8 bg-slate-50 border-l-4 p-4 rounded-r-xl" style={{ borderLeftColor: themeColor }}>
              <div className="flex items-center gap-1.5 mb-2">
                <User className="h-4 w-4" style={{ color: themeColor }} />
                <h3 className="text-[11px] uppercase tracking-widest font-extrabold text-slate-800">
                  À propos de moi
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Core Right Segments */}
          <div className="space-y-8">
            
            {/* Work Experiences Section */}
            {experiences && experiences.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                  <div className="p-1 px-1.5 rounded text-white" style={{ backgroundColor: themeColor }}>
                    <Briefcase className="h-3.5 w-3.5" />
                  </div>
                  <h2 className="text-xs uppercase tracking-widest font-extrabold text-slate-900">
                    Expérience Professionnelle
                  </h2>
                </div>

                <div className="relative border-l-2 pl-4 transition-all ml-2.5 pb-1 space-y-5" style={{ borderColor: themeColor + '20' }}>
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative text-xs">
                      {/* Interactive dot selector */}
                      <span 
                        className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: themeColor }}
                      />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {exp.jobTitle} <span className="text-slate-500 font-normal">| {exp.company}</span>
                        </h4>
                        <span className="text-slate-500 font-medium text-[10px] whitespace-nowrap bg-slate-50 border px-2 py-0.5 rounded border-slate-100">
                          {exp.startDate} – {exp.current ? "Présent" : exp.endDate} {exp.city ? `(${exp.city})` : ''}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-slate-600 mt-2 leading-relaxed whitespace-pre-line text-justify">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Blocks */}
            {educations && educations.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                  <div className="p-1 px-1.5 rounded text-white" style={{ backgroundColor: themeColor }}>
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                  <h2 className="text-xs uppercase tracking-widest font-extrabold text-slate-900">
                    Formations & Diplômes
                  </h2>
                </div>

                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="text-xs pl-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <h4 className="font-bold text-slate-900">
                          {edu.degree}
                        </h4>
                        <span className="text-slate-500 font-medium text-[10px] whitespace-nowrap bg-slate-50 border px-2 py-0.5 rounded border-slate-100">
                          {edu.startDate} – {edu.current ? "Présent" : edu.endDate} {edu.city ? `(${edu.city})` : ''}
                        </span>
                      </div>
                      <p className="text-slate-650 font-medium text-slate-500">{edu.school}</p>
                      {edu.description && (
                        <p className="text-slate-500 mt-1 leading-relaxed text-justify">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests Section */}
            {interests && interests.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 border-b pb-1.5 border-slate-100">
                  <div className="p-1 px-1.5 rounded text-white" style={{ backgroundColor: themeColor }}>
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <h2 className="text-xs uppercase tracking-widest font-extrabold text-slate-900">
                    Centres d'intérêt
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {interests.map((interest, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200/50 rounded text-slate-600 text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Dynamic bottom printable margin */}
        <div className="text-center font-sans text-[8px] text-slate-300 mt-12 pt-4 border-t border-slate-50">
          Ce document est optimisé numériquement pour les analyses d'embauche.
        </div>
      </div>
    </div>
  );
}
