const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update CSS
const cssPattern = /\/\* ── COLLAPSIBLES & CHECKLIST ── \*\/[\s\S]*?<\/style>/;
const newCss = `/* ── TOPIC CARDS & DASHBOARD ── */
  .topic-card {
    background: var(--paper); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 24px;
    box-shadow: 0 2px 8px var(--shadow); overflow: hidden;
  }
  .topic-header {
    background: #fffdf8; padding: 20px 24px; cursor: pointer; transition: background 0.2s;
  }
  .topic-header:hover { background: #fffaf0; }
  .topic-title {
    font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--ink);
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;
  }
  .topic-title::after {
    content: '▼'; font-size: 14px; font-family: sans-serif; transition: transform 0.3s; color: var(--amber);
  }
  .topic-card.open .topic-title::after { transform: rotate(180deg); color: var(--amber); }
  .topic-card.completed .topic-title::after { content: '✅'; transform: none; }
  
  .checklist-preview {
    display: flex; flex-direction: column; gap: 8px;
  }
  .checklist-preview label {
    display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: var(--ink-light); cursor: default; line-height: 1.4;
  }
  .checklist-preview input[type="checkbox"] {
    margin-top: 3px; width: 16px; height: 16px; accent-color: var(--green-eng); pointer-events: none;
  }
  .checklist-preview label.completed {
    text-decoration: line-through; opacity: 0.6; color: rgba(0,0,0,0.5);
  }
  .topic-content {
    display: none; padding: 24px; border-top: 1px solid var(--border); background: var(--cream);
  }
  .topic-card.open .topic-content { display: block; }
  .action-row {
    margin-top: 30px; display: flex; justify-content: flex-end; padding-top: 20px; border-top: 1px dashed var(--border);
  }
  .mark-completed-btn {
    background: var(--green-eng); color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 14px; transition: background 0.2s;
  }
  .mark-completed-btn:hover { background: #166534; }
  .mark-completed-btn.completed-state { background: #e5e7eb; color: #6b7280; cursor: default; }

  /* ── NAV PROGRESS BAR ── */
  nav {
    display: flex; justify-content: space-between; align-items: center; padding: 12px 40px;
    background: var(--paper); border-bottom: 2px solid var(--border); position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 12px var(--shadow);
  }
  .nav-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 18px; color: var(--ink); }
  .nav-progress-wrapper { display: flex; align-items: center; gap: 15px; width: 300px; }
  .nav-progress-bar { flex: 1; background: #e5d5b0; height: 10px; border-radius: 5px; overflow: hidden; }
  .nav-progress-fill { background: linear-gradient(90deg, #15803d, #22c55e); height: 100%; width: 0%; transition: width 0.4s ease; }
  .nav-progress-text { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; color: var(--green-eng); min-width: 40px; text-align: right; }
  @media(max-width: 700px) {
    nav { flex-direction: column; gap: 10px; padding: 15px 20px; }
    .nav-progress-wrapper { width: 100%; }
  }
</style>`;
html = html.replace(cssPattern, newCss);

// 2. Update Nav
const navPattern = /<nav>[\s\S]*?<\/nav>/;
const newNav = `<nav>
  <div class="nav-title">📚 Study Dashboard</div>
  <div class="nav-progress-wrapper">
    <span class="nav-progress-text" id="progress-text">0%</span>
    <div class="nav-progress-bar">
      <div class="nav-progress-fill" id="progress-fill"></div>
    </div>
  </div>
</nav>`;
html = html.replace(navPattern, newNav);

// 3. Strip previous checklist logic
html = html.replace(/<div class="section-banner banner-a".*?<\/div>/g, '<div class="section-banner banner-a">🅰️ Section A — Core Engine Concepts</div>');
html = html.replace(/<div id="section-a-content"[\s\S]*?<!-- ══ ENGINE CYCLES ══ -->/g, '<!-- ══ ENGINE CYCLES ══ -->');

html = html.replace(/<div class="section-banner banner-b".*?<\/div>/g, '<div class="section-banner banner-b">🅱️ Section B — Thermodynamics & Applications</div>');
html = html.replace(/<div id="section-b-content"[\s\S]*?<!-- ══ THERMODYNAMIC LAWS ══ -->/g, '<!-- ══ THERMODYNAMIC LAWS ══ -->');

html = html.replace(/<\/div><!-- end section-a-content -->\s*/g, '');
html = html.replace(/<\/div><!-- end section-b-content -->\s*/g, '');
html = html.replace(/<div class="progress-container">[\s\S]*?<\/div>\s*<footer>/g, '<footer>');

