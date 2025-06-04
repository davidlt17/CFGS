// Array de proyectos con nombres y descripciones en español e inglés
const projects = [
  {
    title: { es: "Burguer David", en: "Burguer David" },
    description: {
      es: "Página web para un restaurante de hamburguesas. Diseño moderno y funcional.",
      en: "Website for a burger restaurant. Modern and functional design."
    },
    link: "https://burguerdavid.netlify.app/",
    image: "media/burger.jpg"
  },
  {
    title: { es: "Galería de Coches", en: "Car Gallery" },
    description: {
      es: "Galería interactiva de coches con diseño responsivo y atractivo.",
      en: "Interactive car gallery with a responsive and attractive design."
    },
    link: "https://galeriacoches.netlify.app/",
    image: "media/coches.jpg"
  },
  {
    title: { es: "Mockup de Figma", en: "Figma Mockup" },
    description: {
      es: "Diseño de interfaz de usuario creado en Figma para un proyecto conceptual.",
      en: "User interface design created in Figma for a conceptual project."
    },
    link: "https://www.figma.com/proto/dm6VGu332KedFuI4tc6rXk/Takeaseat?node-id=2-2&t=niA13vWvSePNR2CE-1",
    image: "media/figma.jpg"
  },
  {
    title: { es: "MininoGram", en: "MininoGram" },
    description: {
      es: "Red social de gatos y perros usando una API. Descubre, guarda y comparte tus animales favoritos.",
      en: "Social network for cats and dogs using an API. Discover, save, and share your favorite animals."
    },
    link: "https://minino-gram.netlify.app/",
    image: "media/mininogram.jpg"
  },
  {
    title: { es: "Escritorio Web Retro", en: "Retro Web Desktop" },
    description: {
      es: "Escritorio estilo retro con iconos y ventanas móviles, juegos y funcionalidades clásicas. Todo hecho solo con JS Vanilla, lo que lo hace eficiente y desafiante.",
      en: "Retro-style desktop with icons and movable windows, games, and classic features. All made with Vanilla JS, making it efficient and challenging."
    },
    link: "https://escritorioweb.netlify.app/",
    image: "media/escritorioweb.jpg"
  }
];

// Idioma actual
let currentLang = "es";

// Selecciona el contenedor de tarjetas
const tarjetasContainer = document.querySelector(".tarjetas");

// Selecciona los elementos del preview
const previewContainer = document.getElementById("preview-container");
const previewIframe = document.getElementById("preview-iframe");
const closePreviewButton = document.getElementById("close-preview");
const openFullButton = document.getElementById("open-full");

