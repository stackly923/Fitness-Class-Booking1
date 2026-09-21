const imageLibrary = {
  curl: [
    "strength-curl.webp",
    "Member performing a controlled dumbbell curl in the strength studio",
  ],
  ropes: [
    "hiit-battle-ropes.webp",
    "Athlete training with battle ropes during a high-intensity class",
  ],
  cardio: [
    "cardio-studio.webp",
    "Premium cardio studio with treadmills at sunrise",
  ],
  journal: [
    "training-journal.webp",
    "Training journal and recovery essentials beside gym equipment",
  ],
  recovery: [
    "member-recovery.webp",
    "Member recovering after a focused strength session",
  ],
  deadlift: [
    "deadlift-training.webp",
    "Athlete performing a barbell deadlift with controlled technique",
  ],
  kettlebell: [
    "kettlebell-training.webp",
    "Athlete performing a kettlebell swing in a functional fitness class",
  ],
  stretch: [
    "mobility-stretch.webp",
    "Member completing a seated mobility stretch in the studio",
  ],
  rowing: ["rowing-cardio.webp", "Athlete training on an indoor rowing machine"],
  medball: [
    "medicine-ball-hiit.webp",
    "Athlete performing a medicine ball slam during HIIT",
  ],
  skipping: [
    "skipping-cardio.webp",
    "Athlete jump-rope training in the cardio zone",
  ],
  pullup: [
    "pullup-training.webp",
    "Athlete performing a supported pull-up in the strength area",
  ],
  lunge: ["mobility-lunge.webp", "Member practising a deep mobility lunge"],
  carry: [
    "dumbbell-carry.webp",
    "Athlete holding dumbbells during strength training",
  ],
  row: ["dumbbell-row.webp", "Athlete performing a plank dumbbell row"],
  equipment: [
    "equipment-studio.webp",
    "Organised kettlebells and weight plates in the STACKLY studio",
  ],
  wellness: [
    "wellness-studio.webp",
    "Wellness training space with mat, blocks and water bottle",
  ],
  coachM: [
    "male-trainer.webp",
    "STACKLY male trainer welcoming a member with a workout plan",
  ],
  coachF: [
    "female-trainer-dumbbells.webp",
    "STACKLY female strength trainer holding dumbbells",
  ],
  coachP: [
    "female-trainer-portrait.webp",
    "STACKLY female trainer portrait in the functional training studio",
  ],
  sofia: ["sofia-portrait.webp", "Sofia Bennett, Yoga & Mobility coach"],
  meera: ["meera-portrait.webp", "Meera Nair, Functional Training coach"],
};
const page = location.pathname.split("/").pop() || "index.html";
const trainerPhotos = {
  "Maya Thompson": "coachF",
  "Ethan Parker": "coachM",
  "Sofia Bennett": "sofia",
  "Olivia Brooks": "recovery",
  "Noah Williams": "curl",
  "Aarav Shah": "skipping",
  "Meera Nair": "meera",
  "Kabir Rao": "rowing",
  "Riya Kapoor": "coachP",
};
const pagePools = {
  "index.html": [
    "ropes",
    "curl",
    "stretch",
    "recovery",
    "deadlift",
    "kettlebell",
    "rowing",
    "wellness",
    "coachM",
    "journal",
    "medball",
    "skipping",
    "equipment",
    "coachF",
    "lunge",
    "carry",
  ],
  "about.html": [
    "equipment",
    "coachM",
    "wellness",
    "stretch",
    "cardio",
    "recovery",
  ],
  "classes.html": [
    "deadlift",
    "ropes",
    "stretch",
    "lunge",
    "skipping",
    "kettlebell",
    "rowing",
    "cardio",
    "recovery",
    "medball",
    "pullup",
    "wellness",
  ],
  "trainers.html": [
    "coachF",
    "coachM",
    "coachP",
    "recovery",
    "curl",
    "carry",
    "stretch",
    "rowing",
    "coachP",
    "coachM",
    "coachF",
    "coachP",
    "coachM",
    "coachF",
  ],
  "membership.html": ["recovery", "wellness", "coachM", "equipment"],
  "blog.html": [
    "journal",
    "deadlift",
    "ropes",
    "stretch",
    "lunge",
    "skipping",
    "kettlebell",
    "rowing",
    "cardio",
    "recovery",
    "medball",
    "pullup",
    "wellness",
    "equipment",
    "coachM",
    "coachF",
    "carry",
    "row",
    "curl",
    "journal",
    "lunge",
    "cardio",
    "wellness",
  ],
  "contact.html": ["wellness"],
  "member-dashboard.html": [
    "deadlift",
    "ropes",
    "stretch",
    "coachF",
    "coachM",
    "coachP",
  ],
  "admin-dashboard.html": ["equipment", "coachM", "coachF"],
  "signin.html": ["cardio"],
  "register.html": ["wellness"],
};
const fallback = [
  "ropes",
  "deadlift",
  "stretch",
  "rowing",
  "wellness",
  "coachM",
  "coachF",
  "equipment",
  "journal",
  "curl",
  "kettlebell",
  "cardio",
  "recovery",
  "medball",
  "skipping",
  "pullup",
  "lunge",
  "carry",
  "row",
  "coachP",
];
const pool = pagePools[page] || fallback;
let cursor = 0;
function addImage(box, key, priority = false) {
  const [file, defaultAlt] = imageLibrary[key];
  const img = document.createElement("img");
  img.src = `assets/images/gallery/${file}`;
  const labelled = box.getAttribute("aria-label");
  img.alt = labelled?.startsWith("Space reserved")
    ? defaultAlt
    : labelled?.includes("Map")
      ? "STACKLY Fitness wellness studio near HSR Layout, Bengaluru"
      : defaultAlt;
  img.loading = priority ? "eager" : "lazy";
  img.decoding = "async";
  img.width = 1254;
  img.height = 1254;
  if (key === "sofia" || key === "meera") {
    img.style.objectPosition = "65% top";
  }
  box.prepend(img);
  box.classList.add("has-image");
}
document
  .querySelectorAll(".media-slot")
  .forEach((box, i) => {
    const name = box.closest(".coach-profile")?.querySelector("h2")?.textContent?.trim();
    const trainerKey = page === "trainers.html" && trainerPhotos[name];
    addImage(
      box,
      trainerKey || pool[cursor++ % pool.length],
      page === "index.html" && i === 0,
    );
    if (trainerKey) box.querySelector("img").alt = `${name}, STACKLY Fitness coach`;
  });
document.querySelectorAll(".mini").forEach((box) => {
  const heading = box.parentElement.querySelector("h3")?.textContent?.trim();
  const trainerKey = page === "trainers.html" && trainerPhotos[heading];
  const key = trainerKey || pool[cursor++ % pool.length];
  const [file, alt] = imageLibrary[key];
  const img = document.createElement("img");
  img.src = `assets/images/gallery/${file}`;
  img.alt = trainerKey
    ? `${heading}, STACKLY Fitness coach`
    : heading ? `${heading} fitness session at STACKLY Fitness` : alt;
  img.loading = "lazy";
  img.decoding = "async";
  img.width = 640;
  img.height = 480;
  if (key === "sofia" || key === "meera") {
    img.style.objectPosition = "65% top";
  }
  box.textContent = "";
  box.appendChild(img);
  box.classList.add("has-image");
});
