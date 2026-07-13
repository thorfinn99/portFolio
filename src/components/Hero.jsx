import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero = () => {
  const { data } = useData();
  const hero = data.hero;
  const resumeUrl = data.resume?.url || '';

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingStrings = hero.typingStrings?.length ? hero.typingStrings : ['Full-Stack Developer'];

  useEffect(() => {
    const current = typingStrings[currentIndex % typingStrings.length] || '';
    let timeout;
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex(i => (i + 1) % typingStrings.length);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText === current) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, typingStrings]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden w-full max-w-[100vw]"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-96 h-96 bg-primary-500 -top-32 -left-32" style={{ animationDelay: '0s' }} />
        <div className="orb w-80 h-80 bg-accent-500 top-1/2 -right-20" style={{ animationDelay: '3s' }} />
        <div className="orb w-64 h-64 bg-indigo-600 bottom-20 left-1/4" style={{ animationDelay: '1.5s' }} />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-accent-500 border-opacity-30 bg-accent-500 bg-opacity-10 text-accent-400 max-w-full">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="break-words text-center">{hero.badgeText || DEFAULT_HERO.badgeText}</span>
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 leading-tight break-words">
          {hero.firstName || DEFAULT_HERO.firstName}{' '}
          <span className="gradient-text">{hero.lastName || DEFAULT_HERO.lastName}</span>
        </h1>

        {/* Typing effect */}
        <div className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 sm:mb-8 min-h-[2rem] break-words">
           I am a{' '}
          <span className="text-accent-400 font-semibold typing-cursor">
            {displayText}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 sm:mb-12 text-base sm:text-lg leading-relaxed break-words w-full">
          {hero.description || DEFAULT_HERO.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => scrollToSection('projects')} className="btn-gradient">
            View My Work
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn-outline">
            Get In Touch
          </button>
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Download size={16} />
              Resume
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {hero.github && (
             <a href={hero.github} target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
          )}
          {hero.email && (
            <a href={`mailto:${hero.email}`}
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          )}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
