/*
	Javascript-tiedosto AJAX-tehtäviä varten.
	Jos etsitään TV-sarjoja haulla "girls", niin TV Maze APIsta suoritettava hakuosoite on:
	http://api.tvmaze.com/search/shows?q=girls
	Testaa haun toimintaa omassa selaimessa (Firefox osaa tulkita json-tuloksen yleensä paremmin).
	Kun koodi toimii, niin poista turhat open höpinät.
*/

// hakuosoitteen vakio-osa.
const apiurl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("hakunappi");
const suosikki = document.getElementById("suosikki");
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.


// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', tee_haku);
suosikki.addEventListener("click", suosikkiPainallus);



// Idea: tämä fetch-osa säilyy aina lähes vakiona.
function tee_haku()  {
    // TODO: haetaan html-sivulta käyttäjän antama hakuteksti (muista .value)
    // TODO: poista siis tuo alla oleva kovakoodaus!
    fetch(apiurl).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    });

};
function suosikkiPainallus(){
    var DrinkID=suosikki.getAttribute("data-drinkID");
    console.log(DrinkID);
    localStorage.setItem("suosikki", DrinkID);
}


function naytaVastaus(jsonData) {

    var otsikko = document.getElementById("otsikko");
    otsikko.innerHTML = "Ainesosat:";
    var teksti = document.getElementById("chuck");
    var kuva = document.getElementById("kuva");
    var node = jsonData.drinks[0].strDrink;
    var kuva1 = jsonData.drinks[0].strDrinkThumb;
    kuva.setAttribute("src", kuva1 )
    teksti.innerHTML=node;
    var ainesosat = [];
    var maarat = [];
    var ID = jsonData.drinks[0].idDrink;
    suosikki.setAttribute("data-drinkID",ID);
    for (var i = 1; i<16; i++){
        var ingNumber = "strIngredient"+i;
        var measureNumber = "strMeasure"+i;
        ainesosat.push(jsonData.drinks[0][ingNumber]);
        maarat.push(jsonData.drinks[0][measureNumber]);
    }
  
    
   
    var ainesosalista = document.getElementById("ainesosat");
    var maaraLista = document.getElementById("maarat");

    for (var i=1;i<16;i++){
        
            document.getElementById("li"+i).innerHTML = ainesosat[i-1];
        
        
            document.getElementById("li2"+i).innerHTML = maarat[i-1];
        
    }
    suosikki.style.visibility = "visible";

}




