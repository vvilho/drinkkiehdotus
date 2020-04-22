const suosikki = document.getElementById("suosikki");
var suosikkiID = localStorage.getItem("suosikki");
suosikki.innerHTML = suosikkiID;
