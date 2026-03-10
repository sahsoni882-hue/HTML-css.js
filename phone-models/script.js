// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'white';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
});

// Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const phoneCards = document.querySelectorAll('.phone-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        phoneCards.forEach(card => {
            if (filter === 'all' || card.dataset.brand === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add to Cart Animation
const addToCartBtns = document.querySelectorAll('.btn-add-cart');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const originalText = btn.textContent;
        btn.textContent = 'Added! ✓';
        btn.style.background = '#10b981';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
});

// Quick View
const quickViewBtns = document.querySelectorAll('.quick-view');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const phoneCard = btn.closest('.phone-card');
        const phoneName = phoneCard.querySelector('h3').textContent;
        const phoneBrand = phoneCard.querySelector('.brand').textContent;
        const phonePrice = phoneCard.querySelector('.price').textContent;
        
        alert('Quick View: ' + phoneBrand + ' ' + phoneName + '\nPrice: ' + phonePrice);
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
        alert('Thank you for subscribing!');
        newsletterForm.querySelector('input').value = '';
    }
});

// Category Card Click
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        const filterBtn = document.querySelector('[data-filter="' + category + '"]');
        if (filterBtn) {
            filterBtn.click();
            document.getElementById('phones').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-box input');
const searchIcon = document.querySelector('.search-box i');

searchIcon.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        phoneCards.forEach(card => {
            const phoneName = card.querySelector('h3').textContent.toLowerCase();
            const phoneBrand = card.querySelector('.brand').textContent.toLowerCase();
            
            if (phoneName.includes(searchTerm) || phoneBrand.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        filterBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
        
        document.getElementById('phones').scrollIntoView({ behavior: 'smooth' });
    }
}

// Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

phoneCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
    observer.observe(card);
});

categoryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
    observer.observe(card);
});

const featureBoxes = document.querySelectorAll('.feature-box');
featureBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'all 0.5s ease ' + (index * 0.15) + 's';
    observer.observe(box);
});

