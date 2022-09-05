document.addEventListener("DOMContentLoaded",  function (){

const searchBTn = document.getElementById("github-form").addEventListener("submit", (e)=>{
    e.preventDefault()

const userName = document.querySelector('#search').value;
fetch(`https://api.github.com/search/users?q=${userName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
     })
        .then(response => response.json())
        .then(users => {
            const data = users.items 
            renderUser(data)
       })
function renderUser(data){
    const list = document.getElementById("user-list")
    data.map(allUsers=>{
        const div= document.createElement("div")
        div.className="card"
        div.innerHTML=`<img src="${allUsers.avatar_url}" >`
    + `<h2>${allUsers.login}</h2>`
    + `<a class="fs11" href="${allUsers.html_url}" target="_blank">Go to Github Profile</a><br>`
    + `<button class="submit-button ">View ${allUsers.login}'s Repos</button>`
    list.appendChild(div)
   })
const repo= document.getElementsByClassName('submit-button ')
    repo.forEach(repoData=> {
    repoData.addEventListener("click", (e)=>{
        const result= e.target.parentElement.querySelector('h2').textContent
        fetch(`https://api.github.com/users/${result}/repos`,{
            method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/vnd.github.v3+json'
                }
              })

               .then(resp => resp.json())
               .then(data=>{
               const repoList= document.querySelector('#repos-list')
               repoList.map(repo =>{
                    const repoList = document.createElement("div");
                    repoList.className = "repo-card"
                    repoList.innerHTML=`
                   <h3>${repo.name}</h3>`
                    repoList.appendChild(div)
                        })
                      })
                   })
                 })
                }
            }) 
        })
