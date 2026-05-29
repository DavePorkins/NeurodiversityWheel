// Mapping Neurodiversity - Cosmic Flanking Logic v3.3.7
// Implements 2-column layout flanking legend nodes inside SVG, requestAnimationFrame JS glide node evasion animations, flatter bezier connectors, mathematically centered absolute range slider ticks with Kaum/Extrem side labels, and relaxed breathing margins.

// --- 1. CONFIGURATION & STATE ---
let CENTER_X = 475;
let CENTER_Y = 300;
let CENTER = 300; // legacy placeholder
let MAX_RADIUS = 180; // slightly smaller to give breathing space for flanking legend nodes
const INNER_RADIUS = 32; 
const TOTAL_AXES = 22;

function updateLayoutConstants() {
  if (typeof window !== "undefined" && window.innerWidth < 1200) {
    CENTER_X = 475;
    CENTER_Y = 550;
    MAX_RADIUS = 310; /* Fixed large stable mobile radius */
  } else {
    CENTER_X = 475;
    CENTER_Y = 300; /* CENTER_Y set to 300 to center the wheel perfectly in the 600px-high desktop SVG viewport */
    MAX_RADIUS = 205; /* Fixed large stable desktop radius */
  }
}

// Safe CSS custom property set utility for mock DOM & browser compatibility
function safeSetProperty(el, prop, val) {
  if (el && el.style) {
    if (typeof el.style.setProperty === "function") {
      el.style.setProperty(prop, val);
    } else {
      el.style[prop] = val;
    }
  }
}

let userRatings = {};
const STORAGE_KEY = "mapping_neurodiversity_user_profile_perfect";

let activeProfiles = {
  user: true,
  nt: true,
  adhd: true,
  asd: true,
  audhd: true
};

let activeParamId = 1;
let previousParamId = null;
let audioCtx = null;
let soundEnabled = localStorage.getItem("mapping_neurodiversity_sound") !== "off";
let animationsEnabled = localStorage.getItem("mapping_neurodiversity_animations") !== "off";
let zoomFactor = 1.5;
let persistentNodes = {}; // global cache of current coordinates for JS glide transition
let animationFrameId = null;

// Speech Synthesis & Standalone Player state
let speechRate = parseFloat(localStorage.getItem("mapping_neurodiversity_speech_rate")) || 1.0;
let currentSpeechKey = null; // 'main', 'nt', 'adhd', 'asd', 'audhd'
let currentSpeakingText = ""; // Holds the exact string currently loaded in TTS
let isSpeechPaused = false;
let currentUtterance = null; // Global utterance reference to prevent Chrome garbage collection crash

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadUserProfile();
  initParameterList(); // Build left list index column
  
  // Initialize Font-Zoom from localStorage
  const savedZoom = localStorage.getItem("mapping_neurodiversity_zoom");
  if (savedZoom !== null) {
    zoomFactor = parseFloat(savedZoom);
  } else {
    zoomFactor = 1.5;
  }
  document.documentElement.style.setProperty('--zoom-factor', zoomFactor);
  const badge = document.getElementById("zoom-level-badge");
  if (badge) {
    badge.textContent = Math.round(zoomFactor * 100) + "%";
  }

  initChart();
  selectParameter(1, true);
  animateIntro();
  
  // Initialize resize and viewBox cropping
  handleResize();
  window.addEventListener("resize", handleResize);
  
  // Sway animations are disabled in v1.7 to focus on static readability & prevent CPU lag
  
  // Initialize Sound and Animations toggles states
  updateSoundBtn();
  updateAnimationsBtn();
  if (animationsEnabled) {
    document.body.classList.add("animations-enabled");
  } else {
    document.body.classList.remove("animations-enabled");
  }
});

// --- 2. THEME & LOCAL STORAGE ---
function adjustZoom(delta) {
  zoomFactor = parseFloat((zoomFactor + delta).toFixed(2));
  if (zoomFactor < 0.7) zoomFactor = 0.7;
  if (zoomFactor > 2.2) zoomFactor = 2.2;
  
  localStorage.setItem("mapping_neurodiversity_zoom", zoomFactor);
  
  // Apply zoom factor to CSS
  document.documentElement.style.setProperty('--zoom-factor', zoomFactor);
  
  // Update zoom badge UI
  const badge = document.getElementById("zoom-level-badge");
  if (badge) {
    badge.textContent = Math.round(zoomFactor * 100) + "%";
  }
  
  // Re-draw chart on the fly for dynamic edge collision avoidance!
  initChart();
}

function syncThemeColorMeta() {
  if (typeof document.createElement !== "function") return;
  
  const isDark = document.body.classList.contains("dark-mode");
  const color = isDark ? "#151121" : "#faf7f2";
  
  // Remove any existing theme-color meta tags
  const existingMeta = document.querySelectorAll('meta[name="theme-color"]');
  if (existingMeta && typeof existingMeta.forEach === "function") {
    existingMeta.forEach(meta => {
      if (meta && typeof meta.remove === "function") meta.remove();
    });
  }
  
  // Re-create meta-theme-color tag to force repainting on iOS/Android system status & navigation bars!
  const newMeta = document.createElement("meta");
  newMeta.setAttribute("name", "theme-color");
  newMeta.setAttribute("content", color);
  if (document.head && typeof document.head.appendChild === "function") {
    document.head.appendChild(newMeta);
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("mapping_neurodiversity_theme") || "dark";
  document.body.className = savedTheme + "-mode";
  if (document.documentElement) {
    document.documentElement.className = savedTheme + "-mode";
  }
  updateThemeToggleIcon();
  syncThemeColorMeta();
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark-mode");
  const nextTheme = isDark ? "light" : "dark";
  document.body.className = nextTheme + "-mode";
  if (document.documentElement) {
    document.documentElement.className = nextTheme + "-mode";
  }
  localStorage.setItem("mapping_neurodiversity_theme", nextTheme);
  updateThemeToggleIcon();
  syncThemeColorMeta();
  
  // Dynamic color updating for HSL background segments on theme change!
  initChart();
  
  // Warm sine tone feedback
  triggerChime(nextTheme === "dark" ? 220 : 440, "sine", 0.05, 0.25);
}

function updateThemeToggleIcon() {
  const btn = document.getElementById("theme-toggle-btn");
  if (btn) {
    if (document.body.classList.contains("dark-mode")) {
      btn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      btn.setAttribute("title", "Farbschema wechseln (zu Hell)");
    } else {
      btn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      btn.setAttribute("title", "Farbschema wechseln (zu Dunkel)");
    }
  }
}

function loadUserProfile() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      userRatings = JSON.parse(savedData);
    } catch (e) {
      console.error("Failed to parse user profile", e);
      initializeDefaultRatings();
    }
  } else {
    initializeDefaultRatings();
  }
}

function saveUserProfile() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userRatings));
}

function resetUserProfile() {
  if (confirm("Möchtest du dein Spektrum-Profil wirklich auf Stufe 1 zurücksetzen?")) {
    initializeDefaultRatings();
    selectParameter(activeParamId, true);
    drawWedges();
    drawOverlays();
    initParameterList();
    triggerChime(150, "sine", 0.1, 0.4);
  }
}

function initializeDefaultRatings() {
  // Start all parameters at Level 1 (clean flower shape)
  for (let i = 1; i <= TOTAL_AXES; i++) {
    userRatings[i] = 1;
  }
  saveUserProfile();
}

// --- 3. MATHEMATICS & POLAR MATH ---
function getCoords(index, radiusVal) {
  updateLayoutConstants();
  const angle = (index * 2 * Math.PI / TOTAL_AXES) - (Math.PI / 2);
  const x = CENTER_X + radiusVal * Math.cos(angle);
  const y = CENTER_Y + radiusVal * Math.sin(angle);
  return { x, y };
}

// Generates pie-slice arc path
function getWedgePath(cx, cy, rInner, rOuter, startAngle, endAngle) {
  const x1_in = cx + rInner * Math.cos(startAngle);
  const y1_in = cy + rInner * Math.sin(startAngle);
  const x2_in = cx + rInner * Math.cos(endAngle);
  const y2_in = cy + rInner * Math.sin(endAngle);
  
  const x1_out = cx + rOuter * Math.cos(startAngle);
  const y1_out = cy + rOuter * Math.sin(startAngle);
  const x2_out = cx + rOuter * Math.cos(endAngle);
  const y2_out = cy + rOuter * Math.sin(endAngle);
  
  return `
    M ${x1_in} ${y1_in}
    L ${x1_out} ${y1_out}
    A ${rOuter} ${rOuter} 0 0 1 ${x2_out} ${y2_out}
    L ${x2_in} ${y2_in}
    A ${rInner} ${rInner} 0 0 0 ${x1_in} ${y1_in}
    Z
  `.trim().replace(/\s+/g, ' ');
}

