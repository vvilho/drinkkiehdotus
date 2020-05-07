// Url of the cocktailDB API
const apiurl2 = "https://www.thecocktaildb.com/api/json/v1/1/random.php";


// Search components from HTML-document by their id
const randomButton = document.querySelector("#randomButton");

const searchButton = document.getElementById("runsearch");
const input = document.getElementById("searchField");

const toFavouritesButton = document.querySelector("#favourites");

function toFavourites() {
    window.location.href = "./Pages/favourites.html";
}



// Stores users searc hword to local storage and continues to search.html site
function searchByWord(){
    let searchWord = input.value;
    localStorage.setItem("search", searchWord);
    window.location.href = './Pages/search.html';
    

}
// Uses this APIs random generator to select random drink
function searchRandom()  {

    fetch(apiurl2).then(function(response) {
        return response.json();
    }).then(function(json) {
        showRandom(json);				
    });
}

// Stores random drinks drinkId to local storage and continues to results.html site
function showRandom(jsonData) {
    
    localStorage.setItem("drinkID", jsonData.drinks[0].idDrink);
    window.location.href = './Pages/results.html';


}

// Event listeners for buttons
toFavouritesButton.addEventListener('click', toFavourites);

randomButton.addEventListener('click', searchRandom);

searchButton.addEventListener('click', searchByWord);


// By pressing enter search is started
window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchByWord();
      console.log("enter");
    }
});




