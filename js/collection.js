function goToHome() {
  window.location.href = "index.html";
}

function goToProduct1() {
  window.location.href = "../product/Georgette-Glass.html";
}

function goToProduct2() {
  window.location.href = "../product/Premium-Tissue-Silk.html";
}

function goToProduct3() {
  window.location.href = "../product/Champagne gold.html";
}

function goToProduct4() {
  window.location.href = "../product/Dark-purple-Chinon.html";
}

function goToProduct5() {
  window.location.href = "../product/Mul-cotton.html";
}

function goToProduct6() {
  window.location.href = "../product/Mustard-chinon.html";
}

function goToProduct7() {
  window.location.href = "../product/rust-chinon.html";
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
  window.location.href = "cart.html";
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
  window.location.href = "category/cat-daftar.html";
}

function gotToBestSeller() {
  window.location.href = "category/cat-khawab.html";
}

function gotToAllCollections() {
  window.location.href = "category.html";
}

function openOrders() {
  window.location.href = "UserOrders.html";
}

function goToLogin() {
  window.location.href = "login.html";
}

function goToCategory1() {
  window.location.href = "category/cat-Aura.html";
}
function goToCategory2() {
  window.location.href = "category/cat-lachak.html";
}
function goToCategory3() {
  window.location.href = "category/cat-khawab.html";
}
function goToCategory4() {
  window.location.href = "category/cat-daftar.html";
}

function openInsta() {
  window.open("https://www.instagram.com/sivan_jaipuri/", "_blank");
}

function openAboutUs() {}
window.location.href = "footer/about-us.html";

function openTerms() {
  window.location.href = "footer/term-condition.html";
}

function contactUs() {
  window.location.href = "footer/contact-us.html";
}

function openShipping() {
  window.location.href = "footer/shipping.html";
}
