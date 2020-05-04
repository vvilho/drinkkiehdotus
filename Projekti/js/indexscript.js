const nappi = document.getElementById("runsearch");
const input = document.getElementById("haku");



nappi.addEventListener('click', hakusanan_lahetys);

function hakusanan_lahetys(){
    let hakusana = input.value;
    localStorage.setItem("hakusana", hakusana);
    window.location.href = './Pages/search.html';
    

}