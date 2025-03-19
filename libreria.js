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
      data.forEach((book) => {
        cardContainer.innerHTML += `
            <div class="card col-lg-4" style="width: 18rem; margin: 1rem;">
              <img src="${book.img}" class="card-img-top" alt="${book.title}" style="height: 300px;">
              <div class="card-body d-flex flex-column justify-content-between">
                <h3>${book.title}</h3>
                <div style="margin-top: auto;">
                  <h5 style="margin-bottom: 0.5rem;">€${book.price}</h5>
                  <div class="d-flex justify-content-between text-center" style="gap: 0.5rem;">
                    <a href="#" class="btn btn-primary">AGGIUNGI AL CARRELLO</a>
                    <a href="#" class="btn btn-danger ">RIMUOVI</a>
                  </div>
                </div>
              </div>
            </div>`;
      });
    })
    .catch((err) => {
      console.log("Si è verificato un errore", err);
    });
};

getLibraryCreate();
