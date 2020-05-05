const ul = document.getElementById("favouriteList");
var favourites = JSON.parse(localStorage.getItem("favourites"));
favourites = favourites.sort();
const suosikit = document.querySelector("h1");
console.log("Suosikit ID-lista: " + favourites);

for(var i = 0; i < favourites.length; i++){
    apiurl_suosikki = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + favourites[i];
    fetch(apiurl_suosikki).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);
    })
}
function naytaVastaus(jsonData) {
    var otsikko = document.getElementById("otsikko");
    console.log(jsonData)

    otsikko.innerHTML = "Suosikit";

    var name = jsonData.drinks[0].strDrink;
    
    console.log(name);
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

function getDrink(drinkID) {
     localStorage.setItem("drinkID", drinkID);
     window.location.href = "./results.html";
}