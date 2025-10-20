// Input Field Styling Test Script
// Jalankan ini di browser console untuk memverifikasi styling input fields

console.log("🎨 TESTING INPUT FIELD STYLING...");

function testInputStyling() {
  const results = {
    total: 0,
    styled: 0,
    unstyled: 0,
    issues: [],
  };

  // Test semua jenis input fields
  const inputSelectors = [
    'input[type="text"]',
    'input[type="number"]',
    'input[type="date"]',
    'input[type="time"]',
    'input[type="email"]',
    'input[type="password"]',
    "select",
    "textarea",
    ".form-control",
    'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"])',
  ];

  inputSelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
      if (
        element.type === "button" ||
        element.type === "submit" ||
        element.type === "reset" ||
        element.type === "checkbox" ||
        element.type === "radio"
      ) {
        return; // Skip these types
      }

      results.total++;

      const computedStyle = window.getComputedStyle(element);
      const expectedStyles = {
        padding: /^0\.875rem|14px/,
        border: /2px.*solid/,
        borderRadius: /8px/,
        fontSize: /1rem|16px/,
        backgroundColor: /rgb\(255,\s*255,\s*255\)|white/,
        color: /rgb\(30,\s*41,\s*59\)|#1e293b/,
      };

      let isStyled = true;
      const elementIssues = [];

      Object.entries(expectedStyles).forEach(([prop, pattern]) => {
        const value =
          computedStyle[prop] ||
          computedStyle[prop.replace(/([A-Z])/g, "-$1").toLowerCase()];
        if (!pattern.test(value)) {
          isStyled = false;
          elementIssues.push(
            `${prop}: expected pattern ${pattern}, got "${value}"`
          );
        }
      });

      if (isStyled) {
        results.styled++;
        console.log(`✅ ${selector}[${index}] properly styled`);
      } else {
        results.unstyled++;
        results.issues.push({
          element: `${selector}[${index}]`,
          node: element,
          issues: elementIssues,
        });
        console.log(
          `❌ ${selector}[${index}] has styling issues:`,
          elementIssues
        );
      }
    });
  });

  return results;
}

// Test CSS custom properties
function testCSSVariables() {
  console.log("🔍 Testing CSS custom properties...");

  const root = document.documentElement;
  const customProps = ["--charcoal", "--silver", "--sky", "--white-smoke"];

  customProps.forEach((prop) => {
    const value = getComputedStyle(root).getPropertyValue(prop);
    if (value) {
      console.log(`✅ ${prop}: ${value.trim()}`);
    } else {
      console.log(`❌ ${prop}: not defined`);
    }
  });
}

// Test Bootstrap override
function testBootstrapOverride() {
  console.log("🛡️ Testing Bootstrap override effectiveness...");

  const testElement = document.createElement("input");
  testElement.type = "text";
  testElement.className = "form-control";
  testElement.style.position = "absolute";
  testElement.style.left = "-9999px";
  document.body.appendChild(testElement);

  const computedStyle = window.getComputedStyle(testElement);
  const hasCustomStyling =
    (computedStyle.borderWidth === "2px" &&
      computedStyle.borderRadius === "8px" &&
      computedStyle.padding.includes("14px")) ||
    computedStyle.padding.includes("0.875rem");

  if (hasCustomStyling) {
    console.log("✅ Bootstrap override successful");
  } else {
    console.log("❌ Bootstrap override failed");
    console.log("Current styles:", {
      borderWidth: computedStyle.borderWidth,
      borderRadius: computedStyle.borderRadius,
      padding: computedStyle.padding,
    });
  }

  testElement.remove();
  return hasCustomStyling;
}

// Run all tests
console.log("🚀 Starting comprehensive input field styling tests...");

const styleResults = testInputStyling();
testCSSVariables();
const bootstrapOverride = testBootstrapOverride();

console.log("\n📊 STYLING TEST RESULTS:");
console.log(`Total inputs tested: ${styleResults.total}`);
console.log(`Properly styled: ${styleResults.styled}`);
console.log(`Styling issues: ${styleResults.unstyled}`);
console.log(`Bootstrap override: ${bootstrapOverride ? "Working" : "Failed"}`);

if (styleResults.issues.length > 0) {
  console.log("\n🔧 ELEMENTS NEEDING ATTENTION:");
  styleResults.issues.forEach((issue) => {
    console.group(`❌ ${issue.element}`);
    console.log("Element:", issue.node);
    issue.issues.forEach((problemDesc) => console.log(`   - ${problemDesc}`));
    console.groupEnd();
  });
}

// Quick fix for any unstyled elements
if (styleResults.unstyled > 0) {
  console.log("\n🔧 APPLYING QUICK FIXES...");

  const quickFixCSS = `
        input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]),
        select, textarea {
            padding: 0.875rem !important;
            border: 2px solid #cbd5e1 !important;
            border-radius: 8px !important;
            font-size: 1rem !important;
            background-color: white !important;
            color: #1e293b !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }
        
        input:focus, select:focus, textarea:focus {
            border-color: #38bdf8 !important;
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1) !important;
            outline: none !important;
        }
    `;

  let quickFixStyle = document.getElementById("input-styling-quickfix");
  if (!quickFixStyle) {
    quickFixStyle = document.createElement("style");
    quickFixStyle.id = "input-styling-quickfix";
    quickFixStyle.textContent = quickFixCSS;
    document.head.appendChild(quickFixStyle);
    console.log("✅ Quick fix CSS applied");
  }
}

console.log("\n🎯 Input field styling test complete!");

// Return summary
return {
  total: styleResults.total,
  styled: styleResults.styled,
  unstyled: styleResults.unstyled,
  bootstrapOverride: bootstrapOverride,
  success: styleResults.unstyled === 0 && bootstrapOverride,
};
