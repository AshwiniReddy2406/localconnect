document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // ✅ Auto-login after registration
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        const loginData = await loginRes.json();
  
        if (loginRes.ok) {
          localStorage.setItem('token', loginData.token);
          alert("✅ Registration successful and logged in!");
          window.location.href = '/products.html';
        } else {
          alert(`❌ Registered but login failed: ${loginData.message}`);
        }
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Error during registration/login:', err);
      alert('❌ Something went wrong.');
    }
  });
  