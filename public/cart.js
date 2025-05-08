document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Please log in first.');
      window.location.href = '/login.html';
      return;
    }
  
    axios.get('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const cartList = document.getElementById('cart-items');
      cartList.innerHTML = '';
      const items = response.data.items;
  
      if (!items.length) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
        return;
      }
  
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartList.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      alert('❌ Failed to load cart');
    });
  
    // Clear cart
    document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
      if (!confirm('Clear all items from cart?')) return;
  
      axios.delete('http://localhost:5000/api/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert('🗑️ Cart cleared!');
        location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('❌ Failed to clear cart');
      });
    });
  });
  