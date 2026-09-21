const fa = document.createElement("link");
fa.rel = "stylesheet";
fa.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
document.head.appendChild(fa);
const themeFix = document.createElement("style");
themeFix.textContent =
  ".dark-band .card{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.16);color:var(--ivory)}";
document.head.appendChild(themeFix);
const pages = ["Home", "About", "Trainers", "Membership", "Blog", "Contact"];
const files = [
  "index.html",
  "about.html",
  "trainers.html",
  "membership.html",
  "blog.html",
  "contact.html",
];
const brand = `<img class="brand-logo" src="assets/icons/stackly-logo.svg" alt="STACKLY Fitness" />`;
const brandLight = `<img class="brand-logo" src="assets/icons/stackly-logo-light.svg" alt="STACKLY Fitness" />`;
function nav() {
  const current = location.pathname.split("/").pop() || "index.html";
  return `<a class="skip" href="#main">Skip to content</a><header class="nav"><div class="inner"><a class="brand" href="index.html">${brand}</a><nav class="navlinks" aria-label="Primary">${pages.map((p, i) => `<a class="${current === files[i] ? "active" : ""}" href="${files[i]}">${p}</a>`).join("")}</nav><div class="actions"><a class="btn btn-secondary" href="signin.html">Sign In</a><button class="menu-btn" aria-label="Open menu" aria-expanded="false">☰</button></div></div></header><div class="overlay"></div><aside class="drawer" aria-label="Mobile navigation"><button class="menu-btn close" aria-label="Close menu">×</button><a class="brand" href="index.html">${brand}</a><nav>${pages.map((p, i) => `<a href="${files[i]}">${p}</a>`).join("")}<a class="btn" href="signin.html">Sign In</a></nav></aside>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="index.html">${brandLight}</a><p>Expert-led fitness experiences designed to help you move better, train consistently and build lasting progress.</p><nav class="social-links" aria-label="Social media"><a href="404.html" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i><span>Instagram</span></a><a href="404.html" aria-label="YouTube"><i class="fa-brands fa-youtube" aria-hidden="true"></i><span>YouTube</span></a><a href="404.html" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i><span>Facebook</span></a><a href="404.html" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i><span>LinkedIn</span></a><a href="404.html" aria-label="X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i><span>X</span></a></nav></div><div><h3>Quick Links</h3>${pages.map((p, i) => `<a href="${files[i]}">${p}</a>`).join("")}</div><div><h3>Resources</h3><a href="404.html">Training Guide</a><a href="404.html">Membership FAQs</a><a href="404.html">Booking Help</a><a href="404.html">Privacy Policy</a><a href="404.html">Workout Plans</a><a href="404.html">Nutrition Tips</a></div><div><h3>Contact</h3><span><i class="fa-solid fa-envelope" aria-hidden="true"></i>hello@stacklyfitness.com</span><span><i class="fa-solid fa-phone" aria-hidden="true"></i>+91 98765 43210</span><p class="footer-contact-lines"><span><i class="fa-solid fa-location-dot" aria-hidden="true"></i>Bengaluru HSR Layout</span><span><i class="fa-solid fa-clock" aria-hidden="true"></i>Mon–Sat, 5:30 AM–10 PM</span></p></div></div><div class="footer-bottom">© 2026 STACKLY Fitness. All Rights Reserved.</div></div></footer>`;
}
document.querySelector("[data-nav]")?.insertAdjacentHTML("afterbegin", nav());
document
  .querySelector("[data-footer]")
  ?.insertAdjacentHTML("afterbegin", footer());
const menu = document.querySelector(".menu-btn"),
  drawer = document.querySelector(".drawer"),
  overlay = document.querySelector(".overlay");
function toggle(open) {
  drawer?.classList.toggle("open", open);
  overlay?.classList.toggle("open", open);
  menu?.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
}
menu?.addEventListener("click", () => toggle(true));
document
  .querySelector(".close")
  ?.addEventListener("click", () => toggle(false));
overlay?.addEventListener("click", () => toggle(false));
addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggle(false);
});
addEventListener("scroll", () =>
  document.querySelector(".nav")?.classList.toggle("scrolled", scrollY > 20),
);
const imageScript = document.createElement("script");
imageScript.src = "assets/js/images.js";
document.body.appendChild(imageScript);
const contentScript = document.createElement("script");
contentScript.src = "assets/js/content.js";
document.body.appendChild(contentScript);
const observer = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.querySelectorAll("[data-count]").forEach((el) => {
  const end = parseFloat(el.dataset.count);
  let done = false;
  new IntersectionObserver((es) => {
    if (es[0].isIntersecting && !done) {
      done = true;
      let n = 0;
      const step = () => {
        n += end / 45;
        el.textContent =
          Math.min(end, Math.round(n)).toLocaleString() +
          (el.dataset.suffix || "");
        if (n < end) requestAnimationFrame(step);
      };
      step();
    }
  }).observe(el);
});
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}
window.stacklyToast = toast;
function validEmailAddress(value) {
  if (value.length > 254) return false;
  const parts = value.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  return (
    local.length <= 64 &&
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i.test(local) &&
    domain.length <= 253 &&
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(domain)
  );
}
document.querySelectorAll(".newsletter-form").forEach((form) => {
  form.removeAttribute("onsubmit");
  const email = form.querySelector('input[type="email"]');
  email?.addEventListener("input", () => {
    email.setCustomValidity("");
    email.removeAttribute("aria-invalid");
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = email?.value.trim() || "";
    if (!email) return;
    email.value = value;
    email.setCustomValidity("");

    if (!validEmailAddress(value) || !email.checkValidity()) {
      const message = "Enter a valid email address, such as you@example.com.";
      email.setCustomValidity(message);
      email.setAttribute("aria-invalid", "true");
      toast(message);
      email.focus();
      email.reportValidity();
      return;
    }

    email.removeAttribute("aria-invalid");
    form.reset();
    window.location.href = "404.html";
  });
});
