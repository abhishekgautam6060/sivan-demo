function openInsta() {
  window.open("https://www.instagram.com/sivan_jaipuri/", "_blank");
}

function openAboutUs() {
  window.location.href = "about-us.html";
}

function openTerms() {
  window.location.href = "term-condition.html";
}

function contactUs() {
  window.location.href = "contact-us.html";
}

function openShipping() {
  window.location.href = "shipping.html";
}

function goToHome() {
  window.location.href = "../index.html";
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
