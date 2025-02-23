document.addEventListener("DOMContentLoaded", function () {
    fetch("prodotto.json")
        .then(response => response.json())
        .then(data => {
            // Popola il menu di navigazione
            const navLinks = document.querySelector(".nav");
            navLinks.innerHTML = data.header.nav.map(link => `<a href="#">${link}</a>`).join("");

            // Popola la barra di ricerca
            document.querySelector(".search-bar input").placeholder = data.header.searchPlaceholder;
            document.querySelector(".search-bar button").textContent = data.header.searchButton;

            // Popola la sidebar con le categorie
            const sidebar = document.querySelector(".sidebar ul");
            sidebar.innerHTML = data.sidebar.categories.map(cat => `<li>${cat}</li>`).join("");

            // Popola i dettagli del prodotto
            document.querySelector(".product-image img").src = data.product.image;
            document.querySelector(".product-image img").alt = data.product.name;
            document.querySelector(".product-info h1").textContent = data.product.name;
            document.querySelector(".product-info p strong").textContent = data.product.artist;
            document.querySelector(".product-price").textContent = data.product.price;
            document.querySelector(".product-info .taxes").textContent = data.product.taxes;
            document.querySelector(".product-info .availability").textContent = `Disponibilità: ${data.product.availability}`;
            document.querySelector(".product-info button").textContent = data.product.cartButton;
            document.querySelector(".product-info button").onclick = () => location.href = data.product.cartLink;

            // Popola la descrizione del prodotto
            document.querySelector(".description h2").textContent = data.description.title;
            document.querySelector(".description p").textContent = data.description.text;
            document.querySelector(".description hr + p").innerHTML = data.description.details.join("<br>");

            // Popola il bottone "Vedi meglio"
            const viewMoreBtn = document.querySelector(".description button");
            viewMoreBtn.textContent = data.product.viewMoreButton;
            viewMoreBtn.onclick = () => location.href = data.product.viewMoreLink;

            // Popola il footer
            document.querySelector("footer").innerHTML = data.footer.text;
        })
        .catch(error => console.error("Errore nel caricamento del JSON:", error));
});
