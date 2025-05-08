// public/profile.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first.");
    window.location.href = "/login.html";
    return;
  }

  const emailField = document.getElementById("emailField");
  const phoneField = document.getElementById("phoneField");
  const addressField = document.getElementById("addressField");

  // Load user data from backend (email only if minimal setup)
  axios.get("http://localhost:5000/api/user/me", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    const user = res.data;
    emailField.value = user.email || "";
  })
  .catch(err => {
    console.error(err);
    alert("❌ Failed to load profile.");
  });

  // Load locally saved editable fields
  phoneField.value = localStorage.getItem("userPhone") || "123-456-7890";
  addressField.value = localStorage.getItem("userAddress") || "123 Local Street, Hometown";

  window.enableEdit = function (fieldId) {
    const input = document.getElementById(fieldId);
    input.removeAttribute("readonly");
    input.focus();
  };

  window.saveProfile = function () {
    localStorage.setItem("userPhone", phoneField.value);
    localStorage.setItem("userAddress", addressField.value);
    alert("✅ Profile updated (saved locally).");
    phoneField.setAttribute("readonly", true);
    addressField.setAttribute("readonly", true);
  };
});