// PREMIUM polish: Generates a perfectly smooth closed Catmull-Rom interpolating spline curve
// to turn jagged zig-zags into organic, flowing rounded shapes that pass EXACTLY through the data points!
// Optional waveType parameter adds subtle concentric slithering waves for the Neurotypical baseline.
function getPolygonPath(scores, waveType = null) {
  updateLayoutConstants();
  let points = [];
  const stepSize = (MAX_RADIUS - INNER_RADIUS) / 5;

  for (let i = 0; i < TOTAL_AXES; i++) {
    const paramId = i + 1;
    let rating = scores[paramId] || 1;

    // Force NT baseline rating to exactly 1.5, placing it in the middle of Level 1 and Level 2
    if (waveType === "nt-wave-1") {
      rating = 1.5;
    }

    let currentRadius = INNER_RADIUS + (rating * stepSize);

    // Apply a perfectly regular, highly detailed 11-period alternating wave for the Neurotypical baseline
    // By using Nyquist frequency (11 cycles over 22 axes) with a Pi/4 phase shift, the wave alternates perfectly 
    // at every single axis, creating a 100% symmetric, regular, and beautifully soft curvy gear/flower line!
    if (waveType === "nt-wave-1") {
      currentRadius += Math.sin(i * Math.PI + Math.PI / 4) * (stepSize * 0.20);
    }

    // Clamp radius to ensure it never exceeds MAX_RADIUS or goes below INNER_RADIUS
    currentRadius = Math.max(INNER_RADIUS, Math.min(MAX_RADIUS, currentRadius));

    points.push(getCoords(i, currentRadius));
  }

  if (points.length < 3) return "";

  // Helper to clamp any calculated point to MAX_RADIUS to guarantee 0% overshoot beyond outer boundaries
  function clampToMax(pt) {
    const dx = pt.x - CENTER_X;
    const dy = pt.y - CENTER_Y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > MAX_RADIUS) {
      return {
        x: CENTER_X + (dx / dist) * MAX_RADIUS,
        y: CENTER_Y + (dy / dist) * MAX_RADIUS
      };
    }
    return pt;
  }

  let path = "";
  const n = points.length;
  const tension = 0.0; // Complete soft roundness (0.0) for highly fluid, smooth curves!

  // Start path exactly at the first point (clamped)
  const pStart = clampToMax(points[0]);
  path += `M ${pStart.x.toFixed(2)},${pStart.y.toFixed(2)}`;

  // Draw cubic Bezier segments to interpolate through all points
  for (let i = 0; i < n; i++) {
    const p0 = clampToMax(points[(i - 1 + n) % n]);
    const p1 = clampToMax(points[i]);
    const p2 = clampToMax(points[(i + 1) % n]);
    const p3 = clampToMax(points[(i + 2) % n]);

    // Calculate control points without clamping to preserve perfect C1 tangent continuity (removing spikiness)
    const cp1 = {
      x: p1.x + (p2.x - p0.x) * (1 - tension) / 6,
      y: p1.y + (p2.y - p0.y) * (1 - tension) / 6
    };

    const cp2 = {
      x: p2.x - (p3.x - p1.x) * (1 - tension) / 6,
      y: p2.y - (p3.y - p1.y) * (1 - tension) / 6
    };

    path += ` C ${cp1.x.toFixed(2)},${cp1.y.toFixed(2)} ${cp2.x.toFixed(2)},${cp2.y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }

  return path + " Z";
}



// --- 4. PARAMETER LIST & CHART RENDERING ---

// Build Left Scrollable Parameter Index Column (Mobile Drawer) and Unified Parameter Legend Grid (Desktop Dashboard) dynamically
function initParameterList() {
  // 1. Mobile index drawer container
  const listContainer = document.getElementById("parameter-list-group");
  if (listContainer) {
    listContainer.innerHTML = "";
    palaceData.forEach((data, idx) => {
      const paramId = data.id;
      const hue = idx * (360 / TOTAL_AXES);
      
      const item = document.createElement("div");
      item.className = `parameter-list-item ${paramId === activeParamId ? 'active' : ''}`;
      item.id = `list-item-${paramId}`;
      item.innerHTML = `
        <span class="list-num" style="background: hsl(${hue}, 72%, 60%); color: #fff;">${paramId}</span>
        <span class="list-name">${data.nameDE}</span>
      `;
      item.addEventListener("click", () => {
        selectParameter(paramId);
      });
      listContainer.appendChild(item);
    });
  }

  // 2. Desktop Unified Dashboard Legend Grid container
  const legendGrid = document.getElementById("parameter-legend-grid");
  if (legendGrid) {
    legendGrid.innerHTML = "";
    palaceData.forEach((data, idx) => {
      const paramId = data.id;
      const hue = idx * (360 / TOTAL_AXES);
      
      const pill = document.createElement("div");
      pill.className = `legend-pill ${paramId === activeParamId ? 'active' : ''}`;
      pill.id = `legend-pill-${paramId}`;
      
      if (paramId === activeParamId) {
        safeSetProperty(pill, "--active-color", `hsl(${hue}, 85%, 62%)`);
        safeSetProperty(pill, "--active-hue", hue);
      }
      
      pill.innerHTML = `
        <span class="legend-num" style="background: hsl(${hue}, 72%, 60%);">${paramId}</span>
        <span class="legend-name" title="${data.nameDE}">${data.nameDE}</span>
      `;
      pill.addEventListener("click", () => {
        selectParameter(paramId);
      });
      legendGrid.appendChild(pill);
    });
  }
}

function initChart() {
  updateLayoutConstants();
  const bgGroup = document.getElementById("wedges-background-group");
  const labelsGroup = document.getElementById("wedges-labels-group");
  const connectorsGroup = document.getElementById("wedges-connectors-group");
  const legendGroup = document.getElementById("wedges-legend-nodes-group");
  
  bgGroup.innerHTML = "";
  labelsGroup.innerHTML = "";

  const isMobile = window.innerWidth < 1200;
  const stepSize = (MAX_RADIUS - INNER_RADIUS) / 5;

  // Sync index.html static SVGs centered rings to responsive coordinates
  const boundaryRing = document.getElementById("chart-boundary-ring");
  const boundaryRingOuter = document.getElementById("chart-boundary-ring-outer");
  const centerHole = document.getElementById("chart-center-hole");
  if (boundaryRing) {
    boundaryRing.setAttribute("cx", CENTER_X);
    boundaryRing.setAttribute("cy", CENTER_Y);
    boundaryRing.setAttribute("r", MAX_RADIUS);
  }
  if (boundaryRingOuter) {
    boundaryRingOuter.setAttribute("cx", CENTER_X);
    boundaryRingOuter.setAttribute("cy", CENTER_Y);
    boundaryRingOuter.setAttribute("r", MAX_RADIUS + 6);
  }
  if (centerHole) {
    centerHole.setAttribute("cx", CENTER_X);
    centerHole.setAttribute("cy", CENTER_Y);
  }
  const centerLogo = document.getElementById("chart-center-logo");
  if (centerLogo) {
    centerLogo.setAttribute("transform", `translate(${CENTER_X}, ${CENTER_Y})`);
  }


  // Draw Background segments and Radial indicators
  for (let i = 0; i < TOTAL_AXES; i++) {
    const paramId = i + 1;
    const data = palaceData.find(p => p.id === paramId);
    if (!data) continue;
    
    const midAngle = (i * 2 * Math.PI / TOTAL_AXES) - (Math.PI / 2);
    const startAngle = midAngle - (Math.PI / TOTAL_AXES) + 0.012;
    const endAngle = midAngle + (Math.PI / TOTAL_AXES) - 0.012;

    // 4.1 Draw Background block segments (Pre-colored default soft pastel rainbow!)
    for (let level = 1; level <= 5; level++) {
      const rIn = INNER_RADIUS + (level - 1) * stepSize;
      const rOut = INNER_RADIUS + level * stepSize;
      
      const blockPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      blockPath.setAttribute("d", getWedgePath(CENTER_X, CENTER_Y, rIn, rOut, startAngle, endAngle));
      blockPath.setAttribute("class", "wedge-background");
      
      const hue = i * (360 / TOTAL_AXES);
      const isLight = document.body.classList.contains("light-mode");
      const bgFill = isLight ? `hsla(${hue}, 65%, 85%, 0.28)` : `hsla(${hue}, 40%, 25%, 0.22)`;
      const bgStroke = isLight ? `hsla(${hue}, 50%, 75%, 0.3)` : `hsla(${hue}, 35%, 20%, 0.25)`;
      
      blockPath.style.fill = bgFill;
      blockPath.style.stroke = bgStroke;
      
      blockPath.addEventListener("click", () => {
        selectParameter(paramId);
      });

      bgGroup.appendChild(blockPath);
    }

    // Upright Indicator Framing (Outlining the entire wedge sector)
    const indicatorRing = document.createElementNS("http://www.w3.org/2000/svg", "path");
    indicatorRing.setAttribute("d", getWedgePath(CENTER_X, CENTER_Y, INNER_RADIUS, MAX_RADIUS, startAngle, endAngle));
    indicatorRing.setAttribute("class", "wedge-axis-indicator");
    indicatorRing.setAttribute("id", `axis-indicator-${paramId}`);
    bgGroup.appendChild(indicatorRing);

    // 4.2 DRAW RADIAL INDICATORS (UPRIGHT CLEAN BOLD NUMBERS WITH GLOWING BADGES!)
    const textCoords = getCoords(i, MAX_RADIUS + 22);

    const textBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    textBg.setAttribute("cx", textCoords.x);
    textBg.setAttribute("cy", textCoords.y);
    textBg.setAttribute("r", "13");
    textBg.setAttribute("class", "svg-axis-label-bg");
    textBg.setAttribute("id", `svg-axis-label-bg-${paramId}`);
    textBg.style.fill = "none";
    textBg.style.stroke = "none";
    textBg.style.cursor = "pointer";
    textBg.addEventListener("click", () => {
      selectParameter(paramId);
    });
    labelsGroup.appendChild(textBg);
    
    const textLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textLabel.setAttribute("x", textCoords.x);
    textLabel.setAttribute("y", textCoords.y + 0.5);
    textLabel.setAttribute("class", "svg-axis-label");
    textLabel.setAttribute("id", `svg-axis-label-${paramId}`);
    textLabel.setAttribute("text-anchor", "middle");
    textLabel.setAttribute("transform", "");
    textLabel.textContent = paramId;
    textLabel.addEventListener("click", () => {
      selectParameter(paramId);
    });
    labelsGroup.appendChild(textLabel);
  }

  // DYNAMIC COLLISION-AVOIDANCE PHYSICS ENGINE (v3.6-PhysicsPro)
  if (legendGroup && connectorsGroup) {
    const isLight = document.body.classList.contains("light-mode");
    const minCircleDist = MAX_RADIUS + 48 * zoomFactor; // stable wheel + radial labels clearance
    const nodes = [];

    // Pre-calculate ideal coordinates and text dimensions for all 20 nodes
    for (let i = 0; i < TOTAL_AXES; i++) {
      const paramId = i + 1;
      const data = palaceData.find(p => p.id === paramId);
      if (!data) continue;
      
      const textCoords = getCoords(i, MAX_RADIUS + 22);

      let idealAngle = 0;
      let isLeft = false;
      
      const s_min = Math.sin(-1.42); // increased angular spread to utilize empty top/bottom space
      const s_max = Math.sin(1.42);
      
      if (paramId >= 12 && paramId <= 22) {
        const slotIndex = 22 - paramId; // 0 to 10
        const t = slotIndex / 10;
        const s = s_min + t * (s_max - s_min); // Go from -1.42 to +1.42 (top to bottom)
        idealAngle = Math.PI - Math.asin(s); // Left side: cosine will be negative
        isLeft = true;
      } else {
        const slotIndex = paramId - 1; // 0 to 10
        const t = slotIndex / 10;
        const s = s_min + t * (s_max - s_min); // Go from -1.42 to +1.42 (top to bottom)
        idealAngle = Math.asin(s); // Right side: cosine will be positive
        isLeft = false;
      }

      const R_x_ideal = isMobile ? MAX_RADIUS + 95 : MAX_RADIUS + 175;
      const R_y_ideal = isMobile ? MAX_RADIUS + 205 : MAX_RADIUS + 125;

      const idealX = CENTER_X + R_x_ideal * Math.cos(idealAngle);
      const idealY = CENTER_Y + R_y_ideal * Math.sin(idealAngle);

      const mobileLabelSplits = {
        1: ["Akute", "Reizüberflutung"],
        2: ["Suche nach", "Vertrautheit"],
        3: ["Schwierigkeiten mit", "sozialen Signalen"],
        4: ["Suche nach", "Gleichförmigkeit"],
        5: ["Aufgaben-", "Paralyse"],
        6: ["Aus den Augen,", "aus dem Sinn"],
        7: ["Impulsivität"],
        8: ["Zeitblindheit"],
        9: ["Dopamin-", "Suche"],
        10: ["Hyperaktivität", "(Körper/Geist)"],
        11: ["Exekutive", "Dysfunktion"],
        12: ["Maskierung"],
        13: ["Körperliche", "Selbstregulation"],
        14: ["Emotionale", "Dysregulation"],
        15: ["Sensorische", "Besonderheiten"],
        16: ["Spezialinteressen /", "Hyperfixationen"],
        17: ["Priorisierungs-", "probleme"],
        18: ["Interozeptions-", "Probleme"],
        19: ["Sensibilität für", "Zurückweisung"],
        20: ["Bedürfnis nach", "Routine"],
        21: ["Autistische", "Trägheit"],
        22: ["Neurodivergenter", "Burnout"]
      };

      const lines = mobileLabelSplits[paramId] || [data.nameDE];
      let maxCharLen = 0;
      lines.forEach(l => { if (l.length > maxCharLen) maxCharLen = l.length; });

      // Approximate dynamic text bounding box relative to zoomFactor
      const approxWidth = maxCharLen * 7.5 * zoomFactor + 32; // balanced bounding box for safety
      const approxHeight = lines.length * 16.0 * zoomFactor + 14; // balanced multiplier for safe clamped line spacing headroom!

      nodes.push({
        id: paramId,
        hue: i * (360 / TOTAL_AXES),
        idealX,
        idealY,
        x: idealX,
        y: idealY,
        approxWidth,
        approxHeight,
        isLeft,
        lines,
        data,
        xCircle: textCoords.x,
        yCircle: textCoords.y
      });
    }

    // Run synchronous relaxation solver (95 iterations for perfect convergence)
    const iterations = 95;

    for (let iter = 0; iter < iterations; iter++) {
      // 1. Attraction force to ideal orbit
      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        node.x += (node.idealX - node.x) * 0.15;
        node.y += (node.idealY - node.y) * 0.15;
      }

      // 2. Central wheel circle collision avoidance
      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        const dx = node.x - CENTER_X;
        const dy = node.y - CENTER_Y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minCircleDist) {
          const push = minCircleDist - dist;
          node.x += (dx / dist) * push * 0.75;
          node.y += (dy / dist) * push * 0.75;
        }
      }

      // 3. Node-to-node overlapping text box repulsion (Verlet Position-Based Relaxation)
      for (let j = 0; j < nodes.length; j++) {
        const nodeA = nodes[j];
        const rectA = {
          left: nodeA.isLeft ? nodeA.x - nodeA.approxWidth : nodeA.x - 15,
          right: nodeA.isLeft ? nodeA.x + 15 : nodeA.x + nodeA.approxWidth,
          top: nodeA.y - nodeA.approxHeight / 2,
          bottom: nodeA.y + nodeA.approxHeight / 2
        };

        for (let k = j + 1; k < nodes.length; k++) {
          const nodeB = nodes[k];
          if (nodeA.isLeft !== nodeB.isLeft) continue; // Only same column side

          const rectB = {
            left: nodeB.isLeft ? nodeB.x - nodeB.approxWidth : nodeB.x - 15,
            right: nodeB.isLeft ? nodeB.x + 15 : nodeB.x + nodeB.approxWidth,
            top: nodeB.y - nodeB.approxHeight / 2,
            bottom: nodeB.y + nodeB.approxHeight / 2
          };

          const overlapsX = rectA.left < rectB.right && rectA.right > rectB.left;
          const overlapsY = rectA.top < rectB.bottom && rectA.bottom > rectB.top;

          if (overlapsX && overlapsY) {
            // Push vertically apart with a dynamic minimum safe padding to prevent adjacent overlapping
            const minPadding = 8 * zoomFactor;
            const overlapY = Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top) + minPadding;
            
            let dirY = 0;
            if (nodeA.y < nodeB.y) {
              dirY = -1;
            } else if (nodeA.y > nodeB.y) {
              dirY = 1;
            } else {
              dirY = nodeA.id < nodeB.id ? -1 : 1; // tie-breaker
            }

            const pushY = overlapY * 0.55 * dirY;
            nodeA.y += pushY * 0.5;
            nodeB.y -= pushY * 0.5;

            // Push slightly horizontally to allow sliding past
            const overlapX = Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left);
            let dirX = nodeA.x < nodeB.x ? -1 : 1;
            const pushX = overlapX * 0.15 * dirX;
            nodeA.x += pushX * 0.5;
            nodeB.x -= pushX * 0.5;

            // Update rects in-place for immediately subsequent iterations
            rectA.top += pushY * 0.5;
            rectA.bottom += pushY * 0.5;
            rectA.left += pushX * 0.5;
            rectA.right += pushX * 0.5;
          }
        }
      }

      // 4. Strict clamping to viewport limits (never cut off any text!)
      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        if (isMobile) {
          if (node.isLeft) {
            const minX = -10 + node.approxWidth;
            const maxX = CENTER_X - 60;
            if (node.x < minX) node.x = minX;
            if (node.x > maxX) node.x = maxX;
          } else {
            const minX = CENTER_X + 60;
            const maxX = 950 - node.approxWidth;
            if (node.x < minX) node.x = minX;
            if (node.x > maxX) node.x = maxX;
          }
          const minY = 45 + node.approxHeight / 2;
          const maxY = 1055 - node.approxHeight / 2;
          if (node.y < minY) node.y = minY;
          if (node.y > maxY) node.y = maxY;
        } else {
          if (node.isLeft) {
            const minX = -10 + node.approxWidth;
            const maxX = CENTER_X - 80;
            if (node.x < minX) node.x = minX;
            if (node.x > maxX) node.x = maxX;
          } else {
            const minX = CENTER_X + 80;
            const maxX = 950 - node.approxWidth;
            if (node.x < minX) node.x = minX;
            if (node.x > maxX) node.x = maxX;
          }
          const minY = 30 + node.approxHeight / 2;
          const maxY = 570 - node.approxHeight / 2;
          if (node.y < minY) node.y = minY;
          if (node.y > maxY) node.y = maxY;
        }
      }
    }

    // Trigger smooth, unified, hardware-accelerated JS-based glide animation for all nodes!
    animateNodesToTargets(nodes);
  }

  // Draw fills & overlays
  drawWedges();
  drawOverlays();
}

function drawWedges() {
  updateLayoutConstants();
  const activeGroup = document.getElementById("wedges-active-group");
  activeGroup.innerHTML = "";

  if (!activeProfiles.user) return;

  const stepSize = (MAX_RADIUS - INNER_RADIUS) / 5;

  for (let i = 0; i < TOTAL_AXES; i++) {
    const paramId = i + 1;
    const rating = userRatings[paramId] || 1;
    const midAngle = (i * 2 * Math.PI / TOTAL_AXES) - (Math.PI / 2);
    const startAngle = midAngle - (Math.PI / TOTAL_AXES) + 0.012;
    const endAngle = midAngle + (Math.PI / TOTAL_AXES) - 0.012;

    for (let level = 1; level <= rating; level++) {
      const rIn = INNER_RADIUS + (level - 1) * stepSize;
      const rOut = INNER_RADIUS + level * stepSize;

      const activeBlock = document.createElementNS("http://www.w3.org/2000/svg", "path");
      activeBlock.setAttribute("d", getWedgePath(CENTER_X, CENTER_Y, rIn, rOut, startAngle, endAngle));
      activeBlock.setAttribute("class", "wedge-active");
      
      const hue = i * (360 / TOTAL_AXES);
      activeBlock.style.fill = `hsl(${hue}, 75%, 62%)`;
      activeBlock.style.stroke = `hsl(${hue}, 85%, 55%)`;
      activeBlock.style.filter = `drop-shadow(0 0 4px hsl(${hue}, 85%, 55%, 0.35))`;

      // Click fill block ONLY selects
      activeBlock.addEventListener("click", () => {
        selectParameter(paramId);
      });

      activeGroup.appendChild(activeBlock);
    }
  }
}

function drawOverlays() {
  const fillGroup = document.getElementById("polygon-overlays-fill-group");
  const strokeGroup = document.getElementById("polygon-overlays-stroke-group");
  if (!fillGroup || !strokeGroup) return;

  fillGroup.innerHTML = "";
  strokeGroup.innerHTML = "";

  function getReferenceScores(profileKey) {
    let scores = {};
    palaceData.forEach(p => {
      scores[p.id] = p.ratings[profileKey];
    });
    return scores;
  }

  const profiles = ["nt", "adhd", "asd", "audhd"];
  profiles.forEach(pKey => {
    if (activeProfiles[pKey]) {
      if (pKey === "nt") {
        // Draw ONE wavy slithering baseline for NT!
        const dPath = getPolygonPath(getReferenceScores(pKey), "nt-wave-1");

        // Append zart fill path to background layer
        const fillPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        fillPath.setAttribute("d", dPath);
        fillPath.setAttribute("class", "polygon-overlay-fill nt");
        fillGroup.appendChild(fillPath);

        // Append glowing outline stroke path to foreground layer (on top of wedges)
        const strokePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        strokePath.setAttribute("d", dPath);
        strokePath.setAttribute("class", "polygon-overlay-stroke nt");
        strokeGroup.appendChild(strokePath);
      } else {
        const dPath = getPolygonPath(getReferenceScores(pKey));

        // Append zart fill path to background layer
        const fillPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        fillPath.setAttribute("d", dPath);
        fillPath.setAttribute("class", `polygon-overlay-fill ${pKey}`);
        fillGroup.appendChild(fillPath);

        // Append glowing outline stroke path to foreground layer (on top of wedges)
        const strokePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        strokePath.setAttribute("d", dPath);
        strokePath.setAttribute("class", `polygon-overlay-stroke ${pKey}`);
        strokeGroup.appendChild(strokePath);

        // Draw glowing circular markers at vertices for high readability
        const refScores = getReferenceScores(pKey);
        for (let i = 0; i < TOTAL_AXES; i++) {
          const paramId = i + 1;
          const rating = refScores[paramId] || 1;
          const stepSize = (MAX_RADIUS - INNER_RADIUS) / 5;
          const currentRadius = INNER_RADIUS + (rating * stepSize);
          const coords = getCoords(i, currentRadius);

          const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          marker.setAttribute("cx", coords.x.toFixed(2));
          marker.setAttribute("cy", coords.y.toFixed(2));
          marker.setAttribute("class", `polygon-overlay-marker ${pKey}`);
          strokeGroup.appendChild(marker);
        }
      }
    }
  });
}

// --- 5. SELECTION & SIDEBAR UPDATING ---
function selectParameter(paramId, preventMobileDrawer = false) {
  activeParamId = paramId;
  const hue = (paramId - 1) * (360 / TOTAL_AXES);

  // Close list drawer but automatically slide in details drawer on mobile screens
  const listPanel = document.querySelector ? document.querySelector(".list-section") : null;
  if (listPanel) listPanel.classList.remove("mobile-show");
  const detailPanel = document.querySelector ? document.querySelector(".detail-section") : null;
  if (detailPanel) {
    if (window.innerWidth < 1200 && !preventMobileDrawer) {
      detailPanel.classList.add("mobile-show");
    } else {
      detailPanel.classList.remove("mobile-show");
    }
  }

  // Update header buttons active states on mobile
  const listBtn = document.getElementById("header-toggle-list");
  const detailBtn = document.getElementById("header-toggle-details");
  if (window.innerWidth < 1200) {
    if (listBtn) listBtn.classList.remove("active");
    if (detailBtn) {
      if (preventMobileDrawer) {
        detailBtn.classList.remove("active");
      } else {
        detailBtn.classList.add("active");
      }
    }
  }

  // Deactivate previous active elements if cached for buttery-smooth O(1) performance
  if (previousParamId !== null && previousParamId !== paramId) {
    const prevItem = document.getElementById(`list-item-${previousParamId}`);
    if (prevItem) prevItem.classList.remove("active");

    const prevRing = document.getElementById(`axis-indicator-${previousParamId}`);
    if (prevRing) {
      prevRing.classList.remove("active");
      if (prevRing.style) {
        prevRing.style.stroke = "";
        prevRing.style.filter = "";
      }
    }

    const prevLabel = document.getElementById(`svg-axis-label-${previousParamId}`);
    if (prevLabel) prevLabel.classList.remove("active");

    const prevLabelBg = document.getElementById(`svg-axis-label-bg-${previousParamId}`);
    if (prevLabelBg && prevLabelBg.style) {
      prevLabelBg.style.fill = "none";
      prevLabelBg.style.stroke = "none";
      prevLabelBg.style.filter = "";
    }

    const prevNodeGrp = document.getElementById(`legend-node-group-${previousParamId}`);
    if (prevNodeGrp) {
      prevNodeGrp.classList.remove("active");
      const badge = prevNodeGrp.querySelector(".legend-node-badge");
      if (badge && badge.style) {
        badge.style.fill = "";
        badge.style.stroke = "";
      }
    }

    const prevConnector = document.getElementById(`connector-line-${previousParamId}`);
    if (prevConnector) {
      prevConnector.classList.remove("active");
      if (prevConnector.style) {
        const prevHue = (previousParamId - 1) * (360 / TOTAL_AXES);
        const isLight = document.body.classList.contains("light-mode");
        prevConnector.style.stroke = isLight ? `hsla(${prevHue}, 50%, 45%, 0.24)` : `hsla(${prevHue}, 60%, 70%, 0.26)`;
        prevConnector.style.filter = "";
      }
    }

    const prevPill = document.getElementById(`legend-pill-${previousParamId}`);
    if (prevPill) {
      prevPill.classList.remove("active");
      safeSetProperty(prevPill, "--active-color", "");
      safeSetProperty(prevPill, "--active-hue", "");
    }
  } else if (previousParamId === null) {
    // Fallback: full sweep once on first initialization to clear any stale attributes
    document.querySelectorAll(".parameter-list-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".wedge-axis-indicator").forEach(ring => {
      ring.classList.remove("active");
      if (ring.style) {
        ring.style.stroke = "";
        ring.style.filter = "";
      }
    });
    document.querySelectorAll(".svg-axis-label").forEach(lbl => {
      lbl.classList.remove("active");
      if (lbl.style) {
        lbl.style.fill = "";
      }
    });
    document.querySelectorAll(".svg-axis-label-bg").forEach(bg => {
      if (bg.style) {
        bg.style.fill = "none";
        bg.style.stroke = "none";
        bg.style.filter = "";
      }
    });
    document.querySelectorAll(".legend-node-group").forEach(grp => {
      grp.classList.remove("active");
      const badge = grp.querySelector(".legend-node-badge");
      if (badge && badge.style) {
        badge.style.fill = "";
        badge.style.stroke = "";
      }
    });
    document.querySelectorAll(".connector-line").forEach(line => {
      line.classList.remove("active");
      if (line.style) {
        const idParts = line.id.split("-");
        const pId = parseInt(idParts[idParts.length - 1]);
        if (!isNaN(pId)) {
          const pHue = (pId - 1) * (360 / TOTAL_AXES);
          const isLight = document.body.classList.contains("light-mode");
          line.style.stroke = isLight ? `hsla(${pHue}, 50%, 45%, 0.24)` : `hsla(${pHue}, 60%, 70%, 0.26)`;
        } else {
          line.style.stroke = "";
        }
        line.style.filter = "";
      }
    });
    document.querySelectorAll(".legend-pill").forEach(pill => {
      pill.classList.remove("active");
      safeSetProperty(pill, "--active-color", "");
      safeSetProperty(pill, "--active-hue", "");
    });
  }

  // Highlight Left index item and scroll into view smoothly
  const activeItem = document.getElementById(`list-item-${paramId}`);
  if (activeItem) {
    activeItem.classList.add("active");
    if (activeItem.scrollIntoView) {
      activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  // Outer wedge active border ring indicator: dynamic color matching HSL hue!
  const activeRing = document.getElementById(`axis-indicator-${paramId}`);
  if (activeRing) {
    activeRing.classList.add("active");
    if (activeRing.style) {
      activeRing.style.stroke = `hsl(${hue}, 85%, 55%)`;
      activeRing.style.filter = `drop-shadow(0 0 8px hsl(${hue}, 85%, 55%, 0.8))`;
    }
  }

  // Selected perimeter number indicator: Dynamic HSL glowing match!
  const activeLabel = document.getElementById(`svg-axis-label-${paramId}`);
  if (activeLabel) {
    activeLabel.classList.add("active");
  }

  const activeLabelBg = document.getElementById(`svg-axis-label-bg-${paramId}`);
  if (activeLabelBg && activeLabelBg.style) {
    activeLabelBg.style.fill = `hsl(${hue}, 85%, 55%)`;
    activeLabelBg.style.stroke = `hsl(${hue}, 85%, 55%)`;
    activeLabelBg.style.strokeWidth = "2px";
    activeLabelBg.style.filter = `drop-shadow(0 0 6px hsl(${hue}, 85%, 55%, 0.65))`;
  }

  // Selected flanking node indicator and connector: Dynamic HSL glowing match!
  const activeNodeGrp = document.getElementById(`legend-node-group-${paramId}`);
  if (activeNodeGrp) {
    activeNodeGrp.classList.add("active");
    const badge = activeNodeGrp.querySelector(".legend-node-badge");
    if (badge && badge.style) {
      badge.style.fill = `hsl(${hue}, 85%, 62%)`;
      badge.style.stroke = `hsl(${hue}, 85%, 62%)`;
    }
  }

  const activeConnector = document.getElementById(`connector-line-${paramId}`);
  if (activeConnector) {
    activeConnector.classList.add("active");
    if (activeConnector.style) {
      activeConnector.style.stroke = `hsl(${hue}, 85%, 55%)`;
      activeConnector.style.filter = `drop-shadow(0 0 6px hsl(${hue}, 85%, 55%, 0.65))`;
    }
  }

  // Selected legend pill indicator: Dynamic HSL glowing match!
  const activePill = document.getElementById(`legend-pill-${paramId}`);
  if (activePill) {
    activePill.classList.add("active");
    safeSetProperty(activePill, "--active-color", `hsl(${hue}, 85%, 62%)`);
    safeSetProperty(activePill, "--active-hue", hue);
    if (activePill.scrollIntoView) {
      activePill.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  // Cache current selection as previous for the next iteration
  previousParamId = paramId;

  // Keep Speech Synthesis sync
  stopAllSpeech(true); // stop completely

  updateSidebar(paramId);
  syncViewportLock();
}

function updateSidebar(paramId) {
  const data = palaceData.find(p => p.id === paramId);
  if (!data) return;

  document.getElementById("detail-id").textContent = data.id;
  document.getElementById("detail-name-de").textContent = data.nameDE;
  document.getElementById("detail-name-en").textContent = data.nameEN;
  document.getElementById("detail-definition").textContent = data.definition;
  
  const scenarioEl = document.getElementById("detail-scenario");
  if (scenarioEl) {
    scenarioEl.textContent = data.scenario || "";
  }

  const score = userRatings[paramId] || 1;
  document.getElementById("user-score-slider").value = score;
  document.getElementById("label-user-score").textContent = `Stufe ${score}`;
  
  // Update parameter name in compact slider panel
  const sliderParamName = document.getElementById("slider-param-name");
  if (sliderParamName) {
    sliderParamName.textContent = data.nameDE;
  }

  // Inject current HSL hue into custom --param-color CSS property for dynamic styling!
  const hue = (paramId - 1) * (360 / TOTAL_AXES);
  safeSetProperty(document.documentElement, "--param-color", `hsl(${hue}, 78%, 62%)`);

  document.getElementById("detail-deep-dive").textContent = data.deepDive;

  document.getElementById("quote-nt").textContent = `„${data.voices.nt}“`;
  document.getElementById("quote-adhd").textContent = `„${data.voices.adhd}“`;
  document.getElementById("quote-asd").textContent = `„${data.voices.asd}“`;
  document.getElementById("quote-audhd").textContent = `„${data.voices.audhd}“`;

  document.getElementById("badge-nt-score").textContent = data.ratings.nt;
  document.getElementById("badge-adhd-score").textContent = data.ratings.adhd;
  document.getElementById("badge-asd-score").textContent = data.ratings.asd;
  document.getElementById("badge-audhd-score").textContent = data.ratings.audhd;

  // Sync scroll positioning
  const detailPanel = document.getElementById("detail-panel");
  detailPanel.scrollTo({ top: 0, behavior: "smooth" });
}

function handleSliderChange(val) {
  const rating = parseInt(val);
  userRatings[activeParamId] = rating;
  saveUserProfile();

  drawWedges();
  drawOverlays();

  document.getElementById("label-user-score").textContent = `Stufe ${rating}`;
  document.getElementById("user-score-slider").value = rating;



  // Active rating change trigger sound chimes
  triggerChime(220 + rating * 60, "sine", 0.04, 0.15);
}

function navigateParameter(direction) {
  let nextId = activeParamId + direction;
  if (nextId > TOTAL_AXES) nextId = 1;
  if (nextId < 1) nextId = TOTAL_AXES;
  selectParameter(nextId);
}

// --- 6. "DAS BIN ICH" / ADOPT VOICE RATING SHORTCUT ---
function adoptVoiceRating(voiceKey) {
  const data = palaceData.find(p => p.id === activeParamId);
  if (!data) return;

  const score = data.ratings[voiceKey];
  handleSliderChange(score);
  
  // Double pitch chime
  triggerChime(392 + score * 40, "sine", 0.06, 0.25);
  setTimeout(() => triggerChime(587 + score * 40, "sine", 0.06, 0.35), 80);
}

// --- 7. OVERLAY CONTROLLER ---
function toggleProfile(profileKey) {
  activeProfiles[profileKey] = !activeProfiles[profileKey];
  
  const btn = document.getElementById(`toggle-${profileKey}`);
  if (btn) {
    if (activeProfiles[profileKey]) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }

  drawWedges();
  drawOverlays();
}

// --- 8. MODALS & MOBILE LAYOUT DRAWERS ---
function syncViewportLock() {
  if (typeof document === "undefined" || !document.querySelector) return;
  const listEl = document.querySelector(".list-section");
  const detailEl = document.querySelector(".detail-section");
  const modalEl = document.getElementById("notes-modal");
  
  const isListOpen = listEl && listEl.classList && listEl.classList.contains("mobile-show");
  const isDetailOpen = detailEl && detailEl.classList && detailEl.classList.contains("mobile-show");
  const isModalOpen = modalEl && modalEl.classList && modalEl.classList.contains("active");
  
  const shouldLock = (isListOpen || isDetailOpen || isModalOpen) && (typeof window !== "undefined" && window.innerWidth < 1200);
  
  if (document.body && document.body.classList) {
    if (shouldLock) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
  }
}

function openNotesModal() {
  document.getElementById("notes-modal").classList.add("active");
  triggerChime(523.25, "sine", 0.08, 0.35);
  syncViewportLock();
  updateFeedbackButtonsVisibility();
}

function closeNotesModal() {
  document.getElementById("notes-modal").classList.remove("active");
  triggerChime(392, "sine", 0.04, 0.25);
  syncViewportLock();
}

// Floating Index and Details slide-in overlays for Android mobile browsers
function toggleMobilePanel(panelKey) {
  if (!document.querySelector) return;
  const listPanel = document.querySelector(".list-section");
  const detailPanel = document.querySelector(".detail-section");
  const listBtn = document.getElementById("header-toggle-list");
  const detailBtn = document.getElementById("header-toggle-details");

  if (panelKey === 'list') {
    if (!listPanel) return;
    const isShowing = listPanel.classList.toggle("mobile-show");
    
    if (isShowing) {
      if (detailPanel) detailPanel.classList.remove("mobile-show");
      if (listBtn) listBtn.classList.add("active");
      if (detailBtn) detailBtn.classList.remove("active");
    } else {
      if (listBtn) listBtn.classList.remove("active");
    }
    triggerChime(isShowing ? 400 : 300, "sine", 0.05, 0.2);
  } else {
    if (!detailPanel) return;
    const isShowing = detailPanel.classList.toggle("mobile-show");
    
    if (isShowing) {
      if (listPanel) listPanel.classList.remove("mobile-show");
      if (detailBtn) detailBtn.classList.add("active");
      if (listBtn) listBtn.classList.remove("active");
    } else {
      if (detailBtn) detailBtn.classList.remove("active");
    }
    triggerChime(isShowing ? 400 : 300, "sine", 0.05, 0.2);
  }
  syncViewportLock();
}

// --- 9. AUDIO ENGINE & PRESETS ---
function triggerChime(frequency = 440, type = "sine", volume = 0.08, duration = 0.35) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.03); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration); // Release

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.log("Audio block context init", e);
  }
}

// Sound Toggling State
function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("mapping_neurodiversity_sound", soundEnabled ? "on" : "off");
  updateSoundBtn();
  if (soundEnabled) {
    triggerChime(440, "sine", 0.06, 0.25);
  }
}

function updateSoundBtn() {
  const btn = document.getElementById("sound-toggle-btn");
  if (btn) {
    if (soundEnabled) {
      btn.classList.add("active");
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      btn.setAttribute("title", "Sound-Effekte ausschalten");
    } else {
      btn.classList.remove("active");
      btn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
      btn.setAttribute("title", "Sound-Effekte einschalten");
    }
  }
}

// Animations Toggling State
function toggleAnimations() {
  animationsEnabled = !animationsEnabled;
  localStorage.setItem("mapping_neurodiversity_animations", animationsEnabled ? "on" : "off");
  updateAnimationsBtn();
  
  if (animationsEnabled) {
    document.body.classList.add("animations-enabled");
    triggerChime(520, "sine", 0.05, 0.2);
  } else {
    document.body.classList.remove("animations-enabled");
    triggerChime(320, "sine", 0.04, 0.15);
  }
}

function updateAnimationsBtn() {
  const btn = document.getElementById("animation-toggle-btn");
  if (btn) {
    if (animationsEnabled) {
      btn.classList.add("active");
      btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
      btn.setAttribute("title", "Hintergrund-Animationen ausschalten");
    } else {
      btn.classList.remove("active");
      btn.innerHTML = `<i class="fa-solid fa-wand-magic"></i>`;
      btn.setAttribute("title", "Hintergrund-Animationen einschalten");
    }
  }
}

// --- 10. PHONETIC TTS GERMAN TEXT SANITIZER ---
function sanitizeSpeechText(text) {
  if (!text) return "";
  let clean = text;
  
  // Convert acronyms into phonetic letter-blocks to be read cleanly in German
  clean = clean.replace(/\bAuDHD\b/gi, "Au-De-Ha-De");
  clean = clean.replace(/\bADHS\b/g, "A-De-Ha-Es");
  clean = clean.replace(/\bASS\b/g, "A-Es-Es");
  clean = clean.replace(/\bRSD\b/gi, "Er-Es-De");
  clean = clean.replace(/\bNT\b/g, "En-Te");
  clean = clean.replace(/\bTTS\b/gi, "Te-Te-Es");
  
  // Clean English terms to fit naturally in German syntax pronunciation
  clean = clean.replace(/\bSensory Overload\b/gi, "Sensory Overload");
  clean = clean.replace(/\bExecutive Dysfunction\b/gi, "Exekutive Dysfunktion");
  clean = clean.replace(/\bTask Paralysis\b/gi, "Task-Paralyse");
  clean = clean.replace(/\bTime Blindness\b/gi, "Time-Blindness");
  clean = clean.replace(/\bDopamine Seeking\b/gi, "Dopamin Seeking");
  clean = clean.replace(/\bMasking\b/gi, "Mäsking");
  clean = clean.replace(/\bStimming\b/gi, "Stimming");
  clean = clean.replace(/\bFidgeting\b/gi, "Fid-sche-ting");
  clean = clean.replace(/\bSocial Cues\b/gi, "Social Cues");
  
  // Clean quotes to ensure clean flow
  clean = clean.replace(/[„“"']+/g, " ");
  
  return clean.trim();
}

// --- 11. STANDALONE SELF-TRANSFORMING TTS PLAYER ENGINE ---
function stopAllSpeech(resetTextState = true) {
  // Clear utterance active event callbacks to prevent cancel() race bugs!
  if (currentUtterance) {
    currentUtterance.onend = null;
    currentUtterance.onerror = null;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  
  if (resetTextState) {
    currentSpeakingText = "";
    currentSpeechKey = null;
  }
  isSpeechPaused = false;
  
  // Restore all wrappers to original simple button states
  resetAllPlayerContainers();
}

function resetAllPlayerContainers() {
  // 11.1 Main Player Default Button
  const mainWrapper = document.getElementById("main-tts-wrapper");
  if (mainWrapper) {
    mainWrapper.innerHTML = `
      <button id="btn-tts" class="main-play-btn" onclick="toggleMainSpeech()">
        <i class="fa-solid fa-circle-play"></i> Vorlesen
      </button>
    `;
  }

  // 11.2 Deep Dive Player Default Button
  const deepdiveWrapper = document.getElementById("deepdive-tts-wrapper");
  if (deepdiveWrapper) {
    deepdiveWrapper.innerHTML = `
      <button class="voice-speak-btn compact-btn" onclick="toggleDeepDiveSpeech()" title="Deep Dive vorlesen lassen">
        <i class="fa-solid fa-circle-play"></i>
      </button>
      <button class="segment-feedback-btn compact-btn" onclick="openSegmentFeedback('main', 'deepdive')" title="Feedback zum Gehirn-Deep-Dive">
        <i class="fa-solid fa-comment-medical"></i>
      </button>
    `;
  }
  
  // 11.3 Individual Voice Default Buttons
  const keys = ['nt', 'adhd', 'asd', 'audhd'];
  keys.forEach(k => {
    const wrapper = document.getElementById(`voice-tts-wrapper-${k}`);
    if (wrapper) {
      wrapper.innerHTML = `
        <button class="voice-speak-btn" onclick="toggleVoiceSpeech('${k}')" title="Diese Stimme vorlesen lassen">
          <i class="fa-solid fa-circle-play"></i>
        </button>
        <button class="segment-feedback-btn compact-btn" onclick="openSegmentFeedback('${k}', 'voice')" title="Feedback zu dieser Stimme">
          <i class="fa-solid fa-comment-medical"></i>
        </button>
      `;
    }
  });

  const statusLbl = document.getElementById("tts-status-label");
  if (statusLbl) {
    statusLbl.textContent = "Erklärung vorlesen lassen";
  }
}

// Draw the compact, transforming buttons inside the active player
function updateActivePlayerUI() {
  if (!currentSpeechKey) return;
  const wrapperId = currentSpeechKey === "main" ? "main-tts-wrapper" : 
                    (currentSpeechKey === "deepdive" ? "deepdive-tts-wrapper" : `voice-tts-wrapper-${currentSpeechKey}`);
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  
  const isVoice = currentSpeechKey !== "main";
  const isDeepDive = currentSpeechKey === "deepdive";
  const activePauseClass = isSpeechPaused ? "active" : "";
  const pauseIcon = isSpeechPaused ? "fa-play" : "fa-pause";
  const pauseTitle = isSpeechPaused ? "Weiter" : "Pause";
  
  if (!isVoice && !isDeepDive) {
    wrapper.innerHTML = `
      <div class="tts-compact-controls">
        <button class="tts-sub-btn pause-btn ${activePauseClass}" onclick="toggleSpeechPause()" title="${pauseTitle}">
          <i class="fa-solid ${pauseIcon}"></i>
        </button>
        <button class="tts-sub-btn restart-btn" onclick="restartSpeech()" title="Neustart">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
        <button class="tts-sub-btn speed-btn" onclick="toggleSpeechSpeed()" title="Geschwindigkeit: x${speechRate.toFixed(1)}">
          <i class="fa-solid fa-gauge-high"></i> <span>x${speechRate.toFixed(1)}</span>
        </button>
        <button class="tts-sub-btn stop-btn" onclick="stopAllSpeech(true)" title="Stoppen">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="tts-compact-controls voice-compact">
        <button class="tts-sub-btn pause-btn ${activePauseClass}" onclick="toggleSpeechPause()" title="${pauseTitle}">
          <i class="fa-solid ${pauseIcon}"></i>
        </button>
        <button class="tts-sub-btn restart-btn" onclick="restartSpeech()" title="Neustart">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
        <button class="tts-sub-btn speed-btn" onclick="toggleSpeechSpeed()" title="Geschwindigkeit: x${speechRate.toFixed(1)}">
          <span class="speed-txt">${speechRate.toFixed(1)}</span>
        </button>
        <button class="tts-sub-btn stop-btn" onclick="stopAllSpeech(true)" title="Stoppen">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    `;
  }
}

// Speak dispatcher with inline morph UI replacement
function speakUtterance(text, wrapperId, typeKey) {
  if (!("speechSynthesis" in window)) return;

  const sanitized = sanitizeSpeechText(text);
  currentUtterance = new SpeechSynthesisUtterance(sanitized);
  currentUtterance.lang = "de-DE";
  currentUtterance.rate = speechRate;
  currentUtterance.pitch = 1.03;

  currentUtterance.onend = () => {
    stopAllSpeech(true);
  };
  currentUtterance.onerror = () => {
    stopAllSpeech(true);
  };

  window.speechSynthesis.speak(currentUtterance);
  
  // Transform the clicked wrapper into active controls
  updateActivePlayerUI();
}

// Cycles rate values x1.0 -> x1.5 -> x2.0 -> x0.5 -> x1.0
function toggleSpeechSpeed() {
  if (speechRate === 1.0) speechRate = 1.5;
  else if (speechRate === 1.5) speechRate = 2.0;
  else if (speechRate === 2.0) speechRate = 0.5;
  else speechRate = 1.0;

  localStorage.setItem("mapping_neurodiversity_speech_rate", speechRate);
  
  triggerChime(300 + speechRate * 80, "sine", 0.05, 0.2);

  // If active, reload speech synthesis immediately with new speed rate
  if ("speechSynthesis" in window && window.speechSynthesis.speaking && !isSpeechPaused) {
    restartSpeech();
  } else {
    // Simply update the active UI numbers
    updateActivePlayerUI();
  }
}

// Pause/Resume Speech
function toggleSpeechPause() {
  if (!("speechSynthesis" in window) || !window.speechSynthesis.speaking) return;

  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    isSpeechPaused = false;
    triggerChime(440, "sine", 0.04, 0.2);
  } else {
    window.speechSynthesis.pause();
    isSpeechPaused = true;
    triggerChime(330, "sine", 0.04, 0.2);
  }
  updateActivePlayerUI();
}

// Restart current loaded text from start
function restartSpeech() {
  if (!currentSpeakingText || !currentSpeechKey) return;
  const wrapperId = currentSpeechKey === "main" ? "main-tts-wrapper" : `voice-tts-wrapper-${currentSpeechKey}`;
  const key = currentSpeechKey;
  const text = currentSpeakingText;
  
  // Stop current utterance but KEEP the loaded text state
  stopAllSpeech(false);
  
  // Restore current keys & speak again
  currentSpeakingText = text;
  currentSpeechKey = key;
  speakUtterance(text, wrapperId, key);
  
  triggerChime(350, "sine", 0.05, 0.25);
}

// Toggle Main explanation card voice reading
function toggleMainSpeech() {
  const data = palaceData.find(p => p.id === activeParamId);
  if (!data) return;

  if ("speechSynthesis" in window && window.speechSynthesis.speaking && currentSpeechKey === "main") {
    stopAllSpeech(true);
    triggerChime(329.63, "sine", 0.08, 0.2); // Cancel tone
    return;
  }

  stopAllSpeech(true);
  currentSpeechKey = "main";
  currentSpeakingText = `Parameter: ${data.nameDE}. Definition: ${data.definition}. Neurologische Erklärung: ${data.deepDive}`;

  const statusLbl = document.getElementById("tts-status-label");
  if (statusLbl) {
    statusLbl.textContent = "Lese Erklärung vor...";
  }

  speakUtterance(currentSpeakingText, "main-tts-wrapper", "main");
}

// Toggle specific monologue voice reading
function toggleVoiceSpeech(voiceKey) {
  const data = palaceData.find(p => p.id === activeParamId);
  if (!data) return;

  if ("speechSynthesis" in window && window.speechSynthesis.speaking && currentSpeechKey === voiceKey) {
    stopAllSpeech(true);
    triggerChime(329.63, "sine", 0.08, 0.2);
    return;
  }

  stopAllSpeech(true);
  currentSpeechKey = voiceKey;

  let label = "";
  let monologue = "";
  if (voiceKey === "nt") {
    label = "Stimme A: Neurotypische Perspektive.";
    monologue = data.voices.nt;
  } else if (voiceKey === "adhd") {
    label = "Stimme B: ADHS-Perspektive.";
    monologue = data.voices.adhd;
  } else if (voiceKey === "ass") {
    label = "Stimme C: Autistische Perspektive.";
    monologue = data.voices.ass;
  } else if (voiceKey === "audhd") {
    label = "Stimme D: Das AuDHD-Dilemma.";
    monologue = data.voices.audhd;
  }

  currentSpeakingText = `${label} ${monologue}`;
  const statusLbl = document.getElementById("tts-status-label");
  if (statusLbl) {
    statusLbl.textContent = `Lese ${voiceKey.toUpperCase()}-Stimme vor...`;
  }

  speakUtterance(currentSpeakingText, `voice-tts-wrapper-${voiceKey}`, voiceKey);
}

// --- 12. ENTRANCE STAGGERED INTRO ---
function animateIntro() {
  const labels = document.querySelectorAll(".svg-axis-label");
  labels.forEach((lbl, idx) => {
    lbl.style.opacity = "0";
    lbl.style.transition = `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
    setTimeout(() => {
      lbl.style.opacity = "1";
    }, 150 + idx * 40);
  });
}

