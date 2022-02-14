/* let's go! */
const anchor = document.querySelector("a");
const image = document.querySelector("img");
const naming = document.querySelector("h1");
const repoNo = document.querySelector("#github-user-repos");
const language = document.querySelector("#github-repos-languages");
const stars = document.querySelector("#github-repos-stars");
const topRepo = document.querySelector("h4");
const repoAnchor = document.querySelector("#github-repo-link");
const repoDate = document.querySelector("#github-repo-created");
const openIssuesNo = document.querySelector("#github-repo-open-issues");
const repoWatchers = document.querySelector("#github-repo-watchers");
const repoContributors = document.querySelector("#github-repo-contributors");
const formInput = document.querySelector("#form-input");
const formBtn = document.querySelector("#form-button");


window.onload = function () {
formInput.value = "nabilramy";
formBtn.click();

}

function fetch (url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.open("GET", url);
  xhr.send();
}


formInput.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    formBtn.click();
  }
});

formBtn.addEventListener("click", function () {
  fetch(`https://api.github.com/users/${formInput.value}`, function (data) {
    image.src = data.avatar_url;
    naming.innerText = data.name;
    anchor.href = data.html_url;
    repoNo.innerHTML = data.public_repos;
  })
    fetch(`https://api.github.com/users/${formInput.value}/repos`, function (data) {
      let totalStars = 0;
      let languages = [];
      data.forEach(element => {
        languages.push(element.language);
        totalStars += element.stargazers_count;
      });
      stars.textContent = totalStars;

      const uni = [...new Set(languages)];
      const uniArr = uni.filter((item) => item !== null);
      
      language.innerHTML = uniArr.join(",");
      topRepo.textContent = data[0].name;
      repoAnchor.href = data[0].html_url;
      repoDate.innerHTML = data[0].created_at;
      openIssuesNo.innerHTML = data[0].open_issues;
      repoWatchers.innerHTML = data[0].watchers;

      fetch(data[0].contributors_url, function (data) {
        repoContributors.innerHTML = data.length;
      })

})

})

  

