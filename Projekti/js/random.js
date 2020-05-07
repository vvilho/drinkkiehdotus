const apiurl2 = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// Search components from HTML-document by their id
const randomButton = document.getElementById("randomButton");



// Event listeners for button
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





