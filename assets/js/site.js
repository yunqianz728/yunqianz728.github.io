const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  siteNav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const statsTimer = window.setInterval(() => {
  const visitors = document.querySelector('#busuanzi_value_site_uv');
  const views = document.querySelector('#busuanzi_value_site_pv');

  if (visitors?.textContent.trim() && views?.textContent.trim()) {
    document.querySelector('#busuanzi_container_site_uv')?.removeAttribute('hidden');
    document.querySelector('#busuanzi_container_site_pv')?.removeAttribute('hidden');
    document.querySelector('.stats-separator')?.removeAttribute('hidden');
    window.clearInterval(statsTimer);
  }
}, 150);

window.setTimeout(() => window.clearInterval(statsTimer), 12000);

const clickEmojis = ['🛰️', '🌎', '✨', '🌱', '🪈', '🎵', '🎬'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let emojiIndex = 0;

document.addEventListener('click', (event) => {
  if (reduceMotion.matches || (!event.clientX && !event.clientY)) return;

  const emoji = document.createElement('span');
  emoji.className = 'click-emoji';
  emoji.setAttribute('aria-hidden', 'true');
  emoji.textContent = clickEmojis[emojiIndex];
  emojiIndex = (emojiIndex + 1) % clickEmojis.length;

  const drift = Math.round(Math.random() * 34 - 17);
  const rotation = Math.round(Math.random() * 24 - 12);
  emoji.style.left = `${event.clientX}px`;
  emoji.style.top = `${event.clientY}px`;
  emoji.style.setProperty('--emoji-drift', `${drift}px`);
  emoji.style.setProperty('--emoji-rotation', `${rotation}deg`);

  document.body.appendChild(emoji);
  emoji.addEventListener('animationend', () => emoji.remove(), { once: true });
});
