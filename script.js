/* ==========================================================================
   SMARTFISH JAVASCRIPT
   Interaktivitas, Animasi Scroll, Menu Mobile, dan Galeri Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. SCROLL PROGRESS BAR & NAVBAR SCROLL EFFECT
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scrollProgressBar');

    const handleScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        // Update progress bar
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }

        // Toggle scrolled class di navbar
        if (navbar) {
            if (winScroll > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Jalankan sekali saat inisialisasi

    /* --------------------------------------------------------------------------
       2. MOBILE DRAWER MENU
       -------------------------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openDrawer = () => {
        mobileDrawer.classList.add('open');
        mobileMenuBtn.classList.add('open');
        document.body.style.overflow = 'hidden'; // Mencegah scrolling saat menu terbuka
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* --------------------------------------------------------------------------
       3. INTERSECTION OBSERVER (SCROLL REVEAL ANIMATIONS)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animasi dipicu sekali untuk performa maksimal
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback browser lawas
        revealElements.forEach(el => el.classList.add('active'));
    }

    /* --------------------------------------------------------------------------
       4. ACTIVE NAVIGATION LINK ON SCROLL (DESKTOP & MOBILE BOTTOM BAR)
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const bottomTabs = document.querySelectorAll('.bottom-tab');

    const highlightNavigation = () => {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update Desktop Navbar
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                // Update Mobile Bottom Bar
                bottomTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('data-target') === sectionId) {
                        tab.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation, { passive: true });

    /* --------------------------------------------------------------------------
       5. GALLERY LIGHTBOX MODAL
       -------------------------------------------------------------------------- */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

    const openLightbox = (imgSrc, captionText) => {
        if (!lightboxModal) return;
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = captionText || '';
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        }, 300);
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.getAttribute('data-caption') || (img ? img.getAttribute('alt') : '');
            if (img) openLightbox(img.src, caption);
        });
    });

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    // Tutup saat tombol ESC ditekan
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeDrawer();
        }
    });

    /* --------------------------------------------------------------------------
       6. CAROUSEL DOTS UPDATE ON MOBILE SWIPE
       -------------------------------------------------------------------------- */
    const galleryContainer = document.getElementById('galleryContainer');
    const dots = document.querySelectorAll('#galleryDots .dot');

    if (galleryContainer && dots.length > 0) {
        galleryContainer.addEventListener('scroll', () => {
            const itemWidth = galleryContainer.scrollWidth / dots.length;
            const activeIndex = Math.round(galleryContainer.scrollLeft / itemWidth);

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }, { passive: true });

        // Klik titik untuk navigasi cepat
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const itemWidth = galleryContainer.scrollWidth / dots.length;
                galleryContainer.scrollTo({
                    left: itemWidth * index,
                    behavior: 'smooth'
                });
            });
        });
    }

});
