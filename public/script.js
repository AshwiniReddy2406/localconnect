// script.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simulated login (replace with backend validation later)
    if (email === "user@example.com" && password === "password123") {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "index.html";
    } else {
      loginMessage.textContent = "Invalid email or password.";
      loginMessage.style.color = "red";
    }
  });
});

if (window.location.pathname.includes("index.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }

  const locationDisplay = document.getElementById("location");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        locationDisplay.textContent = `Your location: Lat ${latitude.toFixed(2)}, Lon ${longitude.toFixed(2)}`;
        loadNearbyShops();
      },
      () => {
        locationDisplay.textContent = "Location not available.";
        loadNearbyShops();
      }
    );
  } else {
    locationDisplay.textContent = "Geolocation not supported.";
  }

  const shops = [
      {
        name: "Green Grocery",
        items: [
          "Apples", "Oranges", "Bananas", "Grapes", "Mangoes", "Lettuce", "Tomatoes", "Potatoes", "Carrots", "Spinach",
          "Onions", "Garlic", "Peppers", "Cucumbers", "Cabbage", "Celery", "Broccoli", "Zucchini", "Pumpkin", "Sweet Potatoes",
          "Pineapple", "Strawberries", "Blueberries", "Papaya", "Watermelon", "Chilies", "Peas", "Radish", "Cauliflower", "Coriander"
        ]
      },
      {
        name: "Local Tech Store",
        items: [
          "Phone Charger", "Earbuds", "Power Bank", "Smartphone", "Tablet", "Laptop", "Keyboard", "Mouse", "Monitor", "USB Cable",
          "Webcam", "Router", "HDMI Cable", "Memory Card", "SSD", "Hard Drive", "Laptop Stand", "Speakers", "Microphone", "Phone Case",
          "Smartwatch", "Fitness Band", "Bluetooth Adapter", "Projector", "VR Headset", "Gaming Mouse", "Mechanical Keyboard", "Wireless Mouse", "Cooling Pad", "Graphics Card"
        ]
      },
      {
        name: "Neighborhood Hardware",
        items: [
          "Hammer", "Screwdriver", "Wrench", "Pliers", "Nails", "Screws", "Drill", "Measuring Tape", "Level", "Saw",
          "Sandpaper", "Paint Brush", "Roller", "Paint Can", "Toolbox", "Safety Glasses", "Gloves", "Utility Knife", "Wire Cutter", "Duct Tape",
          "Pipe Wrench", "Adjustable Spanner", "Stud Finder", "Clamp", "Chisel", "Ladder", "Trowel", "Masonry Drill Bit", "Allen Key Set", "Caulk Gun"
        ]
      },
      {
        name: "Community Medical Store",
        items: [
          "Paracetamol", "Ibuprofen", "Antiseptic Cream", "Band-Aids", "Thermometer", "Hand Sanitizer", "Face Mask", "Cough Syrup", "Vitamin C", "First Aid Kit",
          "Allergy Tablets", "Gauze Pads", "Medical Tape", "Antacid", "Cotton Balls", "Hydrogen Peroxide", "Pain Relief Spray", "Mosquito Repellent", "Cold Pack", "Heat Pad",
          "Inhaler", "Multivitamins", "Nasal Spray", "Glucose Powder", "Energy Drink", "Disinfectant Wipes", "Antifungal Cream", "Eye Drops", "ORSL", "BP Monitor"
        ]
      },
      {
        name: "Appliance World",
        items: [
          "Microwave", "Toaster", "Blender", "Juicer", "Coffee Maker", "Refrigerator", "Washing Machine", "Dryer", "Air Conditioner", "Heater",
          "Vacuum Cleaner", "Iron", "Water Purifier", "Ceiling Fan", "Induction Cooktop", "Mixer Grinder", "Chimney", "Dishwasher", "Hair Dryer", "Room Heater",
          "Electric Kettle", "Hand Blender", "Electric Cooker", "Water Dispenser", "Oven", "Electric Grill", "Deep Fryer", "Steamer", "Cooler", "Food Processor"
        ]
      }
    ];
    

  function loadNearbyShops(searchTerm = "") {
    const container = document.getElementById("shops");
    container.innerHTML = "";

    shops.forEach(shop => {
      const filteredItems = shop.items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredItems.length > 0) {
        const div = document.createElement("div");
        div.className = "shop-card";
        div.innerHTML = `
          <h3>${shop.name}</h3>
          <ul>
            ${filteredItems.map(item => `
              <li>
                ${item}
                <button onclick="addToCart('${item}')">Add to Cart</button>
              </li>
            `).join("")}
          </ul>
        `;
        container.appendChild(div);
      }
    });
  }

  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item} added to cart!`);
  }

  const searchInput = document.getElementById("searchInput");
  searchInput?.addEventListener("input", () => {
    const term = searchInput.value;
    loadNearbyShops(term);
  });
}
// Cart page logic
if (window.location.pathname.includes("cart.html")) {
  const cartItemsList = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
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
        renderCart();
      };
      li.appendChild(removeBtn);
      cartItemsList.appendChild(li);
    });
  }

  renderCart();

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    window.location.href = "payment.html";
  });

  clearCartBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    }
  });
}
if (window.location.pathname.includes("payment.html")) {
  const paymentForm = document.getElementById("paymentForm");
  const statusText = document.getElementById("paymentStatus");

  paymentForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    statusText.textContent = "Processing payment...";
    setTimeout(() => {
      statusText.textContent = "✅ Payment successful! Thank you for your purchase.";

      // 👉 Retrieve and store past orders
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const pastOrders = JSON.parse(localStorage.getItem("pastOrders")) || [];
      const timestamp = new Date().toLocaleString();

      const newOrder = {
        items: cart,
        date: timestamp,
      };

      pastOrders.push(newOrder);
      localStorage.setItem("pastOrders", JSON.stringify(pastOrders));

      // ✅ Clear the cart
      localStorage.removeItem("cart");

      // Optional redirect
      setTimeout(() => {
        window.location.href = "confirmation.html";
      }, 3000);
    }, 2000);
  });
}

// Order History Page Logic
if (window.location.pathname.includes("order-history.html")) {
  const orderList = document.getElementById("orderList");

  // Load order history from localStorage
  const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];

  if (orders.length === 0) {
    orderList.innerHTML = "<li>No orders found.</li>";
  } else {
    orders.forEach(order => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p>Date: ${order.date}</p>
        <p>Status: ${order.status}</p>
        <ul>
          ${order.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;
      orderList.appendChild(li);
    });
  }
}
// Order Tracking Page Logic
if (window.location.pathname.includes("order-tracking.html")) {
  const orderId = new URLSearchParams(window.location.search).get("orderId");  // Get the order ID from the URL
  const orderDetails = document.getElementById("orderDetails");
  const updateStatusBtn = document.getElementById("updateStatusBtn");

  const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
  const order = orders.find(o => o.id == orderId);

  if (order) {
    orderDetails.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p>Date: ${order.date}</p>
      <p>Status: <span id="orderStatus">${order.status}</span></p>
      <ul>
        ${order.items.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
    
    updateStatusBtn.addEventListener("click", () => {
      // Simulate status update
      order.status = "Shipped";  // You can cycle through other statuses like "Processing", "Shipped", "Delivered"
      
      // Save updated order
      const index = orders.findIndex(o => o.id == orderId);
      orders[index] = order;
      localStorage.setItem("orderHistory", JSON.stringify(orders));

      document.getElementById("orderStatus").textContent = order.status;
    });
  } else {
    orderDetails.textContent = "Order not found.";
  }
}
  // Order History Page Logic
if (window.location.pathname.includes("order-history.html")) {
  const orderList = document.getElementById("orderList");
  const orders = JSON.parse(localStorage.getItem("pastOrders")) || [];

  if (orders.length === 0) {
    orderList.innerHTML = "<li>No past orders found.</li>";
  } else {
    orders.forEach((order, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Order ${index + 1}:</strong> <br/>
        <em>${order.date}</em><br/>
        <ul>
          ${order.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;
      orderList.appendChild(li);
    });
  }
}
// Profile Page Logic
if (window.location.pathname.includes("profile.html")) {
  const emailField = document.getElementById("emailField");
  const phoneField = document.getElementById("phoneField");
  const addressField = document.getElementById("addressField");

  // Load stored values
  emailField.value = localStorage.getItem("userEmail") || "user@example.com";
  phoneField.value = localStorage.getItem("userPhone") || "123-456-7890";
  addressField.value = localStorage.getItem("userAddress") || "123 Local Street, Hometown";

  window.enableEdit = function (fieldId) {
    const input = document.getElementById(fieldId);
    input.removeAttribute("readonly");
    input.focus();
  };

  window.saveProfile = function () {
    localStorage.setItem("userEmail", emailField.value);
    localStorage.setItem("userPhone", phoneField.value);
    localStorage.setItem("userAddress", addressField.value);
    alert("✅ Profile saved successfully!");
    emailField.setAttribute("readonly", true);
    phoneField.setAttribute("readonly", true);
    addressField.setAttribute("readonly", true);
  };
}