const API = "https://sivan-backend-demo-production.up.railway.app";

async function loadOrders() {

    const email = localStorage.getItem("userEmail");

    if (!email) {
        alert("Please login first ⚠️");
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(API + `/api/orders/user-orders?email=${email}`);

    const orders = await response.json();
    console.log(orders);

    const container = document.getElementById("ordersList");
    const emptyState = document.getElementById("emptyState");

    container.innerHTML = "";

    // 🔥 CHECK EMPTY
    if (!orders || orders.length === 0) {
        emptyState.style.display = "block";
        return;
    } else {
        emptyState.style.display = "none";
    }

    orders.forEach(order => {

        const div = document.createElement("div");
        div.classList.add("order-card");

        let productsHTML = "";

        order.items.forEach(p => {
            productsHTML += `
                <div class="order-item">
                    <img src="${p.image}">
                    <div>
                        <p><b>${p.name}</b></p>
                        <p>₹${p.price} × ${p.quantity}</p>
                    </div>
                </div>
            `;
        });

        div.innerHTML = `
            <p><b>Order ID:</b> ${order.id}</p>
            <p><b>Total:</b> ₹${order.totalAmount}</p>
            <p><b>Payment:</b> ${order.paymentMethod}</p>
            ${productsHTML}
        `;

        container.appendChild(div);
    });
}




function goToHome() {
    window.location.href = "index.html";
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

window.onload = function () {
    updateCartCount();
    loadOrders();
    updateUserUI();
}


function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQty = 0;

    cart.forEach(item => {
        totalQty += item.quantity;
    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = totalQty;
    }
}


function logout() {
    localStorage.removeItem("userEmail");
    alert("Logged out ✅");
    window.location.href = "index.html";
}

function gotToNewCollection(){
    window.location.href = "../category/cat-daftar.html";
}

function gotToBestSeller(){
    window.location.href = "../category/cat-khawab.html";
}

function gotToAllCollections(){
    window.location.href = "../category/cat-Aura.html";
}

function openOrders(){
    window.location.href = "../UserOrders.html";
}

function goToLogin(){
    window.location.href = "../login.html";
}

