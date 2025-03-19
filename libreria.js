const getLibraryCreate = function () {
  const libraryUrl = "https://striveschool-api.herokuapp.com/books";

  fetch(libraryUrl)
    .then((response) => {
      if (response.ok) {
        console.log("Tutto OK");
        return response.json();
      } else {
        throw new Error("Errore");
      }
    })
    .then((data) => {
      console.log("DATA", data);
      const cardContainer = document.getElementById("card-container");

      // Costruisci il contenuto HTML come stringa
      cardContainer.innerHTML = data
        .map(
          (book, index) => `
                <div class="card col-lg-4" style="width: 18rem; margin: 1rem;">
                  <img src="${book.img}" class="card-img-top" alt="${book.title}" style="height: 300px;">
                  <div class="card-body d-flex flex-column justify-content-between">
                    <h3>${book.title}</h3>
                    <div style="margin-top: auto;">
                      <h5 style="margin-bottom: 0.5rem;">€${book.price}</h5>
                      <div class="d-flex justify-content-between text-center" style="gap: 0.5rem;">
                        <a href="#" id="btn-add-${index}" class="btn btn-primary">AGGIUNGI AL CARRELLO</a>
                        <a href="#" id="btn-remove-${index}" class="btn btn-danger">RIMUOVI</a>
                      </div>
                    </div>
                  </div>
                </div>`
        )
        .join("");

      // Aggiungi gli EventListener per ogni bottone
      data.forEach((book, index) => {
        // Bottone "AGGIUNGI AL CARRELLO"
        const addToCartButton = document.getElementById(`btn-add-${index}`);
        addToCartButton.addEventListener("click", (e) => {
          e.preventDefault();

          // Recupera il carrello dal localStorage
          const cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Aggiungi il libro corrente al carrello
          cart.push({
            title: book.title,
            price: book.price,
            img: book.img,
          });

          // Salva il carrello aggiornato nel localStorage
          localStorage.setItem("cart", JSON.stringify(cart));

          console.log(`${book.title} aggiunto al carrello!`);
        });

        // Bottone "RIMUOVI"
        const removeToCartButton = document.getElementById(
          `btn-remove-${index}`
        );
        removeToCartButton.addEventListener("click", (e) => {
          e.preventDefault();

          // Recupera il carrello dal localStorage
          const cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Filtra il carrello per rimuovere il libro corrente
          const updatedCart = cart.filter((item) => item.title !== book.title);

          // Salva il carrello aggiornato nel localStorage
          localStorage.setItem("cart", JSON.stringify(updatedCart));

          console.log(`${book.title} rimosso dal carrello!`);
        });
      });
    })
    .catch((err) => {
      console.log("Si è verificato un errore", err);
    });
};

getLibraryCreate();
