/**
 * FORCE SCROLL TO TOP ON REFRESH
 */
// 1. Zamezení prohlížeči pamatovat si pozici
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 2. Okamžitý skok nahoru (spustí se hned)
window.scrollTo(0, 0);

// 3. Pojistka při startu načítání
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Preloader & Load Event
window.addEventListener('load', () => {
    // Pro jistotu skočíme nahoru znovu po načtení DOMu
    window.scrollTo(0, 0);

    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        document.body.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

/**
 * THEME TOGGLE
 */
const themeCheckbox = document.getElementById('theme-checkbox');
const body = document.body;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-mode';
body.classList.add(savedTheme);
themeCheckbox.checked = (savedTheme === 'dark-mode');

themeCheckbox.addEventListener('change', () => {
    if (themeCheckbox.checked) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('portfolio-theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('portfolio-theme', 'light-mode');
    }
});

/**
 * STICKY HEADER & ACTIVE LINKS
 */
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

/**
 * SCROLL REVEAL (Intersection Observer)
 */
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.observe').forEach(el => observer.observe(el));

/**
 * PROJECT MODAL
 */
const projectData = {
    "1": {
        title: "Restaurant Website",
        desc: "This project is a modern restaurant website concept designed to showcase menus, gallery images and table reservations.",
        icon: "fas fa-utensils",
        github: "#",
        demo: "../restaurant-website/index.html"
    },
    "2": {
        title: "Personal Blog",
        desc: "This project is a clean and minimal blog layout designed for publishing articles and content.",
        icon: "fas fa-pen-nib",
        github: "#",
        demo: "#"
    },
    "3": {
        title: "Startup Landing Page",
        desc: "Modern landing page concept for a fictional tech startup.",
        icon: "fas fa-rocket",
        github: "#",
        demo: "#"
    }
};

const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const data = projectData[id];

        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-icon').innerHTML = `<i class="${data.icon}"></i>`;

        const btns = document.querySelectorAll('.modal-btns a');
        btns[0].href = data.demo;
        btns[1].href = data.github;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

/**
 * SCROLL TO TOP BUTTON
 */
const scrollBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
    scrollBtn.style.display = (window.scrollY > 300) ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
