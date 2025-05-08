document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await axios.post("http://localhost:5050/api/auth/login", {
        email,
        password
      });

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);

      loginMessage.textContent = "✅ Login successful! Redirecting...";
      loginMessage.style.color = "green";

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    } catch (err) {
      console.error("Login error:", err);
      loginMessage.textContent =
        err.response?.data?.message || "❌ Login failed.";
      loginMessage.style.color = "red";
    }
  });
});
