/*  ====== CalcNinja Tools.js - All Calculator Logic ====== */

// TOOLS DATA ARRAY (renders homepage grid dynamically)
const TOOLS_DATA = [
  { slug:'emi-calculator', emoji:'🏠', name:'EMI Calculator', 
    desc:'Home, car, personal loan EMI', category:'Finance', popular:true,
    keywords:['emi','loan','home loan','car loan','personal loan'] },
  { slug:'sip-calculator', emoji:'📈', name:'SIP Calculator',
    desc:'Mutual fund SIP returns', category:'Investment', popular:true,
    keywords:['sip','mutual fund','investment','returns'] },
  { slug:'gst-calculator', emoji:'🧾', name:'GST Calculator',
    desc:'Add or remove GST instantly', category:'Tax', popular:true,
    keywords:['gst','tax','cgst','sgst','igst'] },
  { slug:'income-tax-calculator', emoji:'💰', name:'Income Tax',
    desc:'FY 2025-26 tax calculator', category:'Tax', popular:false,
    keywords:['income tax','tax','80c','hra','salary'] },
  { slug:'fd-calculator', emoji:'🏦', name:'FD Calculator',
    desc:'Fixed deposit maturity amount', category:'Investment', popular:false,
    keywords:['fd','fixed deposit','interest','bank'] },
  { slug:'ppf-calculator', emoji:'🏛️', name:'PPF Calculator',
    desc:'Public Provident Fund returns', category:'Investment', popular:false,
    keywords:['ppf','public provident fund','tax free'] },
  { slug:'compound-interest', emoji:'📊', name:'Compound Interest',
    desc:'CI with chart and comparison', category:'Finance', popular:false,
    keywords:['compound interest','ci','compounding'] },
  { slug:'mortgage-calculator', emoji:'🏡', name:'Mortgage Calculator',
    desc:'International home loan EMI', category:'Finance', popular:false,
    keywords:['mortgage','home loan','usd','emi'] },
  { slug:'retirement-calculator', emoji:'🛡️', name:'Retirement Planner',
    desc:'How much corpus do you need?', category:'Investment', popular:false,
    keywords:['retirement','corpus','pension','age'] },
  { slug:'percentage-calculator', emoji:'🔢', name:'Percentage Calculator',
    desc:'Any percentage instantly', category:'General', popular:false,
    keywords:['percentage','percent','calculate'] },
  { slug:'age-calculator', emoji:'🎂', name:'Age Calculator',
    desc:'Exact age with birthday countdown', category:'General', popular:false,
    keywords:['age','birthday','years months days'] },
  { slug:'bmi-calculator', emoji:'⚖️', name:'BMI Calculator',
    desc:'Body Mass Index + ideal weight', category:'Health', popular:false,
    keywords:['bmi','body mass index','weight','health'] },
  { slug:'currency-converter', emoji:'💱', name:'Currency Converter',
    desc:'Live exchange rates 150+ currencies', category:'Finance', popular:false,
    keywords:['currency','usd inr','exchange rate','dollar'] },
  { slug:'tip-calculator', emoji:'🍽️', name:'Tip Calculator',
    desc:'Split bill & calculate tips', category:'General', popular:false,
    keywords:['tip','bill split','restaurant','per person'] },
  { slug:'unit-converter', emoji:'📐', name:'Unit Converter',
    desc:'Length, weight, temperature', category:'General', popular:false,
    keywords:['unit','length','weight','temperature','convert'] }
];

// Render tools grid on homepage
function renderToolsGrid(data = TOOLS_DATA) {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  
  grid.innerHTML = data.map(t => `
    <a href="/tools/${t.slug}" class="tool-card" aria-label="${t.name}">
      <div class="tool-card-top">
        <span class="tool-emoji" aria-hidden="true">${t.emoji}</span>
        ${t.popular ? '<span class="tool-badge">🔥 Popular</span>' : `<span class="tool-cat">${t.category}</span>`}
      </div>
      <h3 class="tool-name">${t.name}</h3>
      <p class="tool-desc">${t.desc}</p>
      <div class="tool-cta">Calculate Now <span aria-hidden="true">→</span></div>
    </a>
  `).join('');
}

// Search filter with debounce
let searchTimeout;
function filterTools(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      renderToolsGrid();
      document.getElementById('noResults').style.display = 'none';
      return;
    }
    const filtered = TOOLS_DATA.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.keywords.some(k => k.includes(q))
    );
    if (filtered.length === 0) {
      document.getElementById('toolsGrid').innerHTML = '';
      document.getElementById('noResultsQuery').textContent = query;
      document.getElementById('noResults').style.display = 'block';
    } else {
      document.getElementById('noResults').style.display = 'none';
      renderToolsGrid(filtered);
    }
  }, 250);
}

// QUICK CALC TAB SWITCHER
function switchQuickCalc(id, btn) {
  document.querySelectorAll('.qc-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.qtab').forEach(b => b.classList.remove('active'));
  document.getElementById('qc-' + id)?.classList.add('active');
  btn.classList.add('active');
}

