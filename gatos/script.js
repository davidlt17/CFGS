const api_key = 'live_bIaJOZV9q1jRP485pQ1zUe2BEqj1WbV1IImKXJlQVK22UjS5Yq0MCYqHU7aoLoy8';
let contador = 0;
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []; // Cargar favoritos desde el Local Storage

async function obtenerGato() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search', {
            headers: { 'x-api-key': api_key }
        });
        const data = await response.json();
        const gato = data[0];
        const raza = gato.breeds[0]; // Obtén la primera raza asociada al gato (si existe)

        // Incrementa el contador para generar un ID único
        contador++;

        // Crear la figura con la imagen y la información
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <img src="${gato.url}" alt="Gato" />
            <div class="info-panel">
               
                <input type="checkbox" id="favorite-${contador}" name="favorite-checkbox" value="${gato.id}">
                <label for="favorite-${contador}" class="container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <div class="action">
                    <span class="option-1">Add to Favorites</span>
                    <span class="option-2">Added to Favorites</span>
                </div>
                </label>
            </div>
        `;

        // Agregar la figura al contenedor existente
        document.querySelector('.container').appendChild(figure);

        // Añadir evento al checkbox
        const checkbox = figure.querySelector(`#favorite-${contador}`);
        checkbox.checked = favoritos.includes(gato.id); // Marcar el checkbox si el ID está en favoritos

        checkbox.addEventListener('click', function () {
            if (checkbox.checked) {
                // Añadir el ID a la lista de favoritos
                favoritos.push(gato.id);
                console.log(`Añadido a favoritos: ${gato.id}`);
            } else {
                // Eliminar el ID de la lista de favoritos
                favoritos = favoritos.filter(id => id !== gato.id);
                console.log(`Eliminado de favoritos: ${gato.id}`);
            }
            // Guardar los favoritos en el Local Storage
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            console.log('Lista de favoritos:', favoritos);
        });
    } catch (error) {
        console.error('Error al obtener el gato:', error);
    }
}

// Crear un único contenedor
const container = document.createElement('div');
container.className = 'container';
document.getElementById('containerpadre').appendChild(container);

// Obtener 10 imágenes
for (let i = 0; i < 10; i++) {
    obtenerGato();
}

$(document).ready(function(){
    $("#menu").on("click", function(){
       $("#menu").css("opacity", "0");
        $("#lgMenu").addClass("enter");
    });
        $("#exit").on("click", function(){
           $("#lgMenu").removeClass("enter");
            $("#menu").css("opacity", "1");
        });
    });