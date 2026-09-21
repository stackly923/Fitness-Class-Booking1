function renderDashboardAccount() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("stacklyUser") || "null");
  } catch {
    // Leave the signed-out labels visible when session storage is unavailable.
  }
  const signedIn = user?.loggedIn === true;
  const roles = { member: "Member", admin: "Fitness Admin" };
  document.querySelectorAll("[data-account-email]").forEach((field) => {
    field.textContent = signedIn && typeof user.email === "string"
      ? user.email : "Not signed in";
  });
  document.querySelectorAll("[data-account-role]").forEach((field) => {
    field.textContent = signedIn && Object.hasOwn(roles, user.role)
      ? roles[user.role] : "Not assigned";
  });
}
renderDashboardAccount();
window.addEventListener("pageshow", renderDashboardAccount);
window.addEventListener("storage", renderDashboardAccount);

function showDashboardPanel(panel) {
  document
    .querySelectorAll("[data-panel]")
    .forEach((b) => b.classList.toggle("active", b.dataset.panel === panel));
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.toggle("active", p.id === panel));
}

const dashboardMenu = document.querySelector("[data-dashboard-menu]");
const dashboardOverlay = document.querySelector("[data-dashboard-overlay]");
const dashboardSidebar = document.querySelector(".dashboard .sidebar");

function setDashboardMenu(open) {
  dashboardSidebar?.classList.toggle("open", open);
  dashboardOverlay?.classList.toggle("open", open);
  dashboardMenu?.setAttribute("aria-expanded", String(open));
  if (dashboardMenu) {
    dashboardMenu.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
    dashboardMenu.setAttribute(
      "aria-label",
      open ? "Close dashboard menu" : "Open dashboard menu",
    );
  }
}

dashboardMenu?.addEventListener("click", () =>
  setDashboardMenu(!dashboardSidebar?.classList.contains("open")),
);

dashboardOverlay?.addEventListener("click", () => setDashboardMenu(false));

document.querySelectorAll("[data-dashboard-home]").forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showDashboardPanel("overview");
    setDashboardMenu(false);
  }),
);

document.querySelectorAll("[data-panel]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("[data-panel]")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.querySelector("#" + btn.dataset.panel)?.classList.add("active");
    setDashboardMenu(false);
  }),
);
const bookings = JSON.parse(localStorage.getItem("stacklyBookings") || "[]");
const tbody = document.querySelector("#booking-rows");
if (tbody)
  tbody.innerHTML = (
    bookings.length
      ? bookings
      : [
          {
            id: "S101",
            name: "Power HIIT",
            trainer: "Maya Thompson",
            date: "Tomorrow",
            time: "07:00",
            duration: "45 min",
            studio: "Studio A",
            status: "Confirmed",
          },
        ]
  )
    .map(
      (b) =>
        `<tr><td>${b.id}</td><td>${b.name}</td><td>${b.trainer}</td><td>${b.date || b.day}</td><td>${b.time}</td><td>${b.status}</td><td><a class="btn" href="404.html?dashboard=${location.pathname.endsWith("admin-dashboard.html") ? "admin" : "member"}">View</a></td></tr>`,
    )
    .join("");
if (window.Chart) {
  Chart.defaults.color = "#5d6a63";
  const green = "#4b685b",
    lime = "#a3cc37";
  document.querySelectorAll("canvas[data-chart]").forEach(
    (c) =>
      new Chart(c, {
        type: c.dataset.chart === "doughnut" ? "doughnut" : "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: c.dataset.label || "Sessions",
              data: [2, 3, 2, 4, 3, 5, 4],
              borderColor: green,
              backgroundColor:
                c.dataset.chart === "doughnut"
                  ? [
                      green,
                      lime,
                      "#8ea398",
                      "#d7ddcf",
                      "#30493e",
                      "#9eb5a9",
                      "#c2cabf",
                    ]
                  : "rgba(75,104,91,.15)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: c.dataset.chart === "doughnut" } },
        },
      }),
  );
}
