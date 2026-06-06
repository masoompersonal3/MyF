import fetch from 'node-fetch';
import FormData from 'form-data';

(async () => {
  try {
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'LoveMasoom' })
    });
    const { token } = await loginRes.json();
    console.log('Token:', token);

    const projRes = await fetch('http://localhost:5000/api/projects/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const projects = await projRes.json();
    const id = projects[0]._id;

    const fd = new FormData();
    fd.append('title', 'Test Title');
    fd.append('description', 'Test Desc');

    const updateRes = await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: fd
    });

    console.log('Update res:', await updateRes.json());
  } catch (e) {
    console.error(e);
  }
})();
