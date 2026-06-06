const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const loginRes = await fetch('http://127.0.0.1:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'LoveMasoom' })
    });
    if (!loginRes.ok) throw new Error('Login failed: ' + await loginRes.text());
    const { token } = await loginRes.json();
    console.log('Token acquired');

    const projRes = await fetch('http://127.0.0.1:5000/api/projects/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const projects = await projRes.json();
    const id = projects[0]._id;
    console.log('Project ID:', id);

    // Create a dummy image
    const dummyPath = path.join(__dirname, 'dummy.png');
    fs.writeFileSync(dummyPath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));

    // use native FormData
    const fd = new FormData();
    fd.append('title', 'Test Title Updated');
    fd.append('description', 'Test Desc Updated');
    
    // We need to use a Blob for native fetch
    const fileBuffer = fs.readFileSync(dummyPath);
    const blob = new Blob([fileBuffer], { type: 'image/png' });
    fd.append('image', blob, 'dummy.png');

    console.log('Sending PUT request...');
    const updateRes = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`
      },
      body: fd
    });

    const updateText = await updateRes.text();
    console.log('Update res:', updateRes.status, updateText);
    
    // Check if image data is there
    const updatedProjRes = await fetch('http://127.0.0.1:5000/api/projects/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const updatedProjects = await updatedProjRes.json();
    const updatedProj = updatedProjects.find(p => p._id === id);
    console.log('Has imageData?', !!updatedProj.imageData, 'Length:', updatedProj.imageData ? updatedProj.imageData.length : 0);

  } catch (e) {
    console.error(e);
  }
})();
