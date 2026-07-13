import { Github, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import SectionState from './SectionState';

const getProjectImageUrl = (url) => {
  if (!url) return url;
  if (url.startsWith('/assets/') || url.startsWith('assets/')) {
    return `${import.meta.env.BASE_URL}${url.replace(/^\//, '')}`;
  }
  return url;
};

const Projects = () => {
  const { data } = useData();
  const projectsData = (data.projects || []).filter((project) => project.featured);

  const PROJECT_ICONS = ['🤖', '⚡', '📊', '🛠️', '🧠', '🌐'];

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="section-heading">
          <span className="section-label">My Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {projectsData.length === 0 ? (
          <SectionState
            loading={false}
            error={null}
            empty={true}
          />
        ) : (
          <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col flex-none w-[85vw] sm:w-[350px] snap-center md:w-auto"
              >
                {/* Project Image / Placeholder */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(139,92,246,0.15))',
                  }}
                >
                  {project.imageUrl ? (
                    <img
                      src={getProjectImageUrl(project.imageUrl)}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-7xl">{PROJECT_ICONS[idx % PROJECT_ICONS.length]}</span>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white bg-opacity-20 backdrop-blur flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white bg-opacity-20 backdrop-blur flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-3 break-words">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 break-words">
                    {project.description}
                  </p>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md font-medium"
                        style={{
                          background: 'rgba(79, 70, 229, 0.15)',
                          color: '#a78bfa',
                          border: '1px solid rgba(79, 70, 229, 0.25)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
