// GameNest popup — shows on index.html and lander.html
document.addEventListener('DOMContentLoaded', () => {
  const path = (location.pathname || '').toLowerCase();
  const isIndex  = /(^\/$|index\.html$)/.test(path) || path.endsWith('/');
  const isLander = /lander\.html$/.test(path);
  if (!isIndex && !isLander) return;

  // prevent double render
  if (document.querySelector('.modal-backdrop')) return;

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Policy Notice">
      <h3>Policy Notice</h3>
      <p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
      <div class="actions">
        <button class="btn" id="gn-yes">Yes, Accept</button>
        <button class="btn ghost" id="gn-close">Close</button>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display = 'flex';

  const close = () => { bd.style.display='none'; bd.remove(); };

  document.getElementById('gn-yes').addEventListener('click', () => {
    // Accept → just close (no redirect), customize here if needed
    close();
  });
  document.getElementById('gn-close').addEventListener('click', () => {
    // Close → go to terms.html (requested behavior in earlier specs), fallback if missing
    const target = document.querySelector('a[href*="terms.html"]') ? 'terms.html' : (document.querySelector('a[href*="privacy.html"]') ? 'privacy.html' : '#');
    if (target === '#') { close(); } else { window.location.href = target; }
  });
});
