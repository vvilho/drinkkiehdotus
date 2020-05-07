// Find the searchword from the cookies
let searchWord = localStorage.getItem("search");


// Constant of the API URL
const apiurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

// Find needed components of the web page
const searchButton = document.getElementById("runsearch");

const searchField = document.getElementById("searchField");
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.
const section = document.getElementById("result");

const toFavouritesButton = document.querySelector("#favourites");

// Add event listener to the button
searchButton.addEventListener('click', searchForDrink);


searchByIngredient(searchWord);

function toFavourites() {
    window.location.href = "./favourites.html";
}

toFavouritesButton.addEventListener('click', toFavourites);

// search wor drinkg
function searchForDrink(){
    searchWord = searchField.value;
    searchByIngredient(searchWord);
}

// Search for a drink by ingredient
function searchByIngredient(searchWord)  {
    section.textContent = '';
    
    fetch(apiurl + searchWord)
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } 
    })
    .then((json) => {
        showResults(json);	
    }).catch(error => {
        console.log(error);
        
        var p = document.createElement("p");
        var pNode = document.createTextNode("Nothing found. Try with different ingredient")
        p.appendChild(pNode);
        section.appendChild(p);
    });

};


function showResults(jsonData) {
    let favouriteList = JSON.parse(localStorage.getItem("favourites"));

    var foundInfo = document.createElement("h5");
    foundInfo.innerText = "Search: '"+searchWord+"' resulted "+jsonData.drinks.length+" drinks";
    section.appendChild(foundInfo);

    

   for (var i = 0; i<jsonData.drinks.length;i++){
        var linkelement = document.createElement("a");
        linkelement.href = "./results.html";

        var div = document.createElement("div");
        var name = document.createTextNode((i+1) + ". " + jsonData.drinks[i].strDrink);
        var h2 = document.createElement("h2");
        var image = document.createElement("img");

        div.setAttribute("data_DrinkName", jsonData.drinks[i].strDrink);
        div.setAttribute("data_ID", jsonData.drinks[i].idDrink);


        image.setAttribute("src", jsonData.drinks[i].strDrinkThumb);
        image.setAttribute("id", "thumbnail");
        image.setAttribute("data_ID", jsonData.drinks[i].idDrink);
        image.onclick = function() {
            localStorage.setItem("drinkID", this.getAttribute("data_ID"));
            };

        linkelement.appendChild(image);
        
       try {
        // Check if drink is a favourite
        if(favouriteList.indexOf(jsonData.drinks[i].idDrink) > -1){
            name = document.createTextNode((i+1) + ". " + jsonData.drinks[i].strDrink+" (favourite)");
            
        }
           
       } catch (error) {
           
       }
        
            
        

        h2.appendChild(name);
        div.appendChild(h2);
        div.appendChild(linkelement);
        section.appendChild(div);

   }
}





