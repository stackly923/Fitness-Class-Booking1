document.querySelectorAll("#contact-form select").forEach((select) => {
  const placeholder = select.dataset.placeholder;
  if (placeholder) select.selectedIndex = -1;
  const dropdown = document.createElement("details");
  dropdown.className = "contact-dropdown";
  const summary = document.createElement("summary");
  const label = document.querySelector(`label[for="${select.id}"]`);
  label.id = `${select.id}-label`;
  summary.id = `${select.id}-trigger`;
  summary.setAttribute("aria-labelledby", `${label.id} ${summary.id}`);
  const options = document.createElement("div");
  options.className = "contact-dropdown-options";
  options.id = `${select.id}-options`;
  summary.setAttribute("aria-controls", options.id);
  dropdown.append(summary, options);
  const sync = () => {
    summary.textContent = select.selectedOptions[0]?.textContent || placeholder || "Select an option";
    options.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.optionIndex) === select.selectedIndex));
    });
  };
  Array.from(select.options).forEach((option, index) => {
    if (!option.value || option.hidden || option.disabled) return;
    const button = document.createElement("button");
    button.dataset.optionIndex = String(index);
    button.type = "button";
    button.textContent = option.textContent;
    button.addEventListener("click", () => {
      select.selectedIndex = index;
      select.removeAttribute("aria-invalid");
      select.parentElement.querySelector(".error").textContent = "";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      dropdown.open = false;
      summary.focus();
    });
    options.append(button);
  });
  dropdown.addEventListener("toggle", () => {
    summary.setAttribute("aria-expanded", String(dropdown.open));
    if (dropdown.open) {
      document.querySelectorAll(".contact-dropdown[open]").forEach((other) => {
        if (other !== dropdown) other.open = false;
      });
    }
  });
  dropdown.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdown.open = false;
      summary.focus();
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      dropdown.open = true;
      const buttons = Array.from(options.querySelectorAll("button"));
      const current = buttons.indexOf(document.activeElement);
      const selected = buttons.findIndex((button) => Number(button.dataset.optionIndex) === select.selectedIndex);
      const next = current < 0 ? Math.max(0, selected) :
        (current + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
      buttons[Math.max(0, next)].focus();
    }
  });
  select.after(dropdown);
  select.hidden = true;
  label.addEventListener("click", () => summary.focus());
  select.addEventListener("change", sync);
  select.form.addEventListener("reset", () => {
    dropdown.open = false;
    setTimeout(() => {
      if (placeholder) select.selectedIndex = -1;
      sync();
    }, 0);
  });
  summary.setAttribute("aria-expanded", "false");
  sync();
});
document.addEventListener("click", (event) => {
  document.querySelectorAll(".contact-dropdown[open]").forEach((dropdown) => {
    if (!dropdown.contains(event.target)) dropdown.open = false;
  });
});
