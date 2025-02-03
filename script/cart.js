const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// function to show notification
const showNotification = (message, type = "info", duration = 2000) => {
  const container = document.getElementById("notification-container");

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Add icon based on type
  const iconSVG = getIconForType(type);
  const iconContainer = document.createElement("span");
  iconContainer.className = "notification-icon";
  iconContainer.innerHTML = iconSVG;

  // Add message
  const messageText = document.createElement("span");
  messageText.className = "notification-message";
  messageText.textContent = message;

  // Add close button
  const closeButton = document.createElement("span");
  closeButton.className = "notification-close";
  closeButton.innerHTML = "×";
  closeButton.onclick = () => {
    notification.remove();
  };

  // Assemble notification
  notification.appendChild(iconContainer);
  notification.appendChild(messageText);
  notification.appendChild(closeButton);

  // Add to container
  container.appendChild(notification);

  // Auto remove after duration
  if (duration) {
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, duration);
  }

  return notification;
};

// Helper function to get appropriate icon
const getIconForType = (type) => {
  switch (type) {
    case "success":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>`;
    case "error":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>`;
    case "warning":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>`;
    case "info":
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>`;
  }
};

// getting cart items and displaying
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

// get cookie function
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

// onclick to place order
const onPlaceOrder = async () => {
  const placeOrderBtn = document.getElementById("order-btn");

  placeOrderBtn.innerHTML = `
    <div class="loading-spinner"></div>
  `;

  try {
    const accessToken = getCookie("access_token");
    const data = await getAddressDetails(accessToken);

    if (data) {
      navigateToSection("address");
      createAddressPage(data);
    } else {
      navigateToSection("address");
    }
  } catch (error) {
    console.log(error, "geterror");
    showNotification(`Please log in to continue: ${error}`, "info");
    window.location.href = "../pages/login.html";
  }
};

const validateForm = (event) => {
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
};

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

  if (section === "addAddress") {
    const addressStep = document.getElementById("address-step");
    addressStep.classList.add("active");

    const addressContent = document.getElementById("address-content");
    addressContent.classList.add("active");

    const addressItems = document.getElementById("address-items");
    addressItems.style.display = "none";

    const checkoutContainer = document.getElementById("checkout-container");
    checkoutContainer.style.display = "block";

    // steps.forEach((step) => {
    // step.addEventListener("click", () => {
    //   // Remove active class from all steps
    //   steps.forEach((s) => s.classList.remove("active"));
    //   contents.forEach((c) => c.classList.remove("active"));

    //   // Add active class to clicked step
    //   step.classList.add("active");
    //   document
    //     .getElementById(`${step.dataset.step}-content`)
    //     .classList.add("active");
    //   });
    // });
  }
};

const getAddressDetails = async (accessToken) => {
  try {
    const response = await fetch(
      "https://ecom-backend-wp2m.onrender.com/get-address",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: accessToken,
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error("Error fetching address data:", err);
  }
};

const createAddressPage = (data) => {
  const addressItems = `<div class="price-details" id="address-items">
            <h3>${data.name}</h3>
            <div class="price-row">
              <span>${data.pincode}</span>
              <button onclick="navigateToSection("address")" class="apply-btn">EDIT</button>
            </div>

            <h3>${data.address}</h3>

            <h3>${data.city}</h3>
            <div class="price-row">
              <span>Total MRP</span>
              <span>₹2,799</span>
            </div>
            <div class="price-row">
              <span>Discount on MRP</span>
              <span class="discount">-₹2,100</span>
            </div>
            <div class="price-row">
              <span>Platform Fee</span>
              <span>FREE</span>
            </div>
            <div class="price-row">
              <span>Shipping Fee</span>
              <span>FREE</span>
            </div>
            <hr />
            <div class="price-row">
              <strong>Total Amount</strong>
              <strong>₹699</strong>
            </div>

            <button class="place-order-btn" onclick=navigateToSection("payment")>
              PLACE ORDER
            </button>
            <span>OR</span>
            <button class="place-order-btn" onclick=navigateToSection("addAddress")>
              ADD ANOTHER ADDRESS
            </button>
          </div>`;

  const newDiv = document.createElement("div");
  newDiv.classList.add("cart-container");
  newDiv.innerHTML = addressItems;

  const getAddresscontent = document.getElementById("address-content");
  const checkoutContainer = document.getElementById("checkout-container");

  checkoutContainer.style.display = "none";
  getAddresscontent.appendChild(newDiv);
};

const getPincodeDetails = async () => {
  const deliverablePincode = [
    "Ahmedabad",
    "Gandhi Nagar",
    "Dhanbad",
    "Nirsa",
    "Howrah",
  ];
  const pincode = document.getElementById("pin-code").value;

  const deliveryDaysElement = document.getElementById("delivery-days");

  deliveryDaysElement.innerHTML = `
    <div class="loading-spinner"></div> Loading...
  `;

  try {
    const response = await fetch(
      `https://india-pincode-api.p.rapidapi.com/v1/in/places/pincode?pincode=${pincode}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "india-pincode-api.p.rapidapi.com",
          "x-rapidapi-key":
            "ceb232ec46msha866c3b178a920ep1021eejsne76eca1862a6",
        },
      }
    );

    const result = await response.json();
    const pincodeList = result.result.find((pin) =>
      deliverablePincode.includes(pin.districtname)
    );

    if (pincodeList) {
      const deliveryDays =
        pincodeList.districtname === "Ahmedabad"
          ? "Deliver in 2 Days " + pincodeList.placename
          : pincodeList.districtname === "Dhanbad"
          ? "Deliver in 3 to 5 Days " + pincodeList.placename
          : "Deliver in 5 days";

      deliveryDaysElement.innerHTML = deliveryDays;
    } else {
      deliveryDaysElement.innerHTML =
        "Delivery not available for this pincode.";
    }
  } catch (error) {
    deliveryDaysElement.innerHTML = "Error fetching delivery details.";
    console.error(error);
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
// const upi = elements.create("upi");

// Mount the elements into the DOM
cardNumber.mount("#card-number-element");
cardExpiry.mount("#card-expiry-element");
cardCvc.mount("#card-cvc-element");
// upi.mount("#upi-element");

const onClickPayNow = async () => {
  const card = elements.getElement("cardNumber");
  const expiry = elements.getElement("cardExpiry");
  const cvc = elements.getElement("cardCvc");
  let getAmount = document.getElementById("total-amount").textContent;
  const customerName = document.getElementById("customer-name").value;

  const amount = Number(getAmount.split("₹").join("").replace(",", ""));

  if (!card || !expiry || !cvc || !customerName) {
    // const modal = document.getElementById("error-modal");
    // modal.style.display = "block";

    // const closeModal = document.getElementById("close-error");

    // closeModal.addEventListener("click", () => {
    //   modal.style.display = "none";
    // });

    // window.onclick = (event) => {
    //   if (event.target === modal) {
    //     modal.style.display = "none";
    //   }
    // };
    showNotification("Please fill all the fields", "info");
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
    showNotification("Payment failed. Please try again.", "error");
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
