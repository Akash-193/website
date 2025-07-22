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

// === ACTIVE MENU HIGHLIGHT ===
const navLinks = document.querySelectorAll("nav ul li a");
const currentPage = window.location.pathname.split("/").pop().split(".")[0];
navLinks.forEach(link => {
  if (link.getAttribute("href").includes(currentPage)) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// === SANITY CLIENT ===
import sanityClient from './sanityClient.js';
import blockContentToHtml from 'https://cdn.skypack.dev/@sanity/block-content-to-html';

const customSerializers = {
  marks: {
    sup: props => `<sup>${props.children.join('')}</sup>`,
    sub: props => `<sub>${props.children.join('')}</sub>`
  }
};

// === PAGE CONTENT FETCH ===
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
    displayTitle,
    body
  }`).then(data => {
    if (data) {
      if (document.getElementById(titleId) && data.title) {
        document.getElementById(titleId).innerText = data.displayTitle || data.title;
      }
      if (document.getElementById(descId) && data.body) {
        document.getElementById(descId).innerHTML = blockContentToHtml({ blocks: data.body, serializers: customSerializers });
      }
    }
  }).catch(err => {
    console.error(`Failed to load Sanity content for ${page}:`, err);
  });
}

// === PUBLICATIONS PAGE LOGIC ===
const publicationList = document.getElementById('publication-list');
if (publicationList) {
  sanityClient.fetch(`*[_type == "publication"] | order(year desc) {
    title,
    authors,
    journal,
    year,
    link,
    status,
    tags,
    summary,
    "imageUrl": highlightImage.asset->url
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
  publicationList.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'highlights-grid';

  publications.forEach(pub => {
    const itemWrapper = document.createElement('div');
    itemWrapper.dataset.tags = pub.tags ? pub.tags.join(',') : '';

    const cardHTML = `
      <div class="highlight-card">
        ${pub.imageUrl ? `
          <div class="highlight-image-container">
            <a href="${pub.link}" target="_blank" rel="noopener noreferrer">
              <img src="${pub.imageUrl}" alt="${pub.title} highlight image" />
            </a>
          </div>
        ` : ''}

        <div class="highlight-text-container">
          <h3><a href="${pub.link}" target="_blank" rel="noopener noreferrer">${pub.title}</a></h3>
          ${pub.summary ? `<div class="summary">${blockContentToHtml({ blocks: pub.summary, serializers: customSerializers })}</div>` : ''}
          <div class="authors">${pub.authors}</div>
          <a href="${pub.link}" class="journal-link" target="_blank" rel="noopener noreferrer">${pub.journal} (${pub.year})</a>
        </div>
      </div>
    `;

    itemWrapper.innerHTML = cardHTML;
    grid.appendChild(itemWrapper);
  });

  publicationList.appendChild(grid);
}

function setupFilters(publications) {
  const filterContainer = document.getElementById('filter-buttons');
  if (!filterContainer) return;

  const allTags = new Set();
  publications.forEach(pub => {
    if (pub.tags) {
      pub.tags.forEach(tag => allTags.add(tag));
    }
  });

  const allButton = document.createElement('button');
  allButton.className = 'filter-btn active';
  allButton.innerText = 'All';
  allButton.addEventListener('click', () => filterPublications('all'));
  filterContainer.appendChild(allButton);

  allTags.forEach(tag => {
    const button = document.createElement('button');
    button.className = 'filter-btn';
    button.innerText = tag;
    button.addEventListener('click', () => filterPublications(tag));
    filterContainer.appendChild(button);
  });
}

function filterPublications(tag) {
  const items = document.querySelectorAll('#publication-list .highlights-grid > div');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(button => {
    if (button.innerText.toLowerCase() === tag.toLowerCase()) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  items.forEach(item => {
    if (tag === 'all' || (item.dataset.tags && item.dataset.tags.includes(tag))) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}