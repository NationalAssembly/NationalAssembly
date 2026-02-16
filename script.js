document.addEventListener("DOMContentLoaded", () => {
  loadContent();
  setupNavigation();
  setYear();
});

const uiTranslations = {
  en: {
    germany: "GERMANY",
    czechoslovakia: "CZECHOSLOVAKIA",
    na: "National Assembly",
    weimar: "Weimar Republic",
    first_rep: "First Republic"
  },
  cz: {
    germany: "NĚMECKO",
    czechoslovakia: "ČESKOSLOVENSKO",
    na: "Národní shromáždění",
    weimar: "Výmarská republika",
    first_rep: "První republika"
  },
  de: {
    germany: "DEUTSCHLAND",
    czechoslovakia: "TSCHECHOSLOWAKEI",
    na: "Nationalversammlung",
    weimar: "Weimarer Republik",
    first_rep: "Erste Republik"
  }
};

function loadContent() {
  const params = new URLSearchParams(window.location.search);
  
  // 1. Detect language
  let lang = params.get("lang");
  if (!lang) {
    const browserLang = navigator.language.toLowerCase().substring(0, 2);
    lang = (browserLang === "cs" || browserLang === "cz") ? "cz" : (browserLang === "de" ? "de" : "en");
  }
  
  // 2. Detect page
  const page = params.get("page") || "home";

  // Update language button text
  const langBtn = document.getElementById("currentLangBtn");
  if (langBtn) langBtn.textContent = lang.toUpperCase();

  // Apply static UI translations
  applyTranslations(lang);

  // Build file path
  const file = `${lang}/${page}.html`;

  fetch(file)
    .then((r) => {
      if (!r.ok) throw new Error("Page not found");
      return r.text();
    })
    .then((html) => {
      const c = document.getElementById("content");
      if (c) c.innerHTML = html;
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "<h1>404 - Content not found</h1>";
    });
}

function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (uiTranslations[lang] && uiTranslations[lang][key]) {
      el.textContent = uiTranslations[lang][key];
    }
  });
}

function navigateTo(page) {
  const params = new URLSearchParams(window.location.search);
  let lang = params.get("lang") || "en";
  window.location.search = `?lang=${lang}&page=${page}`;
}

function switchLanguage(newLang) {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "home";
  window.location.search = `?lang=${newLang}&page=${page}`;
}

function setYear() {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function setupNavigation() {
  const hamburger = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");
  const dropdowns = document.querySelectorAll(".dropdown");
  const isMobile = window.innerWidth <= 768;

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Dropdown logic
  dropdowns.forEach(btn => {
    const button = btn.querySelector(".dropbtn");
    const content = btn.querySelector(".dropdown-content");

    // Pre-expand on mobile if it's a nav item
    if (isMobile && btn.parentElement.id === "mainNav") {
      content.classList.add("show");
      button.classList.add("active");
    }

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      
      const isOpen = content.classList.contains("show");

      // Close all others
      if (!isMobile) {
        document.querySelectorAll(".dropdown-content").forEach(c => {
            if (c !== content) c.classList.remove("show");
        });
        document.querySelectorAll(".dropbtn").forEach(b => {
            if (b !== button) b.classList.remove("active");
        });
      }

      // Toggle current
      content.classList.toggle("show");
      button.classList.toggle("active");
    });
  });
  
  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll(".dropdown-content").forEach(c => c.classList.remove("show"));
    }
  });
}
