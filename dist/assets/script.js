const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const panel = document.querySelector('[data-menu-panel]');
const progress = document.querySelector('.page-progress span');
const toast = document.querySelector('[data-toast]');

const setMenu = (open) => {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  panel.setAttribute('aria-hidden', String(!open));
};

toggle?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
panel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelector('[data-copy]')?.addEventListener('click', async () => {
  const text = 'ООО «СИБРОАД»\nИНН 5404050856\nКПП 222501001\nОГРН 1175476002888';
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});
