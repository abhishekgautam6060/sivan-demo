function increase() {
  let qty = document.getElementById("qty");
  qty.value = parseInt(qty.value) + 1;
}

function decrease() {
  let qty = document.getElementById("qty");

  if (qty.value > 1) {
    qty.value = parseInt(qty.value) - 1;
  }
}

const images = [
  "./image/main.jpg",
  "./image/_DSC9280-4.jpg",
  "./image/aura.jpg",
  "./image/lachak.jpg",
  "./image/lachak-1.jpg",
];

function changeImage(index) {
  document.getElementById("mainImage").src = images[index];

  let dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => dot.classList.remove("active"));

  dots[index].classList.add("active");
}

function goToHome() {
  window.location.href = "../index.html";
}

function buyNow() {
  const name = document.querySelector(".product-info h2").innerText;

  const priceText = document.querySelector(".new").innerText;
  const price = parseFloat(priceText.replace("₹", "").replace(",", ""));

  const quantity = parseInt(document.getElementById("qty").value);

  const order = [
    {
      name: name,
      price: price,
      quantity: quantity,
    },
  ];

  localStorage.setItem("order", JSON.stringify(order));

  window.location.href = "../order.html";
}

function addToCart() {
  const name = document.querySelector(".product-info h2").innerText;

  const priceText = document.querySelector(".new").innerText;
  const price = parseFloat(priceText.replace("₹", "").replace(",", ""));

  const quantity = parseInt(document.getElementById("qty").value);

  let image = document.querySelector(".slider img").getAttribute("src");

  // remove "../" from path
  image = image.replace("../", "");

  console.log(image);

  const cartItem = {
    name: name,
    price: price,
    quantity: quantity,
    image: image,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex((item) => item.name === name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // 🔥 add this
  window.location.href = "../cart.html";
}

window.onload = function () {
  updateCartCount();
  updateUserUI();
};

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = 0;

  cart.forEach((item) => {
    totalQty += item.quantity;
  });

  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.innerText = totalQty;
  }
}

function goToCart() {
  window.location.href = "../cart.html";
}

function openSidebar() {
  document.getElementById("sidebar").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

function updateUserUI() {
  const email = localStorage.getItem("userEmail");

  const profileName = document.getElementById("profileName");
  const loginSection = document.getElementById("loginSection");

  if (email && email !== "null") {
    // ✅ Extract name before @
    const name = email.split("@")[0];

    profileName.innerText = name;

    loginSection.style.display = "none";
  } else {
    profileName.innerText = "Hey There!";
    loginSection.style.display = "block";
  }
}

function openProfile() {
  const email = localStorage.getItem("userEmail");

  if (!phone) {
    alert("Please login first ⚠️");
    window.location.href = "login.html";
  } else {
    window.location.href = "profile.html";
  }
}

function openOrders() {
  const email = localStorage.getItem("userEmail");

  if (!phone) {
    alert("Please login first ⚠️");
    window.location.href = "login.html";
  } else {
    window.location.href = "orders.html";
  }
}

function logout() {
  localStorage.removeItem("userEmail");
  alert("Logged out ✅");
  window.location.href = "index.html";
}

function gotToNewCollection() {
  window.location.href = "../category/cat-daftar.html";
}

function gotToBestSeller() {
  window.location.href = "../category/cat-khawab.html";
}

function gotToAllCollections() {
  window.location.href = "../category.html";
}

function openOrders() {
  window.location.href = "../UserOrders.html";
}

function goToLogin() {
  window.location.href = "../login.html";
}

const slider = document.getElementById("product-slider");
const dots = document.querySelectorAll(".dot");

slider.addEventListener("scroll", () => {
  const scrollLeft = slider.scrollLeft;
  const width = slider.clientWidth;

  const index = Math.round(scrollLeft / width);

  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[index]) {
    dots[index].classList.add("active");
  }
});

function goToSlide(index) {
  slider.scrollTo({
    left: index * slider.clientWidth,
    behavior: "smooth",
  });
}

function openAboutUs() {
  window.location.href = "../footer/about-us.html";
}

function openTerms() {
  window.location.href = "../footer/term-condition.html";
}

function contactUs() {
  window.location.href = "../footer/contact-us.html";
}

function openShipping() {
  window.location.href = "../footer/shipping.html";
}

// Promo codes

// 🎯 PROMO ENGINE (Reusable)
function calculateDiscount(price, promoCode) {
  const promoList = {
    SAVE10: 10,
    SAVE20: 20,
    SIVAN15: 15,
    MEGA50: 50,
  };

  const percent = promoList[promoCode];

  if (!percent) {
    return {
      valid: false,
      discount: 0,
      finalPrice: price,
    };
  }

  const discountAmount = (price * percent) / 100;
  const finalPrice = price - discountAmount;

  return {
    valid: true,
    discount: discountAmount,
    finalPrice: finalPrice,
    percent: percent,
  };
}

function getPriceFromUI() {
  const priceText = document.getElementById("price").innerText;

  // Remove ₹ and commas
  const cleanPrice = priceText.replace("₹", "").replace(/,/g, "");

  return parseFloat(cleanPrice);
}

let originalPrice = null;
let promoApplied = false;

function applyPromo() {
  if (promoApplied) return;

  const code = document.getElementById("promoCode").value.toUpperCase();
  const message = document.getElementById("promoMessage");

  originalPrice = getPriceFromUI(); // ✅ store once

  const result = calculateDiscount(originalPrice, code);

  if (!result.valid) {
    message.innerText = "❌ Invalid Promo Code";
    message.style.color = "red";
    return;
  }

  document.getElementById("price").innerText =
    "₹" + result.finalPrice.toFixed(2);

  message.innerText = `✅ ${result.percent}% OFF applied!`;
  message.style.color = "green";

  promoApplied = true;

  document.getElementById("applyBtn").style.display = "none";
  document.getElementById("removePromoBtn").style.display = "inline-block";
}

// ❌ REMOVE PROMO
function removePromo() {
  if (!originalPrice) return;

  document.getElementById("price").innerText = "₹" + originalPrice.toFixed(2);

  promoApplied = false;
  originalPrice = null;

  document.getElementById("promoCode").value = "";
  document.getElementById("promoMessage").innerText = "";

  document.getElementById("applyBtn").style.display = "inline-block";
  document.getElementById("removePromoBtn").style.display = "none";
}
