# LocalConnect 🛒

**LocalConnect** is a full-stack e-commerce platform designed to simulate local shopping. It allows users to browse items by category, manage their cart, simulate payments, view order history, and update profile info.

---

## 🌐 Live Demo

- **Frontend (AWS S3)**: _http://localconnect-frontend.s3-website.us-east-2.amazonaws.com 
- **Backend API (Elastic Beanstalk)**:http://localconnect-backend-env.eba-pszmy5hv.us-east-2.elasticbeanstalk.com/api/products
- **Database**: AWS RDS (MySQL)

---

## 📦 Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Axios
- **Backend**: Node.js, Express.js, Sequelize
- **Database**: SQLite (dev) → MySQL (AWS RDS in prod)
- **Cloud**: AWS S3 (static), Elastic Beanstalk (API), RDS (MySQL)

---

## 🚀 Features

- ✅ JWT-based user login
- ✅ Product listing by category
- ✅ Cart management (add/remove/clear)
- ✅ Payment simulation
- ✅ Order history tracking
- ✅ Editable user profile (saved in localStorage)

---

## 🔗 API Endpoints (Live)

- `POST /api/auth/login` — Authenticate user
- `GET /api/products` — Get product list
- `GET /api/cart` — Get cart items (requires token)
- `POST /api/cart` — Add item to cart
- `DELETE /api/cart/clear` — Clear user's cart

---

## 🧑‍💻 Local Development

```bash
# Clone and install backend
cd local-connect-backend
npm install
touch .env    # and add your DB + JWT config
node server.js
```

```bash
# For frontend, simply open index.html or upload to S3
```

---

## 📁 Folder Structure

```
/local-connect-frontend
  |- index.html
  |- cart.html
  |- login.html
  |- style.css
  |- script.js
  |- cart.js
  |- payment.js
  |- order-history.js
  |- profile.js
```

---

## 📌 AWS Setup Summary

- Frontend hosted on **S3** (static website enabled)
- Backend deployed using **Elastic Beanstalk**
- Database created using **RDS MySQL** (public access enabled for testing)

---

## 🛡️ Environment Variables (on Elastic Beanstalk)

```
NODE_ENV=production
JWT_SECRET=supersecretkey123
DB_NAME=localconnect
DB_USER=your_rds_user
DB_PASS=your_rds_password
DB_HOST=your-rds-hostname.rds.amazonaws.com
```

---

## 📅 Author

**Ashwini Reddy**  
Full-stack project for final deployment practice and cloud hosting.

---