// EMI CALCULATION
function calcEMI(p, r, n) {
  if (!p && !r && !n) {
    // Called from quick calc sliders on homepage
    p = parseFloat(document.getElementById('qc-amt')?.value || 0);
    r = parseFloat(document.getElementById('qc-rate')?.value || 0) / 12 / 100;
    n = parseFloat(document.getElementById('qc-yr')?.value || 0) * 12;
    
    if (document.getElementById('qc-amt-val')) {
      document.getElementById('qc-amt-val').textContent = formatINR(p);
    }
    if (document.getElementById('qc-rate-val')) {
      document.getElementById('qc-rate-val').textContent = (r * 12 * 100).toFixed(1) + '%';
    }
    if (document.getElementById('qc-yr-val')) {
      document.getElementById('qc-yr-val').textContent = (n/12) + ' yr';
    }
  }
  
  if (!p || !r || !n || r <= 0) return { emi: 0, total: 0, interest: 0 };
  
  const emi = p * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1);
  const total = emi * n;
  const interest = total - p;
  
  // Update quick calc display if on homepage
  const emiEl = document.getElementById('qcEmiAmount');
  if (emiEl) {
    emiEl.textContent = formatINR(emi);
    if (document.getElementById('qcEmiTotal')) {
      document.getElementById('qcEmiTotal').textContent = formatINR(total);
    }
    if (document.getElementById('qcEmiInterest')) {
      document.getElementById('qcEmiInterest').textContent = formatINR(interest);
    }
  }
  
  return { emi, total, interest };
}

// SIP CALCULATION
function calcSIP(monthly, rate, years) {
  if (!monthly) {
    monthly = parseFloat(document.getElementById('qcs-amt')?.value || 0);
    rate = parseFloat(document.getElementById('qcs-rate')?.value || 0);
    years = parseFloat(document.getElementById('qcs-yr')?.value || 0);
    if (document.getElementById('qcs-amt-val')) {
      document.getElementById('qcs-amt-val').textContent = '₹' + monthly.toLocaleString('en-IN');
    }
    if (document.getElementById('qcs-rate-val')) {
      document.getElementById('qcs-rate-val').textContent = rate + '%';
    }
    if (document.getElementById('qcs-yr-val')) {
      document.getElementById('qcs-yr-val').textContent = years + ' yr';
    }
  }
  const r = rate / 12 / 100;
  const n = years * 12;
  const fv = monthly * ((Math.pow(1+r, n) - 1) / r) * (1 + r);
  const invested = monthly * n;
  const profit = fv - invested;
  
  const el = document.getElementById('qcSipTotal');
  if (el) {
    el.textContent = formatINR(fv);
    if (document.getElementById('qcSipInvested')) {
      document.getElementById('qcSipInvested').textContent = formatINR(invested);
    }
    if (document.getElementById('qcSipProfit')) {
      document.getElementById('qcSipProfit').textContent = formatINR(profit);
    }
  }
  return { fv, invested, profit };
}

// GST CALCULATION
let gstRate = 18, gstMode = 'add';
function setGSTRate(rate, btn) {
  gstRate = rate;
  document.querySelectorAll('.gst-rate').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  calcGST();
}

function setGSTMode(mode) {
  gstMode = mode;
  if (document.getElementById('gst-add-btn')) {
    document.getElementById('gst-add-btn').classList.toggle('active', mode === 'add');
  }
  if (document.getElementById('gst-remove-btn')) {
    document.getElementById('gst-remove-btn').classList.toggle('active', mode === 'remove');
  }
  if (document.getElementById('gst-result-label')) {
    document.getElementById('gst-result-label').textContent = 
      mode === 'add' ? 'GST add karke total' : 'GST hatake original price';
  }
  calcGST();
}

function calcGST() {
  const amt = parseFloat(document.getElementById('qcg-amt')?.value || 0);
  if (!amt) return;
  let original, gstAmt, total;
  if (gstMode === 'add') {
    original = amt;
    gstAmt = amt * gstRate / 100;
    total = amt + gstAmt;
  } else {
    total = amt;
    original = amt * 100 / (100 + gstRate);
    gstAmt = total - original;
  }
  
  const el = document.getElementById('qcGstTotal');
  if (el) {
    el.textContent = formatINR(gstMode === 'add' ? total : original);
    if (document.getElementById('qcGstOriginal')) {
      document.getElementById('qcGstOriginal').textContent = formatINR(original);
    }
    if (document.getElementById('qcGstAmount')) {
      document.getElementById('qcGstAmount').textContent = formatINR(gstAmt);
    }
    if (document.getElementById('qcCgst')) {
      document.getElementById('qcCgst').textContent = formatINR(gstAmt / 2);
    }
    if (document.getElementById('qcSgst')) {
      document.getElementById('qcSgst').textContent = formatINR(gstAmt / 2);
    }
  }
}

