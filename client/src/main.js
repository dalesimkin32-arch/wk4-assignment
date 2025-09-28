// declare DOM constants

const novelDisplaySection = document.getElementById("app");

// get all novels from express API and display

async function fetchNovels() {
  //  fetch () defaults to GET request
  const response = await fetch(`http://localhost:8080/sci_fi_novels`);
  const novels = await response.json();
  createNovels(novels);
}

function createNovels(novelsArray) {
  novelsArray.forEach((novel) => {
    const divOuter = document.createElement("div");
    const divInner = document.createElement("div");
    console.log(novel);

    const titleElement = document.createElement("h3");
    const authorElement = document.createElement("p");
    const isbn13Element = document.createElement("p");
    const summaryElement = document.createElement("p");
    const reviewElement = document.createElement("p");
    const starRatingElement = document.createElement("p");
    const coverImageElement = document.createElement("img");

    // set all innerText elements
    titleElement.innerText = novel.title;
    authorElement.innerText = `by ${novel.author}`;
    isbn13Element.innerText = `ISBN13: ${novel.isbn13}`;
    summaryElement.innerText = `A Brief Summary: ${novel.summary}`;
    reviewElement.innerText = `A short review: ${novel.review}`;
    starRatingElement.innerText = `A star rating (0.1 to 5.0): ${novel.star_rating}`;
    // image tag details require setAttribute() href and an alt description
    coverImageElement.setAttribute("src", novel.cover_image);
    coverImageElement.setAttribute("alt", `book cover image of ${novel.title}`);

    // set div novel container css ref
    divOuter.setAttribute("class", "novel-container");
    // add all elements to div and div to display section
    divInner.append(
      titleElement,
      authorElement,
      isbn13Element,
      summaryElement,
      reviewElement,
      starRatingElement
    );

    divOuter.append(divInner, coverImageElement);

    novelDisplaySection.append(divOuter);
  });
}

// actually run the data fetch - "the invocation"

fetchNovels();

// listen for and submit form data to pass to API (which then updates database

const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const userNovel = Object.fromEntries(data);
  console.log(userNovel);

  // Now send a POST request to API server
  const response = await fetch(`http://localhost:8080/sci_fi_novels`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userNovel),
  });
  console.log(response);
});
