// Smooth scroll per i link di navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const lines = document.querySelectorAll('.carousel-line');
let autoCarouselTimer;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    lines.forEach(line => line.classList.remove('active'));
    
    slides[n].classList.add('active');
    lines[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    resetAutoCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    resetAutoCarousel();
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
    resetAutoCarousel();
}

function autoCarousel() {
    nextSlide();
}

function resetAutoCarousel() {
    clearInterval(autoCarouselTimer);
    autoCarouselTimer = setInterval(autoCarousel, 5000);
}

// Start auto carousel
if (slides.length > 0) {
    showSlide(0);
    autoCarouselTimer = setInterval(autoCarousel, 5000);
}


// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const menuOverlay = document.querySelector('.menu-overlay');

function closeMenu() {
    navList.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}

// Chiudi menu quando clicchi su un link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Chiudi solo se il menu è aperto (in visualizzazione mobile)
        if (navList && navList.classList.contains('active')) {
            closeMenu();
        }
    });
});

// Pulsante "Esplora il Catalogo"
const explorBtn = document.querySelector('.btn-primary');
if (explorBtn) {
    explorBtn.addEventListener('click', function() {
        document.querySelector('#catalogo').scrollIntoView({ behavior: 'smooth' });
    });
}

// Form contatti
const contactForm = document.querySelector('.contatti-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validazione semplice
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            alert(`Grazie ${name}! Il tuo messaggio è stato inviato con successo.\nTi contatteremo presto a ${email}`);
            contactForm.reset();
        } else {
            alert('Per favore, compila tutti i campi.');
        }
    });
}

// Newsletter
const newsletter = document.querySelector('.newsletter');
if (newsletter) {
    const newsletterBtn = newsletter.querySelector('.btn-primary');
    const newsletterInput = newsletter.querySelector('input[type="email"]');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value;
            if (email) {
                alert(`Grazie! Ti abbiamo inviato un'email di conferma a ${email}`);
                newsletterInput.value = '';
            } else {
                alert('Per favore, inserisci la tua email.');
            }
        });
    }
}

// Animazione al scroll (fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Applica animazione ai card
document.querySelectorAll('.product-card, .collection-item, .feature, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Aggiungi l'animazione CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Indicatore di scroll (barra di progresso)
window.addEventListener('scroll', function() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / totalHeight) * 100;
    
    // Puoi usare questo per uno scroll indicator
    // document.querySelector('.scroll-indicator').style.width = scrolled + '%';
});

// Aggiungi classe active al link di navigazione corrente
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Accordeon per gli orari
function openOrariModal(event) {
    event.preventDefault();
    const modal = document.getElementById('orariModal');
    modal.classList.add('active');
}

function closeOrariModal() {
    const modal = document.getElementById('orariModal');
    modal.classList.remove('active');
}

// Chiudi il modal cliccando fuori dal contenuto
window.addEventListener('click', function(event) {
    const modal = document.getElementById('orariModal');
    if (event.target === modal) {
        closeOrariModal();
    }
});

console.log('POTI Arredamenti - Sito web caricato con successo!');
