
let hakusana = localStorage.getItem("hakusana");


// hakuosoitteen vakio-osa
const apiurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("runsearch");

const hakukentta = document.getElementById("haku");
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.
const section = document.getElementById("result");

// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', painallus);


tee_haku(hakusana);




function painallus(){
    hakusana = hakukentta.value;
    tee_haku(hakusana);
}

function tee_haku(hakusana)  {
    section.textContent = '';
    
    
    // TODO: haetaan html-sivulta käyttäjän antama hakuteksti (muista .value)
    // TODO: poista siis tuo alla oleva kovakoodaus!
 
   
    
    fetch(apiurl + hakusana)
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } 
    })
    .then((json) => {
        naytaVastaus(json);	
    }).catch(error => {
        console.log(error);
        
        var p = document.createElement("p");
        var pNode = document.createTextNode("Nothing found. Try with different ingredient")
        p.appendChild(pNode);
        section.appendChild(p);
    });
    
  
    

    

};


function naytaVastaus(jsonData) {
    
    var maara = document.createElement("h5");
    var maara1 = document.createTextNode("Search: '"+hakusana+"' resulted "+jsonData.drinks.length+" drinks");
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
            localStorage.setItem("siirry", this.getAttribute("data_ID"));
            console.log("Drinkin ID on: "+localStorage.getItem("siirry")+". Siirrytään ainesosasivulle");
            };

        linkelement.appendChild(image);


        h2.appendChild(name);
        div.appendChild(h2);
        div.appendChild(linkelement);
        section.appendChild(div);

   }
   


}





