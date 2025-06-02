// Array de proyectos
const projects = [
  {
    title: "Burguer David",
    description: "Página web para un restaurante de hamburguesas. Diseño moderno y funcional.",
    link: "https://burguerdavid.netlify.app/",
    image: "media/burger.jpg"
  },
  {
    title: "Galería de Coches",
    description: "Galería interactiva de coches con diseño responsivo y atractivo.",
    link: "https://galeriacoches.netlify.app/",
    image: "media/coches.jpg"
  },
  {
    title: "Mockup de Figma",
    description: "Diseño de interfaz de usuario creado en Figma para un proyecto conceptual.",
    link: "#", // Cambia este enlace si tienes una URL para el mockup
    image: "media/figma.jpg"
  },
  {
    title: "MininoGram",
    description: "Red social de gatos y perros usando una API. Descubre, guarda y comparte tus animales favoritos.",
    link: "https://minino-gram.netlify.app/",
    image: "media/mininogram.jpg"
  },
  {
    title: "Escritorio Web Retro",
    description: "Escritorio estilo retro con iconos y ventanas móviles, juegos y funcionalidades clásicas. Todo hecho solo con JS Vanilla, lo que lo hace eficiente y desafiante.",
    link: "https://escritorioweb.netlify.app/",
    image: "media/escritorioweb.jpg" // Asegúrate de añadir esta imagen a tu carpeta media
  }
];

// Selecciona el contenedor de tarjetas
const tarjetasContainer = document.querySelector(".tarjetas");

// Selecciona los elementos del preview
const previewContainer = document.getElementById("preview-container");
const previewIframe = document.getElementById("preview-iframe");
const closePreviewButton = document.getElementById("close-preview");
const openFullButton = document.getElementById("open-full");

// Genera dinámicamente las tarjetas
projects.forEach(project => {
  // Crea el elemento de la tarjeta
  const card = document.createElement("div");
  card.classList.add("card");

  // Inserta el contenido de la tarjeta con una imagen en lugar de un iframe
  card.innerHTML = `
    <div class="image-container">
      <img src="${project.image}" alt="${project.title}">
    </div>
    <div class="content">
      <span class="title">${project.title}</span>
      <p class="desc">${project.description}</p>
    </div>
  `;

  // Añade evento para mostrar el preview al hacer clic
  card.addEventListener("click", () => {
    previewIframe.src = project.link; // Carga la URL en el iframe principal
    openFullButton.href = project.link; // Actualiza el enlace del botón "Abrir Página Completa"
    previewContainer.classList.remove("hidden"); // Muestra el contenedor del preview
  });

  // Añade la tarjeta al contenedor
  tarjetasContainer.appendChild(card);
});

// Evento para cerrar el preview
closePreviewButton.addEventListener("click", () => {
  previewContainer.classList.add("hidden"); // Oculta el contenedor del preview
  previewIframe.src = ""; // Limpia el iframe
});