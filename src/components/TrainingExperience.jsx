import { useState } from 'react';
import { BookOpen, Briefcase, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';
import SectionState from './SectionState';

const TrainingExperience = () => {
  const { data } = useData();
  const items = data.training || [];
  
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? items : items.filter(i => i.type === filter);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="training" className="section-padding" style={{ background: '#0d0d1a' }}>
      <div className="max-w-4xl mx-auto">
        <div className="section-heading">
          <span className="section-label">My Journey</span>
          <h2 className="section-title">
            Training & <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-12">
          {['All', 'Experience', 'Training'].map((f) => (
             <button
              key={f}
              onClick={() => setFilter(f)}
               className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <SectionState
            loading={false}
            error={null}
            empty={true}
          />
        ) : (
          <div className="relative timeline-line pl-12">
            {filtered.map((item) => (
              <div key={item.id} className="relative mb-8">
                {/* Timeline dot */}
                <div className="absolute -left-8 top-5 w-5 h-5 rounded-full border-2 border-accent-500 bg-dark-900 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent-500" />
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-6">
                   <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-display font-bold text-white">{item.title}</h3>
                      <p className="text-accent-400 font-medium">{item.organization}</p>
                    </div>
                     <span className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'Experience'
                        ? 'bg-green-500 bg-opacity-20 text-green-400'
                        : 'bg-blue-500 bg-opacity-20 text-blue-400'
                    }`}>
                      {item.type === 'Experience' ? <Briefcase size={12} /> : <BookOpen size={12} />}
                      {item.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    {formatDate(item.startDate)} — {formatDate(item.endDate)}
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && items?.length > 0 && (
              <p className="text-center text-gray-500 py-8">No entries match the filter.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainingExperience;
