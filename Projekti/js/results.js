// Url of the cocktailDB API
const apiurl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";




// Search components from HTML-document 
const favouriteButton = document.querySelector("#favouriteButton");
const toFavouritesButton = document.querySelector("#favourites");

let drinkID = localStorage.getItem("drinkID");

// Change to favourites site
function toFavourites() {
    window.location.href = "./favourites.html";
}

toFavouritesButton.addEventListener('click', toFavourites);

// Add a drink to favourites list
function addFavourite() {
    let favouriteList = JSON.parse(localStorage.getItem("favourites"));
    if (favouriteList === null)
    {
        favouriteList = [];
    }

    favouriteList.push(drinkID);
    localStorage.setItem("favourites", JSON.stringify(favouriteList));

    favouriteButton.setAttribute("style", "background-color: red;");
    favouriteButton.innerText = "Favourite!";
    favouriteButton.removeEventListener('click', addFavourite);
    favouriteButton.addEventListener('click', removeFavourite);
}

// Remove a drink from the favourites
function removeFavourite() {
    let favouriteList = JSON.parse(localStorage.getItem("favourites"));

    favouriteList = favouriteList.filter(favouriteID => favouriteID !== drinkID);
    localStorage.setItem("favourites", JSON.stringify(favouriteList));

    favouriteButton.removeAttribute("style");
    favouriteButton.innerText = "Favourite?"
    favouriteButton.removeEventListener('click', removeFavourite)
    favouriteButton.addEventListener('click', addFavourite)
}

favouriteButton.addEventListener("click", addFavourite)

findDrink(drinkID);

// Search a drink by it's id from cocktailDB
function findDrink(drinkID)  {
    
    fetch(apiurl + drinkID)
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } 
    })
    .then((json) => {
        showResults(json);	
    }).catch(error => {
        console.log(error);
        console.log("Drink ID ongelma / välimuistissa ei ole drink ID:tä tallennettu");
        
    });

};

// Render the results of the search
function showResults(jsonData) {

    var teksti = document.getElementById("chuck");
    var result = document.querySelector('.result')
    var node = jsonData.drinks[0].strDrink;
    teksti.innerHTML=node;
    var ingredients = [];
    var amounts = [];
    let favouriteList = JSON.parse(localStorage.getItem("favourites"));
    
    // If a drink has been already favourited, change the button to remove 
    try {
        if(favouriteList.indexOf(drinkID) > -1){
            favouriteButton.setAttribute("style", "background-color: red;");
            favouriteButton.innerText = "Favourite!";
            favouriteButton.removeEventListener('click', addFavourite);
            favouriteButton.addEventListener('click', removeFavourite);
    
        }
        
    } catch (error) {
        
    }
    

    
   
    for (let i = 1; i<16; i++){
        let ingNumber = "strIngredient"+i;
        if (jsonData.drinks[0][ingNumber] == null || jsonData.drinks[0][ingNumber] === "")
        {
            break;
        }
        ingredients.push(jsonData.drinks[0][ingNumber]);
    }

    for (let i = 1; i<16; i++) {
        let measureNumber = "strMeasure"+i;
        if (jsonData.drinks[0][measureNumber] === null || jsonData.drinks[0][measureNumber] === "")
        {
            break;
        }
        amounts.push(jsonData.drinks[0][measureNumber]);
    }
  
    
   
    var ingredientList = document.querySelector(".ingredients");
    var amountList = document.querySelector(".amounts");

    if (ingredientList.firstChild && amountList.firstChild)
    {
        ingredientList.innerHTML = "";
        amountList.innerHTML = "";
        let img = document.querySelector('.drinkIMG')
        if (img !== null) {
            result.removeChild(img)
        }
        
    }

    var ingHeader = document.createElement('h4');
    ingHeader.innerText = 'Ingredients';
    
    var amHeader = document.createElement('h4');
    amHeader.innerText = 'Amounts';

    ingredientList.appendChild(ingHeader);
    amountList.appendChild(amHeader);

    var ingrUL = document.createElement('ul');
    var amountUL = document.createElement('ul');

    var howto = document.createElement('p');
    howto.innerText = jsonData.drinks[0].strInstructions;

    ingredients.map(ingredient => {
        let li = document.createElement('li')
        li.innerText = ingredient;
        ingrUL.appendChild(li)
    });

    amounts.map(amount => {
        let li = document.createElement('li');
        li.innerText = amount;
        amountUL.appendChild(li)
    })

    ingredientList.appendChild(ingrUL);
    amountList.appendChild(amountUL);
    let img = document.createElement('img')
    img.setAttribute('src', jsonData.drinks[0].strDrinkThumb)
    img.setAttribute('class', 'drinkIMG')
    result.appendChild(howto);
    result.appendChild(img)

    getRandom();
    document.getElementById("map").setAttribute("class", "visible");
    document.getElementById("locationtext").setAttribute("class", "visible");
}