// --- 13. DYNAMIC RESPONSIVE AUTO-CROPPING ---
function handleResize() {
  const svg = document.getElementById("radar-chart");
  if (!svg) return;
  
  const isMobile = window.innerWidth < 1200;
  const currentViewBox = svg.getAttribute("viewBox");
  const targetViewBox = isMobile ? "-40 0 1030 1100" : "-60 0 1070 600";
  
  if (currentViewBox !== targetViewBox) {
    svg.setAttribute("viewBox", targetViewBox);
    
    // Force layout reflow for mobile Chrome / WebViews aspect-ratio repaint bug
    svg.style.display = "none";
    svg.offsetHeight; // triggers browser layout calculation
    svg.style.display = "block";

    initChart();
  }
  syncViewportLock();
}

// --- 14. ORGANIC NEURAL FLANKING WABERN ANIMATION LOOP ---
function animateNeuralNodes(timestamp) {
  // Disabled in v1.7 to focus on static readability and prevent mobile CPU lag
}

// --- 15. JS-BASED HARDWARE-ACCELERATED NODE GLIDE TRANSITION LOOP ---
function animateNodesToTargets(targetNodes) {
  if (typeof window === "undefined" || !window.requestAnimationFrame) {
    // Fallback for non-browser/test environments
    targetNodes.forEach(node => {
      persistentNodes[node.id] = {
        x: node.x,
        y: node.y,
        xCircle: node.xCircle,
        yCircle: node.yCircle
      };
      renderSingleNodeDOM(node, node.x, node.y, node.xCircle, node.yCircle);
    });
    return;
  }

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  const startTime = performance.now();
  const duration = 400; // 400ms duration for butter-smooth glide

  const startPositions = {};
  targetNodes.forEach(node => {
    const current = persistentNodes[node.id];
    if (current) {
      startPositions[node.id] = {
        x: current.x,
        y: current.y,
        xCircle: current.xCircle,
        yCircle: current.yCircle
      };
    } else {
      startPositions[node.id] = {
        x: node.idealX,
        y: node.idealY,
        xCircle: node.xCircle,
        yCircle: node.yCircle
      };
    }
  });

  function step(timestamp) {
    const elapsed = timestamp - startTime;
    let progress = Math.min(elapsed / duration, 1);
    
    // Beautiful ease-out-cubic
    const ease = 1 - Math.pow(1 - progress, 3);

    targetNodes.forEach(node => {
      const start = startPositions[node.id];
      const curX = start.x + (node.x - start.x) * ease;
      const curY = start.y + (node.y - start.y) * ease;
      const curXC = start.xCircle + (node.xCircle - start.xCircle) * ease;
      const curYC = start.yCircle + (node.yCircle - start.yCircle) * ease;

      persistentNodes[node.id] = {
        x: curX,
        y: curY,
        xCircle: curXC,
        yCircle: curYC
      };

      renderSingleNodeDOM(node, curX, curY, curXC, curYC);
    });

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    }
  }

  animationFrameId = requestAnimationFrame(step);
}

