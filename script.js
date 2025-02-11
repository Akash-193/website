document.addEventListener("DOMContentLoaded", function() {
    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function updateSlider() {
        document.querySelector(".slider").style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    prevButton.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Navigation highlighting
    let path = window.location.pathname;
    let page = path.split("/").pop().split(".")[0]; 
    document.getElementById(page)?.classList.add("active");
});
