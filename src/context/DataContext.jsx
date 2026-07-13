import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultData } from '../data/sampleData';

const STORAGE_KEY = 'portfolioData';
const STORAGE_VERSION_KEY = 'portfolioDataVersion';
const STORAGE_VERSION = 2;

const DataContext = createContext();

const mergeArrayById = (defaultArray = [], savedArray = []) => {
  if (!savedArray || savedArray.length === 0) return defaultArray;

  const savedById = new Map((savedArray || []).map(item => [item.id, item]));

  return defaultArray.map(defaultItem => {
    const savedItem = savedById.get(defaultItem.id);
    const mergedItem = {
      ...defaultItem,
      ...(savedItem || {}),
    };

    if (defaultItem.imageUrl && typeof savedItem?.imageUrl === 'string') {
      mergedItem.imageUrl = defaultItem.imageUrl;
    }

    return mergedItem;
  }).concat(
    (savedArray || []).filter(savedItem => !defaultArray.some(defaultItem => defaultItem.id === savedItem.id))
  );
};

const mergeSavedData = (savedData) => {
  if (!savedData) return defaultData;

  return {
    ...defaultData,
    ...savedData,
    skills: mergeArrayById(defaultData.skills, savedData.skills),
    projects: mergeArrayById(defaultData.projects, savedData.projects),
    training: mergeArrayById(defaultData.training, savedData.training),
    certificates: mergeArrayById(defaultData.certificates, savedData.certificates),
    education: mergeArrayById(defaultData.education, savedData.education),
    resume: {
      ...defaultData.resume,
      ...savedData.resume,
    },
    contact: {
      ...defaultData.contact,
      ...savedData.contact,
    },
    footer: {
      ...defaultData.footer,
      ...savedData.footer,
    },
    about: {
      ...defaultData.about,
      ...savedData.about,
    },
    hero: {
      ...defaultData.hero,
      ...savedData.hero,
    },
  };
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved || Number(savedVersion) !== STORAGE_VERSION) {
        return defaultData;
      }

      return mergeSavedData(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load saved data:', e);
      return defaultData;
    }
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(STORAGE_VERSION_KEY, String(STORAGE_VERSION));
    } catch (e) {
      console.error('Failed to save data:', e);
    }
  }, [data]);

  // Update entire section
  const updateSection = (section, newData) => {
    setData(prev => ({
      ...prev,
      [section]: newData,
    }));
  };

  // Update hero
  const updateHero = (heroData) => {
    updateSection('hero', heroData);
  };

  // Update about
  const updateAbout = (aboutData) => {
    updateSection('about', aboutData);
  };

  // Update skills
  const updateSkills = (skillsData) => {
    updateSection('skills', skillsData);
  };

  const addSkill = (skill) => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), ...skill }],
    }));
  };

  const deleteSkill = (id) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  };

  const updateSkill = (id, updates) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s),
    }));
  };

  // Update projects
  const updateProjects = (projectsData) => {
    updateSection('projects', projectsData);
  };

  const addProject = (project) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now().toString(), ...project }],
    }));
  };

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const updateProject = (id, updates) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p),
    }));
  };

  // Update training
  const updateTraining = (trainingData) => {
    updateSection('training', trainingData);
  };

  const addTraining = (training) => {
    setData(prev => ({
      ...prev,
      training: [...prev.training, { id: Date.now().toString(), ...training }],
    }));
  };

  const deleteTraining = (id) => {
    setData(prev => ({
      ...prev,
      training: prev.training.filter(t => t.id !== id),
    }));
  };

  const updateTrainingItem = (id, updates) => {
    setData(prev => ({
      ...prev,
      training: prev.training.map(t => t.id === id ? { ...t, ...updates } : t),
    }));
  };

  // Update certificates
  const updateCertificates = (certificatesData) => {
    updateSection('certificates', certificatesData);
  };

  const addCertificate = (certificate) => {
    setData(prev => ({
      ...prev,
      certificates: [...prev.certificates, { id: Date.now().toString(), ...certificate }],
    }));
  };

  const deleteCertificate = (id) => {
    setData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c.id !== id),
    }));
  };

  const updateCertificate = (id, updates) => {
    setData(prev => ({
      ...prev,
      certificates: prev.certificates.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
  };

  // Update education
  const updateEducation = (educationData) => {
    updateSection('education', educationData);
  };

  const addEducation = (education) => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), ...education }],
    }));
  };

  const deleteEducation = (id) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }));
  };

  const updateEducationItem = (id, updates) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...updates } : e),
    }));
  };

  // Update resume
  const updateResume = (resumeData) => {
    updateSection('resume', resumeData);
  };

  // Update contact
  const updateContact = (contactData) => {
    updateSection('contact', contactData);
  };

  // Update footer
  const updateFooter = (footerData) => {
    updateSection('footer', footerData);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setData(defaultData);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updateHero,
        updateAbout,
        updateSkills,
        addSkill,
        deleteSkill,
        updateSkill,
        updateProjects,
        addProject,
        deleteProject,
        updateProject,
        updateTraining,
        addTraining,
        deleteTraining,
        updateTrainingItem,
        updateCertificates,
        addCertificate,
        deleteCertificate,
        updateCertificate,
        updateEducation,
        addEducation,
        deleteEducation,
        updateEducationItem,
        updateResume,
        updateContact,
        updateFooter,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
