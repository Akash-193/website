// === SLIDER LOGIC ===
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

if (dotsContainer && slides.length > 0) {
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

    nextButton?.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    prevButton?.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            currentSlide = parseInt(e.target.getAttribute("data-index"));
            updateSlider();
        });
    });
}

// === NAV ACTIVE HIGHLIGHT ===
const navLinks = document.querySelectorAll("nav ul li a");
const currentPage = window.location.pathname.split("/").pop().split(".")[0];

navLinks.forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

// === SANITY CONTENT FETCH ===
import sanityClient from './sanityClient.js';
import blockContentToHtml from 'https://cdn.skypack.dev/@sanity/block-content-to-html';

const pageTitleMap = {
    index: "Home",
    about: "About",
    thesis: "Thesis",
    publications: "Publications",
    blog: "Blog",
    contact: "Contact"
};

const page = currentPage || "index";
const titleId = `${page}-title`;
const descId = `${page}-description`;

if (document.getElementById(descId)) {
    sanityClient.fetch(`*[_type == "content" && title == "${pageTitleMap[page]}"][0]{
        title,
        body
    }`).then(data => {
        if (data) {
            if (document.getElementById(titleId) && data.title) {
                document.getElementById(titleId).innerText = data.title;
            }
            if (document.getElementById(descId) && data.body) {
                document.getElementById(descId).innerHTML = blockContentToHtml({ blocks: data.body });
            }
        }
    }).catch(err => {
        console.error(`Failed to load Sanity content for ${page}:`, err);
    });
}
