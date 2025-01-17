const onViewMoreClick = () => {
  window.location.href = "../pages/products.html";
};

let ProductImg = document.getElementById("ProductImg");
let SmallImg = document.getElementsByClassName("small-img");

SmallImg[0].onclick = function () {
  ProductImg.src = SmallImg[0].src;
};
SmallImg[1].onclick = function () {
  ProductImg.src = SmallImg[1].src;
};
SmallImg[2].onclick = function () {
  ProductImg.src = SmallImg[2].src;
};
SmallImg[3].onclick = function () {
  ProductImg.src = SmallImg[3].src;
};

let MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";
function menutoggle() {
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "100%";
  } else {
    MenuItems.style.maxHeight = "0px";
  }
}

const decrementQuantity = () => {
  let quantity = parseInt(document.getElementById("quantity").innerHTML);
  if (quantity > 1) {
    quantity--;
  }
  document.getElementById("quantity").innerHTML = quantity;
};

const incrementQuantity = () => {
  let quantity = parseInt(document.getElementById("quantity").innerHTML);
  quantity++;
  document.getElementById("quantity").innerHTML = quantity;
};

const addToCart = () => {
  const quantitySize = document.getElementById("quantity").textContent;
  const currentPrice = parseInt(
    document.querySelector(".current-price").textContent.replace("₹", "")
  );
  const MRP = parseInt(
    document
      .querySelector(".mrp")
      .textContent.replace("MRP ₹", "")
      .replace(/[^\d]/g, "")
  );
  const productSize = document.querySelector(
    'input[type="radio"][name="size"]:checked'
  );

  const productTitle = document.getElementById("product-title").textContent;

  const productDescription = document.getElementById(
    "product-description"
  ).textContent;

  // Validate selected value
  if (!productSize) {
    alert("Please select a size.");
    return;
  }

  if (!quantitySize) {
    alert("Please select quantity.");
    return;
  }

  // Product object
  const productDetails = {
    name: productTitle,
    descriptions: productDescription,
    seller: "RDSTR XO Private Limited",
    price: Number(currentPrice),
    size: productSize.value,
    quantity: Number(quantitySize),
    rating: 4,
    originalPrice: Number(MRP),
  };

  // Store in localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productDetails);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to cart page
  if (cart.length > 0) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    window.location.href =
      cartItems && cartItems.length > 0
        ? "../pages/cart.html"
        : "../pages/empty-bag.html";
  } else {
    window.location.href = "../pages/empty-bag.html";
  }
};
