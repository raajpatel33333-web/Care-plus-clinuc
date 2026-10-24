const feedback = JSON.parse(
    localStorage.getItem("clinicFeedback") || "[]"
);

document.getElementById("reportTotal").textContent = feedback.length;

const overallAverage = feedback.length
    ? (
        feedback.reduce((sum, item) => sum + Number(item.rating), 0)
        / feedback.length
    ).toFixed(1)
    : "0.0";

document.getElementById("reportAverage").textContent =
    overallAverage + " / 5";

const departments = [
    "Doctor Consultation",
    "Nursing",
    "Reception",
    "Cleanliness",
    "Waiting Time",
    "Billing"
];

const tableBody = document.getElementById("reportTableBody");

departments.forEach(department => {
    const records = feedback.filter(
        item => item.department === department
    );

    const average = records.length
        ? (
            records.reduce((sum, item) => sum + Number(item.rating), 0)
            / records.length
        ).toFixed(1)
        : "N/A";

    let performance = "No data";

    if (records.length) {
        const score = Number(average);

        if (score >= 4) {
            performance = "Excellent";
        } else if (score >= 3) {
            performance = "Good";
        } else {
            performance = "Needs Improvement";
        }
    }

    const row = document.createElement("tr");

    [department, records.length, average, performance].forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        cell.style.padding = "12px";
        cell.style.borderBottom = "1px solid #ddd";
        row.appendChild(cell);
    });

    tableBody.appendChild(row);
});

document.getElementById("reportEmpty").textContent = feedback.length
    ? "Report generated from submitted feedback."
    : "No feedback yet. Submit feedback to generate your report.";