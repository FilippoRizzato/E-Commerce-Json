document.addEventListener("DOMContentLoaded", function () {
        fetch('prodotto2.json')
            .then(response => response.json())
            .then(data => {
                    // Popola l'intestazione
                    document.getElementById('nav-home').textContent = data.header.nav.home;
                    document.getElementById('nav-cd').textContent = data.header.nav.cd;
                    document.getElementById('nav-vinyl').textContent = data.header.nav.vinyl;
                    document.getElementById('search-input').placeholder = data.header.searchPlaceholder;

                    // Popola i dettagli del prodotto
                    document.getElementById('product-title').textContent = data.productDetails.title;
                    document.getElementById('album-name').textContent = data.productDetails.album.name;
                    document.getElementById('album-price').textContent = data.productDetails.album.price;
                    document.getElementById('album-availability').textContent = data.productDetails.album.availability;

                    // Popola i formati
                    const formatsSelect = document.getElementById('formats-select');
                    data.productDetails.album.formats.forEach(format => {
                            const option = document.createElement('option');
                            option.value = format.value;
                            option.textContent = format.label;
                            formatsSelect.appendChild(option);
                    });

                    // Popola le versioni
                    const versionsSelect = document.getElementById('versions-select');
                    data.productDetails.album.versions.forEach(version => {
                            const option = document.createElement('option');
                            option.value = version.value;
                            option.textContent = version.label;
                            versionsSelect.appendChild(option);
                    });

                    // Popola la descrizione
                    document.getElementById('description-text').textContent = data.productDetails.description.text;
                    document.getElementById('artist-name').textContent = data.productDetails.description.artist;
                    document.getElementById('reference-code').textContent = data.productDetails.description.reference;
                    document.getElementById('stock-info').textContent = data.productDetails.description.stock;

                    // Popola il footer
                    document.getElementById('footer-text').textContent = data.footer.text;
            })
            .catch(error => console.error('Error loading JSON:', error));

        // Slider functionality
        const slider = document.querySelector(".slider");
        const prevButton = document.querySelector(".prev");
        const nextButton = document.querySelector(".next");

        nextButton.addEventListener("click", function () {
                slider.scrollBy({ left: 300, behavior: "smooth" });
        });

        prevButton.addEventListener("click", function () {
                slider.scrollBy({ left: -300, behavior: "smooth" });
        });
});