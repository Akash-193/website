let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dotsContainer = document.querySelector(".dots");

// Create dots dynamically
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll(".dot");

dots[currentSlide].classList.add("active");

function updateSlider() {
    document.querySelector(".slider").style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
}

// Highlight active menu item
const navLinks = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop().split(".")[0];

navLinks.forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});
