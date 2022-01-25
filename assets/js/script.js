$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    let valueInput = $("#sheroInput").val();

    console.log(valueInput)

    //Conexión con API con url y token(facebook)
    $.ajax({
      url: "https://www.superheroapi.com/api.php/1401694376931874/" + valueInput,
      success: function (data) {

        //Datos de super héroes
        let imagen = data.image.url;
        let nombre = data.name;
        let afiliacion = data.connections["group-affiliation"];
        let publicado = data.biography.publisher;
        let ocupacion = data.work.occupation;
        let aparicion = data.biography["first-appearance"];
        let altura = data.appearance.height;
        let peso = data.appearance.weight;
        let alias = data.biography.aliases;

        //Card para mostrar los datos del super héroe solicitado (valueInput)
        $('#sheroInfo').html(`
            <h4 class="text-center text-warning">Super Hero Encontrado</h4>
            <div class="bs-example">
            <div class="card">
                <div class="row no-gutters">
                    <div class="col-5 col-sm-6">
                        <img src="${imagen}"  class="card-img-top">
                    </div>
                    <div class="col-5-sm-7">
                      <div class="card-body fs-6">
                       <h5 class="card-title">Nombre: ${nombre}</h5>
                        <div class="card-text text-lh">
                          <p><b>Conexiones:</b> ${afiliacion}</p>
                          <p><b>Publicado por:</b> ${publicado}</p>
                          <hr>
                          <p><b>Ocupación:</b> ${ocupacion}</p>
                          <hr>
                          <p><b>Primera Aparición:</b> ${aparicion}</p>
                          <hr>
                          <p><b>Altura:</b> ${altura}</p>
                          <hr>
                          <p><b>Peso:</b> ${peso}</p>
                          <hr>
                          <p><b>Alianzas:</b> ${alias}</p>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>`);

        
        //Canvas
        var chart = new CanvasJS.Chart("sheroStats", {
          animationEnabled: true,
          title: {
            text: `Estadísticas de Poder para ${nombre}`
          },
          data: [{
            type: "pie",
            showInLegend: "true",
            legendText: "{label}",
            startAngle: 240,
            yValueFormatString: "##0\"\"",
            indexLabel: "{label} ({y})",
            dataPoints: [
              { y: `${data.powerstats.intelligence}`, label: "Inteligencia" },
              { y: `${data.powerstats.strength}`, label: "Fuerza" },
              { y: `${data.powerstats.speed}`, label: "Velocidad" },
              { y: `${data.powerstats.durability}`, label: "Durabilidad" },
              { y: `${data.powerstats.power}`, label: "Energía" },
              { y: `${data.powerstats.combat}`, label: "Combate" }
            ]
          }]
        });
        chart.render();
      },

    });

  });

});