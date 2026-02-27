// ─── DATA ────────────────────────────────────────────────
const expertise = [
  { num: "01", title: "Architectural Planning", desc: "Master planning and space design for residential, commercial projects." },
  { num: "02", title: "Interior Design", desc: "Luxury interiors focused on aesthetics, functionality and premium materials." },
  { num: "03", title: "Landscape Design", desc: "Harmonizing structures with nature through purposeful external environments." },
  { num: "04", title: "3D Visualization", desc: "Photorealistic renderings that bring your vision to life before construction." },
  { num: "05", title: "Real Estate Approval", desc: "Expert guidance on council regulations and Karaikal Planning Authority." },
  { num: "06", title: "Conservation", desc: "Preserving architectural heritage through expert restoration and integration." },
];

const portfolio = [
  { img: "https://lh3.googleusercontent.com/p/AF1QipNQG9bBeh_21S-Js1DJSTM7fBK-2863WTrRbJkN=s1600", title: "Office Inauguration", cat: "Commercial", height: "380px" },
  { img: "https://lh3.googleusercontent.com/p/AF1QipOXARq1eNp9aOT87iCh8UqkPsBmvZ-v2AoKfRkf=s1600", title: "Modern Dining Space", cat: "Interior", height: "560px" },
  { img: "https://lh3.googleusercontent.com/p/AF1QipMAcp3YAEKDh4EzgnvdeCMD2NLV0T7Y5v8saV05=s1600", title: "Residential Villa", cat: "Residential", height: "380px" },
  { img: "assets/modern_architecture_hero_1772208915167.png", title: "Minimalist Exterior", cat: "Residential", height: "380px" },
  { img: "assets/modern_interior_design_1772208931820.png", title: "Luxury Interior", cat: "Interior", height: "380px" },
  { img: "assets/landscape_architecture_minimalist_1772208951770.png", title: "Zen Landscape", cat: "Landscape", height: "380px" },
];

const reviews = [
  { author: "Saravanan SP", date: "2024", stars: 5, text: "Their projects and designs are marvellous. Overall a very good experience in consulting with them. I highly recommend people to try SID ARC." },
  { author: "Krishnan S", date: "2024", stars: 5, text: "Great designs and quality construction. I would definitely recommend him. 😀✌️👍" },
  { author: "Riyas Basha", date: "2023", stars: 5, text: "Much talented man with a vision ❤️" },
  { author: "Mathavi Keerthi", date: "2023", stars: 5, text: "Good quality and responsible work." },
  { author: "Mohamed Jafer", date: "2023", stars: 5, text: "Cheap and best and most reliable concern." },
];

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderExpertise();
  renderPortfolio();
  renderReviews();
  initNavScroll();
  initReveal();
  initCountUp();
});

// ─── EXPERTISE LIST ───────────────────────────────────────
function renderExpertise() {
  const list = document.getElementById('expertise-list');
  if (!list) return;
  expertise.forEach(e => {
    const item = document.createElement('div');
    item.className = 'expertise-item reveal';
    item.innerHTML = `
      <span class="expertise-num label">${e.num}</span>
      <span class="expertise-title">${e.title}</span>
      <span class="expertise-desc">${e.desc}</span>
    `;
    list.appendChild(item);
  });
}

// ─── PORTFOLIO MASONRY ────────────────────────────────────
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  grid.innerHTML = '';
  portfolio.forEach(p => {
    const item = document.createElement('div');
    item.className = 'p-item reveal';
    item.style.height = p.height;
    item.innerHTML = `
      <img class="p-img" src="${p.img}" alt="${p.title}"
           onerror="this.src='assets/modern_architecture_hero_1772208915167.png'">
      <div class="p-overlay"></div>
      <div class="p-info">
        <span class="p-title">${p.title}</span>
        <span class="p-cat">${p.cat}</span>
      </div>
    `;
    grid.appendChild(item);
  });
}

// ─── REVIEWS MARQUEE ─────────────────────────────────────
function renderReviews() {
  const track = document.getElementById('reviews-track');
  if (!track) return;

  // Duplicate for seamless loop
  const all = [...reviews, ...reviews, ...reviews];
  all.forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-top">
        <span class="review-author">${r.author}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div class="review-stars">${'★'.repeat(r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
    `;
    track.appendChild(card);
  });
}

// ─── NAVBAR SCROLL ────────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

// ─── REVEAL ON SCROLL ────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─── COUNT-UP ANIMATION ──────────────────────────────────
function initCountUp() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3); // cubic ease-out

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal || 0);
    const duration = 1800; // ms
    const start = performance.now();
    const countEl = el.querySelector('.count');
    if (!countEl) return;

    function step(now) {
      const elapsed = Math.min(now - start, duration);
      const progress = easeOut(elapsed / duration);
      const current = target * progress;
      countEl.textContent = decimal ? current.toFixed(decimal) : Math.floor(current);
      if (elapsed < duration) requestAnimationFrame(step);
      else countEl.textContent = decimal ? target.toFixed(decimal) : target;
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // slight stagger per stat
        const items = entry.target.querySelectorAll('.stat-num[data-target]');
        items.forEach((el, i) => {
          setTimeout(() => animateCounter(el), i * 150);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe the whole stats grid
  const grid = document.querySelector('.stats-grid');
  if (grid) obs.observe(grid);
}
