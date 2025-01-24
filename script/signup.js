async function submitForm(formData) {
  try {
    const response = await fetch("https://ecom-backend-wp2m.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: error.message };
  }
}

function handleRememberMe() {
  const email = document.getElementById("email").value;
  const rememberMe = document.querySelector('input[name="remember"]').checked;

  if (rememberMe) {
    localStorage.setItem("rememberedEmail", email);
  } else {
    localStorage.removeItem("rememberedEmail");
  }
}

function validateForm(event) {
  event.preventDefault();
  let isValid = true;

  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  // Password validation
  const password = document.getElementById("psw");
  const pswError = document.getElementById("pswError");

  if (password.value.length < 8) {
    pswError.style.display = "block";
    isValid = false;
  } else {
    pswError.style.display = "none";
  }

  // Password match validation
  const passwordRepeat = document.getElementById("psw-repeat");
  const pswRepeatError = document.getElementById("pswRepeatError");

  if (password.value !== passwordRepeat.value) {
    pswRepeatError.style.display = "block";
    isValid = false;
  } else {
    pswRepeatError.style.display = "none";
  }

  if (isValid) {
    handleRememberMe();

    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("psw").value,
    };

    submitForm(formData).then((result) => {
      if (result.success) {
        alert("Account created successfully!");
        if (localStorage.getItem("cart")) {
          window.location.href = "../pages/cart.html";
        } else {
          window.location.href = "../index.html";
        }
      } else {
        alert("Signup failed: " + result.error);
      }
    });
  }

  return isValid;
}

// Add this function to check for remembered email on page load
document.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    document.getElementById("email").value = rememberedEmail;
    document.querySelector('input[name="remember"]').checked = true;
  }
});

const onCancelClick = () => {
  window.location.href = "../index.html";
};
const onLoginClick = () => {
  window.location.href = "./login.html";
};
