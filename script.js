
/* SkillSet India - Common Website Functions
   English/Hindi support.
   Preserves demo jobs, registration, custom skills and wallet.
*/

const demoJobs = [
  {
    title: "Electrician",
    category: "Home Services",
    city: "Saharanpur",
    pay: "₹500–₹900/day",
    desc: "Wiring and electrical repairs."
  },
  {
    title: "Plumber",
    category: "Home Services",
    city: "Delhi",
    pay: "₹600–₹1000/day",
    desc: "Pipe fitting and leakage repairs."
  },
  {
    title: "Website Designer",
    category: "Digital & IT",
    city: "Remote",
    pay: "₹4000–₹12000/project",
    desc: "Website design for businesses."
  },
  {
    title: "Maths Tutor",
    category: "Education",
    city: "Remote",
    pay: "₹250–₹500/hour",
    desc: "Help students practise maths."
  },
  {
    title: "Carpenter",
    category: "Construction",
    city: "Saharanpur",
    pay: "₹700–₹1200/day",
    desc: "Furniture and woodwork."
  },
  {
    title: "Graphic Designer",
    category: "Digital & IT",
    city: "Remote",
    pay: "₹1000–₹5000/project",
    desc: "Posters and social media graphics."
  }
];

/* English-Hindi text dictionary for JavaScript messages. */
const translations = {
  en: {
    interested: "Interested",
    noJobs: "No matching jobs found.",
    fillRequired: "Please fill all required fields.",
    mobileInvalid: "Please enter a 10-digit mobile number.",
    emailInvalid: "Enter a valid email or leave it blank.",
    profileSaved: "Demo profile saved in this browser.",
    notEnoughPoints: "Not enough demo points.",
    redeemed: "50 demo points redeemed. No real voucher or payment is provided.",
    applications: "Demo only: real applications are not connected yet."
  },
  hi: {
    interested: "रुचि है",
    noJobs: "आपकी खोज से मेल खाती कोई नौकरी नहीं मिली।",
    fillRequired: "कृपया सभी आवश्यक जानकारी भरें।",
    mobileInvalid: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।",
    emailInvalid: "सही ईमेल दर्ज करें या इसे खाली छोड़ दें।",
    profileSaved: "डेमो प्रोफ़ाइल इस ब्राउज़र में सेव हो गई है।",
    notEnoughPoints: "आपके पास पर्याप्त डेमो पॉइंट्स नहीं हैं।",
    redeemed: "50 डेमो पॉइंट्स रिडीम हो गए। कोई असली वाउचर या भुगतान नहीं दिया जाता।",
    applications: "यह केवल डेमो है। असली नौकरी के आवेदन अभी जुड़े नहीं हैं।"
  }
};

function currentLanguage() {
  const saved = localStorage.getItem("skillset_language");
  return saved === "hi" ? "hi" : "en";
}

function tr(key) {
  const lang = currentLanguage();

  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }

  // Preserve compatibility with older calls that pass English messages.
  const legacyMessages = {
    "No matching jobs found.": "noJobs",
    "Please fill all required fields.": "fillRequired",
    "Please enter a 10-digit mobile number.": "mobileInvalid",
    "Enter a valid email or leave it blank.": "emailInvalid",
    "Demo profile saved in this browser.": "profileSaved",
    "Not enough demo points.": "notEnoughPoints",
    "50 demo points redeemed. No real voucher or payment is provided.": "redeemed",
    "Demo only: real applications are not connected yet.": "applications"
  };

  const translationKey = legacyMessages[key];

  if (translationKey && translations[lang][translationKey]) {
    return translations[lang][translationKey];
  }

  return key;
}

function getPoints() {
  return Number(localStorage.getItem("skillset_points") || 100);
}

/* Render a demo job card. */
function renderJobCard(job) {
  const card = document.createElement("article");
  card.className = "card";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = translateJobCategory(job.category);

  const heading = document.createElement("h3");
  heading.textContent = translateJobTitle(job.title);

  const description = document.createElement("p");
  description.textContent = translateJobDescription(job.desc);

  const locationPay = document.createElement("p");
  locationPay.textContent =
    `📍 ${translateCity(job.city)} · 💰 ${job.pay}`;

  const button = document.createElement("button");
  button.className = "btn";
  button.type = "button";
  button.textContent = tr("interested");

  button.addEventListener("click", () => {
    alert(tr("applications"));
  });

  card.append(tag, heading, description, locationPay, button);
  return card;
}

/* Translations for the demo job data. */
function translateJobTitle(value) {
  if (currentLanguage() !== "hi") return value;

  const map = {
    "Electrician": "इलेक्ट्रीशियन",
    "Plumber": "प्लंबर",
    "Website Designer": "वेबसाइट डिज़ाइनर",
    "Maths Tutor": "गणित शिक्षक",
    "Carpenter": "बढ़ई",
    "Graphic Designer": "ग्राफ़िक डिज़ाइनर"
  };

  return map[value] || value;
}

