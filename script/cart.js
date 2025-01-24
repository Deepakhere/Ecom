const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

if (cartItems.length === 0) {
  window.location.href = "../pages/empty-bag.html";
} else {
  const cartCounter = document.getElementById("cart-counter");
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  cartCounter.textContent = wishlistItems.length;
  cartCounter.style.display = wishlistItems.length > 0 ? "block" : "0";

  cartItems.forEach((item) => {
    const discountPercentage =
      ((item.originalPrice - item.price) / item.originalPrice) * 100;
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="product-image">
        <div class="product-details">
            <h3 id="product-title">${item.name}</h3>
            <p id="product-description">${item.descriptions}</p>
            <p>Sold by: ${item.seller}</p>
            <div class="size-qty">
                <span id="size-select">Size: ${item.size}</span>
                <span id="quantity-select">Qty: ${item.quantity}</span>
            </div>
            <p class="return-tag">14 days return available</p>
        </div>
        <div class="price">
            <p class="current-price">₹${item.price}</p>
            <p class="mrp">₹${item.originalPrice}</p>
            <p class="discount">${discountPercentage.toFixed()}% OFF</p>
        </div>
        <div class="remove-btn">×</div>
    `;
    document.getElementById("product-details").appendChild(productCard);

    const removeBtn = productCard.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      cartItems.splice(cartItems.indexOf(item), 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      productCard.remove();
    });
  });
}

// Size modal created iife
(() => {
  const sizeModal = document.createElement("div");
  sizeModal.id = "product-size-modal";
  sizeModal.classList.add("product-container");
  sizeModal.innerHTML = `
   <button class="close-btn" id="close-size-modal">×</button>
   
   <div class="product-header">
   <img
      src="shoe-image.jpg"
      alt="Grey Walking Shoes"
      class="product-image"
    />
    <div class="product-info">
      <h3>HRX by Hrithik Roshan</h3>
      <p>Unisex Grey Woven Design Walking Shoes</p>
      <div class="price-container">
        <span class="current-price">₹699</span>
        <span class="original-price">₹2,799</span>
        <span class="discount">75% OFF</span>
      </div>
    </div>
    </div>

  <div class="size-selector">
    <h4>Select Size</h4>
    <div class="size-options">
      <button class="size-option">3</button>
      <button class="size-option">4</button>
      <button class="size-option">5</button>
      <button class="size-option">6</button>
      <button class="size-option disabled">7</button>
    </div>
  </div>

  <div class="seller-info">Seller: XO Footwear Private Limited</div>

  <button class="done-btn">DONE</button>
`;

  document.getElementById("size-modal-container").appendChild(sizeModal);
  sizeModal.style.display = "none";

  document.getElementById("size-select").addEventListener("click", () => {
    sizeModal.style.display = "block";
  });

  const closeModal = document.getElementById("close-size-modal");
  closeModal.onclick = () => {
    sizeModal.style.display = "none";
  };
})();

// Size selection functionality
// const sizeOptions = document.querySelectorAll(".size-option:not(.disabled)");

// sizeOptions.forEach((option) => {
//   option.addEventListener("click", () => {
//     // Remove selected class from all options
//     sizeOptions.forEach((opt) => opt.classList.remove("selected"));
//     // Add selected class to clicked option
//     option.classList.add("selected");
//   });
// });

// // Close button functionality
// const closeBtn = document.querySelector(".close-btn");
// closeBtn.addEventListener("click", () => {
//   document.querySelector(".product-container").style.display = "none";
// });

// // Done button functionality
// const doneBtn = document.querySelector(".done-btn");
// doneBtn.addEventListener("click", () => {
//   const selectedSize = document.querySelector(".size-option.selected");
//   if (selectedSize) {
//     alert(`Selected size: ${selectedSize.textContent}`);
//   } else {
//     alert("Please select a size");
//   }
// });

const checkUserLoggedIn = async () => {
  try {
    const response = await fetch(
      "https://ecom-backend-wp2m.onrender.com/is-logged-in",
      {
        method: "GET",
        credentials: "include", // Crucial
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("Login Check Response:", data);

    if (data.isValid) {
      navigateToSection("address");
    } else {
      alert("Please log in to continue.");
      window.location.href = "../pages/login.html";
    }
  } catch (error) {
    console.error("Authentication Check Error:", error);
    alert("Authentication failed");
  }
};

function validateForm(event) {
  event.preventDefault();
  let isValid = true;
  console.log(event, "check");
  // Reset previous errors
  document.querySelectorAll(".form-input").forEach((input) => {
    input.classList.remove("error");
    // input.nextElementSibling.style.display = "none";
  });

  // Name validation
  const name = document.getElementById("name");
  if (!name.value.trim() || name.value.length < 3) {
    name.classList.add("error");
    name.nextElementSibling.style.display = "block";
    isValid = false;
  }

  // Mobile validation
  const mobile = document.getElementById("mobile");
  if (!/^[0-9]{10}$/.test(mobile.value)) {
    mobile.classList.add("error");
    mobile.nextElementSibling.style.display = "block";
    isValid = false;
  }

  // Pincode validation
  const pincode = document.getElementById("pincode");
  if (!/^[0-9]{6}$/.test(pincode.value)) {
    pincode.classList.add("error");
    pincode.nextElementSibling.style.display = "block";
    isValid = false;
  }

  // Address validation
  const address = document.getElementById("address");
  if (!address.value.trim() || address.value.length < 10) {
    address.classList.add("error");
    address.nextElementSibling.style.display = "block";
    isValid = false;
  }

  // City validation
  const city = document.getElementById("city");
  if (!city.value.trim()) {
    city.classList.add("error");
    city.nextElementSibling.style.display = "block";
    isValid = false;
  }

  // State validation
  const state = document.getElementById("state");
  if (!state.value.trim()) {
    state.classList.add("error");
    state.nextElementSibling.style.display = "block";
    isValid = false;
  }

  if (isValid) {
    // Create address object
    const addressData = {
      name: name.value,
      mobile: mobile.value,
      pincode: pincode.value,
      address: address.value,
      locality: document.getElementById("locality").value,
      city: city.value,
      state: state.value,
      addressType: document.querySelector('input[name="addressType"]:checked')
        .value,
    };

    // Save to localStorage
    const addresses = JSON.parse(localStorage.getItem("addresses") || "[]");
    addresses.push(addressData);
    localStorage.setItem("addresses", JSON.stringify(addresses));

    onSaveAndContinueToPay();
  }

  return isValid;
}

const onSaveAndContinueToPay = async () => {
  try {
    const response = await fetch(
      "https://ecom-backend-wp2m.onrender.com/is-logged-in",
      {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data?.isValid) {
      onSaveAddress();
    } else {
      alert("Please log in to continue.");
      window.location.href = "../pages/login.html";
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
    alert("An error occurred while checking login status. Please try again.");
  }
};

const onSaveAddress = async () => {
  const formData = new FormData(document.getElementById("addressForm"));
  console.log(formData, "form");
  try {
    const response = await fetch(
      "https://ecom-backend-wp2m.onrender.com/save-address",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          mobile: formData.get("mobile"),
          pincode: formData.get("pincode"),
          address: formData.get("address"),
          locality: formData.get("locality"),
          city: formData.get("city"),
          state: formData.get("state"),
          addressType: formData.get("addressType"),
        }),
      }
    );

    const data = await response.json();
    if (data?.isSuccess) {
      alert("Address saved successfully!");
      navigateToSection("payment");
      document.getElementById("addressForm").reset();
    } else {
      alert(data?.message);
    }
  } catch (error) {
    console.error("Error saving address:", error);
    alert("An error occurred while saving the address. Please try again.");
  }
};

const navigateToSection = (section) => {
  const steps = document.querySelectorAll(".step");
  const contents = document.querySelectorAll(".step-content");

  steps.forEach((step) => step.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  const targetStep = document.querySelector(`.step[data-step="${section}"]`);
  const targetContent = document.getElementById(`${section}-content`);

  if (targetStep && targetContent) {
    targetStep.classList.add("active");
    targetContent.classList.add("active");
  }

  if (section === "address") {
    steps.forEach((step) => {
      step.addEventListener("click", () => {
        // Remove active class from all steps
        steps.forEach((s) => s.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        // Add active class to clicked step
        step.classList.add("active");
        document
          .getElementById(`${step.dataset.step}-content`)
          .classList.add("active");
      });
    });
  }
};

document.querySelectorAll(".payment-method").forEach((method) => {
  method.querySelector(".payment-header").addEventListener("click", () => {
    document.querySelectorAll(".payment-method").forEach((m) => {
      m.classList.remove("active");
    });

    method.classList.add("active");
  });
});

const stripe = Stripe(
  "pk_test_51Q0HZjP0cdOaQnu77jYI6edB3CsxdBL460m7ypG1cWef2A5Wo82IdIf4jECBOmm3l8IV8OfwY9wWxYDbXNaVWj1300fMjzO8pQ"
);
const elements = stripe.elements();

// Create individual card elements
const cardNumber = elements.create("cardNumber");
const cardExpiry = elements.create("cardExpiry");
const cardCvc = elements.create("cardCvc");
const upi = elements.create("upi");

// Mount the elements into the DOM
cardNumber.mount("#card-number-element");
cardExpiry.mount("#card-expiry-element");
cardCvc.mount("#card-cvc-element");
upi.mount("#upi-element");

const onClickPayNow = async () => {
  const card = elements.getElement("cardNumber");
  const expiry = elements.getElement("cardExpiry");
  const cvc = elements.getElement("cardCvc");
  let getAmount = document.getElementById("total-amount").textContent;
  const customerName = document.getElementById("customer-name").value;

  const amount = Number(getAmount.split("₹").join("").replace(",", ""));
  console.log(card, expiry, cvc, amount, customerName);
  if (!card || !expiry || !cvc || !customerName) {
    const modal = document.getElementById("error-modal");
    modal.style.display = "block";

    const closeModal = document.getElementById("close-error");

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
    return;
  }

  try {
    const response = await fetch(
      "https://ecom-backend-wp2m.onrender.com/create-payment-intent",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }),
      }
    );

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: customerName,
          },
        },
      }
    );

    if (error) {
      document.getElementById("card-errors").textContent = error.message;
    } else if (paymentIntent.status === "succeeded") {
      const modal = document.getElementById("success-modal");
      modal.style.display = "block";

      const closeModal = document.getElementById("close-modal");
      closeModal.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
    }
  } catch (err) {
    console.error("Error during payment:", err);
    alert("Payment failed. Please try again.");
  }
};

// const modal = document.getElementById("upiModal");
// const upiImg = document.getElementById("upiImg");
// const upiTitle = document.getElementById("upiTitle");
// const upiField = document.getElementById("upiField");

// document.querySelectorAll(".upi-option").forEach((option) => {
//   option.addEventListener("click", () => {
//     const upiName = option.getAttribute("data-upi");
//     const upiImage = option.getAttribute("data-img");
//     upiImg.src = upiImage;
//     upiTitle.textContent = upiName;
//     upiField.value = "";
//     modal.style.display = "flex";
//   });
// });

// function closeModal() {
//   modal.style.display = "none";
// }
