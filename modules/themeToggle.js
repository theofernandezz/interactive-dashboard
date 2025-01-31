export function initThemeToggle(buttonId) {
  const toggleButton = document.getElementById(buttonId);
  if (!toggleButton) return; // Prevents errors if the button is missing

  const icon = toggleButton.querySelector("i");
  const currentTheme = localStorage.getItem("theme");

  // Apply stored theme and update icon
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    icon.classList.replace("bxs-moon", "bxs-sun");
  }

  // Toggle theme & update icon
  toggleButton.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "light" : "dark"
    );
    localStorage.setItem("theme", isDark ? "light" : "dark");
    // Toggle icon
    icon.classList.toggle("bxs-moon");
    icon.classList.toggle("bxs-sun");
  });
}
