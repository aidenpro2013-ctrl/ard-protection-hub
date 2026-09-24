(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var KEY = "ard-protection-checklist-v3";
  function loadChecks() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function (cb, i) {
        if (saved[i]) cb.checked = true;
      });
    } catch (e) {}
  }
  function saveChecks() {
    var state = {};
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function (cb, i) {
      state[i] = cb.checked;
    });
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function (cb) {
    cb.addEventListener("change", saveChecks);
  });
  loadChecks();

  var clearBtn = document.getElementById("clear-checklist");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function (cb) {
        cb.checked = false;
      });
      localStorage.removeItem(KEY);
    });
  }
  var printBtn = document.getElementById("print-checklist");
  if (printBtn) {
    printBtn.addEventListener("click", function () { window.print(); });
  }

  document.querySelectorAll(".btn-copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-target");
      var el = document.getElementById(id);
      if (!el) return;
      var text = el.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          var o = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(function () { btn.textContent = o; }, 1600);
        });
      } else {
        btn.textContent = "Select & copy manually";
      }
    });
  });
})();
