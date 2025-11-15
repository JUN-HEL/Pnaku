/* --------------------------------------------------
   INTRO VIDEO LOADER (WITH SOUND - FIXED)
-------------------------------------------------- */
const introVideo = document.getElementById("intro-video");
const introLoader = document.getElementById("intro-loader");
const mainContent = document.getElementById("main-content");
const skipBtn = document.getElementById("skip-intro");
const playOverlay = document.getElementById("play-overlay");
const playBtn = document.querySelector(".play-btn");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    playOverlay.style.display = "none";
    playIntroVideo();
  });
}

// Force hide scroll during intro
document.body.style.overflow = "hidden";

// Track if intro has ended
let introEnded = false;

// Function to end intro
function endIntro() {
  if (introEnded) return; // Prevent multiple calls
  introEnded = true;
  
  introLoader.style.opacity = "0";
  introLoader.style.transition = "0.8s ease";

  setTimeout(() => {
    introLoader.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("fade-in");
    
    // Enable scrolling
    document.body.style.overflow = "auto";
  }, 800);
}

// Try to play video with sound
function playIntroVideo() {
  introVideo.muted = false; // Try unmuted first
  introVideo.volume = 0.8;
  
  introVideo.play().then(() => {
    console.log("Video playing with sound");
  }).catch(err => {
    console.log("Unmuted play failed, trying muted:", err);
    // If unmuted fails, play muted
    introVideo.muted = true;
    introVideo.play().catch(err2 => {
      console.error("Video play failed:", err2);
      // If all fails, end intro after 1 second
      setTimeout(endIntro, 1000);
    });
  });
}

// Start playing when video is ready
introVideo.addEventListener("loadeddata", () => {
  console.log("Video loaded, duration:", introVideo.duration);
  playIntroVideo();
});

// Try to play immediately if already loaded
if (introVideo.readyState >= 3) {
  playIntroVideo();
}

// End intro when video finishes
introVideo.addEventListener("ended", () => {
  console.log("Video ended");
  endIntro();
});

// Skip button
if (skipBtn) {
  skipBtn.addEventListener("click", () => {
    console.log("Skip clicked");
    endIntro();
  });
}

// Safety fallback: Force end after 8 seconds
setTimeout(() => {
  if (!introEnded) {
    console.warn("Video timeout - forcing end");
    endIntro();
  }
}, 8000);

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
    console.log("Audio unlocked for rest of site");
});

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
