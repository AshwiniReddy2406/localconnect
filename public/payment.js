document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const statusText = document.getElementById("paymentStatus");

  paymentForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    statusText.textContent = "Processing payment...";
    statusText.style.color = "#000";

    setTimeout(() => {
      statusText.textContent = "✅ Payment successful! Thank you for your purchase.";
      statusText.style.color = "green";

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const pastOrders = JSON.parse(localStorage.getItem("pastOrders")) || [];
      const timestamp = new Date().toLocaleString();

      const newOrder = {
        items: cart,
        date: timestamp,
        status: "Confirmed"
      };

      pastOrders.push(newOrder);
      localStorage.setItem("pastOrders", JSON.stringify(pastOrders));
      localStorage.removeItem("cart");

      setTimeout(() => {
        window.location.href = "confirmation.html";
      }, 2500);
    }, 1500);
  });
});
