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

      this.render(name, bio, avatar_url, html_url);

      this.user.value = "";
    } catch (err) {
      alert("usuário não encontrado!");
    }
  }

  render(name, bio, avatar_url, html_url) {
    let list = "";

    if (bio == null) bio = "";

    list = `
      <img src=${avatar_url}>
      <h2>${name}</h2>
      <span>${bio}</span>
      <br>
      <a href='${html_url}' target='_blank'>acessar</a>
    `;
    document.getElementById("list").innerHTML = list;
  }
}

new App();
