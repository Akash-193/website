/* Updated script.js */
let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const totalSlides = slides.length;

function showSlide(index) {
    const carouselContainer = document.querySelector(".carousel-container");
    const offset = -index * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

setInterval(nextSlide, 5000);

// Highlight Active Menu Item
const links = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");

links.forEach(link => {
    if (link.dataset.page === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});
