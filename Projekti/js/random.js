const apiurl2 = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const randomButton = document.getElementById("randomButton");



// lisätään napille tapahtumankäsittelijä
randomButton.addEventListener('click', randomSearch);






function randomSearch()  {

    fetch(apiurl2).then(function(response) {
        return response.json();
    }).then(function(json) {
        showRandom(json);				
    });
}


function showRandom(jsonData) {
    
    localStorage.setItem("drinkID", jsonData.drinks[0].idDrink);
    window.location.href = './results.html';


}