function renderSingleNodeDOM(node, xNode, yNode, xCircle, yCircle) {
  const paramId = node.id;
  const hue = node.hue;
  const xNodeVal = xNode;
  const yNodeVal = yNode;
  const isLeft = node.isLeft;
  const xCircleVal = xCircle;
  const yCircleVal = yCircle;
  const isLight = document.body.classList.contains("light-mode");

  const connectorsGroup = document.getElementById("wedges-connectors-group");
  const legendGroup = document.getElementById("wedges-legend-nodes-group");
  if (!connectorsGroup || !legendGroup) return;

  // 1. Calculate Bezier path (connects directly to the label base point xNodeVal)
  const startX = xNodeVal;
  let pathD = "";
  if (isLeft) {
    const dist = xCircleVal - startX;
    const ctrl1X = startX + dist * 0.4;
    const ctrl2X = xCircleVal - dist * 0.4;
    pathD = `M ${startX} ${yNodeVal} C ${ctrl1X} ${yNodeVal}, ${ctrl2X} ${yCircleVal}, ${xCircleVal} ${yCircleVal}`;
  } else {
    const dist = startX - xCircleVal;
    const ctrl1X = startX - dist * 0.4;
    const ctrl2X = xCircleVal + dist * 0.4;
    pathD = `M ${startX} ${yNodeVal} C ${ctrl1X} ${yNodeVal}, ${ctrl2X} ${yCircleVal}, ${xCircleVal} ${yCircleVal}`;
  }

  // 2. Get or draw curved Bezier spline connector
  let connector = document.getElementById(`connector-line-${paramId}`);
  if (!connector) {
    connector = document.createElementNS("http://www.w3.org/2000/svg", "path");
    connector.setAttribute("id", `connector-line-${paramId}`);
    connector.addEventListener("click", () => {
      selectParameter(paramId);
    });
    connectorsGroup.appendChild(connector);
  }
  
  connector.setAttribute("class", `connector-line ${paramId === activeParamId ? 'active' : ''}`);
  connector.setAttribute("d", pathD);
  
  const connStroke = isLight ? `hsla(${hue}, 50%, 45%, 0.24)` : `hsla(${hue}, 60%, 70%, 0.26)`;
  if (connector.style) {
    if (paramId === activeParamId) {
      connector.style.stroke = `hsl(${hue}, 85%, 55%)`;
      connector.style.filter = `drop-shadow(0 0 6px hsl(${hue}, 85%, 55%, 0.65))`;
    } else {
      connector.style.stroke = connStroke;
      connector.style.filter = "";
    }
  }

  // 3. Get or draw Legend Flanking Group (Clean text labels only, no redundant badges!)
  let nodeGrp = document.getElementById(`legend-node-group-${paramId}`);
  let nodeText;

  if (!nodeGrp) {
    nodeGrp = document.createElementNS("http://www.w3.org/2000/svg", "g");
    nodeGrp.setAttribute("id", `legend-node-group-${paramId}`);
    nodeGrp.addEventListener("click", () => {
      selectParameter(paramId);
    });

    // Flanking Node text label name
    nodeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    nodeText.setAttribute("class", "legend-node-text");
    nodeText.setAttribute("id", `legend-text-${paramId}`); // match original selector safely
    nodeGrp.appendChild(nodeText);

    legendGroup.appendChild(nodeGrp);
  } else {
    nodeText = document.getElementById(`legend-text-${paramId}`) || nodeGrp.querySelector(".legend-node-text");
  }

  nodeGrp.setAttribute("class", `legend-node-group ${paramId === activeParamId ? 'active' : ''}`);
  safeSetProperty(nodeGrp, "--node-color", `hsl(${hue}, 85%, 62%)`);

  if (isLight) {
    safeSetProperty(nodeGrp, "--node-text-color", `hsl(${hue}, 70%, 35%)`);
    safeSetProperty(nodeGrp, "--node-text-color-active", `hsl(${hue}, 85%, 22%)`);
  } else {
    safeSetProperty(nodeGrp, "--node-text-color", `hsl(${hue}, 75%, 72%)`);
    safeSetProperty(nodeGrp, "--node-text-color-active", `hsl(${hue}, 95%, 85%)`);
  }

  if (nodeText) {
    nodeText.setAttribute("y", yNodeVal);
    if (isLeft) {
      nodeText.setAttribute("x", xNodeVal - 14);
      nodeText.setAttribute("text-anchor", "end");
    } else {
      nodeText.setAttribute("x", xNodeVal + 14);
      nodeText.setAttribute("text-anchor", "start");
    }

    nodeText.innerHTML = "";
    node.lines.forEach((line, lineIdx) => {
      const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.textContent = line;
      tspan.setAttribute("x", isLeft ? xNodeVal - 14 : xNodeVal + 14);
      if (lineIdx > 0) {
        tspan.setAttribute("dy", "1.25em");
      } else {
        const totalOffset = -((node.lines.length - 1) * 15) / 2;
        tspan.setAttribute("dy", `${totalOffset}px`);
      }
      nodeText.appendChild(tspan);
    });
  }
}

