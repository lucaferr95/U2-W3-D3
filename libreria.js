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

      data.forEach((book) => {
        const card = document.createElement("div");
        card.className = "card col-md-4";
        card.style.width = "10rem";

        const bookImg = document.createElement("img");
        bookImg.src = book.img;
        bookImg.className = "card-img-top";
        bookImg.alt = book.title;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h3");
        cardTitle.innerText = book.title;

        const priceBook = document.createElement("h5");
        priceBook.innerText = `€${book.price}`;

        const cardButton = document.createElement("a");
        cardButton.className = "btn btn-primary";
        cardButton.href = "#";
        cardButton.innerText = "AGGIUNGI AL CARRELLO";

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(priceBook);
        cardBody.appendChild(cardButton);
        card.appendChild(bookImg);
        card.appendChild(cardBody);

        cardContainer.appendChild(card);
        console.log("Book data: ", book);
      });
    })
    .catch((err) => {
      console.log("Si è verificato un errore", err);
    });
};

getLibraryCreate();
