const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartItems");

let total = 0;

cartContainer.innerHTML = "";

cart.forEach((item, index) => {
  total += item.price * item.quantity;

  const div = document.createElement("div");
  div.classList.add("cart-item");

  console.log(item.image);

  div.innerHTML = `
        <img src="${item.image}">

        <div class="cart-details">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <p>Qty: ${item.quantity}</p>

            <div class="cart-actions">
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="decreaseQty(${index})">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        </div>
    `;

  cartContainer.appendChild(div);
});

document.getElementById("totalAmount").innerText = total.toFixed(2);

// 🔥 FUNCTIONS

function increaseQty(index) {
  cart[index].quantity++;
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function goToOrder() {
  localStorage.setItem("order", JSON.stringify(cart));
  window.location.href = "order.html";
}

function goToHome() {
  window.location.href = "index.html";
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
  window.location.href = "category/cat-Aura.html";
}

function openOrders() {
  window.location.href = "UserOrders.html";
}

function goToLogin() {
  window.location.href = "login.html";
}
