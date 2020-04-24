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
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.


// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', tee_haku);

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

function naytaVastaus(jsonData) {

    var teksti = document.getElementById("chuck");
    var result = document.querySelector('.result')
    var node = jsonData.drinks[0].strDrink;
    teksti.innerHTML=node;
    var ainesosat = [];
    var maarat = [];

    console.log(jsonData)
   
    for (let i = 1; i<16; i++){
        let ingNumber = "strIngredient"+i;
        if (jsonData.drinks[0][ingNumber] == null || jsonData.drinks[0][ingNumber] === "")
        {
            break;
        }
        ainesosat.push(jsonData.drinks[0][ingNumber]);
    }

    for (let i = 1; i<16; i++) {
        let measureNumber = "strMeasure"+i;
        if (jsonData.drinks[0][measureNumber] === null || jsonData.drinks[0][measureNumber] === "")
        {
            break;
        }
        maarat.push(jsonData.drinks[0][measureNumber]);
    }
  
    
   
    var ainesosalista = document.querySelector(".ingredients");
    var maaraLista = document.querySelector(".amounts");

    if (ainesosalista.firstChild && maaraLista.firstChild)
    {
        ainesosalista.innerHTML = "";
        maaraLista.innerHTML = "";
        let img = document.querySelector('.drinkIMG')
        if (img !== null) {
            result.removeChild(img)
        }
        
    }

    var ingHeader = document.createElement('h4');
    ingHeader.innerText = 'Ingredients';
    
    var amHeader = document.createElement('h4');
    amHeader.innerText = 'Amounts';

    ainesosalista.appendChild(ingHeader);
    maaraLista.appendChild(amHeader);

    var ingrUL = document.createElement('ul');
    var amountUL = document.createElement('ul');

    ainesosat.map(ainesosa => {
        let li = document.createElement('li')
        li.innerText = ainesosa;
        ingrUL.appendChild(li)
    });

    maarat.map(maara => {
        let li = document.createElement('li');
        li.innerText = maara;
        amountUL.appendChild(li)
    })

    ainesosalista.appendChild(ingrUL);
    maaraLista.appendChild(amountUL);
    let img = document.createElement('img')
    img.setAttribute('src', jsonData.drinks[0].strDrinkThumb)
    img.setAttribute('class', 'drinkIMG')
    result.appendChild(img)




    

}




