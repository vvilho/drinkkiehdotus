const clearButton = document.getElementById("clearButton");
const ul = document.getElementById("favouriteList");
var favouriteList = JSON.parse(localStorage.getItem("favourites"));
favouriteList = favouriteList.sort();

var title = document.getElementById("title");

title.innerHTML = "Favourites";

// Removes non-unique entries from array
favouriteList = favouriteList.filter(onlyUnique);


clearButton.addEventListener('click', clearList);

// Goes through the favourite list and renders favourites
for(var i = 0; i < favouriteList.length; i++){
    apiurl_suosikki = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + favouriteList[i];
    fetch(apiurl_suosikki).then(function(response) {
        return response.json();
    }).then(function(json) {
        showResults(json);
    })
}

// if there is no favourites, show text
var emptyList = document.createElement("p");
emptyList.innerText = "No favourites yet";
if(favouriteList.length == 0){
    ul.innerHTML = "<br>";
    ul.appendChild(emptyList);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function showResults(jsonData) {
    

    var name = jsonData.drinks[0].strDrink;
    
    var ID = jsonData.drinks[0].idDrink;
    var li = document.createElement("li");
    li.setAttribute("class", 'drinkObject');
    li.setAttribute('onClick', `getDrink(${ID})`);
    
    var drinkName = document.createElement('h3');
    drinkName.innerText = name;
    li.appendChild(drinkName);
  

    var img = document.createElement('img');
    img.setAttribute('src', jsonData.drinks[0].strDrinkThumb);
    li.appendChild(img);

    ul.appendChild(li);
    

    
}

// Show specific drink
function getDrink(drinkID) {
     localStorage.setItem("drinkID", drinkID);
     window.location.href = "./results.html";
}

// Clear the list of favourite drinks
function clearList() {
    if(confirm("Are you sure? Press OK to clear favourites.")){
        favouriteList = [];
        localStorage.setItem("favourites", JSON.stringify(favouriteList));
        alert("Favourites cleared!");
        location.reload();
    }
}