function translateJobCategory(value) {
  if (currentLanguage() !== "hi") return value;

  const map = {
    "Home Services": "घरेलू सेवाएँ",
    "Digital & IT": "डिजिटल और आईटी",
    "Education": "शिक्षा",
    "Construction": "निर्माण कार्य"
  };

  return map[value] || value;
}

function translateJobDescription(value) {
  if (currentLanguage() !== "hi") return value;

  const map = {
    "Wiring and electrical repairs.": "वायरिंग और बिजली की मरम्मत।",
    "Pipe fitting and leakage repairs.": "पाइप फिटिंग और लीकेज की मरम्मत।",
    "Website design for businesses.": "व्यवसायों के लिए वेबसाइट डिज़ाइन।",
    "Help students practise maths.": "विद्यार्थियों को गणित का अभ्यास कराएँ।",
    "Furniture and woodwork.": "फर्नीचर और लकड़ी का काम।",
    "Posters and social media graphics.": "पोस्टर और सोशल मीडिया ग्राफ़िक्स।"
  };

  return map[value] || value;
}

function translateCity(value) {
  if (currentLanguage() !== "hi") return value;

  const map = {
    "Saharanpur": "सहारनपुर",
    "Delhi": "दिल्ली",
    "Remote": "रिमोट"
  };

  return map[value] || value;
}

document.addEventListener("DOMContentLoaded", () => {
  const results = document.getElementById("jobResults");
  const search = document.getElementById("jobSearch");
  const category = document.getElementById("jobCategory");

  function showJobs() {
    if (!results) return;

    const query = (search?.value || "").toLowerCase().trim();
    const selectedCategory = category?.value || "All";

    const filteredJobs = demoJobs.filter(job => {
      const matchesCategory =
        selectedCategory === "All" ||
        job.category === selectedCategory;

      const searchableText =
        `${job.title} ${job.category} ${job.city} ${job.desc}`
          .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });

    results.replaceChildren();

    if (!filteredJobs.length) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = tr("noJobs");
      results.appendChild(emptyMessage);
      return;
    }

    filteredJobs.forEach(job => {
      results.appendChild(renderJobCard(job));
    });
  }

  search?.addEventListener("input", showJobs);
  category?.addEventListener("change", showJobs);
  showJobs();

  /* Custom skill visibility on the registration form. */
  const skill = document.getElementById("skill");
  const otherSkillWrap = document.getElementById("otherSkillWrap");

  function updateOtherSkill() {
    otherSkillWrap?.classList.toggle(
      "hidden",
      skill?.value !== "Other"
    );
  }

  skill?.addEventListener("change", updateOtherSkill);
  updateOtherSkill();

  /* Demo profile registration. */
  const form = document.getElementById("registerForm");

  form?.addEventListener("submit", event => {
    event.preventDefault();

    const name =
      document.getElementById("fullName")?.value.trim() || "";
    const email =
      document.getElementById("email")?.value.trim() || "";
    const mobile =
      document.getElementById("mobile")?.value.trim() || "";
    const city =
      document.getElementById("city")?.value.trim() || "";

    const skillValue = skill?.value === "Other"
      ? document.getElementById("otherSkill")?.value.trim() || ""
      : skill?.value || "";

    if (!name || !mobile || !city || !skillValue) {
      alert(tr("fillRequired"));
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert(tr("mobileInvalid"));
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(tr("emailInvalid"));
      return;
    }

    let profiles = [];

    try {
      profiles = JSON.parse(
        localStorage.getItem("skillset_profiles") || "[]"
      );

      if (!Array.isArray(profiles)) profiles = [];
    } catch {
      profiles = [];
    }

    profiles.push({
      name,
      email,
      mobile,
      city,
      skill: skillValue,
      role: document.getElementById("role")?.value || "Worker",
      createdAt: new Date().toISOString()
    });

    localStorage.setItem(
      "skillset_profiles",
      JSON.stringify(profiles)
    );

    form.reset();
    updateOtherSkill();
    alert(tr("profileSaved"));
  });

  /* Demo wallet. */
  const balance = document.getElementById("pointsBalance");

  if (balance) {
    balance.textContent = getPoints();
  }

  document.getElementById("redeemPoints")?.addEventListener("click", () => {
    let points = getPoints();

    if (points < 50) {
      alert(tr("notEnoughPoints"));
      return;
    }

    points -= 50;
    localStorage.setItem("skillset_points", String(points));

    if (balance) balance.textContent = points;

    alert(tr("redeemed"));
  });

  /* Re-render dynamic jobs whenever the language changes. */
  document.addEventListener("skillset-language-change", showJobs);
  document.addEventListener("skillset:languageChanged", showJobs);
});
