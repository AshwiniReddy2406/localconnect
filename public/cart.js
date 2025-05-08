document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  if (!token) {
    alert("Please log in first.");
    window.location.href = "/login.html";
    return;
  }

  const cartItemsList = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  // ✅ Load cart items from server
  async function loadCart() {
    try {
      const res = await axios.get("http://localhost:5050/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Cart loaded:", res.data);
      renderCart(res.data.items || []);
    } catch (err) {
      console.error("❌ Load cart error:", err.response?.data || err.message || err);
      alert("Cart error: " + (err.response?.data?.message || err.message || "Unknown"));
      cartItemsList.innerHTML = "<li>❌ Failed to load cart.</li>";
    }
  }

  // ✅ Render items in UI
  function renderCart(cart) {
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
      return;
    }

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.onclick = () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(cart);
      };

      li.appendChild(removeBtn);
      cartItemsList.appendChild(li);
    });
  }

  // ✅ Navigate to payment page
  checkoutBtn?.addEventListener("click", () => {
    window.location.href = "payment.html";
  });

  // ✅ Clear cart on server
  clearCartBtn?.addEventListener("click", async () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      try {
        await axios.delete("http://localhost:5050/api/cart/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
        loadCart();
      } catch (err) {
        console.error("❌ Clear cart error:", err.response?.data || err.message || err);
        alert("Failed to clear cart.");
      }
    }
  });

  // Initial load
  loadCart();
});
