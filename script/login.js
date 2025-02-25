const handleSubmit = (event) => {
  event.preventDefault();
  const loginOrderBtn = document.getElementById("login-btn");

  loginOrderBtn.innerHTML = `
    <div class="loading-spinner"></div>
  `;

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://ecom-backend-wp2m.onrender.com/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((result) => result.json())
    .then((response) => {
      if (response.isSuccess) {
        document.cookie = `access_token=${response.access_token}; expires=24 * 60 * 60 * 1000; path=/;`;

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1000);
      } else {
        alert(response.message);
      }
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

const onClickGoogleAuth = () => {
  document.cookie = "test=test";
  const cookieEnabled = document.cookie.indexOf("test") !== -1;
  if (!cookieEnabled) {
    alert("Please enable cookies to use Google authentication");
    return;
  }

  window.location.href = "https://ecom-backend-wp2m.onrender.com/auth/google";
};

const onClickInstagramAuth = () => {
  window.location.href =
    "https://ecom-backend-wp2m.onrender.com/auth/instagram";
};

const cartCounter = document.getElementById("cart-counter");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
cartCounter.textContent = cartItems.length;
cartCounter.style.display = cartItems.length > 0 ? "block" : "0";

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("https://ecom-backend-wp2m.onrender.com/auth/status", {
//       credentials: "include",
//     });
//     const data = await response.json();
//     if (data.authenticated) {
//       window.location.href = "/index.html";
//     }
//   } catch (error) {
//     console.error("Error checking auth status:", error);
//   }
// });
