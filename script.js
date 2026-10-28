/* Nexora — shared script: icons, mobile menu, contact form validation */
(function () {
  "use strict";

  // 1. Inline SVG icon sprite (referenced with <use href="#i-name">)
  var p = {
    bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
    flow: "M5 4h6v5H5zM13 15h6v5h-6zM8 9v3a3 3 0 0 0 3 3h2",
    users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a2.5 2.5 0 1 0 0-5M17 15c2.5 0 4 1.7 4 4",
    chart: "M4 20v-8M10 20V5M16 20v-5M2 21h20",
    layers: "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5",
    clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
    shield: "M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z",
    check: "M5 12.500l4.500 4.500L19 7"
  };
  var s = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0">';
  Object.keys(p).forEach(function (k) {
    s += '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' + p[k] + '"/></symbol>';
  });
  document.body.insertAdjacentHTML("afterbegin", s + "</svg>");

  // 2. Mobile menu
  var btn = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (btn && menu) {
    var close = function () { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.textContent = "Menu"; };
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close" : "Menu";
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // 3. Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // 4. Contact form: validation + honest submission handling
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");

  function show(type, msg) { status.className = "status " + type; status.textContent = msg; status.focus(); }

  function check(input) {
    var v = input.value.trim(), msg = "";
    if (!v) msg = "This field is required.";
    else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Enter a valid email address, like name@example.com.";
    else if (input.name === "message" && v.length < 10) msg = "Write at least 10 characters so we can help.";
    var f = input.closest(".field");
    f.classList.toggle("bad", !!msg);
    f.querySelector(".err").textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  var inputs = Array.prototype.slice.call(form.querySelectorAll("input[name],textarea[name]"));
  inputs.forEach(function (i) { i.addEventListener("blur", function () { check(i); }); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = inputs.filter(function (i) { return !check(i); });
    if (bad.length) { show("no", "Fix the " + bad.length + " highlighted field(s) and send again."); bad[0].focus(); return; }
    // Honeypot: bots fill this hidden field
    if (form.elements["website"] && form.elements["website"].value) return;

    var endpoint = form.getAttribute("data-endpoint") || "";
    if (!endpoint || endpoint.indexOf("YOUR_") !== -1) {
      show("no", "Message not sent. This form is not connected to a form service yet.");
      return;
    }
    var submit = form.querySelector("button[type=submit]");
    submit.disabled = true; submit.textContent = "Sending…";
    fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("bad status");
        form.reset(); show("ok", "Message sent. We will reply to the email address you provided.");
      })
      .catch(function () { show("no", "Message not sent. Check your connection and try again."); })
      .finally(function () { submit.disabled = false; submit.textContent = "Send message"; });
  });
})();
