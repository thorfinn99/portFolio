import { Award, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import SectionState from './SectionState';

const Certificates = () => {
  const { data } = useData();
  const certs = data.certificates || [];

  const CERT_COLORS = [
    'from-yellow-500 to-orange-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-blue-500',
  ];

  return (
    <section id="certificates" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="section-heading">
          <span className="section-label">Credentials</span>
          <h2 className="section-title">
            My <span className="gradient-text">Certificates</span>
          </h2>
        </div>

        {certs.length === 0 ? (
          <SectionState
            loading={loading}
            error={error}
            empty={!loading && !error && certs?.length === 0}
          />
        ) : (
          <div className="flex overflow-x-auto pb-6 gap-5 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
             {(certs || []).map((cert, idx) => {
              const gradient = CERT_COLORS[idx % CERT_COLORS.length];
              return (
                 <div
                  key={cert.id || idx}
                  className="glass-card rounded-2xl p-5 flex flex-col flex-none w-[80vw] sm:w-auto snap-center"
                >
                  {/* Icon badge */}
                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 flex-shrink-0`}>
                    <Award size={24} className="text-white" />
                  </div>
                  {/* Content */}
                   <h3 className="text-white font-semibold text-sm leading-snug mb-2 flex-1">
                    {cert.title}
                  </h3>
                   <p className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
                    {cert.issuer}
                  </p>
                  {cert.issuedDate && (
                    <p className="text-xs text-gray-600 mb-3">
                      {new Date(cert.issuedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                       className="flex items-center gap-1 text-xs text-accent-400 hover:text-accent-300 transition-colors mt-auto"
                    >
                      <ExternalLink size={12} />
                      View Certificate
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
