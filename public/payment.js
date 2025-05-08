// public/payment.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to make a payment.");
    window.location.href = "/login.html";
    return;
  }

  const paymentForm = document.getElementById("paymentForm");
  const statusText = document.getElementById("paymentStatus");

  paymentForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusText.textContent = "⏳ Processing payment...";

    try {
      const res = await axios.post("http://localhost:5000/api/orders", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 201) {
        statusText.textContent = "✅ Payment successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "confirmation.html";
        }, 2000);
      } else {
        statusText.textContent = "❌ Payment failed.";
      }
    } catch (err) {
      console.error(err);
      statusText.textContent = "❌ Error processing payment.";
    }
  });
});
