import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

const Education = () => {
  const { data } = useData();
  const educationData = data.education || [];

  const EDU_COLORS = [
    { border: '#4f46e5', bg: 'rgba(79,70,229,0.1)', text: '#818cf8' },
    { border: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', text: '#a78bfa' },
    { border: '#06b6d4', bg: 'rgba(6,182,212,0.1)', text: '#67e8f9' },
  ];

  return (
    <section id="education" className="section-padding" style={{ background: '#0d0d1a' }}>
      <div className="max-w-4xl mx-auto">
        <div className="section-heading">
          <span className="section-label">Academic Background</span>
          <h2 className="section-title">
            My <span className="gradient-text">Education</span>
          </h2>
        </div>

        {educationData.length === 0 ? (
          <div className="text-center text-gray-500">No education records yet</div>
        ) : (
          <div className="space-y-6">
            {(educationData || []).map((edu, idx) => {
              const color = EDU_COLORS[idx % EDU_COLORS.length];
              return (
                <div
                  key={edu.id || idx}
                  className="glass-card rounded-2xl p-6 flex items-start gap-5"
                  style={{ borderLeft: `3px solid ${color.border}` }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: color.bg }}
                  >
                    <GraduationCap size={24} style={{ color: color.text }} />
                  </div>
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-white font-display font-bold text-lg mb-1">
                      {edu.degree}
                    </h3>
                    <p className="font-semibold mb-2" style={{ color: color.text }}>
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {edu.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {edu.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {edu.startYear} — {edu.endYear}
                      </span>
                      {edu.grade && (
                        <span className="text-green-400">Grade: {edu.grade}</span>
                      )}
                    </div>
                    {edu.description && (
                      <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
