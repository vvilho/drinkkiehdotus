// hakuosoitteen vakio-osa.
const apiurl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.
const favouriteButton = document.querySelector("#favouriteButton");
const toFavouritesButton = document.querySelector("#favourites");

let drinkID = localStorage.getItem("drinkID");

function toFavourites() {
    window.location.href = "./favourites.html";
}

toFavouritesButton.addEventListener('click', toFavourites);

function addFavourite() {
    let favouriteList = JSON.parse(localStorage.getItem("favourites"));
    if (favouriteList === null)
    {
        console.log('Creating new array')
        favouriteList = [];
    }
    console.log(`Adding to the array ${drinkID}`)
    favouriteList.push(drinkID);
    localStorage.setItem("favourites", JSON.stringify(favouriteList));

    document.getElementById("favouriteButton").setAttribute("style", "background-color: red;");
    document.getElementById("favouriteButton").innerHTML = "me likey!";
}

favouriteButton.addEventListener("click", addFavourite)

findDrink(drinkID);


function findDrink(drinkID)  {
    
    fetch(apiurl + drinkID)
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } 
    })
    .then((json) => {
        showResults(json);	
    }).catch(error => {
        console.log(error);
        console.log("Drink ID ongelma / välimuistissa ei ole drink ID:tä tallennettu");
        
    });

};

function showResults(jsonData) {

    var teksti = document.getElementById("chuck");
    var result = document.querySelector('.result')
    var node = jsonData.drinks[0].strDrink;
    teksti.innerHTML=node;
    var ainesosat = [];
    var maarat = [];
    let favouriteList = JSON.parse(localStorage.getItem("favourites"));
    
    try {
        if(favouriteList.indexOf(drinkID) > -1){
            document.getElementById("favouriteButton").setAttribute("style", "background-color: red;");
            document.getElementById("favouriteButton").innerHTML = "me likey!";
    
            console.log("on suosikki");
        }
        
    } catch (error) {
        
    }
    

    
   
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

    var howto = document.createElement('p');
    howto.innerText = jsonData.drinks[0].strInstructions;

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
    result.appendChild(howto);
    result.appendChild(img)

    getRandom();
    document.getElementById("kartta").setAttribute("class", "visible");
    document.getElementById("locationtext").setAttribute("class", "visible");
}




