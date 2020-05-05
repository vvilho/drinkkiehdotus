const suosikki = document.getElementById("suosikki");
const ul = document.getElementById("suosikki_lista");
var suosikki_lista = JSON.parse(localStorage.getItem("suosikki"));
suosikki_lista = suosikki_lista.sort();
const suosikit = document.querySelector("h1");
suosikki.innerHTML = suosikki_lista.toString();
console.log("Suosikit ID-lista: " + suosikki_lista);
suosikit.appendChild(suosikki);

for(var i = 0; i < suosikki_lista.length; i++){
    apiurl_suosikki = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + suosikki_lista[i];
    fetch(apiurl_suosikki).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);
    })
}
function naytaVastaus(jsonData) {
    var otsikko = document.getElementById("otsikko");
    otsikko.innerHTML = "Suosikit";
    var nimi = jsonData.drinks[0].strDrink;
    console.log(nimi);
    var ID = jsonData.drinks[0].idDrink;
    suosikki.setAttribute("data-drinkID",ID);
    var li = document.createElement("li");
    li.innerHTML = `<a href="https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}">${nimi}</a>`;
    ul.appendChild(li);
    suosikki.style.visibility = "visible";
}
