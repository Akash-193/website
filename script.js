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
    // Change #1: Added "displayTitle" to the query below
    sanityClient.fetch(`*[_type == "content" && title == "${pageTitleMap[page]}"][0]{
        title,
        displayTitle,
        body
    }`).then(data => {
        if (data) {
            // Change #2: Updated this logic to use "displayTitle" if it exists
            if (document.getElementById(titleId) && data.title) {
                // Use the displayTitle if it exists, otherwise fall back to the main title
                document.getElementById(titleId).innerText = data.displayTitle || data.title;
            }
            if (document.getElementById(descId) && data.body) {
                document.getElementById(descId).innerHTML = blockContentToHtml({ blocks: data.body });
            }
        }
    }).catch(err => {
        console.error(`Failed to load Sanity content for ${page}:`, err);
    });
};

// === PUBLICATIONS PAGE LOGIC ===
const publicationList = document.getElementById('publication-list');
if (publicationList) {
    // Fetch all publications from Sanity, ordered by year
    sanityClient.fetch(`*[_type == "publication"] | order(year desc) {
        title,
        authors,
        journal,
        year,
        link,
        status,
        tags
    }`).then(publications => {
        if (publications && publications.length > 0) {
            renderPublications(publications);
            setupFilters(publications);
        } else {
            publicationList.innerHTML = '<p>No publications found.</p>';
        }
    }).catch(err => {
        console.error('Failed to load publications:', err);
        publicationList.innerHTML = '<p>Failed to load publications.</p>';
    });
}

function renderPublications(publications) {
    publicationList.innerHTML = ''; // Clear the "Loading..." text
    publications.forEach(pub => {
        // Create a container for the publication item
        const item = document.createElement('div');
        item.className = 'publication-item';
        // Store tags on the element for filtering
        item.dataset.tags = pub.tags ? pub.tags.join(',') : '';

        // Generate the HTML for the publication
        item.innerHTML = `
            <p class="pub-authors">${pub.authors}.</p>
            <p class="pub-title"><a href="${pub.link}" target="_blank" rel="noopener noreferrer">${pub.title}</a></p>
            <p class="pub-journal">${pub.journal} (${pub.year})</p>
            <div class="pub-tags">
                ${pub.status ? `<span class="pub-tag status-tag">${pub.status}</span>` : ''}
                ${pub.tags ? pub.tags.map(tag => `<span class="pub-tag theme-tag">${tag}</span>`).join('') : ''}
            </div>
        `;
        publicationList.appendChild(item);
    });
}

function setupFilters(publications) {
    const filterContainer = document.getElementById('filter-buttons');
    // Get all unique tags from all publications
    const allTags = new Set();
    publications.forEach(pub => {
        if (pub.tags) {
            pub.tags.forEach(tag => allTags.add(tag));
        }
    });

    // Create a button for the "All" filter
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.innerText = 'All';
    allButton.addEventListener('click', () => filterPublications('all'));
    filterContainer.appendChild(allButton);

    // Create a button for each unique tag
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.innerText = tag;
        button.addEventListener('click', () => filterPublications(tag));
        filterContainer.appendChild(button);
    });
}

function filterPublications(tag) {
    const items = document.querySelectorAll('.publication-item');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button style
    buttons.forEach(button => {
        if (button.innerText.toLowerCase() === tag.toLowerCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Show or hide publication items based on the selected tag
    items.forEach(item => {
        if (tag === 'all' || item.dataset.tags.includes(tag)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}