document.addEventListener("DOMContentLoaded", () => {
  loadContent();
  setupMobileMenu();
});

function loadContent() {
  const params = new URLSearchParams(window.location.search);
  
  // 1. Zjistit jazyk (URL param -> localStorage -> browser -> fallback 'en')
  let lang = params.get("lang");
  if (!lang) {
    const browserLang = navigator.language.toLowerCase().substring(0, 2);
    lang = (browserLang === "cs" || browserLang === "cz") ? "cz" : (browserLang === "de" ? "de" : "en");
  }
  
  // 2. Zjistit stránku (default 'home')
  const page = params.get("page") || "home";

  // Aktualizace tlačítka jazyka
  const langBtn = document.getElementById("currentLangBtn");
  if (langBtn) langBtn.textContent = lang.toUpperCase();

  // Sestavení cesty k souboru
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

function navigateTo(page) {
  const params = new URLSearchParams(window.location.search);
  let lang = params.get("lang") || "en"; // zachovat aktuální jazyk
  
  // Aktualizace URL bez reloadu (SPA feel) nebo s reloadem
  // Pro jednoduchost a funkčnost zpětného tlačítka použijeme přiřazení location
  window.location.search = `?lang=${lang}&page=${page}`;
}

function switchLanguage(newLang) {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "home"; // zachovat aktuální stránku
  
  window.location.search = `?lang=${newLang}&page=${page}`;
}

function setupMobileMenu() {
  // Pro mobilní zařízení: kliknutí na tlačítko dropdownu ho otevře/zavře
  const dropdowns = document.querySelectorAll(".dropdown .dropbtn");
  dropdowns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Na desktopu (hover) to řeší CSS, ale na mobilu potřebujeme click
      // Zabráníme navigaci, pokud by to byl odkaz
      e.stopPropagation();
      const content = btn.nextElementSibling;
      content.classList.toggle("show");
    });
  });
  
  // Zavření při kliku jinam
  window.addEventListener("click", (e) => {
    if (!e.target.matches('.dropbtn')) {
      document.querySelectorAll(".dropdown-content").forEach(c => c.classList.remove("show"));
    }
  });
}
