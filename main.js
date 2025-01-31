import { initThemeToggle } from "./modules/themeToggle.js";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/ventas");
    if (!response.ok) throw new Error("Failed to fetch data");
    const jsonData = await response.json();

    console.log(jsonData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

fetchData();

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle("toggleButton");
});
