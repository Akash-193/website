let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

// Create dots
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

nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        currentSlide = parseInt(e.target.getAttribute("data-index"));
        updateSlider();
    });
});

// Function to highlight the active navigation link
function highlightActiveMenu() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop().split(".")[0] || "index";

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentPage)) {
            link.classList.add("active");
        }
    });
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", highlightActiveMenu);