// --- 15. GEHIRN-DEEP-DIVE TTS PLAYER CONTROLLER ---
function toggleDeepDiveSpeech() {
  const data = palaceData.find(p => p.id === activeParamId);
  if (!data) return;

  const text = data.deepDive;
  const wrapperId = "deepdive-tts-wrapper";

  if (currentSpeechKey === "deepdive") {
    toggleSpeechPause();
  } else {
    stopAllSpeech(true);
    currentSpeakingText = text;
    currentSpeechKey = "deepdive";
    speakUtterance(text, wrapperId, "deepdive");
  }
}

// --- 16. SEGMENT-SPECIFIC INLINE FEEDBACK DATABASE SYSTEM ---
let currentFeedbackContext = null;

function openSegmentFeedback(typeKey, segmentKey) {
  const data = palaceData.find(p => p.id === activeParamId);
  if (!data) return;

  let segmentName = "";
  let originalText = "";

  if (segmentKey === "definition") {
    segmentName = "Definition / Begriffskatalog";
    originalText = data.definition;
  } else if (segmentKey === "deepdive") {
    segmentName = "Gehirn-Deep-Dive (Das passiert im Gehirn)";
    originalText = data.deepDive;
  } else if (segmentKey === "voice") {
    const voiceNames = {
      nt: "Neurotypische Stimme (NT)",
      adhd: "ADHS-Stimme",
      asd: "Autistische Stimme (ASD)",
      audhd: "AuDHD-Dilemma Stimme"
    };
    segmentName = voiceNames[typeKey] || "Stimme";
    originalText = data.voices[typeKey] || "";
  }

  currentFeedbackContext = {
    paramId: data.id,
    paramName: `${data.nameDE} (${data.nameEN})`,
    segmentKey: segmentKey,
    typeKey: typeKey,
    segmentName: segmentName,
    originalText: originalText
  };

  // Pre-fill elements in modal
  document.getElementById("fb-parameter-name").textContent = currentFeedbackContext.paramName;
  document.getElementById("fb-segment-name").textContent = currentFeedbackContext.segmentName;
  document.getElementById("fb-original-text").textContent = `„${originalText}“`;
  document.getElementById("fb-message").value = "";

  // Open feedback modal
  document.getElementById("feedback-modal").classList.add("active");
  triggerChime(523.25, "sine", 0.08, 0.25);
  
  // Pause any active speech to focus on feedback
  if ("speechSynthesis" in window && window.speechSynthesis.speaking && !isSpeechPaused) {
    window.speechSynthesis.pause();
    isSpeechPaused = true;
    updateActivePlayerUI();
  }
}