// Update JS
const jsPattern = /<script>[\s\S]*?<\/script>/;
const newJs = `<script>
  function toggleCard(id) {
    const card = document.getElementById(id);
    card.classList.toggle('open');
  }

  function markSectionComplete(id, event) {
    if(event) event.stopPropagation();
    const card = document.getElementById(id);
    const cbGroup = card.querySelectorAll('input[type="checkbox"]');
    const isCompleted = card.classList.contains('completed');
    
    // Toggle state
    const newState = !isCompleted;
    if(newState) {
      card.classList.add('completed');
      card.querySelector('.mark-completed-btn').innerText = "✅ Completed";
      card.querySelector('.mark-completed-btn').classList.add('completed-state');
    } else {
      card.classList.remove('completed');
      card.querySelector('.mark-completed-btn').innerText = "✅ Mark as Completed";
      card.querySelector('.mark-completed-btn').classList.remove('completed-state');
    }
    
    cbGroup.forEach(cb => {
      cb.checked = newState;
      if(newState) cb.parentElement.classList.add('completed');
      else cb.parentElement.classList.remove('completed');
    });

    updateProgress();
    saveProgress();
  }

  function updateProgress() {
    const allCb = document.querySelectorAll('input[type="checkbox"]');
    if(allCb.length === 0) return;
    let checkedCount = 0;
    allCb.forEach(cb => { if(cb.checked) checkedCount++; });
    const percentage = Math.round((checkedCount / allCb.length) * 100);
    document.getElementById('progress-fill').style.width = percentage + '%';
    document.getElementById('progress-text').innerText = percentage + '%';
  }

  function saveProgress() {
    const sections = Array.from(document.querySelectorAll('.topic-card')).map(card => card.classList.contains('completed'));
    localStorage.setItem('studyProgressSections_v3', JSON.stringify(sections));
  }

  window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.topic-card');
    const savedState = JSON.parse(localStorage.getItem('studyProgressSections_v3'));
    if (savedState && savedState.length === sections.length) {
      sections.forEach((card, index) => {
        if(savedState[index]) {
          markSectionComplete(card.id, null);
          card.classList.remove('open');
        }
      });
    }
    updateProgress();
  });
</script>`;
html = html.replace(jsPattern, newJs);

