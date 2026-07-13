import { useData } from '../context/DataContext';
import SectionState from './SectionState';

const SKILL_ICONS = {
  'html5': '🌐', 'css3': '🎨', 'javascript (es6+)': '⚡', 'js': '⚡',
  'react': '⚛️', 'tailwind css': '💨', 'bootstrap': '🅱️',
  'redux toolkit': '🔄', 'material ui': '🎛️',
  'node.js': '🟢', 'express.js': '🚂', 'rest api': '🔗',
  'node mailer': '📧', 'multer': '📁', 'post man': '🧪', 'postman': '🧪',
  'mongodb': '🍃', 'mysql': '🐬', 'sql': '🗄️',
  'git': '📋', 'github': '🐙',
  'visual studio code': '💻', 'intellij idea': '🧠',
  'vercel': '▲', 'render': '🚀',
  'c': '🔵', 'c++': '🔷', 'python': '🐍', 'typescript': '🔷', 'docker': '🐳', 'aws': '☁️',
  'java': '☕',   // <-- new
};

const CATEGORY_COLORS = {
  'Languages': 'from-blue-500 to-cyan-500',
  'Frontend': 'from-violet-500 to-purple-500',
  'Backend': 'from-green-500 to-emerald-500',
  'Database': 'from-orange-500 to-amber-500',
  'Tools': 'from-pink-500 to-rose-500',
  'Deployment': 'from-teal-500 to-cyan-600',   // <-- new
  'Other': 'from-gray-500 to-slate-500',
};

const Skills = () => {
  const { data } = useData();
  const skillsData = data.skills || [];

  // Group by category
  const grouped = skillsData.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-padding" style={{ background: '#0d0d1a' }}>
      <div className="max-w-7xl mx-auto">
        <div className="section-heading">
          <span className="section-label">My Skills</span>
          <h2 className="section-title">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {skillsData.length === 0 ? (
          <SectionState
            loading={false}
            error={null}
            empty={true}
          />
        ) : (
          <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
            {Object.entries(grouped).map(([category, categorySkills]) => {
              const gradient = CATEGORY_COLORS[category] || CATEGORY_COLORS['Other'];
              return (
                <div key={category} className="glass-card rounded-2xl p-6 flex-none w-[85vw] sm:w-[350px] snap-center md:w-auto">
                  {/* Category header */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-20 text-white text-sm font-semibold mb-5`}
                    style={{ background: 'rgba(79, 70, 229, 0.15)' }}>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`} />
                    {category}
                  </div>
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => {
                      const icon = SKILL_ICONS[skill.name.toLowerCase()] || '✨';
                      return (
                        <span key={skill.id} className="skill-badge">
                          <span>{icon}</span>
                          <span>{skill.name}</span>
                        </span>
                      );
                    })}
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

export default Skills;
