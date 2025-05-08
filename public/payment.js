document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    axios.post('http://localhost:5000/api/orders', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      document.getElementById("paymentStatus").textContent = "✅ Payment successful!";
      setTimeout(() => {
        window.location.href = "confirmation.html";
      }, 1500);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("paymentStatus").textContent = "❌ Payment failed";
    });
  });
  