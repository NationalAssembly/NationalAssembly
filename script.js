// script.js

let uiTranslations = {};

document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();   // Načte JSON s překlady
  loadContent();              // Načte hlavní obsah
  setupNavigation();          // Nastaví menu, dropdowny a hamburger
  setYear();                  // Aktuální rok
});

// --- Načtení překladů ---
async function loadTranslations() {
  try {
    const res = await fetch("translations.json");
    if (!res.ok) throw new Error("Translations file not found");
    uiTranslations = await res.json();
  } catch (e) {
    console.error("Error loading translations:", e);
    uiTranslations = {};
  }
}

// --- Získání aktuálního jazyka ---
function getCurrentLang() {
  const params = new URLSearchParams(window.location.search);
  let lang = params.get("lang");
  if (!lang) {
    const browserLang = navigator.language.toLowerCase().substring(0, 2);
    lang = (browserLang === "cs" || browserLang === "cz") ? "cz" : (browserLang === "de" ? "de" : "en");
  }
  return lang;
}

// --- Načtení obsahu stránky ---
function loadContent() {
  const params = new URLSearchParams(window.location.search);
  const lang = getCurrentLang();
  const page = params.get("page") || "home";

  // Aktualizace tlačítka pro jazyk
  const langBtn = document.getElementById("currentLangBtn");
  if (langBtn) langBtn.textContent = lang.toUpperCase();

  // Použije překlady
  applyTranslations(lang);

  // Oznámení iframe časové osy
  notifyTimeline(lang);

  // Snažíme se načíst soubor (fallback s .html)
  let file = `${lang}/${page}`;
  fetch(file)
    .then(r => {
      if (!r.ok) throw new Error("Page not found");
      return r.text();
    })
    .catch(() => fetch(`${file}.html`).then(r => {
      if (!r.ok) throw new Error("Page not found even with .html");
      return r.text();
    }))
    .then(html => {
      const c = document.getElementById("content");
      if (c) c.innerHTML = html;
    })
    .catch(() => {
      const c = document.getElementById("content");
      if (c) c.innerHTML = "<h1>404 - Content not found</h1>";
    });
}

// --- Aplikace překladů na elementy ---
function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (uiTranslations[lang] && uiTranslations[lang][key]) {
      el.textContent = uiTranslations[lang][key];
    }
  });
}

// --- Oznámení iframe o jazyku ---
function notifyTimeline(lang) {
  const frame = document.getElementById('timelineFrame');
  if (!frame) return;

  const msg = { type: 'setLanguage', lang: lang.toUpperCase() };
  try { frame.contentWindow.postMessage(msg, '*'); } catch(e) {}
  frame.addEventListener('load', function onLoad() {
    frame.contentWindow.postMessage(msg, '*');
    frame.removeEventListener('load', onLoad);
  });
}

// --- Navigace ---
function navigateTo(page) {
  const lang = getCurrentLang();
  window.location.search = `?lang=${lang}&page=${page}`;
}

// --- Přepínání jazyka ---
function switchLanguage(newLang) {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "home";
  window.location.search = `?lang=${newLang}&page=${page}`;
}

// --- Nastavení aktuálního roku ve footeru ---
function setYear() {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// --- Nastavení navigace a dropdownů ---
function setupNavigation() {
  const hamburger = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");
  const dropdowns = document.querySelectorAll(".dropdown");
  const isMobile = window.innerWidth <= 768;

  if (hamburger) {
    hamburger.addEventListener("click", () => nav.classList.toggle("active"));
  }

  dropdowns.forEach(btn => {
    const button = btn.querySelector(".dropbtn");
    const content = btn.querySelector(".dropdown-content");

    if (isMobile && btn.parentElement.id === "mainNav") {
      content.classList.add("show");
      button.classList.add("active");
    }

    button.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = content.classList.contains("show");

      if (!isMobile) {
        document.querySelectorAll(".dropdown-content").forEach(c => { if (c !== content) c.classList.remove("show"); });
        document.querySelectorAll(".dropbtn").forEach(b => { if (b !== button) b.classList.remove("active"); });
      }

      content.classList.toggle("show");
      button.classList.toggle("active");
    });
  });

  window.addEventListener("click", e => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll(".dropdown-content").forEach(c => c.classList.remove("show"));
      document.querySelectorAll(".dropbtn").forEach(b => b.classList.remove("active"));
    }
  });

  window.addEventListener("message", event => {
    if (!event.data) return;
    if (event.data.type === "navigate") navigateTo(event.data.page);
  });
}

// --- Globální zpřístupnění pro onclick v HTML ---
window.navigateTo = navigateTo;
window.switchLanguage = switchLanguage;