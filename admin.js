function loadDashboard() {
    const feedback =
        JSON.parse(localStorage.getItem("clinicFeedback") || "[]");

    const total = feedback.length;

    const average = total
        ? (feedback.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1)
        : "0.0";

    const pending = feedback.filter(item => item.status === "Pending").length;
    const resolved = feedback.filter(item => item.status === "Resolved").length;

    document.getElementById("totalFeedback").textContent = total;
    document.getElementById("averageRating").textContent = average + " / 5";
    document.getElementById("pendingFeedback").textContent = pending;
    document.getElementById("resolvedFeedback").textContent = resolved;

    const tableBody = document.getElementById("feedbackTableBody");
    tableBody.replaceChildren();

    feedback.forEach((item, index) => {
        const row = document.createElement("tr");

        const values = [
            item.id,
            item.patientName,
            item.department,
            item.rating + " / 5",
            item.comments,
            item.status
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.style.padding = "10px";
            cell.style.borderBottom = "1px solid #ddd";
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        actionCell.style.padding = "10px";

        const button = document.createElement("button");
        button.textContent =
            item.status === "Resolved" ? "Mark Pending" : "Mark Resolved";

        button.addEventListener("click", function () {
            feedback[index].status =
                feedback[index].status === "Resolved" ? "Pending" : "Resolved";

            localStorage.setItem("clinicFeedback", JSON.stringify(feedback));
            loadDashboard();
        });

        actionCell.appendChild(button);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });

    document.getElementById("adminMessage").textContent =
        total === 0
            ? "No feedback submitted yet. Submit a test feedback first."
            : "Feedback records loaded successfully.";
}

loadDashboard();