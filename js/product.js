function increase() {
    let qty = document.getElementById("qty");
    qty.value = parseInt(qty.value) + 1;
};

function decrease() {
    let qty = document.getElementById("qty");

    if (qty.value > 1) {
        qty.value = parseInt(qty.value) - 1;
    }
};

const images = [
    "./image/main.jpg",
    "./image/_DSC9280-4.jpg",
    "./image/aura.jpg",
    "./image/lachak.jpg",
    "./image/lachak-1.jpg"
];

function changeImage(index) {

    document.getElementById("mainImage").src = images[index];

    let dots = document.querySelectorAll(".dot");

    dots.forEach(dot => dot.classList.remove("active"));

    dots[index].classList.add("active");

}


let currentSlide = 0;

const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".dot");

function goToSlide(index) {

    currentSlide = index;

    slider.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

}

function goToHome(){
    window.location.href = "index.html";
}
