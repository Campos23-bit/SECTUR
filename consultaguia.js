const personas = {
    "9172": {
        nombre: "ADRIANA LETICIA BENITEZ SERVANTES",
        estadoMunicipio: "TEOTIHUACÁN, MÉXICO",
        idiomas: "ESPAÑOL, INGLÉS",
        lugarTrabajo: "Teotihuacán",
        ubicacion: { lat: 19.683686, lng: -98.869295 },
        guias: [
            {
                credencial: "N466710",
                expedicion: "2026-05-02",
                vigencia: "02/05/2030",
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
        ubicacion: { lat: 19.683686, lng: -98.869295 },
        guias: [
            {
                credencial: "N2658",
                expedicion: "2026-04-14",
                vigencia: "14/04/2030",
                tipo: "Guía de turista general",
                especializacion: "-",
                subtema: "-",
                aventura: "-",
                nivel: ""
            }
        ]
    },
    "9174": {
        nombre: "MARLEN GABRIELA NUÑEZ GUZMÁN",
        estadoMunicipio: "SAN MARTÍN DE LAS PIRAMIDES, MÉXICO",
        idiomas: "ESPAÑOL, INGLÉS",
        lugarTrabajo: "Teotihuacán",
        ubicacion: { lat: 19.683686, lng: -98.869295 },
        guias: [
            {
                credencial: "N433120",
                expedicion: "2026-04-07",
                vigencia: "07/04/2030",
                tipo: "Guía de turista general",
                especializacion: "-",
                subtema: "-",
                aventura: "-",
                nivel: ""
            }
        ]
    }
};

// ==========================================
// OBTENER ID DESDE LA URL
// ==========================================
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

// ==========================================
// BUSCAR PERSONA
// ==========================================
const persona = personas[id];

// ==========================================
// SI NO EXISTE LA PERSONA
// ==========================================
if (!persona) {
    document.addEventListener("DOMContentLoaded", function () {
        document.body.innerHTML = `
            <div style="text-align:center; padding:60px; font-family:Arial;">
                <h2>Guía de turista no encontrada</h2>
                <p>El código proporcionado no corresponde a ninguna persona.</p>
            </div>
        `;
    });
} else {
    document.addEventListener("DOMContentLoaded", function () {

        // INFORMACIÓN PRINCIPAL
        const inpNombre = document.getElementById("inpNombre");
        const inpEstadoMunicipio = document.getElementById("inpEstadoMunicipio");
        const inpIdiomas = document.getElementById("inpIdiomas");
        const inpLugarTrabajo = document.getElementById("inpLugarTrabajo");

        if (inpNombre) inpNombre.value = persona.nombre;
        if (inpEstadoMunicipio) inpEstadoMunicipio.value = persona.estadoMunicipio;
        if (inpIdiomas) inpIdiomas.value = persona.idiomas;
        if (inpLugarTrabajo) inpLugarTrabajo.value = persona.lugarTrabajo;

        // TABLA
        const tabla = document.getElementById("tablaGuias");
        if (tabla) {
            tabla.innerHTML = "";

            persona.guias.forEach(function (guia, indice) {
                const fila = document.createElement("tr");
                fila.classList.add("mitr");
                fila.setAttribute("data-idguiatur", id);
                fila.setAttribute("data-indice-guia", indice);

                fila.innerHTML = `
                    <td>${guia.credencial || ""}</td>
                    <td>${guia.expedicion || ""}</td>
                    <td>${guia.vigencia || ""}</td>
                    <td>${guia.tipo || ""}</td>
                    <td>${guia.especializacion || ""}</td>
                    <td>${guia.subtema || ""}</td>
                    <td>${guia.aventura || ""}</td>
                    <td>${guia.nivel || ""}</td>
          
                `;
                tabla.appendChild(fila);
            });
        }

        // ASIGNAR ÍNDICE PREDETERMINADO AL BOTÓN INFERIOR ESTÁTICO
        const btnInferior = document.getElementById("btnContactarGeneral");
        if (btnInferior) {
            btnInferior.setAttribute("data-indice-guia", "0");
        }

        // ==========================================
        // MANEJO DE EVENTO GLOBAL PARA AMBOS BOTONES
        // ==========================================
        document.addEventListener("click", function (e) {
            const boton = e.target.closest(".btn-conectar");
            if (!boton) return;

            // Obtener índice (del dataset del botón o de la fila)
            let indiceAttr = boton.getAttribute("data-indice-guia");
            
            if (indiceAttr === null) {
                const fila = boton.closest("tr");
                if (fila) indiceAttr = fila.getAttribute("data-indice-guia");
            }

            const indice = parseInt(indiceAttr || "0", 10);
            const guia = persona.guias[indice];

            if (!guia) {
                console.error("No se encontró la guía para el índice:", indice);
                return;
            }

            // LLENAR MODAL
            const modalNombre = document.getElementById("modalNombreGuia");
            const modalCredencial = document.getElementById("modalCredencial");
            const modalUbicacion = document.getElementById("modalUbicacion");
            const modalIdiomas = document.getElementById("modalIdiomas");

            if (modalNombre) modalNombre.textContent = persona.nombre;
            if (modalCredencial) modalCredencial.textContent = guia.credencial;
            if (modalUbicacion) modalUbicacion.textContent = persona.estadoMunicipio;
            if (modalIdiomas) modalIdiomas.textContent = persona.idiomas;

            // DATOS ADICIONALES
            const modalExpedicion = document.getElementById("modalExpedicion");
            const modalVigencia = document.getElementById("modalVigencia");
            const modalTipo = document.getElementById("modalTipo");
            const modalEspecializacion = document.getElementById("modalEspecializacion");
            const modalSubtema = document.getElementById("modalSubtema");
            const modalAventura = document.getElementById("modalAventura");
            const modalNivel = document.getElementById("modalNivel");

            if (modalExpedicion) modalExpedicion.textContent = guia.expedicion || "";
            if (modalVigencia) modalVigencia.textContent = guia.vigencia || "";
            if (modalTipo) modalTipo.textContent = guia.tipo || "";
            if (modalEspecializacion) modalEspecializacion.textContent = guia.especializacion || "";
            if (modalSubtema) modalSubtema.textContent = guia.subtema || "";
            if (modalAventura) modalAventura.textContent = guia.aventura || "";
            if (modalNivel) modalNivel.textContent = guia.nivel || "";
        });

    });
}

// ==========================================
// GOOGLE MAPS
// ==========================================
function initMap() {
    if (!persona) return;

    const ubicacion = persona.ubicacion;
    const elementoMapa = document.getElementById("mapa");

    if (!elementoMapa) {
       console.error("No existe el elemento #mapa");
       return;
   }

   const mapa = new google.maps.Map(elementoMapa, {
       center: ubicacion,
       zoom: 14
   });

   new google.maps.Marker({
       position: ubicacion,
       map: mapa,
       title: persona.nombre
   });
}
/*function cargarMapa() {
    if (!persona || !persona.ubicacion) return;

    const elementoMapa = document.getElementById("mapa");
    if (!elementoMapa) return;

    const lat = persona.ubicacion.lat;
    const lng = persona.ubicacion.lng;

    // Inicializa el mapa centrado en la ubicación de la persona
    const mapa = L.map('mapa').setView([lat, lng], 14);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(mapa);

    // Marcador
    L.marker([lat, lng])
        .addTo(mapa)
        .bindPopup(`<b>${persona.nombre}</b><br>${persona.estadoMunicipio}`)
        .openPopup();
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    cargarMapa();
});
*/
