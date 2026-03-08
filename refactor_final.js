const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
    {
        target: '<!-- ══ ENGINE CYCLES ══ -->',
        replacement: `<!-- ══ ENGINE CYCLES ══ -->
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ PV CALCULATION TABLE ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-1', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ FUEL-AIR MIXTURE ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-2', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ 4 STROKES ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-3', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ ENGINE CALCULATIONS ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-4', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══════════════════════════════════════════\\r\\n     SECTION B BANNER\\r\\n══════════════════════════════════════════ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-5', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══════════════════════════════════════════\r\n     SECTION B BANNER\r\n══════════════════════════════════════════ -->`
    },
    // In case file uses only \n instead of \r\n
    {
        target: '<!-- ══════════════════════════════════════════\\n     SECTION B BANNER\\n══════════════════════════════════════════ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-5', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══════════════════════════════════════════\n     SECTION B BANNER\n══════════════════════════════════════════ -->`
    },
    {
        target: '<!-- ══ THERMODYNAMIC LAWS ══ -->',
        replacement: `<!-- ══ THERMODYNAMIC LAWS ══ -->
<div class="topic-card" id="section-6">
  <div class="topic-header" onclick="toggleCard('section-6')">
    <h3 class="topic-title">🌡️ Thermodynamics</h3>
    <div class="checklist-preview">
      <label><input type="checkbox" class="cb-section-6"> 📘 Study Zeroth Law of Thermodynamics</label>
      <label><input type="checkbox" class="cb-section-6"> 📘 Study First Law of Thermodynamics</label>
      <label><input type="checkbox" class="cb-section-6"> 📘 Study Second Law of Thermodynamics</label>
    </div>
  </div>
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ ENERGY SOURCES ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-6', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ EMISSIONS ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-7', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ GEAR RATIO NUMERICALS ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-8', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- Emissions summary table -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-9', event)">✅ Mark as Completed</button></div>
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
  <div class="topic-content">`
    },
    {
        target: '<!-- ══ QUICK REFERENCE CARD ══ -->',
        replacement: `<div class="action-row"><button class="mark-completed-btn" onclick="markSectionComplete('section-10', event)">✅ Mark as Completed</button></div>
  </div>
</div>

<!-- ══ QUICK REFERENCE CARD ══ -->`
    }
];

let didFail = false;
for (let rule of replacements) {
    if (html.includes(rule.target)) {
        // only replace the first occurrence
        html = html.replace(rule.target, rule.replacement);
    } else {
        console.error("COULD NOT FIND:", rule.target);
        if (rule.target.includes('SECTION B BANNER')) {
            // It's a fallback rule, ignore
        } else {
            didFail = true;
        }
    }
}

if (!didFail) {
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Success!");
} else {
    console.log("Failed some replacements. Did not save.");
}
