const API = "https://sivan-backend-demo-production.up.railway.app";

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("orderItems");

// ✅ PHONE (10 digits)
function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

// ✅ PINCODE (6 digits)
function isValidPincode(pincode) {
  return /^[0-9]{6}$/.test(pincode);
}

function validateCustomerDetails() {
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const state = document.getElementById("state").value.trim();
  const area = document.getElementById("area").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  if (!isValidPhone(phone)) {
    alert("Phone must be 10 digits ❌");
    return false;
  }

  if (address.length < 5) {
    alert("Enter proper address ❌");
    return false;
  }

  if (state.length < 4) {
    alert("Enter valid state ❌");
    return false;
  }
  if (area.length < 4) {
    alert("Enter valid Local Area ❌");
    return false;
  }

  if (!isValidPincode(pincode)) {
    alert("Pincode must be 6 digits ❌");
    return false;
  }

  return true;
}

let total = 0;
cart.forEach((item) => {
  total += item.price * item.quantity;

  const div = document.createElement("div");
  div.classList.add("order-item");

  div.innerHTML = `
        <img src="${item.image}">
        <div>
            <p><b>${item.name}</b></p>
            <p>₹${item.price} × ${item.quantity}</p>
        </div>
    `;

  container.appendChild(div);
});

document.getElementById("totalAmount").innerText = total.toFixed(2);

async function placeOrder() {
  if (!validateCustomerDetails()) return; // 🔥 STOP if invalid

  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  const orderData = {
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    area: document.getElementById("area").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value,
    products: cart,
    paymentMethod: paymentMethod,
  };

  // 🟡 COD FLOW
  if (paymentMethod === "cod") {
    await fetch(API + "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    alert("Order placed successfully (COD) ✅");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
    return;
  }

  // 🔵 ONLINE PAYMENT FLOW

  // 1. Create Razorpay order
  const res = await fetch(API + "/api/orders/create-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: total }),
  });

  const data = await res.json();

  const options = {
    key: "rzp_test_SVYcmrkOmNmKFK",
    amount: data.amount,
    currency: "INR",
    name: "SIVAN Store",
    description: "Order Payment",
    order_id: data.id,

    handler: async function (response) {
      console.log("Payment Success:", response);

      // Save order after payment success
      await fetch(API + "/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      alert("Payment Successful 🎉");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    },

    prefill: {
      email: orderData.email,
      contact: orderData.phone,
    },

    theme: {
      color: "#5a5048",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
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

function goToCart() {
  window.location.href = "cart.html";
}

function goToHome() {
  window.location.href = "index.html";
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

window.onload = function () {
  updateCartCount();
  updateUserUI();

  const email = localStorage.getItem("userEmail");

  console.log("User Email:", email); // Debugging line to check the email value

  const emailInput = document.getElementById("email");

  if (email) {
    emailInput.value = email;

    // 🔥 LOCK FIELD
    emailInput.readOnly = true;
    emailInput.style.background = "#eee";
  } else {
    emailInput.readOnly = false;
  }
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
