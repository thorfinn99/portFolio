import { MapPin, GraduationCap, Code2, Heart } from 'lucide-react';
import { useData } from '../context/DataContext';
import jobHuntimg from '../assets/jobHunt.png';
import ghimg from '../assets/guestHouse.png';
import cineimg from '../assets/cinemania.png'
import k27 from '../assets/k27.png'
import engimg from '../assets/endlessRunner.png'

const About = () => {
  const { data } = useData();
  const aboutData = data.about;

  const [headingMain, headingHighlight] = (() => {
    const parts = (aboutData.heading || 'About').split(' about ');
    return parts.length === 2
      ? [parts[0] + ' about ', parts[1]]
      : [aboutData.heading || 'About', ''];
  })();

  const infoItems = [
    { icon: <MapPin size={18} />, label: 'Location', value: aboutData.location || 'India' },
    { icon: <GraduationCap size={18} />, label: 'Degree', value: aboutData.degree || 'B.Tech CSE' },
    { icon: <Code2 size={18} />, label: 'Focus', value: aboutData.focus || 'Full-Stack & AI' },
    { icon: <Heart size={18} />, label: 'Passion', value: aboutData.passion || 'Problem Solving' },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Profile Photo / Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 blur-2xl opacity-30 scale-110" />
              {/* Photo card */}
              <div
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl glass-card overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(139,92,246,0.2))' }}
              >
                {aboutData.photoUrl ? (
                  <img
                    src={aboutData.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-7xl mb-2 animate-float">👨‍💻</div>
                    <p className="text-accent-400 font-display font-semibold">Full-Stack Dev</p>
                  </div>
                )}
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-accent-500 opacity-60" />
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary-500 opacity-60" />
                <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-primary-500 opacity-60" />
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-accent-500 opacity-60" />
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <span className="section-label">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {headingHighlight ? (
                <>
                  {headingMain}
                  <span className="gradient-text">{headingHighlight}</span>
                </>
              ) : (
                aboutData.heading || 'About Me'
              )}
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">{aboutData.bio1 || 'Bio 1'}</p>
            <p className="text-gray-500 mb-8 leading-relaxed">{aboutData.bio2 || 'Bio 2'}</p>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 gap-4">
              {infoItems.map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <span className="text-accent-400 mt-1 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
