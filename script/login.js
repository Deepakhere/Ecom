const handleSubmit = (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:4000/login", {
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
        window.location.href = "../index.html";
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

  window.location.href = "http://localhost:4000/auth/google";
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:4000/auth/status", {
      credentials: "include",
    });
    const data = await response.json();
    if (data.authenticated) {
      window.location.href = "/index.html";
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
});

const onClickInstagramAuth = () => {
  window.location.href = "http://localhost:4000/auth/instagram";
};

const cartCounter = document.getElementById("cart-counter");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
cartCounter.textContent = cartItems.length;
cartCounter.style.display = cartItems.length > 0 ? "block" : "0";
