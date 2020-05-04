// hakuosoitteen vakio-osa.
const apiurl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("hakunappi");
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.

let hakusana = localStorage.getItem("siirry");

// lisätään napille tapahtumankäsittelijä


// Idea: tämä fetch-osa säilyy aina lähes vakiona.
tee_haku(hakusana);

function painallus(){
    hakusana = hakukentta.value;
    tee_haku(hakusana);
}

function tee_haku(hakusana)  {
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
        console.log("Drink ID ongelma / välimuistissa ei ole drink ID:tä tallennettu");
        
    });

};

function naytaVastaus(jsonData) {

    var teksti = document.getElementById("chuck");
    var result = document.querySelector('.result')
    var node = jsonData.drinks[0].strDrink;
    teksti.innerHTML=node;
    var ainesosat = [];
    var maarat = [];
    

    
   
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

    getRandom();
    document.getElementById("kartta").setAttribute("class", "visible");
    document.getElementById("locationtext").setAttribute("class", "visible");





    

}




