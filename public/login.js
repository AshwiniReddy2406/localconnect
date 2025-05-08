document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // ✅ Save token to localStorage
        localStorage.setItem('token', data.token);
        alert("✅ Login successful!");
  
        // Redirect to product list
        window.location.href = '/products.html';
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Something went wrong.');
    }
  });
  