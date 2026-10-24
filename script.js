const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const patientName =
            document.getElementById("patientName").value.trim();

        const anonymous =
            document.getElementById("anonymous").value;

        const visitDate =
            document.getElementById("visitDate").value;

        const appointmentId =
            document.getElementById("appointmentId").value.trim();

        const department =
            document.getElementById("department").value;

        const rating =
            document.getElementById("rating").value;

        const comments =
            document.getElementById("comments").value.trim();

        const feedbackNumber =
            "CF" + Date.now().toString().slice(-8);

        const feedback = {
            id: feedbackNumber,
            patientName: anonymous === "Yes" ? "Anonymous" : patientName,
            anonymous: anonymous,
            visitDate: visitDate,
            appointmentId: appointmentId,
            department: department,
            rating: Number(rating),
            comments: comments,
            status: "Pending"
        };

        // Save feedback in this browser for project demonstration
        const allFeedback =
            JSON.parse(localStorage.getItem("clinicFeedback") || "[]");

        allFeedback.push(feedback);

        localStorage.setItem(
            "clinicFeedback",
            JSON.stringify(allFeedback)
        );

        document.getElementById("message").textContent =
            "Thank you! Your feedback has been submitted successfully.";

        document.getElementById("message").style.color = "green";

        document.getElementById("feedbackId").textContent =
            "Your Feedback ID: " + feedbackNumber;

        feedbackForm.reset();
    });
}