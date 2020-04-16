const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
// Movie consts
const MOVIE_RESEARCH_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}`;
const MOVIE_DISPLAY = document.getElementById("displayMovies");
// Description consts (modal)
const DESCRIPTION_SELECTOR = document.getElementById("modalDescription");

// Movie Request By User
movieRequest = (e) => {
  let requestedMovie = document.getElementsByTagName("input")[0].value;
  if (requestedMovie != "") searchMovie(requestedMovie);
  e.preventDefault();
};
document.getElementById("submit").addEventListener("click", movieRequest);

// Movie Research
searchMovie = (movie) => {
  let newUrl = MOVIE_RESEARCH_URL + `&s=${movie}`;

  // Research
  fetch(newUrl)
    .then((response) => response.json())
    .then((response) => {
      const foundMovies = response.Search;
      MOVIE_DISPLAY.innerHTML = "";
      console.log(response);

      foundMovies.forEach(function (movie) {
        showMovie(movie.Poster, movie.Title, movie.Year, movie.imdbID);
      });
    })
    .catch((error) => console.error(error));
};

// ShowMovie
showMovie = (image, title, year, id) => {
  MOVIE_DISPLAY.innerHTML += `
  <div class="card mr-3 mt-5 col-lg-3 p-0" style="width: 18rem;">
    <img class="card-img-top" src="${image}" alt="Card image cap">
    <div class="card-body">
      <p class="h4">${title}</p>
      <p class="card-text">${year}</p>
    </div>
    <button type="button" class="btn btn-primary" onclick="requestDescription('${id}')" id="${id}">See more</button>
  </div>
  `;
};

// Modal system (to research movie description)
requestDescription = (id) => {
  const USER_REQUEST = document.getElementsByTagName("input")[0].value;
  const DESCRIPTION_RESEARCH_URL = `http://www.omdbapi.com/?apikey=${key}&i=${id}`;

  fetch(DESCRIPTION_RESEARCH_URL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((response) => {
      const description = response.Plot;
      showModal(description);
    })
    .catch((error) => console.error(error));
};

showModal = (description) => {
  modal.style.display = "block";
  DESCRIPTION_SELECTOR.innerHTML = `${description}`;
};
closeModal = () => {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Intersection observer : dans showMovie ?
