document.addEventListener("DOMContentLoaded", () => {
    const positiveOptions = [
        "Helped someone cross the road", "Donated to charity", "Planted a tree",
        /* 22 more positive options */
    ];

    const negativeOptions = [
        "Littered in public", "Skipped work", "Ignored a friend's call",
        /* 22 more negative options */
    ];

    const scoreElement = document.getElementById("score");
    let score = 0;

    const positiveList = document.getElementById("positive-options");
    const negativeList = document.getElementById("negative-options");

    const createListItem = (text, value) => {
        const li = document.createElement("li");
        li.textContent = text;
        li.addEventListener("click", () => {
            score += value;
            scoreElement.textContent = score;
        });
        return li;
    };

    positiveOptions.forEach((option) =>
        positiveList.appendChild(createListItem(option, 10))
    );

    negativeOptions.forEach((option) =>
        negativeList.appendChild(createListItem(option, -10))
    );

    const submitForm = document.getElementById("submit-score");
    submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;

        fetch("http://localhost:3000/add-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, score }),
        }).then(() => {
            alert("Score submitted!");
            fetchLeaderboard();
        });
    });

    const fetchLeaderboard = () => {
        fetch("http://localhost:3000/leaderboard")
            .then((response) => response.json())
            .then((data) => {
                const leaderboard = document.getElementById("leaderboard-entries");
                leaderboard.innerHTML = "";
                data.forEach(({ name, score }) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${name}</td><td>${score}</td>`;
                    leaderboard.appendChild(row);
                });
            });
    };

    fetchLeaderboard();
});
