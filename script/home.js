let MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";
function menutoggle() {
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "100%";
  } else {
    MenuItems.style.maxHeight = "0px";
  }
}

let slideIndex = 1;
let slideInterval;

showSlides(slideIndex);
startSlideshow();

function startSlideshow() {
  slideInterval = setInterval(function () {
    plusSlides(1);
  }, 3000);
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
  clearInterval(slideInterval);
  startSlideshow();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  let mybutton = document.getElementById("myBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      "https://ecom-backend-wp2m.onrender.com/is-logged-in",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "applicax`tion/json",
          access_token: accessToken,
        },
      }
    );
    const data = await response.json();

    if (data?.isValid) {
      let loginText = document.getElementById("login-text");
      loginText.innerHTML = "LOGOUT";
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
});

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function updateCartCounter() {
  const cartCounter = document.getElementById("cart-counter");
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  cartCounter.textContent = cartData.length;
  cartCounter.style.display = cartData.length > 0 ? "block" : "none";
}

updateCartCounter();

window.addEventListener("storage", updateCartCounter);
