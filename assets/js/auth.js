function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function setError(el, msg) {
  const box = el.parentElement.querySelector(".error");
  if (box) box.textContent = msg;
  el.setAttribute("aria-invalid", msg ? "true" : "false");
}
document.querySelector("#signin-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email,
    pass = e.target.password,
    role = e.target.role;
  let ok = true;
  [
    [email, validEmail(email.value) ? "" : "Enter a valid email."],
    [pass, pass.value ? "" : "Enter your password."],
    [role, role.value ? "" : "Select a role."],
  ].forEach(([el, msg]) => {
    setError(el, msg);
    if (msg) ok = false;
  });
  if (ok) {
    localStorage.setItem(
      "stacklyUser",
      JSON.stringify({ email: email.value, role: role.value, loggedIn: true }),
    );
    location.href =
      role.value === "admin" ? "admin-dashboard.html" : "member-dashboard.html";
  }
});
document.querySelector("#register-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  let ok = true;
  f.querySelectorAll("[required]").forEach((el) => {
    const msg = !el.value
      ? "This field is required."
      : el.type === "email" && !validEmail(el.value)
        ? "Enter a valid email."
        : "";
    setError(el, msg);
    if (msg) ok = false;
  });
  if (f.password.value !== f.confirm.value) {
    setError(f.confirm, "Passwords do not match.");
    ok = false;
  }
  if (ok) {
    localStorage.setItem(
      "stacklyProfile",
      JSON.stringify({
        name: f.fullname.value,
        email: f.email.value,
        role: f.role.value,
      }),
    );
    stacklyToast("Your STACKLY Fitness account has been created successfully.");
    setTimeout(() => (location.href = "signin.html"), 1200);
  }
});
document.querySelectorAll("[data-logout]").forEach(
  (b) =>
    (b.onclick = () => {
      localStorage.removeItem("stacklyUser");
      location.href = "signin.html";
    }),
);
document
  .querySelectorAll("#signin-form select, #register-form select")
  .forEach((select) => {
    const custom = document.createElement("div");
    const button = document.createElement("button");
    const list = document.createElement("div");

    custom.className = "custom-select";
    button.className = "custom-select-button";
    button.type = "button";
    button.textContent = select.options[select.selectedIndex]?.text || "Select";
    list.className = "custom-select-list";

    Array.from(select.options).forEach((option) => {
      if (option.hidden || option.disabled) return;
      const item = document.createElement("button");
      item.type = "button";
      item.textContent = option.textContent;
      item.dataset.value = option.value;
      item.addEventListener("click", () => {
        select.value = option.value;
        button.textContent = option.textContent;
        custom.classList.remove("open");
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
      list.appendChild(item);
    });

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".custom-select.open")
        .forEach((openSelect) => {
          if (openSelect !== custom) openSelect.classList.remove("open");
        });
      custom.classList.toggle("open");
    });

    custom.append(button, list);
    select.classList.add("native-select-hidden");
    select.insertAdjacentElement("afterend", custom);
  });

document.addEventListener("click", (event) => {
  if (!event.target.closest(".custom-select")) {
    document
      .querySelectorAll(".custom-select.open")
      .forEach((custom) => custom.classList.remove("open"));
  }
});
