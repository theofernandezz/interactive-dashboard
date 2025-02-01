import { initThemeToggle } from "./modules/themeToggle.mjs";
import { searchModule } from "./modules/searchModule.mjs";

export async function fetchData() {
  try {
    const response = await fetch("./db.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    const jsonData = await response.json();
    return jsonData.ventas;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

// render function
export function renderData(data) {
  const tbody = document.getElementById("data-table");
  tbody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");

    // ID
    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    // Name
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    // Sales
    const salesCell = document.createElement("td");
    salesCell.textContent = item.sales;
    row.appendChild(salesCell);

    // Date
    const dateCell = document.createElement("td");
    dateCell.textContent = item.date;
    row.appendChild(dateCell);

    // Stats (Grafic)
    const statsCell = document.createElement("td");
    const chartContainer = document.createElement("canvas");
    chartContainer.classList.add("chart-container");
    statsCell.appendChild(chartContainer);
    row.appendChild(statsCell);

    tbody.appendChild(row);

    // Grafic Render
    renderChart(chartContainer, item.stats);
  });
}

function renderChart(container, stats) {
  const ctx = container.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: stats.labels,
      datasets: [
        {
          label: "Ventas",
          data: stats.data, // Grafic Details
          backgroundColor: ["#6a11cb", "#2575fc", "#2ec4b6"],
          borderColor: ["#6a11cb", "#2575fc", "#2ec4b6"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              return `Ventas: ${context.raw}`;
            },
          },
        },
        legend: {
          display: true,
          position: "top",
        },
        datalabels: {
          color: "#333",
          anchor: "end",
          align: "top",
          formatter: function (value) {
            return value;
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  initThemeToggle("toggleButton");
  await searchModule();
});