// Función para renderizar las tarjetas según el idioma
function renderCards() {
  tarjetasContainer.innerHTML = "";
  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="image-container">
        <img src="${project.image}" alt="${project.title[currentLang]}">
      </div>
      <div class="content">
        <span class="title">${project.title[currentLang]}</span>
        <p class="desc">${project.description[currentLang]}</p>
      </div>
    `;
    card.addEventListener("click", () => {
      if (project.link.includes("figma.com")) {
        // Abre el enlace de Figma directamente en una nueva pestaña
        window.open(project.link, "_blank");
        return; // No mostrar el preview
      } else {
        previewIframe.classList.remove("hidden");
        previewIframe.src = project.link;
        // Elimina imagen previa si existe
        previewContainer.querySelector('.figma-preview')?.remove();
        openFullButton.href = project.link;
        previewContainer.classList.remove("hidden");
      }
    });
    tarjetasContainer.appendChild(card);
  });
}

// Renderiza las tarjetas al cargar
renderCards();

// Evento para cerrar el preview
closePreviewButton.addEventListener("click", () => {
  previewContainer.classList.add("hidden");
  previewIframe.src = "";
});

// Diccionario de traducciones para los textos estáticos
const translations = {
  "h1": {
    es: "David Lara",
    en: "David Lara"
  },
  "welcome": {
    es: "¡Bienvenido a mi portfolio! Aquí puedes encontrar una colección de mis proyectos y logros. No dudes en explorar y contactarme si tienes alguna pregunta o comentario.",
    en: "Welcome to my portfolio! Here you can find a collection of my projects and achievements. Feel free to explore and reach out if you have any questions or comments."
  },
  "projects-title": {
    es: "Mis Proyectos",
    en: "My Projects"
  },
  "close-preview": {
    es: "Cerrar Preview",
    en: "Close Preview"
  },
  "open-full": {
    es: "Abrir Página Completa",
    en: "Open Full Page"
  },
  "tech-title": {
    es: "Tecnologías",
    en: "Technologies"
  },
  "tech-subtitle": {
    es: "Lenguajes, herramientas y tecnologías que utilizo",
    en: "Languages, tools and technologies I use"
  },
  // Puedes añadir más traducciones aquí si lo necesitas
};

// Traducción de los nombres de tecnologías (opcional)
const techNames = {
  "HTML5": { es: "HTML5", en: "HTML5" },
  "CSS3": { es: "CSS3", en: "CSS3" },
  "JavaScript": { es: "JavaScript", en: "JavaScript" },
  "Java": { es: "Java", en: "Java" },
  "C": { es: "C", en: "C" },
  "MySQL": { es: "MySQL", en: "MySQL" },
  "Git": { es: "Git", en: "Git" },
  "Figma": { es: "Figma", en: "Figma" },
  "Python": { es: "Python", en: "Python" },
  "RStudio": { es: "RStudio", en: "RStudio" },
  "LaTeX": { es: "LaTeX", en: "LaTeX" },
  "Linux": { es: "Linux", en: "Linux" },
  "MATLAB": { es: "MATLAB", en: "MATLAB" },
  "React": { es: "React", en: "React" },
  "Docker": { es: "Docker", en: "Docker" },
  "PHP": { es: "PHP", en: "PHP" }
};

// Función para traducir los textos estáticos
function translateStaticTexts() {
  // Título principal
  const h1 = document.querySelector("h1");
  if (h1) h1.textContent = translations["h1"][currentLang];

  // Texto de bienvenida
  const welcome = document.querySelector(".texto p");
  if (welcome) welcome.textContent = translations["welcome"][currentLang];

  // Título de proyectos
  const projectsTitle = document.querySelector("#projects h2");
  if (projectsTitle) projectsTitle.textContent = translations["projects-title"][currentLang];

  // Botón cerrar preview
  const closePreview = document.getElementById("close-preview");
  if (closePreview) closePreview.textContent = translations["close-preview"][currentLang];

  // Botón abrir página completa
  const openFull = document.getElementById("open-full");
  if (openFull) openFull.textContent = translations["open-full"][currentLang];

  // Título tecnologías
  const techTitle = document.querySelector(".tech-stack .section__title");
  if (techTitle) techTitle.textContent = translations["tech-title"][currentLang];

  // Subtítulo tecnologías
  const techSubtitle = document.querySelector(".tech-stack .section__subtitle");
  if (techSubtitle) techSubtitle.textContent = translations["tech-subtitle"][currentLang];

  // Nombres de tecnologías (opcional)
  document.querySelectorAll('.tech-stack__icon p').forEach(el => {
    const name = el.textContent.trim();
    if (techNames[name]) {
      el.textContent = techNames[name][currentLang];
    }
  });
}

// Llama a la traducción al cargar
translateStaticTexts();

// Evento para cambiar de idioma usando el switch personalizado
const languageToggle = document.getElementById("language-toggle");
if (languageToggle) {
  languageToggle.addEventListener("change", () => {
    currentLang = languageToggle.checked ? "en" : "es";
    renderCards();
    translateStaticTexts();
    // Si usas bandera, actualiza aquí también
    const langFlag = document.getElementById("lang-flag");
    if (langFlag) {
      langFlag.src = currentLang === "es" ? "media/es.png" : "media/gb.png";
      langFlag.alt = currentLang === "es" ? "Bandera España" : "UK Flag";
      // Si tienes el flag dentro de un botón, puedes hacer: langToggleButton.prepend(langFlag);
    }
    // Opcional: Cambia el estado visual de los spans .on/.off si lo necesitas
  });
}