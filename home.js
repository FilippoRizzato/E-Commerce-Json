document.addEventListener("DOMContentLoaded", function () {
    fetch("home.json")
        .then(response => response.json())
        .then(data => {
            // Popola il menu di navigazione
            const navLinks = document.querySelector(".nav");
            navLinks.innerHTML = data.header.nav.map(link => `<a href="#">${link}</a>`).join("");

            // Popola il placeholder della barra di ricerca
            document.querySelector(".search-bar input").placeholder = data.header.searchPlaceholder;

            // Popola il testo del bottone della ricerca
            document.querySelector(".search-bar button").textContent = data.header.searchButton;

            // Popola il carosello
            const carousel = document.querySelector(".carousel");
            carousel.innerHTML = data.carousel.images.map(img =>
                `<img src="${img.src}" alt="${img.alt}">`
            ).join("");

            // Popola la descrizione sotto il carosello
            document.querySelector(".description").textContent = data.carousel.description;

            // Popola i prodotti
            const footer = document.querySelector(".footer");
            footer.innerHTML = data.products.map(product =>
                `<div class="product">
          <a href="${product.link || '#'}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
          </a>
        </div>`
            ).join("");

            // Popola il footer
            document.querySelector("footer p").innerHTML = data.footer.text;

            // Riattiva il carosello
            setupCarousel();
        })
        .catch(error => console.error("Errore nel caricamento del JSON:", error));
});

// Funzione per gestire il carosello
function setupCarousel() {
    const images = document.querySelectorAll('.carousel img');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 3000);
}