// Insert the sections!
html = html.replace('<!-- ══ ENGINE CYCLES ══ -->', `<!-- ══ ENGINE CYCLES ══ -->
<div class="topic-card" id="section-1">
  <div class="topic-header" onclick="toggleCard('section-1')">
    <h3 class="topic-title">⚙️ Engine Cycles</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-1"> 🔥 Study the Otto Cycle</label>
      <label><input type="checkbox" class="cb-section-1"> 📐 Practice Temperature (T) calculation in Otto cycle</label>
      <label><input type="checkbox" class="cb-section-1"> 🚜 Study the Diesel Cycle</label>
      <label><input type="checkbox" class="cb-section-1"> 📊 Draw and explain PV diagram of Otto Cycle</label>
      <label><input type="checkbox" class="cb-section-1"> 📉 Draw and explain PV diagram of Diesel Cycle</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ PV CALCULATION TABLE ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-1', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ PV CALCULATION TABLE ══ -->
<div class="topic-card" id="section-2">
  <div class="topic-header" onclick="toggleCard('section-2')">
    <h3 class="topic-title">🧮 Thermodynamic Calculations</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-2"> 📐 Practice Pressure (P) calculation in Otto cycle</label>
      <label><input type="checkbox" class="cb-section-2"> 📐 Practice Temperature (T) calculation in Diesel cycle</label>
      <label><input type="checkbox" class="cb-section-2"> 📐 Practice Pressure (P) calculation in Diesel cycle</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ FUEL-AIR MIXTURE ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-2', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ FUEL-AIR MIXTURE ══ -->
<div class="topic-card" id="section-3">
  <div class="topic-header" onclick="toggleCard('section-3')">
    <h3 class="topic-title">⛽ Fuel–Air Mixture Concepts</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-3"> ⚖️ Understand Air Fuel Ratio (AFR)</label>
      <label><input type="checkbox" class="cb-section-3"> 🔬 Understand Equivalence Ratio (φ)</label>
      <label><input type="checkbox" class="cb-section-3"> 🟢 Understand Lean mixture</label>
      <label><input type="checkbox" class="cb-section-3"> 🔴 Understand Rich mixture</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ 4 STROKES ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-3', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ 4 STROKES ══ -->
<div class="topic-card" id="section-4">
  <div class="topic-header" onclick="toggleCard('section-4')">
    <h3 class="topic-title">🔄 IC Engine Operation</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-4"> 🔁 Memorize 4 strokes of Internal Combustion Engine</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-4"> Intake stroke</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-4"> Compression stroke</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-4"> Power stroke</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-4"> Exhaust stroke</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ ENGINE CALCULATIONS ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-4', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ ENGINE CALCULATIONS ══ -->
<div class="topic-card" id="section-5">
  <div class="topic-header" onclick="toggleCard('section-5')">
    <h3 class="topic-title">📏 Engine Calculations</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-5"> 📊 Calculate engine efficiency (η)</label>
      <label><input type="checkbox" class="cb-section-5"> 📦 Practice engine volume calculation</label>
      <label><input type="checkbox" class="cb-section-5"> 🧠 Understand swept volume vs clearance volume</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace(/<!-- ══════════════════════════════════════════[\r\n]+     SECTION B BANNER/g, `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-5', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══════════════════════════════════════════\\n     SECTION B BANNER`);

html = html.replace('<!-- ══ THERMODYNAMIC LAWS ══ -->', `<!-- ══ THERMODYNAMIC LAWS ══ -->
<div class="topic-card" id="section-6">
  <div class="topic-header" onclick="toggleCard('section-6')">
    <h3 class="topic-title">🌡️ Thermodynamics</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-6"> 📘 Study Zeroth Law of Thermodynamics</label>
      <label><input type="checkbox" class="cb-section-6"> 📘 Study First Law of Thermodynamics</label>
      <label><input type="checkbox" class="cb-section-6"> 📘 Study Second Law of Thermodynamics</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ ENERGY SOURCES ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-6', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ ENERGY SOURCES ══ -->
<div class="topic-card" id="section-7">
  <div class="topic-header" onclick="toggleCard('section-7')">
    <h3 class="topic-title">⚡ Energy Sources</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-7"> ☀️ Renewable energy sources</label>
      <label><input type="checkbox" class="cb-section-7"> 🛢️ Non-renewable energy sources</label>
      <label><input type="checkbox" class="cb-section-7"> ⚙️ Applications in mechanical engineering</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ EMISSIONS ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-7', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ EMISSIONS ══ -->
<div class="topic-card" id="section-8">
  <div class="topic-header" onclick="toggleCard('section-8')">
    <h3 class="topic-title">🌫️ Engine Emissions & Combustion Issues</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-8"> 🚗 Major emissions from Internal Combustion Engine</label>
      <label><input type="checkbox" class="cb-section-8"> 🌫️ Causes of CO emission</label>
      <label><input type="checkbox" class="cb-section-8"> ☁️ Causes of NOx emission</label>
      <label><input type="checkbox" class="cb-section-8"> 🌑 Causes of unburnt hydrocarbons</label>
      <label><input type="checkbox" class="cb-section-8"> 🔥 Understand engine knocking</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ GEAR RATIO NUMERICALS ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-8', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ GEAR RATIO NUMERICALS ══ -->
<div class="topic-card" id="section-9">
  <div class="topic-header" onclick="toggleCard('section-9')">
    <h3 class="topic-title">📐 Numerical Problems</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-9"> 🔢 Practice gear ratio calculations</label>
      <label><input type="checkbox" class="cb-section-9"> ⚖️ Practice AFR calculations</label>
      <label><input type="checkbox" class="cb-section-9"> 🔬 Practice equivalence ratio (φ) calculations</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- Emissions summary table -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-9', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- Emissions summary table -->
<div class="topic-card" id="section-10">
  <div class="topic-header" onclick="toggleCard('section-10')">
    <h3 class="topic-title" style="color:var(--red-eng);">⭐ Important Exam Question</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-10"> ✍️ Write the major emissions of an Internal Combustion Engine with reasons</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-10"> CO</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-10"> CO₂</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-10"> NOx</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-10"> Unburnt Hydrocarbons</label>
      <label style="margin-left: 20px;"><input type="checkbox" class="cb-section-10"> Particulate Matter</label>
    </div>
  </div>
  <div class="topic-content">`);

html = html.replace('<!-- ══ QUICK REFERENCE CARD ══ -->', `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-10', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ QUICK REFERENCE CARD ══ -->`);

fs.writeFileSync('index.html', html, 'utf8');
