// public/cart.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first.");
    window.location.href = "/login.html";
    return;
  }

  const cartItemsList = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  async function loadCart() {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      renderCart(res.data.items || []);
    } catch (err) {
      cartItemsList.innerHTML = "<li>❌ Failed to load cart.</li>";
    }
  }

  function renderCart(cart) {
    cartItemsList.innerHTML = "";
    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
      return;
    }

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item;
      cartItemsList.appendChild(li);
    });
  }

  checkoutBtn?.addEventListener("click", () => {
    window.location.href = "payment.html";
  });

  clearCartBtn?.addEventListener("click", async () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      try {
        await axios.delete("http://localhost:5000/api/cart/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
        loadCart();
      } catch (err) {
        alert("❌ Failed to clear cart.");
      }
    }
  });

  loadCart();
});
