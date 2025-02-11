let currentIndex = 0;
const slides = document.querySelector(".carousel-slide");
const totalSlides = slides.children.length;

function moveSlide(direction) {
    currentIndex += direction;
    
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(() => moveSlide(1), 3000);
