async function searchUser(){
    const username = document.getElementById("username").value;
    console.log(username);

    try{
        const response = await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok) throw new Error("User not found");
        const data = await response.json();
    }catch(error){
        document.getElementById("user-info").innerHTML = `<p>${error.message}`;
    }

    const container = document.getElementById("user-info");
    container.innerHTML = " ";

    const card = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const repos = document.createElement("p");
    const followers = document.createElement("p");
    const following = document.createElement("p");

    img.src = data.avatar_url;
    name.innerText = "Username: " + data.login;
    repos.innerText = "Public Repositories: " + data.public_repos;
    followers.innerText = "Followers: " + data.followers;
    following.innerText = "Following: " + data.following;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(repos);
    card.appendChild(followers);
    card.appendChild(following);

    container.appendChild(card);
}

