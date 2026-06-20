import { CvData } from '../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface CvPreviewProfessionalProps {
  data: CvData;
}

export default function CvPreviewProfessional({ data }: CvPreviewProfessionalProps) {
  const { personalInfo, experiences, educations, skills, languages, interests, themeColor } = data;

  return (
    <div 
      id="cv-template-professional" 
      className="bg-white p-8 sm:p-12 shadow-md w-full min-h-[297mm] mx-auto text-slate-800 flex flex-col justify-between font-serif relative overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Top Banner Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: themeColor }} />

      <div>
        {/* Header Block */}
        <div className="border-b-2 pb-6 mb-6" style={{ borderColor: themeColor + '15' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            {/* Identity */}
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                {personalInfo.firstName || 'Votre'} <span className="uppercase">{personalInfo.lastName || 'Nom'}</span>
              </h1>
              <p className="text-lg font-bold font-sans tracking-wide" style={{ color: themeColor }}>
                {personalInfo.title || 'Développeur Full Stack'}
              </p>
            </div>

            {/* Profile Photo if provided */}
            {personalInfo.photoUrl && (
              <div className="h-20 w-20 rounded-lg overflow-hidden border-2 border-slate-200 shadow-sm flex-shrink-0 self-center sm:self-start">
                <img 
                  src={personalInfo.photoUrl} 
                  alt="Profil" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1.5 mt-5 text-xs text-slate-600 font-sans border-t pt-4 border-slate-100">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5 min-w-0">
                <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1.5 min-w-0">
                <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Summary Block */}
        {personalInfo.summary && (
          <div className="mb-6 font-sans">
            <h2 className="text-xs uppercase tracking-widest font-extrabold pb-1.5 mb-2.5 border-b" style={{ color: themeColor, borderColor: themeColor + '30' }}>
              Profil Professionnel
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Main Content Blocks */}
        <div className="space-y-6 font-sans">
          
          {/* Work Experiences */}
          {experiences && experiences.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-extrabold pb-1.5 mb-3 border-b" style={{ color: themeColor, borderColor: themeColor + '30' }}>
                Expérience Professionnelle
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="text-xs group">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <h3 className="font-bold text-slate-900 text-sm">
                        {exp.jobTitle} <span className="text-slate-500 font-normal">| {exp.company}</span>
                      </h3>
                      <span className="text-slate-500 font-medium whitespace-nowrap text-[11px] bg-slate-50 px-2 py-0.5 rounded border border-slate-100 h-fit">
                        {exp.startDate} – {exp.current ? "Présent" : exp.endDate} {exp.city ? `(${exp.city})` : ''}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line text-justify">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educations */}
          {educations && educations.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-extrabold pb-1.5 mb-3 border-b" style={{ color: themeColor, borderColor: themeColor + '30' }}>
                Formations
              </h2>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <h3 className="font-bold text-slate-900">
                        {edu.degree} <span className="text-slate-500 font-normal">({edu.school})</span>
                      </h3>
                      <span className="text-slate-500 font-medium whitespace-nowrap text-[11px] bg-slate-50 px-2 py-0.5 rounded border border-slate-100 h-fit">
                        {edu.startDate} – {edu.current ? "Présent" : edu.endDate} {edu.city ? `(${edu.city})` : ''}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-slate-500 mt-1 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lower Grid for Skills + Languages + Interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            
            {/* Left Column: Skills */}
            {skills && skills.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest font-extrabold pb-1.5 mb-3 border-b" style={{ color: themeColor, borderColor: themeColor + '30' }}>
                  Compétences techniques
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200/60 rounded text-slate-700 text-xs font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Right Column: Languages + Interests */}
            <div className="space-y-4">
              {/* Languages */}
              {languages && languages.length > 0 && (
                <div>
                  <h2 className="text-xs uppercase tracking-widest font-extrabold pb-1.5 mb-3 border-b" style={{ color: themeColor, borderColor: themeColor + '30' }}>
                    Langues
                  </h2>
                  <div className="space-y-1.5">
                    {languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-800">{lang.name}</span>
                        <span className="text-slate-500 text-[11px] italic bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interests */}
              {interests && interests.length > 0 && (
                <div>
                  <h2 className="text-xs uppercase tracking-widest font-extrabold pb-1.5 mb-3 border-b" style={{ color: themeColor, borderColor: themeColor + '30' }}>
                    Centres d'intérêt
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {interests.map((interest, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 bg-slate-100/60 rounded text-slate-600 text-[11px] border border-slate-200/40"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* High-Contrast Print Footer */}
      <div className="text-center font-sans text-[9px] text-slate-400 mt-12 border-t pt-4 border-slate-100">
        Document généré à l'adresse officielle de recrutement • Aucun encart publicitaire
      </div>
    </div>
  );
}
