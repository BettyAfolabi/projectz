function initUI() {
  const menu  = document.getElementById('mobile-menu');
  const btn   = document.getElementById('mobile-menu-btn');
  const close = document.getElementById('mobile-menu-close');

  if (!menu) return;

  const openMenu = () => {
    menu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menu.classList.add('translate-x-full');
    document.body.style.overflow = '';
  };

  btn?.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);

  menu.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') ?? '';
      closeMenu();

      if (href.startsWith('/#')) {
        e.preventDefault();
        const id = href.slice(2);

        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, '', `#${id}`);
        }, 320);
      }
    });
  });
}

function initThemeTooltip() {
  const STORAGE_KEY = 'portfolio-theme-tooltip-dismissed';
  const wrap = document.getElementById('theme-tooltip-wrap');

  if (!wrap) return;

  const dismiss = () => {
    wrap.style.opacity = '0';
    wrap.style.transform = 'translateY(8px)';
    wrap.style.pointerEvents = 'none';
    localStorage.setItem(STORAGE_KEY, '1');
  };

  // Already dismissed → remove immediately
  if (localStorage.getItem(STORAGE_KEY)) {
    wrap.remove();
    return;
  }

  // Show after delay
  setTimeout(() => {
    wrap.style.opacity = '1';
    wrap.style.transform = 'translateY(0)';
    wrap.style.pointerEvents = 'auto';
  }, 1800);

  // Button dismiss
  document
    .getElementById('theme-tooltip-dismiss')
    ?.addEventListener('click', dismiss);

  // Auto dismiss on theme change
  document.addEventListener('theme-changed', dismiss, { once: true });

  // Auto dismiss fallback
  setTimeout(dismiss, 8000);
}


function initAll() {
  initUI();
  initThemeTooltip();
}

initAll();

document.addEventListener('astro:page-load', initAll);