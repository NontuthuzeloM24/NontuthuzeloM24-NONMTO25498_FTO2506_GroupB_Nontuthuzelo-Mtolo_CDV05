const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// ====== Smooth Scrolling ======
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu after clicking a link
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

// ====== Dark Mode Toggle ======
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Helper to set theme
function setTheme(mode) {
  if (mode === "dark") {
    body.classList.remove("body-light");
    body.classList.add("body-dark");
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("body-dark");
    body.classList.add("body-light");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // Default to system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

// Toggle on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("body-dark");
    setTheme(isDark ? "light" : "dark");
  });
}

// ====== External Links: Open in New Tab ======
document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  // Skip internal links (#about, /projects, mailto:, etc.)
  const isInternal =
    href.startsWith("#") ||
    href.startsWith("/") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");
  if (!isInternal) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }
});