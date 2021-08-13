$(document).ready(function () {
  var botton=document.getElementById("search-btn");
  botton.addEventListener("click",numberValidator);
  var form=document.getElementById("hero-form");
  form.addEventListener("submit",alertButtonEnter)
});
function searchHero(){ // funcion para buscar el heroe
  let heroNumber = document.getElementById("number-text").value;
    $.ajax({
      type: "GET",
      url: "https://superheroapi.com/api.php/10226106536670537/" + heroNumber,
      dataType: "json",
      success: function (heros) {
        var img = heros.image.url;
        var nameh = heros.name;
        var hname= heros.biography["full-name"]
        $("#result-hero").html(
          `<div class="card card-margin col-12" style="width: 18rem;">
              <img src="${img}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${nameh}</h5>
                  <h5 class="card-title">${hname}</h5>   
                  <ul class="list-group list-group-flush">
                  <li class="list-group-item"><div id="chartContainer" style="height: 370px; width: 100%;">
                  </div></li>
                  </ul>     
              </div>
            </div>`
        )
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light2", // "light1", "light2", "dark1", "dark2"
          animationEnabled: true,
          title: {
            text: "Estadisticas",
          },
          data: [
            {
              type: "pie",
              startAngle: 25,
              toolTipContent: "<b>{label}</b>: {y}",
              indexLabelFontSize: 9.6,
              indexLabel: "{label} - {y}",
              dataPoints: [
                { y: heros.powerstats.intelligence, label: "Inteligencia" },
                { y: heros.powerstats.strength, label: "Fuerza" },
                { y: heros.powerstats.speed, label: "Velocidad" },
                { y: heros.powerstats.durability, label: "Durabilidad" },
                { y: heros.powerstats.power, label: "Poder" },
                { y: heros.powerstats.combat, label: "Combate" },
              ],
            },
          ],
        })
        chart.render()
      },
      error: function () {
        alert("No existe ésta ID")
    }
    });
}
function numberValidator(){
  let heroNumber = document.getElementById("number-text").value
  if(heroNumber>0&&heroNumber<733){
    searchHero();
  }else{
    alert("Ingrese solo numeros, entre 1-732 sin espacios ")
  }
}
function alertButtonEnter(e){
  alert("Para buscar haz click en el boton buscar")
  e.preventDefault();
}