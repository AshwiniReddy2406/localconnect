document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in first.");
      window.location.href = '/login.html';
      return;
    }
  
    axios.get('http://localhost:5000/api/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      document.getElementById('user-email').textContent = res.data.email;
      document.getElementById('user-id').textContent = res.data.id;
    })
    .catch(err => {
      console.error(err);
      alert('❌ Failed to load profile');
      window.location.href = '/login.html';
    });
  });
  
  function logout() {
    localStorage.removeItem('token');
    alert('👋 Logged out');
    window.location.href = '/login.html';
  }
  