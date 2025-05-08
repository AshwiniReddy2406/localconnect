document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const message = document.getElementById("register-message");

  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      // Step 1: Register user
      await axios.post("http://localhost:5000/api/auth/register", { email, password });

      // Step 2: Log in immediately after registration
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // ✅ Step 3: Save token
      localStorage.setItem("token", res.data.token);

      message.textContent = "✅ Registered and logged in!";
      message.style.color = "green";

      // Step 4: Redirect to homepage
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } catch (err) {
      console.error(err);
      message.textContent = err.response?.data?.message || "❌ Registration failed.";
      message.style.color = "red";
    }
  });
});