function closeFeedbackModal() {
  document.getElementById("feedback-modal").classList.remove("active");
  triggerChime(392, "sine", 0.04, 0.2);
  currentFeedbackContext = null;
}

function saveSegmentFeedback() {
  if (!currentFeedbackContext) return;

  const msg = document.getElementById("fb-message").value.trim();
  if (!msg) {
    triggerChime(220, "sawtooth", 0.1, 0.3);
    alert("Bitte gib einen Vorschlag oder eine Kritik ein.");
    return;
  }

  const category = "Feedback";
  const feedbackEntry = {
    timestamp: new Date().toISOString(),
    paramId: currentFeedbackContext.paramId,
    paramName: currentFeedbackContext.paramName,
    segmentKey: currentFeedbackContext.segmentKey,
    typeKey: currentFeedbackContext.typeKey,
    segmentName: currentFeedbackContext.segmentName,
    originalText: currentFeedbackContext.originalText,
    category: category,
    message: msg
  };

  // Load existing feedbacks
  let feedbacks = [];
  try {
    feedbacks = JSON.parse(localStorage.getItem("mapping_neurodiversity_feedbacks")) || [];
  } catch(e) {
    feedbacks = [];
  }

  feedbacks.push(feedbackEntry);
  localStorage.setItem("mapping_neurodiversity_feedbacks", JSON.stringify(feedbacks));

  // Update notes menu counters live!
  updateFeedbackButtonsVisibility();

  // Success chime and close
  triggerChime(880, "sine", 0.06, 0.35);
  setTimeout(() => triggerChime(1318.5, "sine", 0.06, 0.45), 80);
  
  alert("Vielen Dank! Dein Feedback wurde lokal gespeichert. Du kannst deine gesammelten Feedbacks jederzeit im 'Infos'-Menü als Markdown exportieren!");
  closeFeedbackModal();
}

