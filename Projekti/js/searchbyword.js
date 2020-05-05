
let searchWord = localStorage.getItem("search");


// hakuosoitteen vakio-osa
const apiurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const searchButton = document.getElementById("runsearch");

const searchField = document.getElementById("haku");
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.
const section = document.getElementById("result");

const toFavouritesButton = document.querySelector("#favourites");

// lisätään napille tapahtumankäsittelijä
searchButton.addEventListener('click', painallus);


searchByWord(searchWord);

function toFavourites() {
    window.location.href = "./favourites.html";
}

toFavouritesButton.addEventListener('click', toFavourites);


function painallus(){
    searchWord = searchField.value;
    searchByWord(searchWord);
}

function searchByWord(searchWord)  {
    section.textContent = '';
    
    
    // TODO: haetaan html-sivulta käyttäjän antama hakuteksti (muista .value)
    // TODO: poista siis tuo alla oleva kovakoodaus!
 
   
    
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

    var maara = document.createElement("h5");
    var maara1 = document.createTextNode("Search: '"+searchWord+"' resulted "+jsonData.drinks.length+" drinks");
    maara.appendChild(maara1);
    section.appendChild(maara);

    

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
            console.log("Drinkin ID on: "+localStorage.getItem("drinkID")+". Siirrytään ainesosasivulle");
            };

        linkelement.appendChild(image);
        
       try {
        if(favouriteList.indexOf(jsonData.drinks[i].idDrink) > -1){
            name = document.createTextNode((i+1) + ". " + jsonData.drinks[i].strDrink+" (favourite)");
            console.log("on suosikki");
            
        }
           
       } catch (error) {
           
       }
        
            
        

        h2.appendChild(name);
        div.appendChild(h2);
        div.appendChild(linkelement);
        section.appendChild(div);

   }
}





