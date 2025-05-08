// public/index.js
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  const shopContainer = document.getElementById('shops');
  const searchInput = document.getElementById('searchInput');
  const locationText = document.getElementById('location');

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        locationText.textContent = `Your location: Lat ${coords.latitude.toFixed(2)}, Lon ${coords.longitude.toFixed(2)}`;
      },
      () => {
        locationText.textContent = "Location not available.";
      }
    );
  }

  // Load products from backend
  axios.get('http://localhost:5000/api/products')
    .then(res => {
      renderProducts(res.data);
    })
    .catch(() => {
      shopContainer.innerHTML = "<p>Failed to load products.</p>";
    });

  function renderProducts(products) {
    shopContainer.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'shop-card';
      div.innerHTML = `
        <h3>${product.name}</h3>
        <img src="images/${product.image}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: cover;" />
        <p>Price: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      shopContainer.appendChild(div);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', async (e) => {
        const itemId = e.target.getAttribute('data-id');
        try {
          const res = await axios.post('http://localhost:5000/api/cart', { item: itemId }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert(`✅ ${res.data.item || "Item"} added to cart!`);
        } catch (err) {
          alert("❌ Failed to add item.");
        }
      });
    });
  }

  searchInput?.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.shop-card');
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(term) ? "block" : "none";
    });
  });
});
