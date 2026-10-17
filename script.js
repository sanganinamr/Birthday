
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");
const musicBtn = document.getElementById("musicBtn");
const birthdayMusic = document.getElementById("birthdayMusic");

// 🎁 Surprise button
surpriseBtn.addEventListener("click", function () {
    surpriseMessage.classList.toggle("hidden");

    if (!surpriseMessage.classList.contains("hidden")) {
        surpriseBtn.textContent = "💖 Hide Surprise";
        createConfetti();

        startFloatingHearts();

    } else {
        surpriseBtn.textContent = "🎁 Open Your Surprise";
    }
});

// 🎵 Music button
musicBtn.addEventListener("click", async function () {
    try {
        if (birthdayMusic.paused) {
            await birthdayMusic.play();
            musicBtn.textContent = "⏸ Pause Music";
        } else {
            birthdayMusic.pause();
            musicBtn.textContent = "🎵 Play Music";
        }
    } catch (error) {
        alert("Music file add karo: birthday.mp3");
    }
});

// 🎊 Celebration animation


const fireworksCanvas = document.getElementById("fireworks");
const fireworksCtx = fireworksCanvas.getContext("2d");

let fireworks = [];
let particles = [];

function resizeFireworks() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

resizeFireworks();
window.addEventListener("resize", resizeFireworks);

function launchFirework() {
    const w = fireworksCanvas.width;
    const h = fireworksCanvas.height;

    fireworks.push({
        x: Math.random() * w,
        y: h,
        targetY: 60 + Math.random() * h * 0.45,
        speed: 3 + Math.random() * 3,
        color: ["#ff4fc8", "#d6a5ff", "#ffffff", "#a855f7"][
            Math.floor(Math.random() * 4)
        ]
    });
}

function explode(firework) {
    for (let i = 0; i < 65; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;

        particles.push({
            x: firework.x,
            y: firework.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 50 + Math.random() * 35,
            color: firework.color,
            size: 1 + Math.random() * 2.5
        });
    }
}

function animateFireworks() {
    fireworksCtx.clearRect(
        0, 0, fireworksCanvas.width, fireworksCanvas.height
    );

    if (Math.random() < 0.07) {
        launchFirework();
    }

    fireworks.forEach((f, index) => {
        f.y -= f.speed;

        fireworksCtx.beginPath();
        fireworksCtx.arc(f.x, f.y, 3, 0, Math.PI * 2);
        fireworksCtx.fillStyle = f.color;
        fireworksCtx.shadowBlur = 15;
        fireworksCtx.shadowColor = f.color;
        fireworksCtx.fill();
        fireworksCtx.shadowBlur = 0;

        if (f.y <= f.targetY) {
            explode(f);
            fireworks.splice(index, 1);
        }
    });

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vy += 0.025;
        p.life--;

        fireworksCtx.globalAlpha = Math.min(1, p.life / 25);
        fireworksCtx.fillStyle = p.color;
        fireworksCtx.beginPath();
        fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fireworksCtx.fill();
    });

    fireworksCtx.globalAlpha = 1;

    requestAnimationFrame(animateFireworks);
}

// 🎆 Keep fireworks running continuously
animateFireworks();




function updateCountdown() {
    const now = new Date();
    let nextBirthday = new Date(
        now.getFullYear(), 9, 25, 0, 0, 0
    );

    if (now >= nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const difference = nextBirthday - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


const galleryPhotos = document.querySelectorAll(".photos .photo");
const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

galleryPhotos.forEach(function (photo) {
    photo.addEventListener("click", function () {
        modalImage.src = photo.src;
        photoModal.style.display = "flex";
    });
});

closeModal.addEventListener("click", function () {
    photoModal.style.display = "none";
    modalImage.src = "";
});

photoModal.addEventListener("click", function (event) {
    if (event.target === photoModal) {
        photoModal.style.display = "none";
        modalImage.src = "";
    }
});


function startFloatingHearts() {
    const container = document.getElementById("heartContainer");
    const hearts = ["💖", "💗", "💕", "💜", "❤️", "✨"];

    // Clear hearts left by an earlier surprise
    container.replaceChildren();

    for (let i = 0; i < 35; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = 18 + Math.random() * 25 + "px";
        heart.style.animationDelay = Math.random() * 3 + "s";
        heart.style.animationDuration = 4 + Math.random() * 3 + "s";

        container.appendChild(heart);

        heart.addEventListener("animationend", function () {
            heart.remove();
        });
    }
}


const welcomeScreen = document.getElementById("welcomeScreen");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function () {
    welcomeScreen.classList.add("hide-welcome");

    // Start the birthday celebration
    if (typeof createConfetti === "function") {
        createConfetti();
    }

    if (typeof startFloatingHearts === "function") {
        startFloatingHearts();
    }
});

