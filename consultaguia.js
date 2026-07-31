const personas = {

    "9172": {
        nombre: "TERESA OLIVA HERNANDEZ",
        estadoMunicipio: "TEOTIHUACÁN, MÉXICO",
        idiomas: "ESPAÑOL, INGLÉS",
        lugarTrabajo: "Teotihuacán",

        ubicacion: {
            lat: 19.683686,
            lng: -98.869295
        },

        guias: [
            {
                credencial: "N011472",
                expedicion: "2023-08-02",
                vigencia: "02/08/2027",
                tipo: "Guía de turista general",
                especializacion: "-",
                subtema: "-",
                aventura: "-",
                nivel: ""
            }
        ]
    },


    "9173": {
        nombre: "JUAN CARLOS MACEDONIO ANSELMO",
        estadoMunicipio: "TEOTIHUACÁN, MÉXICO",
        idiomas: "ESPAÑOL, INGLÉS",
        lugarTrabajo: "Teotihuacán",

        ubicacion: {
            lat: 19.683686,
            lng: -98.869295
        },

        guias: [
            {
                credencial: "N2658",
                expedicion: "2022-09-25",
                vigencia: "25/09/2026",
                tipo: "Guía de turista general",
                especializacion: "-",
                subtema: "-",
                aventura: "-",
                nivel: ""
            }
        ]
    },


    "9174": {
        nombre: "MARÍA GONZÁLEZ MARTÍNEZ",
        estadoMunicipio: "PUEBLA, PUEBLA",
        idiomas: "ESPAÑOL, INGLÉS, FRANCÉS",
        lugarTrabajo: "Puebla",

        ubicacion: {
            lat: 19.0414,
            lng: -98.2063
        },

        guias: [
            {
                credencial: "N011474",
                expedicion: "2024-03-10",
                vigencia: "10/03/2028",
                tipo: "Guía de turista general",
                especializacion: "Cultura",
                subtema: "-",
                aventura: "-",
                nivel: ""
            }
        ]
    }

};



// OBTENER ID DESDE LA URL

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");


// BUSCAR PERSONA

const persona = personas[id];



// SI NO EXISTE LA PERSONA

if (!persona) {

    document.addEventListener("DOMContentLoaded", function () {

        document.body.innerHTML = `
            <div style="
                text-align:center;
                padding:60px;
                font-family:Arial;
            ">
                <h2>Guía de turista no encontrada</h2>
                <p>El código proporcionado no corresponde a ninguna persona.</p>
            </div>
        `;

    });

} else {

    document.addEventListener("DOMContentLoaded", function () {

       
        // INFORMACIÓN SECTUR
       
        document.getElementById("inpNombre").value =
            persona.nombre;

        document.getElementById("inpEstadoMunicipio").value =
            persona.estadoMunicipio;

        document.getElementById("inpIdiomas").value =
            persona.idiomas;

        document.getElementById("inpLugarTrabajo").value =
            persona.lugarTrabajo;


       
        // TABLA
       

        const tabla =
            document.getElementById("tablaGuias");

        tabla.innerHTML = "";


        persona.guias.forEach(function (guia) {

            const fila = document.createElement("tr");

            fila.classList.add("mitr");

            fila.style.cursor = "pointer";

            fila.setAttribute(
                "data-idguiatur",
                id
            );


            fila.innerHTML = `

                <td>${guia.credencial}</td>

                <td>${guia.expedicion}</td>

                <td>${guia.vigencia}</td>

                <td>${guia.tipo}</td>

                <td>${guia.especializacion}</td>

                <td>${guia.subtema}</td>

                <td>${guia.aventura}</td>

                <td>${guia.nivel}</td>

            `;


            tabla.appendChild(fila);

        });

    });

}


// ==========================================
// GOOGLE MAPS
// ==========================================

function initMap() {

    if (!persona) {
        return;
    }


    const ubicacion = persona.ubicacion;


    const mapa = new google.maps.Map(
        document.getElementById("mapa"),
        {
            center: ubicacion,
            zoom: 14
        }
    );


    // Marcador
    new google.maps.Marker({
        position: ubicacion,
        map: mapa,
        title: persona.nombre
    });

}
