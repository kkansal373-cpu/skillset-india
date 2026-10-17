
/* SkillSet India — English/Hindi Translation System */
(function () {
  "use strict";

  const STORAGE_KEY = "skillset_language";
  const SUPPORTED = ["en", "hi"];

  function getLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : "en";
  }

  function translatePage(language) {
    const lang = SUPPORTED.includes(language) ? language : "en";

    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";

    // Translate text without deleting nested HTML or icons.
    document.querySelectorAll("[data-en][data-hi]").forEach(function (el) {
      const value = el.getAttribute("data-" + lang);
      if (value === null) return;

      // Use a dedicated child span when the text is nested in HTML.
      const textTarget = el.querySelector(":scope > [data-translate-text]");

      if (textTarget) {
        textTarget.textContent = value;
      } else if (!el.children.length) {
        el.textContent = value;
      }
    });

    // Translate placeholders.
    document.querySelectorAll(
      "[data-placeholder-en][data-placeholder-hi]"
    ).forEach(function (el) {
      el.placeholder = el.getAttribute("data-placeholder-" + lang);
    });

    // Translate title when both translations are supplied.
    const title = document.querySelector("title");
    if (title && title.dataset.en && title.dataset.hi) {
      title.textContent = title.dataset[lang];
    }

    // Support the selector IDs used by the website.
    document.querySelectorAll(
      "#siteLanguage, #languageSelect, .language-select"
    ).forEach(function (select) {
      if (
        select.querySelector('option[value="en"]') &&
        select.querySelector('option[value="hi"]')
      ) {
        select.value = lang;
      }
    });
  }

  function saveLanguage(language) {
    const lang = SUPPORTED.includes(language) ? language : "en";

    localStorage.setItem(STORAGE_KEY, lang);
    translatePage(lang);

    document.dispatchEvent(
      new CustomEvent("skillset-language-change", {
        detail: { language: lang }
      })
    );
  }

  function setup() {
    translatePage(getLanguage());

    document.querySelectorAll(
      "#siteLanguage, #languageSelect, .language-select"
    ).forEach(function (select) {
      // Avoid adding duplicate listeners.
      if (select.dataset.languageReady === "true") return;
      select.dataset.languageReady = "true";

      select.addEventListener("change", function () {
        saveLanguage(this.value);
      });
    });
  }

  window.setSkillSetLanguage = saveLanguage;
  window.getSkillSetLanguage = getLanguage;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
