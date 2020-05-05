const clearButton = document.getElementById("clearButton");
const ul = document.getElementById("favouriteList");
var favouriteList = JSON.parse(localStorage.getItem("favourites"));
favouriteList = favouriteList.sort();

//Removes non-unique entries from array
favouriteList = favouriteList.filter(onlyUnique);

const suosikit = document.querySelector("h1");
console.log("Suosikit ID-lista: " + favouriteList);
clearButton.addEventListener('click', clearList);

for(var i = 0; i < favouriteList.length; i++){
    apiurl_suosikki = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + favouriteList[i];
    fetch(apiurl_suosikki).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);
    })
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
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
function clearList(jsonData) {
    if(confirm("Are you sure? Press OK to clear favourites.")){
        favouriteList = [];
        localStorage.setItem("favourites", JSON.stringify(favouriteList));
        alert("Favourites cleared!");
        location.reload();
    }
}