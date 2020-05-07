const apiurl2 = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const randomButton = document.querySelector("#randomButton");

const searchButton = document.getElementById("runsearch");
const input = document.getElementById("searchField");

const toFavouritesButton = document.querySelector("#favourites");

function toFavourites() {
    window.location.href = "./Pages/favourites.html";
}

searchButton.addEventListener('click', searchByWord);

function searchByWord(){
    let searchWord = input.value;
    localStorage.setItem("search", searchWord);
    window.location.href = './Pages/search.html';
    

}

function searchRandom()  {

    fetch(apiurl2).then(function(response) {
        return response.json();
    }).then(function(json) {
        showRandom(json);				
    });
}


function showRandom(jsonData) {
    
    localStorage.setItem("drinkID", jsonData.drinks[0].idDrink);
    window.location.href = './Pages/results.html';


}


toFavouritesButton.addEventListener('click', toFavourites);

// lisätään napille tapahtumankäsittelijä
randomButton.addEventListener('click', searchRandom);




