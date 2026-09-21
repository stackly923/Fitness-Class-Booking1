const contentPage = location.pathname.split("/").pop() || "index.html";
const insights = {
  "index.html": {
    eyebrow: "Your complete experience",
    title: "Everything You Need to Train With Confidence",
    intro:
      "STACKLY connects expert coaching, flexible booking and useful progress information in one consistent member journey.",
    items: [
      [
        "Choose with clarity",
        "Compare class purpose, pace, duration, coach and remaining capacity before making a booking.",
      ],
      [
        "Arrive prepared",
        "Confirmation details include time, location, trainer and the information you need before class.",
      ],
      [
        "Keep progressing",
        "Your dashboard brings upcoming bookings, completed sessions, training hours and membership details together.",
      ],
    ],
  },
  "about.html": {
    eyebrow: "How we operate",
    title: "A Company Built Around Member Trust",
    intro:
      "Our service standards are designed to remain clear before, during and after every visit.",
    items: [
      [
        "Transparent information",
        "Class levels, plan inclusions, prices and cancellation terms are shown before you confirm.",
      ],
      [
        "Qualified support",
        "Certified coaches and informed member-support teams help resolve training and account questions.",
      ],
      [
        "Continuous improvement",
        "Attendance patterns, verified feedback and studio reviews guide programming and service updates.",
      ],
    ],
  },
  "classes.html": {
    eyebrow: "Inside every class",
    title: "What Your Session Includes",
    intro:
      "Formats differ, but the STACKLY coaching standard stays consistent from warm-up to recovery.",
    items: [
      [
        "Preparation",
        "A progressive warm-up introduces the movements and intended training intensity.",
      ],
      [
        "Coached work",
        "Clear demonstrations, observable technique points and scalable options throughout.",
      ],
      [
        "Useful finish",
        "A considered cool-down plus guidance on recovery and your next suitable session.",
      ],
    ],
  },
  "trainers.html": {
    eyebrow: "Choose your coach",
    title: "The Right Expertise for Your Goal",
    intro:
      "Trainer specialties help you find guidance that aligns with the way you want to progress.",
    items: [
      [
        "Build strength",
        "Work with coaches who teach lifting mechanics, load selection and structured progression.",
      ],
      [
        "Improve conditioning",
        "Choose specialists in sustainable intervals, endurance and intelligent intensity.",
      ],
      [
        "Move and recover",
        "Meet yoga, Pilates and mobility coaches focused on control, range and restoration.",
      ],
    ],
  },
  "schedule.html": {
    eyebrow: "Plan well",
    title: "Build a Balanced Training Week",
    intro:
      "A useful week combines effort, skill and recovery instead of repeating the same intensity every day.",
    items: [
      [
        "Start with anchors",
        "Reserve the sessions most important to your goal before adding optional formats.",
      ],
      [
        "Alternate demands",
        "Balance strength and conditioning with mobility or lower-intensity movement.",
      ],
      [
        "Protect recovery",
        "Leave enough space between demanding sessions to return ready to train well.",
      ],
    ],
  },
  "membership.html": {
    eyebrow: "Membership support",
    title: "A Plan You Can Understand and Use",
    intro:
      "Your membership should make training simpler, not introduce more decisions or hidden conditions.",
    items: [
      [
        "Clear inclusions",
        "See session allowances, booking priority and support level for every plan.",
      ],
      [
        "Visible usage",
        "Track sessions used, sessions remaining and your next renewal in the member dashboard.",
      ],
      [
        "Human assistance",
        "Contact the membership team for plan changes, pauses, billing questions or training guidance.",
      ],
    ],
  },
  "blog.html": {
    eyebrow: "Learn and apply",
    title: "From Reading to Better Training",
    intro:
      "Use the journal as a practical companion to coached sessions—not as a replacement for individual advice.",
    items: [
      [
        "Understand the why",
        "Learn how strength, conditioning, mobility and recovery work together.",
      ],
      [
        "Make one change",
        "Each article offers a useful idea you can apply without rebuilding your whole routine.",
      ],
      [
        "Ask your coach",
        "Bring questions into class so general guidance can be adapted to your experience.",
      ],
    ],
  },
  "contact.html": {
    eyebrow: "Member support",
    title: "The Right Help, Without the Runaround",
    intro:
      "Tell us what you need and your message will be directed to the team best placed to help.",
    items: [
      [
        "Booking support",
        "Get help with confirmations, waitlists, cancellations and class credits.",
      ],
      [
        "Training guidance",
        "Ask about levels, formats, coach specialties and preparing for your first visit.",
      ],
      [
        "Membership help",
        "Discuss plan selection, billing dates, corporate access and personal training.",
      ],
    ],
  },
};
const info = insights[contentPage],
  footerMount = document.querySelector("[data-footer]");
if (info && footerMount) {
  const section = document.createElement("section");
  section.className = "page-insights";
  section.innerHTML = `<div class="container"><div class="section-head"><div><p class="eyebrow">${info.eyebrow}</p><h2>${info.title}</h2></div><p>${info.intro}</p></div><div class="grid grid-3">${info.items.map((x, i) => `<article class="insight-item"><span>0${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join("")}</div></div>`;
  footerMount.parentNode.insertBefore(section, footerMount);
}
if (
  contentPage === "member-dashboard.html" ||
  contentPage === "admin-dashboard.html"
) {
  const main = document.querySelector(".dash-main");
  const note = document.createElement("aside");
  note.className = "dashboard-guide";
  note.innerHTML =
    contentPage === "member-dashboard.html"
      ? "<strong>Make your week work better</strong><span>Balance your upcoming bookings with recovery, review your progress after each week, and ask a coach when you want to change direction.</span>"
      : "<strong>Today’s operating focus</strong><span>Review near-capacity sessions, unresolved member messages and trainer availability before making timetable changes.</span>";
  main?.appendChild(note);
}
