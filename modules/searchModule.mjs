import { fetchData, renderData } from "../main.mjs";

let allData = []; // Global variable to store all data

export async function searchModule() {
  try {
    const data = await fetchData();
    allData = data; // Store all data globally

    // Render all data initially
    renderData(allData);

    const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();

      if (searchTerm === "") {
        // If the input is empty, display all data
        renderData(allData);
        return; // Exit the function early
      }

      // Filter the data if the input is not empty
      const filteredData = allData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      renderData(filteredData); // Render the filtered data
    });
  } catch (error) {
    console.error("Error in search module:", error);
  }
}