// FD CALCULATION
function calcFD() {
  const p = parseFloat(document.getElementById('qcf-amt')?.value || 0);
  const r = parseFloat(document.getElementById('qcf-rate')?.value || 0) / 100;
  const t = parseFloat(document.getElementById('qcf-yr')?.value || 0);
  const n = 4; // quarterly compounding
  
  if (document.getElementById('qcf-amt-val')) {
    document.getElementById('qcf-amt-val').textContent = formatINR(p);
  }
  if (document.getElementById('qcf-rate-val')) {
    document.getElementById('qcf-rate-val').textContent = r * 100 + '%';
  }
  if (document.getElementById('qcf-yr-val')) {
    document.getElementById('qcf-yr-val').textContent = t + ' yr';
  }
  
  const maturity = p * Math.pow(1 + r/n, n*t);
  const interest = maturity - p;
  
  const el = document.getElementById('qcFdTotal');
  if (el) {
    el.textContent = formatINR(maturity);
    if (document.getElementById('qcFdPrincipal')) {
      document.getElementById('qcFdPrincipal').textContent = formatINR(p);
    }
    if (document.getElementById('qcFdInterest')) {
      document.getElementById('qcFdInterest').textContent = formatINR(interest);
    }
  }
}

// NUMBER FORMAT — Indian style, smart units
function formatINR(n, symbol = '₹') {
  if (isNaN(n) || n === undefined) return symbol + '0';
  const abs = Math.abs(n);
  if (abs >= 10000000) return symbol + (n/10000000).toFixed(2) + ' Cr';
  if (abs >= 100000) return symbol + (n/100000).toFixed(2) + ' L';
  if (abs >= 1000) return symbol + Math.round(n).toLocaleString('en-IN');
  return symbol + Math.round(n);
}

// FULL DETAILED EMI (for tool page — with amortization table)
function calcDetailedEMI(principal, annualRate, years) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const emi = principal * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1);
  const total = emi * n;
  const interest = total - principal;
  
  // Amortization table
  let balance = principal;
  const schedule = [];
  for (let i = 1; i <= n; i++) {
    const int = balance * r;
    const prin = emi - int;
    balance -= prin;
    schedule.push({
      month: i,
      emi: Math.round(emi),
      principal: Math.round(prin),
      interest: Math.round(int),
      balance: Math.max(0, Math.round(balance))
    });
  }
  
  return { emi, total, interest, schedule };
}

// INCOME TAX — single config to update yearly
const TAX_CONFIG = {
  fy: '2024-25', ay: '2025-26',
  newRegime: {
    standardDeduction: 75000,
    slabs: [
      {min:0, max:300000, rate:0},
      {min:300000, max:700000, rate:0.05},
      {min:700000, max:1000000, rate:0.10},
      {min:1000000, max:1200000, rate:0.15},
      {min:1200000, max:1500000, rate:0.20},
      {min:1500000, max:Infinity, rate:0.30}
    ],
    rebate87A: 25000, rebate87ALimit: 700000
  },
  oldRegime: {
    standardDeduction: 50000,
    slabs: [
      {min:0, max:250000, rate:0},
      {min:250000, max:500000, rate:0.05},
      {min:500000, max:1000000, rate:0.20},
      {min:1000000, max:Infinity, rate:0.30}
    ],
    rebate87A: 12500, rebate87ALimit: 500000,
    max80C: 150000, max80D: 25000, max24b: 200000
  },
  cess: 0.04
};

function calcTax(income, regime = 'new', deductions = {}) {
  const cfg = regime === 'new' ? TAX_CONFIG.newRegime : TAX_CONFIG.oldRegime;
  let taxableIncome = income - cfg.standardDeduction;
  
  if (regime === 'old') {
    taxableIncome -= Math.min(deductions.c80 || 0, TAX_CONFIG.oldRegime.max80C);
    taxableIncome -= Math.min(deductions.d80 || 0, TAX_CONFIG.oldRegime.max80D);
    taxableIncome -= Math.min(deductions.loan || 0, TAX_CONFIG.oldRegime.max24b);
  }
  taxableIncome = Math.max(0, taxableIncome);
  
  let tax = 0;
  for (const slab of cfg.slabs) {
    if (taxableIncome > slab.min) {
      tax += (Math.min(taxableIncome, slab.max) - slab.min) * slab.rate;
    }
  }
  
  if (taxableIncome <= cfg.rebate87ALimit) tax = Math.max(0, tax - cfg.rebate87A);
  tax += tax * TAX_CONFIG.cess;
  
  return {
    taxableIncome,
    tax: Math.round(tax),
    effectiveRate: income > 0 ? ((tax / income) * 100).toFixed(1) : 0
  };
}

// AUTO-RUN ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  renderToolsGrid();
  if (document.getElementById('qc-amt')) calcEMI();
  if (document.getElementById('qcs-amt')) calcSIP();
  if (document.getElementById('qcg-amt')) calcGST();
  if (document.getElementById('qcf-amt')) calcFD();
  document.querySelectorAll('.auto-year').forEach(el => el.textContent = new Date().getFullYear());
  updateHistoryBadge();
  initCounters();
});
