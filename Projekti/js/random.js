const apiurl2 = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const randomButton = document.getElementById("hakunappi");



// lisätään napille tapahtumankäsittelijä
randomButton.addEventListener('click', tee_haku_random);






function tee_haku_random()  {

    fetch(apiurl2).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus_random(json);				
    });
}


function naytaVastaus_random(jsonData) {
    
    console.log(jsonData.drinks[0].idDrink);
    localStorage.setItem("drinkID", jsonData.drinks[0].idDrink);
    window.location.href = './results.html';


}





