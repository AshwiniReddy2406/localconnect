document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("⚠️ Please log in to continue.");
    window.location.href = '/login.html';
    return;
  }

  axios.get('http://localhost:5000/api/products')
    .then(res => {
      const products = res.data;
      const container = document.getElementById('product-list');
      container.innerHTML = '';

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image" />
          <h3>${product.name}</h3>
          <p>Price: $${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-item="${product.name}">Add to Cart</button>
        `;
        container.appendChild(card);
      });

      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
          const item = e.target.getAttribute('data-item');
          axios.post('http://localhost:5000/api/cart', { item }, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            alert(`✅ ${item} added to cart!`);
          })
          .catch(err => {
            console.error(err);
            alert('❌ Failed to add item to cart');
          });
        });
      });
    })
    .catch(err => {
      console.error('Failed to load products:', err);
      alert('❌ Could not load products');
    });
});

// Logout handler
document.getElementById('logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  alert('👋 Logged out!');
  window.location.href = '/login.html';
});
