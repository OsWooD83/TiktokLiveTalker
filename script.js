document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    item.classList.toggle('open');
  });
});

// Smooth scroll for in-page anchors
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', evt => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      evt.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Consentement cookies + chargement AdSense ---
const ADSENSE_CLIENT_ID = 'ca-pub-REPLACE_WITH_YOUR_ID'; // Remplacez par votre ID AdSense

function loadAdSense() {
  if (!ADSENSE_CLIENT_ID || !ADSENSE_CLIENT_ID.startsWith('ca-pub-')) return;
  if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT_ID;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

function renderCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  banner.style.display = 'flex';
  banner.innerHTML = `
    <p>Nous utilisons des cookies pour la mesure d’audience et la monétisation (AdSense). Consultez la <a href="privacy.html">Politique de confidentialité</a>.</p>
    <div class="cookie-actions">
      <button id="cookieAccept" class="btn primary">Accepter</button>
      <button id="cookieDecline" class="btn ghost">Refuser</button>
    </div>
  `;
  document.getElementById('cookieAccept').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.remove();
    loadAdSense();
  });
  document.getElementById('cookieDecline').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const consent = localStorage.getItem('cookieConsent');
  if (consent === 'accepted') {
    loadAdSense();
  } else if (!consent) {
    renderCookieBanner();
  }
});
