const API = import.meta.env.VITE_API_URL || '/api';

const getToken = () => localStorage.getItem('admin_token') || '';
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
};

export const apiClient = {
  // Auth
  login: (password: string) =>
    fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).then(handleResponse),

  // Content
  getContent: () => fetch(`${API}/content`).then(handleResponse),
  updateContent: (data: object) =>
    fetch(`${API}/content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    }).then(handleResponse),

  // Projects
  getProjects: () => fetch(`${API}/projects`).then(handleResponse),
  getAllProjects: () =>
    fetch(`${API}/projects/all`, { headers: authHeaders() }).then(handleResponse),
  createProject: (formData: FormData) =>
    fetch(`${API}/projects`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    }).then(handleResponse),
  updateProject: (id: string, formData: FormData) =>
    fetch(`${API}/projects/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: formData,
    }).then(handleResponse),
  deleteProject: (id: string) =>
    fetch(`${API}/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handleResponse),

  // Education
  getEducation: () => fetch(`${API}/education`).then(handleResponse),
  getAllEducation: () =>
    fetch(`${API}/education/all`, { headers: authHeaders() }).then(handleResponse),
  createEducation: (data: object) =>
    fetch(`${API}/education`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateEducation: (id: string, data: object) =>
    fetch(`${API}/education/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    }).then(handleResponse),
  deleteEducation: (id: string) =>
    fetch(`${API}/education/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handleResponse),

  // Contact messages
  submitContact: (data: object) =>
    fetch(`${API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  getMessages: () =>
    fetch(`${API}/contact`, { headers: authHeaders() }).then(handleResponse),
  markRead: (id: string) =>
    fetch(`${API}/contact/${id}/read`, {
      method: 'PUT',
      headers: authHeaders(),
    }).then(handleResponse),
  deleteMessage: (id: string) =>
    fetch(`${API}/contact/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handleResponse),
};
