// Updated Mock DOM Test Script to catch runtime exceptions in app.js
const fs = require('fs');
const path = require('path');

// 1. Mock window and document variables
global.window = {
  addEventListener: () => {}
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.document = {
  body: {
    className: "",
    classList: {
      contains: () => true
    }
  },
  addEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: (id) => {
    return {
      innerHTML: "",
      classList: {
        remove: () => {},
        add: () => {}
      },
      appendChild: () => {},
      scrollTo: () => {},
      setAttribute: () => {},
      querySelector: () => { return { style: {} }; }
    };
  },
  createElementNS: () => {
    return {
      setAttribute: () => {},
      addEventListener: () => {},
      style: {},
      appendChild: () => {}
    };
  }
};

// 2. Load palace_data.js and app.js as text and evaluate them
try {
  let dataCode = fs.readFileSync(path.join(__dirname, 'palace_data.js'), 'utf8');
  // Convert const to var so it is accessible in global scope of eval
  dataCode = dataCode.replace('const palaceData', 'global.palaceData = var palaceData');
  dataCode = dataCode.replace('var palaceData', 'palaceData');
  eval(dataCode);
  
  console.log("palace_data.js loaded successfully. palaceData size:", global.palaceData ? global.palaceData.length : "undefined");
  
  let appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  eval(appCode);
  console.log("app.js parsed successfully.");

  // Run the initialization manually
  initTheme();
  console.log("initTheme done.");
  loadUserProfile();
  console.log("loadUserProfile done.");
  initChart();
  console.log("initChart done.");
  selectParameter(1);
  console.log("selectParameter done.");
  
  console.log("ALL TESTS COMPLETED SUCCESSFULY - NO RUNTIME EXCEPTIONS!");
} catch (e) {
  console.error("RUNTIME EXCEPTION DETECTED:", e);
}
