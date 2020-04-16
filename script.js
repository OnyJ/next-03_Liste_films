// const URL = `http://www.omdbapi.com/?apikey=${key}`;
const URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}`;
const movieDisplay = document.getElementById("displayMovies");

// Movie Request By User
movieRequest = (e) => {
  let requestedMovie = document.getElementsByTagName("input")[0].value;
  if (requestedMovie != "") searchMovie(requestedMovie);
  e.preventDefault();
};
document.getElementById("submit").addEventListener("click", movieRequest);

// Movie Research
searchMovie = (movie) => {
  let newUrl = URL + `&s=${movie}`;

  // Recherche
  fetch(newUrl)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      const foundMovies = response.Search;
      movieDisplay.innerHTML = "";

      foundMovies.forEach(function (movie) {
        showMovie(movie.Poster, movie.Title, movie.Year);
      });
    })
    .catch((error) => console.error(error));
};

// ShowMovie
showMovie = (image, title, year) => {
  movieDisplay.innerHTML += `
  <div class="card mr-3 mt-5" style="width: 18rem;">
    <img class="card-img-top" src="${image}" alt="Card image cap">
    <div class="card-body">
      <p class="h4">${title}</p>
      <p class="card-text">${year}</p>
    </div>
    <button type="button" class="btn btn-primary">See more</button>
  </div>
  `;
};

// Intersection observer : dans showMovie ?

// Bouton modal pour chaque card film affiché
// Il faudra surement un fetch pour recherch progressivement infos
