document.addEventListener("DOMContentLoaded", function () {
    fetch("prodotto2.json")
        .then(response => response.json())
        .then(data => {
            // Popola il menu di navigazione
            const navLinks = document.querySelector(".nav");
            navLinks.innerHTML = data.header.nav.map(link => `<a href="${link.link}">${link.name}</a>`).join("");

            // Popola la barra di ricerca
            document.querySelector(".search-bar input").placeholder = data.header.searchPlaceholder;
            document.querySelector(".search-bar button").textContent = data.header.searchButton;

            // Popola la sidebar con le categorie
            const sidebar = document.querySelector(".sidebar ul");
            sidebar.innerHTML = data.sidebar.categories.map(cat => `<li>${cat}</li>`).join("");

            // Popola il titolo del prodotto
            document.querySelector(".product-details h1").textContent = data.product.title;

            // Popola lo slider con immagini
            const slider = document.querySelector(".slider");
            slider.innerHTML = data.product.images.map(img => `<img src="${img.src}" alt="${img.alt}">`).join("");

            // Popola i dettagli del prodotto
            document.querySelector(".product-info h2").textContent = data.product.name;
            document.querySelector(".product-info p strong").textContent = `Prezzo: ${data.product.price}`;
            document.querySelector(".product-info p span").textContent = data.product.taxes;
            document.querySelector(".product-info .availability").textContent = `Disponibilità: ${data.product.availability}`;

            // Popola il select dei formati
            const formatSelect = document.querySelector(".product-info select:nth-of-type(1)");
            formatSelect.innerHTML = data.product.formats.map(format => `<option value="${format.value}">${format.name}</option>`).join("");

            // Popola il select delle versioni
            const versionSelect = document.querySelector(".product-info select:nth-of-type(2)");
            versionSelect.innerHTML = data.product.versions.map(version => `<option value="${version.value}">${version.name}</option>`).join("");

            // Popola il bottone "Torna indietro"
            const backButton = document.querySelector(".product-info button");
            backButton.textContent = data.product.backButton;
            backButton.onclick = () => location.href = data.product.backLink;

            // Popola la descrizione
            document.querySelector(".description h2").textContent = data.description.title;
            document.querySelector(".description p").textContent = data.description.text;
            document.querySelector(".description hr + p").innerHTML = data.description.details.map(d => `<strong>${d.label}</strong> ${d.value}<br>`).join("");

            // Popola il footer
            document.querySelector("footer").innerHTML = data.footer.text;
        })
        .catch(error => console.error("Errore nel caricamento del JSON:", error));
});
