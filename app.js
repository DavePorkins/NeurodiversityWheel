// Mapping Neurodiversity - Cosmic Flanking Logic v2.8
// Implements 2-column layout flanking legend nodes inside SVG, smooth fluid neural animations (Wabern) under animation toggles, flatter bezier connectors, mathematically centered absolute range slider ticks with Kaum/Extrem side labels, and relaxed breathing margins.

// --- 1. CONFIGURATION & STATE ---
let CENTER_X = 475;
let CENTER_Y = 300;
let CENTER = 300; // legacy placeholder
let MAX_RADIUS = 180; // slightly smaller to give breathing space for flanking legend nodes
const INNER_RADIUS = 32; 
const TOTAL_AXES = 20;

function updateLayoutConstants() {
  if (window.innerWidth < 1200) {
    CENTER_X = 475;
    CENTER_Y = 550;
    MAX_RADIUS = 225;
  } else {
    CENTER_X = 475;
    CENTER_Y = 300;
    MAX_RADIUS = 205;
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
  ass: true,
  audhd: false
};

let activeParamId = 1;
let previousParamId = null;
let audioCtx = null;
let soundEnabled = localStorage.getItem("mapping_neurodiversity_sound") !== "off";
let animationsEnabled = localStorage.getItem("mapping_neurodiversity_animations") !== "off";

// Speech Synthesis & Standalone Player state
let speechRate = parseFloat(localStorage.getItem("mapping_neurodiversity_speech_rate")) || 1.0;
let currentSpeechKey = null; // 'main', 'nt', 'adhd', 'ass', 'audhd'
let currentSpeakingText = ""; // Holds the exact string currently loaded in TTS
let isSpeechPaused = false;
let currentUtterance = null; // Global utterance reference to prevent Chrome garbage collection crash

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadUserProfile();
  initParameterList(); // Build left list index column
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
function syncThemeColorMeta() {
  const isDark = document.body.classList.contains("dark-mode");
  const meta = document.getElementById("meta-theme-color");
  if (meta) {
    meta.setAttribute("content", isDark ? "#151121" : "#faf7f2");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("mapping_neurodiversity_theme") || "dark";
  document.body.className = savedTheme + "-mode";
  updateThemeToggleIcon();
  syncThemeColorMeta();
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark-mode");
  const nextTheme = isDark ? "light" : "dark";
  document.body.className = nextTheme + "-mode";
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
    selectParameter(activeParamId);
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

// Generates overlays polygon path
// CRITICAL MATHEMATICAL CORRECTION:
// Replace INNER_RADIUS + rating*stepSize - stepSize/2 with INNER_RADIUS + rating*stepSize
// so overlay lines terminate EXACTLY at wedge level boundaries instead of their center!
// PREMIUM polish: Generates a perfectly smooth closed quadratic spline curve
// to turn jagged zig-zags into organic, flowing rounded shapes!
function getPolygonPath(scores) {
  updateLayoutConstants();
  let points = [];
  for (let i = 0; i < TOTAL_AXES; i++) {
    const paramId = i + 1;
    const rating = scores[paramId] || 1;
    const stepSize = (MAX_RADIUS - INNER_RADIUS) / 5;
    const currentRadius = INNER_RADIUS + (rating * stepSize);
    points.push(getCoords(i, currentRadius));
  }

  if (points.length < 3) return "";

  let path = "";
  // Start at the midpoint of the last segment and first segment to ensure closed smooth joint!
  const pLast = points[points.length - 1];
  const pFirst = points[0];
  const startMidX = (pLast.x + pFirst.x) / 2;
  const startMidY = (pLast.y + pFirst.y) / 2;

  path += `M ${startMidX},${startMidY}`;

  for (let i = 0; i < points.length; i++) {
    const pCurrent = points[i];
    const pNext = points[(i + 1) % points.length];
    const nextMidX = (pCurrent.x + pNext.x) / 2;
    const nextMidY = (pCurrent.y + pNext.y) / 2;

    path += ` Q ${pCurrent.x},${pCurrent.y} ${nextMidX},${nextMidY}`;
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
  if (connectorsGroup) connectorsGroup.innerHTML = "";
  if (legendGroup) legendGroup.innerHTML = "";

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

    // DYNAMIC FLANKING NODE GENERATION (Desktop Flanking Node Web vs Mobile Butterfly Wings)
    if (legendGroup && connectorsGroup) {
      const hue = i * (360 / TOTAL_AXES);
      let xNode = 0;
      let yNode = 0;
      let isLeft = false;

      if (isMobile) {
        if (paramId >= 11 && paramId <= 20) {
          const slotIndex = 20 - paramId;
          const defaultY = 50 + slotIndex * 105;
          yNode = defaultY;
          const distFromCenterY = Math.abs(defaultY - 550);
          xNode = 170 + Math.pow(distFromCenterY / 500, 2) * 110;
          isLeft = true;
        } else {
          const slotIndex = paramId - 1;
          const defaultY = 50 + slotIndex * 105;
          yNode = defaultY;
          const distFromCenterY = Math.abs(defaultY - 550);
          xNode = 780 - Math.pow(distFromCenterY / 500, 2) * 110;
          isLeft = false;
        }
      } else {
        if (paramId >= 11 && paramId <= 20) {
          const slotIndex = 20 - paramId;
          const defaultY = 50 + slotIndex * 55;
          yNode = defaultY;
          // Curved Concentric Schmiegung: Curves inward (closer to center) at top/bottom, pushed out in middle
          const distFromCenterY = Math.abs(defaultY - 300);
          xNode = 230 + Math.pow(distFromCenterY / 250, 2) * 55;
          isLeft = true;
        } else {
          const slotIndex = paramId - 1;
          const defaultY = 50 + slotIndex * 55;
          yNode = defaultY;
          // Curved Concentric Schmiegung: Curves inward (closer to center) at top/bottom, pushed out in middle
          const distFromCenterY = Math.abs(defaultY - 300);
          xNode = 720 - Math.pow(distFromCenterY / 250, 2) * 55;
          isLeft = false;
        }
      }

      // 1. Curved connector path (Bezier spline)
      const connector = document.createElementNS("http://www.w3.org/2000/svg", "path");
      connector.setAttribute("class", `connector-line ${paramId === activeParamId ? 'active' : ''}`);
      connector.setAttribute("id", `connector-line-${paramId}`);
      
      const xCircle = textCoords.x;
      const yCircle = textCoords.y;

      let pathD = "";
      if (isLeft) {
        const startX = xNode + 15;
        const dist = xCircle - startX;
        const ctrl1X = startX + dist * 0.4;
        const ctrl2X = xCircle - dist * 0.4;
        pathD = `M ${startX} ${yNode} C ${ctrl1X} ${yNode}, ${ctrl2X} ${yCircle}, ${xCircle} ${yCircle}`;
      } else {
        const startX = xNode - 15;
        const dist = startX - xCircle;
        const ctrl1X = startX - dist * 0.4;
        const ctrl2X = xCircle + dist * 0.4;
        pathD = `M ${startX} ${yNode} C ${ctrl1X} ${yNode}, ${ctrl2X} ${yCircle}, ${xCircle} ${yCircle}`;
      }
      
      connector.setAttribute("d", pathD);
      if (paramId === activeParamId) {
        connector.style.stroke = `hsl(${hue}, 85%, 55%)`;
        connector.style.filter = `drop-shadow(0 0 6px hsl(${hue}, 85%, 55%, 0.65))`;
      }
      connector.addEventListener("click", () => {
        selectParameter(paramId);
      });
      connectorsGroup.appendChild(connector);

      // 2. Legend Flanking Group
      const nodeGrp = document.createElementNS("http://www.w3.org/2000/svg", "g");
      nodeGrp.setAttribute("class", `legend-node-group ${paramId === activeParamId ? 'active' : ''}`);
      nodeGrp.setAttribute("id", `legend-node-group-${paramId}`);
      safeSetProperty(nodeGrp, "--node-color", `hsl(${hue}, 85%, 62%)`);
      nodeGrp.addEventListener("click", () => {
        selectParameter(paramId);
      });

      // Flanking Node badge circle
      const nodeBadge = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      nodeBadge.setAttribute("cx", xNode);
      nodeBadge.setAttribute("cy", yNode);
      nodeBadge.setAttribute("r", "12");
      nodeBadge.setAttribute("class", "legend-node-badge");
      nodeBadge.setAttribute("id", `legend-node-badge-${paramId}`);
      if (paramId === activeParamId) {
        nodeBadge.style.fill = `hsl(${hue}, 85%, 62%)`;
        nodeBadge.style.stroke = `hsl(${hue}, 85%, 62%)`;
      }
      nodeGrp.appendChild(nodeBadge);

      // Flanking Node badge text number
      const nodeBadgeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      nodeBadgeText.setAttribute("x", xNode);
      nodeBadgeText.setAttribute("y", yNode + 0.5);
      nodeBadgeText.setAttribute("class", "legend-node-badge-text");
      nodeBadgeText.setAttribute("id", `legend-node-badge-text-${paramId}`);
      nodeBadgeText.textContent = paramId;
      nodeGrp.appendChild(nodeBadgeText);

      // Flanking Node text label name
      const nodeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      nodeText.setAttribute("y", yNode);
      nodeText.setAttribute("class", "legend-node-text");
      nodeText.setAttribute("id", `legend-node-text-${paramId}`);

      if (isLeft) {
        nodeText.setAttribute("x", xNode - 22);
        nodeText.setAttribute("text-anchor", "end");
      } else {
        nodeText.setAttribute("x", xNode + 22);
        nodeText.setAttribute("text-anchor", "start");
      }

      // Premium vertical multi-line wrapping for long names on mobile
      const mobileLabelSplits = {
        1: ["Akute", "Reizüberflutung"],
        2: ["Suche nach", "Vertrautheit"],
        3: ["Schwierigkeiten mit", "sozialen Signalen"],
        4: ["Suche nach", "Gleichförmigkeit"],
        5: ["Aufgaben-", "Paralyse"],
        6: ["Objektpermanenz"],
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
        20: ["Bedürfnis nach", "Routine"]
      };

      if (isMobile) {
        const lines = mobileLabelSplits[paramId] || [data.nameDE];
        if (lines.length > 1) {
          lines.forEach((line, lineIdx) => {
            const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            tspan.textContent = line;
            tspan.setAttribute("x", isLeft ? xNode - 22 : xNode + 22);
            if (lineIdx > 0) {
              tspan.setAttribute("dy", "1.25em");
            } else {
              const totalOffset = -((lines.length - 1) * 15) / 2;
              tspan.setAttribute("dy", `${totalOffset}px`);
            }
            nodeText.appendChild(tspan);
          });
        } else {
          nodeText.textContent = data.nameDE;
        }
      } else {
        nodeText.textContent = data.nameDE;
      }
      
      nodeGrp.appendChild(nodeText);

      legendGroup.appendChild(nodeGrp);
    }
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
  const overlayGroup = document.getElementById("polygon-overlays-group");
  overlayGroup.innerHTML = "";

  function getReferenceScores(profileKey) {
    let scores = {};
    palaceData.forEach(p => {
      scores[p.id] = p.ratings[profileKey];
    });
    return scores;
  }

  // Overlays rendered as wider neon outlines on top
  if (activeProfiles.nt) {
    const ntPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ntPath.setAttribute("d", getPolygonPath(getReferenceScores("nt")));
    ntPath.setAttribute("class", "polygon-overlay nt");
    overlayGroup.appendChild(ntPath);
  }

  if (activeProfiles.adhd) {
    const adhdPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    adhdPath.setAttribute("d", getPolygonPath(getReferenceScores("adhd")));
    adhdPath.setAttribute("class", "polygon-overlay adhd");
    overlayGroup.appendChild(adhdPath);
  }

  if (activeProfiles.ass) {
    const assPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    assPath.setAttribute("d", getPolygonPath(getReferenceScores("ass")));
    assPath.setAttribute("class", "polygon-overlay ass");
    overlayGroup.appendChild(assPath);
  }

  if (activeProfiles.audhd) {
    const audhdPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    audhdPath.setAttribute("d", getPolygonPath(getReferenceScores("audhd")));
    audhdPath.setAttribute("class", "polygon-overlay audhd");
    overlayGroup.appendChild(audhdPath);
  }
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
        prevConnector.style.stroke = "";
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
        line.style.stroke = "";
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
}

function updateSidebar(paramId) {
  const data = palaceData.find(p => p.id === paramId);
  if (!data) return;

  document.getElementById("detail-id").textContent = data.id;
  document.getElementById("detail-name-de").textContent = data.nameDE;
  document.getElementById("detail-name-en").textContent = data.nameEN;
  document.getElementById("detail-definition").textContent = data.definition;

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
  document.getElementById("quote-ass").textContent = `„${data.voices.ass}“`;
  document.getElementById("quote-audhd").textContent = `„${data.voices.audhd}“`;

  document.getElementById("badge-nt-score").textContent = data.ratings.nt;
  document.getElementById("badge-adhd-score").textContent = data.ratings.adhd;
  document.getElementById("badge-ass-score").textContent = data.ratings.ass;
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
function openNotesModal() {
  document.getElementById("notes-modal").classList.add("active");
  triggerChime(523.25, "sine", 0.08, 0.35);
}

function closeNotesModal() {
  document.getElementById("notes-modal").classList.remove("active");
  triggerChime(392, "sine", 0.04, 0.25);
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
  
  // 11.2 Individual Voice Default Buttons
  const keys = ['nt', 'adhd', 'ass', 'audhd'];
  keys.forEach(k => {
    const wrapper = document.getElementById(`voice-tts-wrapper-${k}`);
    if (wrapper) {
      wrapper.innerHTML = `
        <button class="voice-speak-btn" onclick="toggleVoiceSpeech('${k}')" title="Diese Stimme vorlesen lassen">
          <i class="fa-solid fa-circle-play"></i>
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
  const wrapperId = currentSpeechKey === "main" ? "main-tts-wrapper" : `voice-tts-wrapper-${currentSpeechKey}`;
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  
  const isVoice = currentSpeechKey !== "main";
  const activePauseClass = isSpeechPaused ? "active" : "";
  const pauseIcon = isSpeechPaused ? "fa-play" : "fa-pause";
  const pauseTitle = isSpeechPaused ? "Weiter" : "Pause";
  
  if (!isVoice) {
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
}

// --- 14. ORGANIC NEURAL FLANKING WABERN ANIMATION LOOP ---
function animateNeuralNodes(timestamp) {
  // Disabled in v1.7 to focus on static readability and prevent mobile CPU lag
}
