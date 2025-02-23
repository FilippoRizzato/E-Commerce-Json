document.addEventListener("DOMContentLoaded", function () {
    fetch("carrello.json")
        .then(response => response.json())
        .then(data => {
            // Popola il menu di navigazione
            const navLinks = document.querySelector(".nav");
            navLinks.innerHTML = data.header.nav.map(link => `<a href="${link.link}">${link.name}</a>`).join("");

            // Popola il logo
            document.querySelector(".logo img").src = data.header.logo;

            // Popola la barra di ricerca
            document.querySelector(".search-bar input").placeholder = data.header.searchPlaceholder;
            document.querySelector(".search-bar button").textContent = data.header.searchButton;

            // Popola il titolo del carrello
            document.querySelector(".cart-container h1").textContent = data.cart.title;

            // Popola gli articoli nel carrello
            const cartItemsContainer = document.querySelector(".cart-items");
            cartItemsContainer.innerHTML = data.cart.items.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name}</span>
          <span class="price">${item.price}€</span>
          <button class="remove-btn">Rimuovi</button>
        </div>
      `).join("");

            // Popola la sezione Buono Sconto
            document.querySelector(".discount-voucher h2").textContent = data.cart.discount.title;
            document.querySelector(".discount-voucher p").innerHTML = data.cart.discount.description;
            document.getElementById("couponCode").placeholder = data.cart.discount.inputPlaceholder;
            document.querySelector(".discount-voucher button").textContent = data.cart.discount.buttonText;

            // Popola il totale e il pulsante di checkout
            document.querySelector(".cart-summary p strong").textContent = data.cart.summary.totalLabel;
            document.querySelector(".cart-summary button").textContent = data.cart.summary.checkoutButton;

            // Popola il contatore del carrello
            document.querySelector("#cart-count").textContent = data.cart.items.length;

            // Popola la sezione bundle
            const bundleContainer = document.querySelector(".product-bundle");
            bundleContainer.innerHTML = `
        <h2>${data.bundle.title}</h2>
        ${data.bundle.bundles.map(bundle => `
          <div class="bundle">
            ${bundle.items.map(item => `<img src="${item.img}" alt="${item.alt}">`).join("")}
            <p><strong>Prezzo Bundle:</strong> €${bundle.price} (${bundle.discount})</p>
            <button onclick="addToCart('${bundle.id}')">${bundle.buttonText}</button>
          </div>
        `).join("")}
      `;

            // Gestione della rimozione dei prodotti dal carrello
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function () {
                    this.parentElement.remove();
                    updateCart();
                    alert('Prodotto rimosso dal carrello!');
                });
            });

            // Funzione per applicare il coupon
            document.querySelector(".discount-voucher button").addEventListener("click", function () {
                const couponCode = document.getElementById("couponCode").value;
                if (couponCode === data.cart.discount.validCode) {
                    let totalPrice = parseFloat(document.getElementById("total-price").textContent);
                    totalPrice *= (1 - data.cart.discount.discountPercentage / 100);
                    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
                    alert('Coupon applicato correttamente! Sconto del 10% applicato.');
                } else {
                    alert('Codice coupon non valido.');
                }
            });

            // Funzione per aggiornare il carrello
            function updateCart() {
                const items = document.querySelectorAll(".cart-item").length;
                document.getElementById("cart-count").textContent = items;
                const totalPrice = Array.from(document.querySelectorAll(".cart-item .price"))
                    .reduce((total, price) => total + parseFloat(price.textContent), 0)
                    .toFixed(2);
                document.getElementById("total-price").textContent = totalPrice;
            }

            // Funzione per aggiungere il bundle al carrello
            window.addToCart = function (bundleId) {
                if (bundleId === "bundle1") {
                    const newItem = {
                        name: "Bundle DAMN e All Eyez On Me",
                        price: "54.98",
                        img: "https://www.disclan.com/150738-home_default/damn-lamar-kendrick-lp.jpg"
                    };

                    const cartContainer = document.querySelector(".cart-items");
                    const cartItem = document.createElement("div");
                    cartItem.classList.add("cart-item");
                    cartItem.innerHTML = `
            <img src="${newItem.img}" alt="${newItem.name}">
            <span>${newItem.name}</span>
            <span class="price">${newItem.price}€</span>
            <button class="remove-btn">Rimuovi</button>
          `;
                    cartContainer.appendChild(cartItem);
                    updateCart();
                    alert('Bundle aggiunto al carrello con successo!');
                }
            };

        })
        .catch(error => console.error("Errore nel caricamento del JSON:", error));
});
