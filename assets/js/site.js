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
