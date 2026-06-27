// ─── FAFX SHARED JS ───

// Nav active link
(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Toast utility
function showToast(msg, duration = 4000) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// Form validation utility
function validateForm(formEl) {
  let valid = true;
  formEl.querySelectorAll('[required]').forEach(field => {
    const err = field.parentElement.querySelector('.form-error');
    if (!field.value.trim()) {
      field.classList.add('error');
      if (err) err.style.display = 'block';
      valid = false;
    } else {
      field.classList.remove('error');
      if (err) err.style.display = 'none';
    }
  });
  // Email check
  const email = formEl.querySelector('input[type="email"]');
  if (email && email.value && !/\S+@\S+\.\S+/.test(email.value)) {
    email.classList.add('error');
    const err = email.parentElement.querySelector('.form-error');
    if (err) { err.textContent = 'Enter a valid email address'; err.style.display = 'block'; }
    valid = false;
  }
  return valid;
}

// Ticker (shared)
function buildTicker() {
  const pairs = [
    { name: 'XAUUSD', price: '2,338.40', change: '+0.42%', up: true },
    { name: 'EURUSD', price: '1.0821', change: '-0.18%', up: false },
    { name: 'GBPUSD', price: '1.2714', change: '+0.09%', up: true },
    { name: 'USDJPY', price: '157.42', change: '-0.21%', up: false },
    { name: 'BTCUSDT', price: '67,820', change: '+1.13%', up: true },
    { name: 'NZDUSD', price: '0.6103', change: '+0.05%', up: true },
    { name: 'USDCAD', price: '1.3641', change: '-0.07%', up: false },
    { name: 'AUDUSD', price: '0.6589', change: '+0.11%', up: true },
  ];
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  const html = [...pairs, ...pairs].map(p =>
    `<span class="ticker-item">${p.name} &nbsp;<span class="${p.up ? 'up' : 'dn'}">${p.up ? '▲' : '▼'} ${p.price} ${p.change}</span></span>`
  ).join('');
  track.innerHTML = html;
}
buildTicker();

// Float buttons
function buildFloat() {
  const el = document.createElement('div');
  el.className = 'float-btns';
  // UPDATE THESE with your real WhatsApp number and Telegram username
  el.innerHTML = `
    <a href="https://wa.me/+2348027193022?text=Hi%20FAFX%2C%20I%20want%20to%20learn%20trading" target="_blank" class="float-btn float-wa" title="WhatsApp">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <span class="float-tooltip">Chat on WhatsApp</span>
    </a>
    <a href="https://t.me/FAFX_Trading" target="_blank" class="float-btn float-tg" title="Telegram">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      <span class="float-tooltip">Join Telegram</span>
    </a>
  `;
  document.body.appendChild(el);
}
buildFloat();
