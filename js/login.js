const API = "https://sivan-backend-demo-production.up.railway.app";


// ✅ EMAIL VALIDATION
function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

// ✅ PHONE VALIDATION (10 digits)
function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}

// ✅ PASSWORD VALIDATION
function isValidPassword(password) {
    return password.length >= 6;
}


function validateForm() {
    

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!isValidEmail(email)) {
        alert("Enter valid Gmail address ❌");
        return false;
    }

    if (!isValidPhone(phone)) {
        alert("Phone number must be 10 digits ❌");
        return false;
    }

    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters ❌");
        return false;
    }

    return true;
}


async function signup() {

    if (!validateForm()) return;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    const response = await fetch(API + "/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, phone })
    });

    if (response.ok) {
        const result = await response.text();
        localStorage.setItem("userEmail", email);        
        alert(result);
        window.location.href = "index.html";
    } else {
        alert("Internal Issue via Signup ❌");
    }
}

async function login() {

    if (!validateForm()) return;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(API+ "/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        localStorage.setItem("userEmail", email);

        alert("Login successful ✅");

        window.location.href = "index.html";
    } else {
        alert("Invalid credentials ❌");
    }
}

function goBack() {
    window.history.back();
}

let isSignup = false;

function switchToSignup() {

    isSignup = !isSignup;

    const title = document.getElementById("formTitle");
    const phoneSection = document.getElementById("phoneSection");
    const button = document.getElementById("mainBtn");
    const toggleText = document.querySelector(".toggle-text");

    if (isSignup) {
        title.innerText = "Signup";
        phoneSection.style.display = "block";
        button.innerText = "Signup";
        toggleText.innerHTML = 'Already have account? <span onclick="switchToSignup()">Login</span>';
    } else {
        title.innerText = "Login";
        phoneSection.style.display = "none";
        button.innerText = "Login";
        toggleText.innerHTML = 'Don\'t have account? <span onclick="switchToSignup()">Signup</span>';
    }
}

function handleAction() {

    if (isSignup) {
        signup();
    } else {
        login();
    }
}