function updateFeedbackButtonsVisibility() {
  let feedbacks = [];
  try {
    feedbacks = JSON.parse(localStorage.getItem("mapping_neurodiversity_feedbacks")) || [];
  } catch(e) {
    feedbacks = [];
  }

  const exportBtn = document.getElementById("btn-export-feedback");
  const clearBtn = document.getElementById("btn-clear-feedback");
  
  if (exportBtn) {
    exportBtn.style.display = "inline-flex";
    exportBtn.innerHTML = `<i class="fa-solid fa-download"></i> Feedbacks exportieren (${feedbacks.length})`;
    if (feedbacks.length > 0) {
      exportBtn.removeAttribute("disabled");
    } else {
      exportBtn.setAttribute("disabled", "true");
    }
  }

  if (clearBtn) {
    clearBtn.style.display = "inline-flex";
    if (feedbacks.length > 0) {
      clearBtn.removeAttribute("disabled");
    } else {
      clearBtn.setAttribute("disabled", "true");
    }
  }
}

function exportFeedbacksToMarkdown() {
  let feedbacks = [];
  try {
    feedbacks = JSON.parse(localStorage.getItem("mapping_neurodiversity_feedbacks")) || [];
  } catch(e) {
    feedbacks = [];
  }

  if (feedbacks.length === 0) {
    alert("Es gibt noch kein gespeichertes Feedback.");
    return;
  }

  let md = `# 🌸 Mapping Neurodiversity - Feedback-Export (v3.3.7)\n`;
  md += `Erstellt am: ${new Date().toLocaleDateString("de-DE")} - ${new Date().toLocaleTimeString("de-DE")}\n\n`;
  md += `Kopiere diesen Block komplett und gib ihn der KI, um alle gewünschten Anpassungen vollautomatisch und fehlerfrei einzupflegen!\n\n`;
  md += `---\n\n`;

  feedbacks.forEach((f, idx) => {
    md += `### 📌 Eintrag ${idx + 1}: ${f.paramName}\n`;
    md += `* **Abschnitt**: ${f.segmentName} (Schlüssel: \`${f.segmentKey}\` / Stimme: \`${f.typeKey || 'keine'}\`)\n`;
    md += `* **Originaler Text**:\n  > ${f.originalText}\n`;
    md += `* **Kritik / Eigene Formulierung**:\n  **> ${f.message}**\n\n`;
    md += `---\n\n`;
  });

  // Trigger file download
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `neurodiversity_feedback_export_${new Date().toISOString().slice(0,10)}.md`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  triggerChime(987.77, "sine", 0.05, 0.4);
}

