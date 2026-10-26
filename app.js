const dialog = document.querySelector('#quote');
let previousFocus;
function openQuote(service) {
  previousFocus = document.activeElement;
  if (service) document.querySelector('[name="service"]').value = service;
  document.querySelector('#form-status').textContent = '';
  dialog.showModal();
}
document.querySelectorAll('.quote-open').forEach(button => button.addEventListener('click', () => openQuote()));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => openQuote(button.dataset.service)));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => previousFocus?.focus());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  const body = `Hello Supercharge Transport,\n\nI'd like to discuss a shipment.\n\nName: ${values.name}\nEmail: ${values.email}\nService: ${values.service}\nOrigin: ${values.origin}\nDestination: ${values.destination}\n\nShipment details:\n${values.details}\n\nThank you.`;
  const email = `mailto:dispatch@superchargetrans.com?subject=${encodeURIComponent('Freight inquiry — ' + values.service)}&body=${encodeURIComponent(body)}`;
  window.location.href = email;
  document.querySelector('#form-status').textContent = 'Your inquiry is ready in your email app. Review and send it there. If it did not open, call +1 (519) 800-4233 or email dispatch@superchargetrans.com. Nothing has been sent by this website.';
});
