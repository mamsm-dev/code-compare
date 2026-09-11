/*
=================================================
 Code Compare
 Theme Module
 Version : 2.0
=================================================
*/

// =========================================
// Theme Constants
// =========================================

const THEMES = {
  DARK: "dark",
  LIGHT: "light"
};

// =========================================
// Current Theme
// =========================================

let currentTheme = THEMES.DARK;

// =========================================
// Initialize Theme
// =========================================

function initializeTheme() {
  const savedTheme = loadSavedTheme();

  if (savedTheme) {
    setAppTheme(savedTheme);
  }
  else {
    setAppTheme(
      THEMES.DARK
    );
  }
}

// =========================================
// Set Application Theme
// =========================================

function setAppTheme(theme) {
  if (
    theme !== THEMES.DARK &&
    theme !== THEMES.LIGHT
  ) {
    theme = THEMES.DARK;
  }

  currentTheme = theme;

  applyBodyTheme(
    theme
  );
  applyEditorTheme(
    theme
  );
  saveTheme(
    theme
  );
  App.state.theme = convertToMonacoTheme(
    theme
  );
  updateThemeSelector(
    theme
  );
}

// =========================================
// Apply Body Theme
// =========================================

function applyBodyTheme(theme) {
  document.body.classList.remove(
    THEMES.DARK,
    THEMES.LIGHT
  );
  document.body.classList.add(
    theme
  );
}

// =========================================
// Apply Monaco Theme
// =========================================

function applyEditorTheme(theme) {
  if (
    typeof monaco === "undefined"
  ) {
    return;
  }
  monaco.editor.setTheme(
    convertToMonacoTheme(theme)
  );
}

// =========================================
// Convert Theme Name
// =========================================

function convertToMonacoTheme(theme) {
  if (theme === THEMES.LIGHT) {
    return "vs";
  }
  return "vs-dark";
}

// =========================================
// Toggle Theme
// =========================================

function toggleTheme() {
  if (
    currentTheme === THEMES.DARK
  ) {
    setAppTheme(
      THEMES.LIGHT
    );
    notifyInfo(
      "Light theme enabled."
    );
  }
  else {
    setAppTheme(
      THEMES.DARK
    );
    notifyInfo(
      "Dark theme enabled."
    );
  }
}

// =========================================
// Get Current Theme
// =========================================

function getCurrentTheme() {
  return currentTheme;
}

// =========================================
// Save Theme
// =========================================

function saveTheme(theme) {
  localStorage.setItem(
    "codeCompareTheme",
    theme
  );
}

// =========================================
// Load Theme
// =========================================

function loadSavedTheme() {
  return localStorage.getItem(
    "codeCompareTheme"
  );
}

// =========================================
// Update Theme Selector
// =========================================

function updateThemeSelector(theme) {
  const selector = document.getElementById(
    "theme"
  );
  if (!selector) {
    return;
  }
  selector.value = convertToMonacoTheme(
    theme
  );
}

// =========================================
// Check Dark Theme
// =========================================

function isDarkTheme() {
  return currentTheme === THEMES.DARK;
}

// =========================================
// Check Light Theme
// =========================================

function isLightTheme() {
  return currentTheme === THEMES.LIGHT;
}

// =========================================
// Legacy Theme Wrapper
// =========================================

function setTheme(theme) {
  if (theme === "vs-dark") {
    setAppTheme(
      THEMES.DARK
    );
    return;
  }
  if (theme === "vs") {
    setAppTheme(
      THEMES.LIGHT
    );
    return;
  }
  setAppTheme(
    theme
  );
}

// =========================================
// Theme API
// =========================================

const ThemeAPI = {
  initializeTheme,
  setAppTheme,
  toggleTheme,
  getCurrentTheme,
  isDarkTheme,
  isLightTheme
};