function clearFeedbacks() {
  if (confirm("Möchtest du alle lokal gesammelten Feedbacks wirklich unwiderruflich löschen?")) {
    localStorage.removeItem("mapping_neurodiversity_feedbacks");
    updateFeedbackButtonsVisibility();
    triggerChime(329.63, "sine", 0.06, 0.3);
    alert("Feedback-Speicher erfolgreich geleert!");
  }
}

// --- 🌸 SHARE & QR-CODE SYSTEM (v3.3.7) ---
function openShareModal() {
  const modal = document.getElementById("share-modal");
  const qrImg = document.getElementById("share-qr-code");
  const urlInput = document.getElementById("share-url-input");
  
  if (modal && qrImg && urlInput) {
    const currentUrl = window.location.href.split('#')[0]; // Strip hash/anchor info
    urlInput.value = currentUrl;
    
    // Set public secure high-contrast QR code image (deep slate violet)
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=6c5ce7&data=${encodeURIComponent(currentUrl)}`;
    
    modal.style.display = "flex";
    modal.classList.add("active");
    triggerChime(659.25, "sine", 0.05, 0.25);
  }
}

function closeShareModal() {
  const modal = document.getElementById("share-modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("active");
    const status = document.getElementById("copy-status");
    if (status) status.textContent = "";
    triggerChime(440, "sine", 0.05, 0.2);
  }
}

function copyShareUrl() {
  const urlInput = document.getElementById("share-url-input");
  const status = document.getElementById("copy-status");
  if (urlInput && status) {
    urlInput.select();
    urlInput.setSelectionRange(0, 99999); // for mobile support
    navigator.clipboard.writeText(urlInput.value)
      .then(() => {
        status.textContent = "✓ Link erfolgreich kopiert!";
        triggerChime(880, "sine", 0.06, 0.3);
        setTimeout(() => {
          status.textContent = "";
        }, 2000);
      })
      .catch(() => {
        status.textContent = "Fehler beim Kopieren.";
      });
  }
}


