/*  ====== CalcNinja Main.js - Shared JavaScript ====== */

/* THEME TOGGLE */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('cn_theme', newTheme);
  document.querySelector('.theme-toggle').textContent = isDark ? '🌙' : '☀️';
}

/* LOAD SAVED THEME */
(function() {
  const saved = localStorage.getItem('cn_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
})();

/* MOBILE MENU */
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav?.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const nav = document.getElementById('mobileNav');
  if (nav?.classList.contains('open') && 
      !nav.contains(e.target) && 
      !e.target.classList.contains('hamburger')) {
    nav.classList.remove('open');
  }
});

/* STICKY HEADER + BACK TO TOP */
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  header?.classList.toggle('scrolled', window.scrollY > 50);
  const backTop = document.getElementById('backTop');
  if (backTop) backTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
}, {passive: true});

/* HISTORY SYSTEM */
const HIST_KEY = 'cn_calc_history';

function saveToHistory(tool, summary, detail = '') {
  const hist = getHistory();
  const entry = {
    id: Date.now(),
    tool,
    summary,
    detail,
    time: new Date().toLocaleString('hi-IN', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})
  };
  hist.unshift(entry);
  if (hist.length > 25) hist.pop();
  localStorage.setItem(HIST_KEY, JSON.stringify(hist));
  updateHistoryBadge();
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HIST_KEY)) || []; } catch { return []; }
}

function updateHistoryBadge() {
  const n = getHistory().length;
  const badge = document.getElementById('histBadge');
  if (badge) { badge.textContent = n; badge.style.display = n > 0 ? 'flex' : 'none'; }
}

function toggleHistory() {
  const panel = document.getElementById('histPanel');
  const isOpen = panel.style.transform === 'translateX(0px)';
  panel.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0px)';
  if (!isOpen) renderHistory();
}

function renderHistory() {
  const list = document.getElementById('histList');
  if (!list) return;
  const hist = getHistory();
  if (!hist.length) {
    list.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted)"><div style="font-size:2.5rem">📊</div><p style="margin-top:0.5rem">Abhi koi calculation nahi.<br>Koi bhi tool use karo!</p></div>';
    return;
  }
  list.innerHTML = hist.map(h => `
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px;cursor:pointer" 
         onclick="window.location='/tools/${slugFrom(h.tool)}'">
      <div style="font-weight:600;font-size:0.88rem">${emojiFor(h.tool)} ${h.tool}</div>
      <div style="color:#16A34A;font-weight:700;font-size:1rem;margin:4px 0">${h.summary}</div>
      <div style="font-size:0.72rem;color:var(--text-muted)">${h.time}</div>
    </div>`).join('');
}

function slugFrom(tool) {
  const map={'EMI Calculator':'emi-calculator','SIP Calculator':'sip-calculator','GST Calculator':'gst-calculator','Income Tax':'income-tax-calculator','FD Calculator':'fd-calculator','BMI Calculator':'bmi-calculator','PPF Calculator':'ppf-calculator','Compound Interest':'compound-interest','Mortgage Calculator':'mortgage-calculator','Retirement Calculator':'retirement-calculator','Percentage Calculator':'percentage-calculator','Age Calculator':'age-calculator','Currency Converter':'currency-converter','Tip Calculator':'tip-calculator','Unit Converter':'unit-converter'};
  return map[tool] || 'emi-calculator';
}

function emojiFor(tool) {
  const map={'EMI Calculator':'🏠','SIP Calculator':'📈','GST Calculator':'🧾','Income Tax':'💰','FD Calculator':'🏦','BMI Calculator':'⚖️','PPF Calculator':'🏛️','Compound Interest':'📊','Mortgage Calculator':'🏡','Retirement Calculator':'🛡️','Percentage Calculator':'🔢','Age Calculator':'🎂','Currency Converter':'💱','Tip Calculator':'🍽️','Unit Converter':'📐'};
  return map[tool] || '🔢';
}

/* SHARE FUNCTIONS */
function whatsappShare(tool, result, extra = '') {
  const text = `🧮 *${tool}* — CalcNinja\n\n*Result: ${result}*\n${extra}\n\n🔗 Free mein try karo:\nhttps://calcninja.vercel.app\n_India ka #1 free calculator 🥷_`;
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

function copyText(text) {
  navigator.clipboard?.writeText(text + '\n\nSource: calcninja.vercel.app')
    .then(() => toast('✅ Copy ho gaya!'))
    .catch(() => {
      const t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      document.execCommand('copy'); document.body.removeChild(t);
      toast('✅ Copied!');
    });
}

function copyResult() {
  const resultText = document.getElementById('resultMain')?.textContent || '';
  copyText(resultText);
}

/* TOAST NOTIFICATION */
function toast(msg, ms = 3000) {
  let el = document.getElementById('cn-toast');
  if (!el) {
    el = document.createElement('div'); el.id = 'cn-toast';
    el.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(16px);background:#0F172A;color:white;padding:10px 22px;border-radius:50px;font-size:0.88rem;opacity:0;transition:all 0.25s;z-index:999;pointer-events:none;white-space:nowrap';
    document.body.appendChild(el);
  }
  el.textContent = msg; el.style.opacity = '1'; el.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(-50%) translateY(16px)'; }, ms);
}

/* FAQ ACCORDION */
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}

