import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

// Attach auth token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// About
export const aboutApi = {
  get: () => api.get('/about').then(r => r.data.data),
  update: (data) => api.put('/about', data).then(r => r.data.data),
  uploadPhoto: (base64) => api.post('/about/photo', { photo: base64 }).then(r => r.data.data),
};

// Hero
export const heroApi = {
  get: () => api.get('/hero').then(r => r.data.data),
  update: (data) => api.put('/hero', data).then(r => r.data.data),
};

// Skills
export const skillsApi = {
  getAll: () => api.get('/skills').then(r => r.data.data),
  add: (data) => api.post('/skills', data).then(r => r.data.data),
  update: (id, data) => api.put(`/skills/${id}`, data).then(r => r.data.data),
  remove: (id) => api.delete(`/skills/${id}`).then(r => r.data),
};

// Projects
export const projectsApi = {
  getAll: () => api.get('/projects').then(r => r.data.data),
  add: (data) => api.post('/projects', data).then(r => r.data.data),
  update: (id, data) => api.put(`/projects/${id}`, data).then(r => r.data.data),
  remove: (id) => api.delete(`/projects/${id}`).then(r => r.data),
};

// Training & Experience
export const trainingApi = {
  getAll: () => api.get('/training').then(r => r.data.data),
  add: (data) => api.post('/training', data).then(r => r.data.data),
  update: (id, data) => api.put(`/training/${id}`, data).then(r => r.data.data),
  remove: (id) => api.delete(`/training/${id}`).then(r => r.data),
};

// Certificates
export const certificatesApi = {
  getAll: () => api.get('/certificates').then(r => r.data.data),
  add: (data) => api.post('/certificates', data).then(r => r.data.data),
  update: (id, data) => api.put(`/certificates/${id}`, data).then(r => r.data.data),
  remove: (id) => api.delete(`/certificates/${id}`).then(r => r.data),
};

// Education
export const educationApi = {
  getAll: () => api.get('/education').then(r => r.data.data),
  add: (data) => api.post('/education', data).then(r => r.data.data),
  update: (id, data) => api.put(`/education/${id}`, data).then(r => r.data.data),
  remove: (id) => api.delete(`/education/${id}`).then(r => r.data),
};

// Contact
export const contactApi = {
  get: () => api.get('/contact').then(r => r.data.data),
  update: (data) => api.put('/contact', data).then(r => r.data.data),
  sendMessage: (data) => api.post('/contact/message', data).then(r => r.data),
};

// Resume
export const resumeApi = {
  get: () => api.get('/resume').then(r => r.data.data),
  update: (data) => api.put('/resume', data).then(r => r.data.data),
};

export default api;
