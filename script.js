(function () {
  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Checklist persistence
  const STORAGE_KEY = "ard-protection-checklist-v2";

  function loadChecks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      document.querySelectorAll('.checklist input[type="checkbox"]').forEach((cb, i) => {
        if (saved[i]) cb.checked = true;
      });
    } catch (_) {}
  }

  function saveChecks() {
    const state = {};
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach((cb, i) => {
      state[i] = cb.checked;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  document.querySelectorAll('.checklist input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", saveChecks);
  });

  loadChecks();

  const clearBtn = document.getElementById("clear-checklist");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document.querySelectorAll('.checklist input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
      });
      localStorage.removeItem(STORAGE_KEY);
    });
  }

  const printBtn = document.getElementById("print-checklist");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  // Copy template buttons
  document.querySelectorAll(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-target");
      const el = document.getElementById(id);
      if (!el) return;
      const text = el.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = original;
        }, 1600);
      } catch (_) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try {
          document.execCommand("copy");
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = "Copy text";
          }, 1600);
        } catch (e) {
          btn.textContent = "Select & copy manually";
        }
        sel.removeAllRanges();
      }
    });
  });
})();
