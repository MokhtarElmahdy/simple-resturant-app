let url = "https://forkify-api.herokuapp.com/api/search?q=pizza";
let navItem = document.querySelectorAll(".nav-item");
let logout = document.getElementById("logout");
let welcome = document.getElementById("welcome");
let foods = document.getElementById("foods");
let Resipe = document.getElementById("resipe");
let Recipes = [];
// Switch navbar
for (let i = 0; i < navItem.length; i++) {
  navItem[i].onclick = function (e) {
    url = `https://forkify-api.herokuapp.com/api/search?q=${e.target.innerText}`;
    fetchURL(url);
  };
}
if(localStorage.getItem("username") == null){
  window.location.href = "index.html";  
}
// welcome
 welcome.innerText = `Welcom ${localStorage.getItem("username")}`
// logout
logout.onclick = function(){
    localStorage.removeItem('username');
    window.location.href = "index.html";
}
// Home Page
async function fetchURL(url) {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      Recipes = data.recipes;
    });
  showFoods();
}
async function showFoodDetails(itemId) {
  let recipe;
  await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${itemId}`)
    .then((res) => res.json())
    .then((data) => {
      recipe = data.recipe;
    });
  
  showRecipe(recipe);
}
function showRecipe({ title, image_url, ingredients }) {
  let Ingredients = ingredients.map((item, index) => {
    return `<li> ${index + 1} - ${item}<li>`;
  });
  
  let box = `
   <p>${title}</p>
   <img 
   src=${image_url}
   class="card-media"
   >
   <ul class="text-left">
   ${Ingredients}
   </ul>
   `;
  // console.log(recipe);

  Resipe.innerHTML = box;
}
function showFoods() {
  let box = ``;
  let id;
  for (let i = 0; i < Recipes.length; i++) {
    id = String(Recipes[i].recipe_id);

    box += `
       <div class="col-4" onclick="showFoodDetails('${id}')">
       <img 
       src=${Recipes[i].image_url} 
       alt=${Recipes[i].title.split(" ").join("")}
       class="card-media"
       >
       <p>${Recipes[i].title}</p>
   </div>
       `;

    // showFoodDetails(Recipes[i].recipe_id)
  }
  foods.innerHTML = box;
}
fetchURL(url);
