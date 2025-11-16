/* --------------------------------------------------
   FORCE ENABLE SCROLLING ON PAGE LOAD
-------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    console.log('Scroll enabled on page load');
});

/* --------------------------------------------------
   MOBILE MENU TOGGLE
-------------------------------------------------- */
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

// Toggle mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    });
}

// Close menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

/* --------------------------------------------------
   ABOUT VIDEO CARD - HOVER TO PLAY
-------------------------------------------------- */
const aboutVideo = document.querySelector(".about-video");
const aboutVideoCard = document.querySelector(".about-video-card");

if (aboutVideo && aboutVideoCard) {
    aboutVideo.muted = true;
    
    aboutVideoCard.addEventListener("mouseenter", () => {
        aboutVideo.play().catch(err => console.log("Play error:", err));
    });
    
    aboutVideoCard.addEventListener("mouseleave", () => {
        aboutVideo.pause();
        aboutVideo.currentTime = 0;
    });
    
    // Click to play/pause with sound
    aboutVideoCard.addEventListener("click", () => {
        if (aboutVideo.paused) {
            aboutVideo.muted = false;
            aboutVideo.volume = 0.8;
            aboutVideo.play();
        } else {
            aboutVideo.pause();
        }
    });
}

/* --------------------------------------------------
   AUDIO UNLOCK FOR OTHER VIDEOS
-------------------------------------------------- */
let audioUnlocked = false;

document.addEventListener("click", () => {
    audioUnlocked = true;
}, { once: true }); // Only run once

/* --------------------------------------------------
   HOVER VIDEO PLAY FOR RECENT EDITS (WITH SOUND)
-------------------------------------------------- */
document.querySelectorAll(".recent-item video").forEach(video => {
    video.muted = true;

    video.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play().catch(err => console.log("Play error:", err));
        
        if (audioUnlocked) {
            video.muted = false;
            video.volume = 0.7;
        }
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
    });
});

/* --------------------------------------------------
   HOVER VIDEO PLAY FOR REEL SLIDER (WITH SOUND)
-------------------------------------------------- */
document.querySelectorAll(".slider video").forEach(video => {
    video.muted = true;

    video.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play().catch(err => console.log("Play error:", err));
        
        if (audioUnlocked) {
            video.muted = false;
            video.volume = 0.7;
        }
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
    });
});

/* --------------------------------------------------
   CURSOR GLOW
-------------------------------------------------- */
const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

/* --------------------------------------------------
   REVEAL ANIMATION
-------------------------------------------------- */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.05 });

revealEls.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "1s ease";
    revealObserver.observe(el);
});

/* --------------------------------------------------
   MAGNETIC BUTTONS
-------------------------------------------------- */
document.querySelectorAll(".btn, .cta-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

/* --------------------------------------------------
   3D TILT HERO TITLE
-------------------------------------------------- */
const heroTitle = document.querySelector(".main-title");

if (heroTitle) {
    document.addEventListener("mousemove", e => {
        const x = (window.innerWidth / 2 - e.clientX) / 60;
        const y = (window.innerHeight / 2 - e.clientY) / 60;
        heroTitle.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    });
}

/* --------------------------------------------------
   SMOOTH PARALLAX ENGINE
-------------------------------------------------- */
const parallaxLayers = document.querySelectorAll(".parallax-layer");

if (parallaxLayers.length > 0) {
    document.addEventListener("mousemove", e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute("data-depth");
            const moveX = x * depth * 20;
            const moveY = y * depth * 20;

            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
        });
    });
}
