document.querySelector('form').addEventListener('submit', e => {

  e.preventDefault();

  var username = document.getElementById('username').value;
  
  var lista = '';

  if(username !== '') {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(data => data.json())
    .then(repos => repos.map(repo => {
      lista += `
                <div class="email-item pure-g">
                  <div class="pure-u">
                      <img alt="Yahoo! News&#x27; avatar" class="avatar-repos" src="assets/img/github-256.png">
                  </div>
                  <div class="pure-u-3-4">
                      <h5 class="email-name"></h5>
                      <span class="email-subject"> <a href="${repo.html_url}">${repo.name}</a></span>
                      <p class="email-desc">
                        ${repo.owner.login}
                      </p>
                  </div>
                </div>`;
      document.getElementById('list').innerHTML = lista;
      getProfile(username);
      console.log(repo);
    }))
    .catch(error => {
        if(error) {
          lista += `<span class='user-not-found'>user not found</span>`;
          document.getElementById('main').innerHTML = lista;
          document.getElementById('list').innerHTML = '';
        }
    })
  }else {
    alert('search github user');
  }
})

const getProfile = (username) => {
  var html_profile = '';
  fetch(`https://api.github.com/users/${username}`)
  .then(data => data.json())
  .then(user => {
    html_profile += `
      <div class="email-content">
            <div class="email-content-header pure-g">
                <div class="pure-u-1-2">
                <img alt="user profile" class="avatar" src="${user.avatar_url}">

                    <h1 class="email-content-title">${user.name}</h1>
                    <p class="email-content-subtitle">
                      ${user.bio}
                    </p>
                    <p class="email-content-subtitle">
                      ${user.location}
                    </p>

                    <div class="email-content-controls pure-u-1-2">
                    <button class="secondary-button pure-button"><a href="${user.html_url}" target='_blank'>github</a></button>
                    <button class="secondary-button pure-button"><a href="${user.email}" target='_blank'>email</a></button>
                    <button class="secondary-button pure-button"><a href="${user.url}" target='_blank'>api</a></button>
                </div>
                </div>
            </div>

            <div class="email-content-body">
                
            </div>
        </div>
    `
    document.getElementById('main').innerHTML = html_profile;
  })
}