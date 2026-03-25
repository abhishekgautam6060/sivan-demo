async function signup() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    const response = await fetch("http://localhost:8080/api/auth/signup", {
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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/api/auth/login", {
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