/* COUNTER ANIMATION */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.round(current).toLocaleString('en-IN') + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      }
    });
  }, {threshold: 0.5});
  counters.forEach(c => observer.observe(c));
}

/* EMAIL SUBSCRIBE */
function subscribeEmail() {
  const email = document.getElementById('emailInput')?.value?.trim();
  if (!email || !email.includes('@')) { toast('❌ Valid email daalo'); return; }
  const subs = JSON.parse(localStorage.getItem('cn_subscribers') || '[]');
  if (subs.includes(email)) { toast('✓ Aap already subscribed hain!'); return; }
  subs.push(email);
  localStorage.setItem('cn_subscribers', JSON.stringify(subs));
  const count = parseInt(document.getElementById('subCount')?.textContent || 2847);
  if (document.getElementById('subCount')) document.getElementById('subCount').textContent = (count + 1).toLocaleString();
  toast('🎉 Subscribe ho gaye! Tax tips milenge aapko.');
  document.getElementById('emailInput').value = '';
}

/* AFFILIATE TRACKING */
function trackAff(partner) {
  const data = JSON.parse(localStorage.getItem('cn_aff_clicks') || '{}');
  data[partner] = (data[partner] || 0) + 1;
  localStorage.setItem('cn_aff_clicks', JSON.stringify(data));
}

/* PWA INSTALL */
let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); installPrompt = e;
  const visits = parseInt(localStorage.getItem('cn_v') || 0) + 1;
  localStorage.setItem('cn_v', visits);
  if (visits >= 2) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.innerHTML = `<div style="position:fixed;bottom:80px;right:16px;background:var(--bg-card);border:2px solid var(--primary);border-radius:14px;padding:1rem;z-index:90;max-width:260px;box-shadow:0 8px 24px rgba(0,0,0,0.12)"><div style="font-weight:700;margin-bottom:4px">📱 App Install karo!</div><div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:10px">Offline bhi kaam karega. Free.</div><div style="display:flex;gap:8px"><button onclick="doInstall()" style="flex:1;background:var(--primary);color:white;border:none;padding:8px;border-radius:8px;font-weight:600;cursor:pointer">Install</button><button onclick="this.closest('div').parentElement.parentElement.remove()" style="background:none;border:1px solid var(--border);padding:8px 10px;border-radius:8px;cursor:pointer">Baad mein</button></div></div>`;
      document.body.appendChild(b);
    }, 3000);
  }
});

async function doInstall() {
  if (installPrompt) {
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') toast('🥷 CalcNinja app install ho gaya!');
    installPrompt = null;
  }
}

/* INPUT SYNC FOR TOOL PAGES */
function syncSlider(sliderId, inputId) {
  const v = document.getElementById(sliderId)?.value;
  const input = document.getElementById(inputId);
  if (input) input.value = v;
}

function syncInput(inputId, sliderId) {
  const v = document.getElementById(inputId)?.value;
  const slider = document.getElementById(sliderId);
  if (slider && v >= slider.min && v <= slider.max) slider.value = v;
}

/* FOCUS HINTS */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.number-input,.range-input').forEach(inp => {
    inp.addEventListener('focus', () => {
      const hint = document.getElementById(inp.id + '-hint');
      if (hint) hint.style.display = 'block';
    });
    inp.addEventListener('blur', () => {
      setTimeout(() => {
        const hint = document.getElementById(inp.id + '-hint');
        if (hint) hint.style.display = 'none';
      }, 200);
    });
  });
  
  document.querySelectorAll('.auto-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
  
  updateHistoryBadge();
  initCounters();
});

/* UPDATE NAME */
function updateName() {
  const name = document.getElementById('userName')?.value || '';
  if (name && document.getElementById('resultHeadline')) {
    document.getElementById('resultHeadline').textContent = `${name}, aapki Maheena EMI`;
  }
}

/* SHARE TO WHATSAPP (FOR TOOL PAGES) */
function shareToWA() {
  const tool = document.querySelector('.tool-form-col h1')?.textContent || 'Calculator';
  const result = document.getElementById('resultMain')?.textContent || '';
  whatsappShare(tool, result);
}
