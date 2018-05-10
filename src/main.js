import api from "./api";

class App {
  constructor() {
    this.formEl = document.querySelector("form");
    this.user = document.querySelector("input[name=user]");
    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = e => this.showUser(e);
  }

  async showUser(e) {
    e.preventDefault();
    const user = this.user.value;

    try {
      if (user === "") {
        alert("digite algo");
        return;
      }
      const response = await api.get(`/users/${user}`);
      const { name, bio, avatar_url, html_url } = response.data;

      this.renderUser(name, bio, avatar_url, html_url);

      const repos = await api.get(`/users/${user}/repos`);
      this.renderRepos(repos.data);

      this.user.value = "";
    } catch (err) {
      alert("usuário não encontrado!");
    }
  }

  renderUser(name, bio, avatar_url, html_url) {
    let list = "";

    if (bio == null) bio = "";

    list = `
    <div id='list'>
      <img src=${avatar_url}>
      <h2>${name}</h2>
      <p>${bio}</p>
      <br>
      <a href='${html_url}' target='_blank'>acessar</a>
    </div>`;
    document.getElementById("container").innerHTML = list;
  }

  renderRepos(repos) {
    let container_repos = "";

    repos.map(repo => {
      container_repos += `
      <div class='repo'>
        <a href='${repo.html_url}' class='repo-link'>
          <img src='${repo.owner.avatar_url}' class='repo-image'>
          <h3 class='repo-title'>${repo.name}</h3>
          <p class='repo-description'>${
            repo.description !== null ? repo.description : ""
          }</p>
          <p class='repo-full-name'>${repo.full_name}</p>
        </a>
      </div>
      `;
    });

    document.getElementById("container").innerHTML += container_repos;
  }
}

new App();
