const input = document.getElementById("username");
const container = document.getElementById("user-info");

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchUser();
    }
});

async function searchUser() {
    const username = input.value.trim();

    if (!username) {
        alert("Please enter a username");
        return;
    }

    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        container.innerHTML = "";

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${data.avatar_url}" alt="avatar">
            <h2>${data.login}</h2>
            <p>${data.bio || "No bio available"}</p>
            <p>${data.location || "No location"}</p>
            <p>Repos: ${data.public_repos}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <a href="${data.html_url}" target="_blank">View Profile</a>
        `;

        container.appendChild(card);

    } catch (error) {
        container.innerHTML = `<p>${error.message}</p>`;
    }
}