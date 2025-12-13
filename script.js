function loadLocalizedContent(prechod) {
  const params = new URLSearchParams(window.location.search);
  const lang = params.has("en") ? "en" : params.has("de")? "de" : "cz";

let file =
  lang === "cz"
    ? `cz/${prechod}.html`
    : lang === "de"
    ? `de/${prechod}.html`
    : `en/${prechod}.html`;

  fetch(file)
    .then((r) => r.text())
    .then((html) => {
      const c = document.getElementById("content");
      if (c) c.innerHTML = html;
    });

  const btn = document.getElementById("switchLang");
  if (btn) {
    btn.addEventListener("click", () => {
      const base = window.location.origin + window.location.pathname;
      window.location.href = lang === "cz" ? base + "?en" : base;
    });
  }
}

function toggleDropdown() {
  document.getElementById("langDropdown").classList.toggle("show");
}

function setLanguage(lang) {
  const base = window.location.origin + window.location.pathname;
  if (lang === "cz") window.location.href = base;
  else if (lang === "en") window.location.href = base + "?en";
  else if (lang === "de") window.location.href = base + "?de";
}

// Zavření dropdownu při kliknutí mimo
window.addEventListener("click", function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
});

function languageButton() {
  // Načti a vlož tlačítko
  fetch("button.html")
    .then((r) => r.text())
    .then((html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);

      // Připoj event listener pro dropdown
      const dropdown = document.getElementById("langDropdown");
      const dropbtn = dropdown.querySelector(".dropbtn");
      dropbtn.addEventListener("click", () =>
        dropdown.classList.toggle("show")
      );

      // Připoj event listenery pro jednotlivé jazyky
      const buttons = dropdown.querySelectorAll(".dropdown-content button");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const lang = btn.dataset.lang;
          const base = window.location.origin + window.location.pathname;
          if (lang === "cz") window.location.href = base;
          else if (lang === "en") window.location.href = base + "?en";
          else if (lang === "de") window.location.href = base + "?de";
        });
      });
    });
}
