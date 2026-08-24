/* ==========================================================================
   FreshBite Café — Interactivity
   Handles: mobile nav toggle, cart counter + toast, testimonial slider,
   menu category filters. Runs on both index.html and menu.html;
   each block checks the DOM before wiring up, so it's safe on both pages.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCart();
  initTestimonialSlider();
  initMenuFilters();
  initComingSoonLinks(); // v2 addition
});

/* ---------- v2 fix: footer social links give honest feedback ----------
   Previously these were href="#" with no explanation, silently jumping to
   the top of the page. Now they prevent that jump and show a clear toast,
   so the user understands the link isn't connected yet rather than assuming
   the site is broken. */
function initComingSoonLinks() {
  const toast = document.querySelector('.toast');
  document.querySelectorAll('[data-coming-soon]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (!toast) return;
      toast.textContent = `${link.dataset.comingSoon} page coming soon`;
      toast.classList.add('is-visible');
      clearTimeout(initComingSoonLinks._timer);
      initComingSoonLinks._timer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
    });
  });
}

/* ---------- Mobile navigation toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after a link is tapped (mobile UX nicety)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Cart counter + "Added to cart" toast ---------- */
function initCart() {
  const cartCountEl = document.querySelector('.cart-count');
  const toast = document.querySelector('.toast');
  const addButtons = document.querySelectorAll('.btn-add, .p-add');

  if (!addButtons.length) return;

  let cartCount = 0;

  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      cartCount += 1;

      if (cartCountEl) {
        cartCountEl.textContent = String(cartCount);
      }

      // Brief visual confirmation on the button itself
      btn.classList.add('is-added');
      setTimeout(() => btn.classList.remove('is-added'), 600);

      // Toast message, using the dish/product name if available
      const card = btn.closest('.dish-card, .p-card');
      const nameEl = card ? card.querySelector('.dish-name, .p-name') : null;
      const itemName = nameEl ? nameEl.textContent.trim() : 'Item';
      showToast(`${itemName} added to cart`);
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1800);
  }
}

/* ---------- Testimonial slider (mobile: one card at a time) ---------- */
function initTestimonialSlider() {
  const cards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.nav-circle.prev');
  const nextBtn = document.querySelector('.nav-circle.next');

  if (!cards.length || !prevBtn || !nextBtn) return;

  let activeIndex = Array.from(cards).findIndex((c) => c.classList.contains('is-active'));
  if (activeIndex === -1) activeIndex = 0;

  function setActive(index) {
    cards.forEach((card, i) => card.classList.toggle('is-active', i === index));
  }

  prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    setActive(activeIndex);
  });

  nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % cards.length;
    setActive(activeIndex);
  });

  setActive(activeIndex);
}

/* ---------- Menu category filters (menu.html) ---------- */
function initMenuFilters() {
  const filterButtons = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.p-card');

  if (!filterButtons.length || !productCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const category = btn.dataset.filter;

      productCards.forEach((card) => {
        const matches = category === 'all' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });
}
