const sessions = [
  {
    id: "S101",
    day: "Mon",
    time: "07:00",
    name: "Power HIIT",
    trainer: "Maya Thompson",
    duration: "45 min",
    level: "Intermediate",
    studio: "Studio A",
    spots: 6,
  },
  {
    id: "S102",
    day: "Tue",
    time: "08:30",
    name: "Morning Flow",
    trainer: "Sofia Bennett",
    duration: "50 min",
    level: "All Levels",
    studio: "Mind Studio",
    spots: 11,
  },
  {
    id: "S103",
    day: "Wed",
    time: "18:00",
    name: "Strength Foundations",
    trainer: "Ethan Parker",
    duration: "60 min",
    level: "Beginner",
    studio: "Studio B",
    spots: 4,
  },
  {
    id: "S104",
    day: "Thu",
    time: "17:30",
    name: "Boxing Conditioning",
    trainer: "Noah Williams",
    duration: "50 min",
    level: "Advanced",
    studio: "Arena",
    spots: 2,
  },
  {
    id: "S105",
    day: "Fri",
    time: "06:30",
    name: "Reformer Core",
    trainer: "Olivia Brooks",
    duration: "45 min",
    level: "Intermediate",
    studio: "Pilates Lab",
    spots: 8,
  },
  {
    id: "S106",
    day: "Sat",
    time: "09:00",
    name: "Ride & Rhythm",
    trainer: "Aarav Shah",
    duration: "45 min",
    level: "All Levels",
    studio: "Cycle Room",
    spots: 12,
  },
];
function renderSessions(list = sessions) {
  const root = document.querySelector("#sessions");
  if (!root) return;
  root.innerHTML = list
    .map(
      (s) =>
        `<article class="card session"><span class="pill">${s.day} · ${s.time}</span><h3>${s.name}</h3><p>${s.trainer}</p><p class="muted">${s.duration} · ${s.level}<br>${s.studio}</p><p><strong>${s.spots} spots left</strong></p><button class="btn btn-primary book" data-id="${s.id}">Book Class</button></article>`,
    )
    .join("");
  root
    .querySelectorAll(".book")
    .forEach((b) => (b.onclick = () => openBooking(b.dataset.id)));
}
function openBooking(id) {
  const s = sessions.find((x) => x.id === id);
  document.querySelector("#booking-details").innerHTML =
    `<span class="tag">${s.day} · ${s.time}</span><h2>${s.name}</h2><p>${s.trainer} · ${s.duration}<br>${s.studio} · ${s.spots} spots available</p>`;
  document.querySelector("#confirm-booking").dataset.id = id;
  document.querySelector("#booking-modal").classList.add("open");
}
document
  .querySelector("#close-modal")
  ?.addEventListener("click", () =>
    document.querySelector("#booking-modal").classList.remove("open"),
  );
document.querySelector("#confirm-booking")?.addEventListener("click", (e) => {
  const s = sessions.find((x) => x.id === e.target.dataset.id);
  const bookings = JSON.parse(localStorage.getItem("stacklyBookings") || "[]");
  if (!bookings.some((x) => x.id === s.id))
    bookings.push({ ...s, status: "Confirmed", date: "Next " + s.day });
  localStorage.setItem("stacklyBookings", JSON.stringify(bookings));
  document.querySelector("#booking-modal").classList.remove("open");
  stacklyToast(`You're booked! ${s.name} was added to your classes.`);
});
document
  .querySelectorAll("[data-day]")
  .forEach(
    (b) =>
      (b.onclick = () =>
        renderSessions(
          b.dataset.day === "All"
            ? sessions
            : sessions.filter((s) => s.day === b.dataset.day),
        )),
  );
renderSessions();
