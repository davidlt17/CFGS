const api_key = 'live_bIaJOZV9q1jRP485pQ1zUe2BEqj1WbV1IImKXJlQVK22UjS5Yq0MCYqHU7aoLoy8';
let contador = 0;
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []; // Ahora guarda un array de URLs

const TOTAL_GATOS = 15;
let gatosCargados = 0;

// Crear un único contenedor y OCULTARLO hasta que todo cargue
const container = document.createElement('div');
container.className = 'container';
container.style.display = 'none'; // Oculto al inicio
document.getElementById('containerpadre').appendChild(container);

// Obtener 15 imágenes
for (let i = 0; i < TOTAL_GATOS; i++) {
    obtenerGato();
}

// Hacer que el botón "Ver Más" recargue la página
document.querySelector('label[for="tab2"]').addEventListener('click', function () {
    location.reload();
});

// Botón Favs: muestra favoritos y añade clase al fav-container
document.querySelector('label[for="tab1"]').addEventListener('click', function () {
    const favContainer = document.getElementById('fav-container');
    favContainer.innerHTML = '';

    favContainer.classList.remove('hidden');
    favContainer.classList.add('mostrarfav');

    // Header fijo arriba
    const panelHeader = document.createElement('header');
    panelHeader.className = 'panel-header';

    const title = document.createElement('h2');
    title.textContent = 'Tus Favoritos';

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-fav';
    // SVG de una X (cerrar)
    closeBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4b0c4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    `;

    panelHeader.appendChild(title);
    panelHeader.appendChild(closeBtn);
    favContainer.appendChild(panelHeader);

    // Contenedor solo para las fotos
    const favsList = document.createElement('div');
    favsList.className = 'favs-list';

    if (favoritos.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No tienes favoritos aún.';
        favsList.appendChild(mensaje);
    } else {
        favoritos.forEach(url => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${url}" alt="Gato favorito" style="width:150px;max-width:100%;border-radius:8px;">
            `;
            favsList.appendChild(figure);
        });
    }
    favContainer.appendChild(favsList);

    closeBtn.addEventListener('click', function () {
        favContainer.classList.remove('mostrarfav');
        favContainer.classList.add('hidden');
        favContainer.innerHTML = '';
    });
});

// Modifica la función para mostrar el contenido solo cuando todo esté cargado
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
        checkbox.checked = favoritos.includes(gato.url); // Ahora compara por URL

        checkbox.addEventListener('click', function () {
            if (checkbox.checked) {
                // Añadir la URL a la lista de favoritos
                favoritos.push(gato.url);
            } else {
                // Eliminar la URL de la lista de favoritos
                favoritos = favoritos.filter(url => url !== gato.url);
            }
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        });

        // Esperar a que la imagen cargue o falle
        const img = figure.querySelector('img');
        img.onload = img.onerror = function () {
            gatosCargados++;
            if (gatosCargados === TOTAL_GATOS) {
                const loader = document.getElementById('loader');
                loader.classList.remove('loaderon');
                loader.classList.add('loaderoff');
                container.style.display = ''; // Mostrar el contenido
            }
        };
    } catch (error) {
        console.error('Error al obtener el gato:', error);
        gatosCargados++;
        if (gatosCargados === TOTAL_GATOS) {
            const loader = document.getElementById('loader');
            loader.classList.remove('loaderon');
            loader.classList.add('loaderoff');
            container.style.display = ''; // Mostrar el contenido
        }
    }
}



