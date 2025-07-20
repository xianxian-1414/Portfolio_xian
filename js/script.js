const body = document.body;

// Create star elements dynamically
const starCreate = () => {
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const r = Math.random() * 3 + 1;
    star.style.width = `${r}px`;
    star.style.height = `${r}px`;
    star.style.left = `${Math.random() * innerWidth}px`;
    star.style.top = `${Math.random() * innerHeight}px`;

    document.querySelector('.Layers_02').appendChild(star);

    // Remove star after 10 seconds
    setTimeout(() => star.remove(), 10000);
  }
};

// Spawn stars every 5 seconds
setInterval(starCreate, 5000);

// Set up canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

// Generate snow particles
const num = 100;
const snows = Array.from({ length: num }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 5 + 1
}));

// Move snow particles
const move = () => {
  snows.forEach(snow => {
    snow.x -= Math.random() * 2 + 1;
    snow.y -= Math.random() * 2 + 1;

    if (snow.x < 0) snow.x = w;
    if (snow.y < 0) snow.y = h;
  });
};

// Draw snow on canvas
const draw = () => {
  context.clearRect(0, 0, w, h);
  context.beginPath();
  context.fillStyle = 'rgb(255,255,255)';
  context.shadowColor = 'rgb(255,255,255)';
  context.shadowBlur = 10;

  snows.forEach(snow => {
    context.moveTo(snow.x, snow.y);
    context.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2);
  });

  context.fill();
  context.closePath();
  move();
};

draw();
setInterval(draw, 30);

// Hide loading screen when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".loading__wrapper", {
    duration: 0.8,
    opacity: 0,
    pointerEvents: "none",
    onComplete: () => {
      document.querySelector(".Layers").style.opacity = 1;
    },
  });
});
