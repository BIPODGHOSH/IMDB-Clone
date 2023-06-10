let movieId = localStorage.getItem("movieID"); //get movie id from localstorage
console.log("movieId =", movieId);
const addToFavBtn = document.querySelector("#addToFav"); //fetching add to fav button

let favMovies = JSON.parse(localStorage.getItem("favMovies")); //get details of list of movies stored in localstorage

// Initialize favMovies as an empty array if it doesn't exist
if (!favMovies) {
  favMovies = [];
  localStorage.setItem("favMovies", JSON.stringify(favMovies));
}

const resultGrid = document.querySelector("#result-grid"); //movie container

// this command will run if there is a valid movieID
if (movieId) {
  getData(movieId);
}

// load only clicked movie details
async function getData(movieID) {
  const result = await fetch(
    `https://www.omdbapi.com/?i=${movieId}&apikey=3cbf092a`
  ); //base url
  const movieDetails = await result.json(); //converting movie details from server to json
  displayMovieDetails(movieDetails); //display the movie
}

//showing movie in the moviePage
const displayMovieDetails = (details) => {
  // add movie to the page
  resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${
          details.Poster != "N/A" ? details.Poster : "../not-found.jpg"
        }" alt="movie-poster">
    </div>

    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">Year: ${details.Year}</li>
            <li class="rated">Ratings: ${details.Rated}</li>
            <li class="released">Released: ${details.Released}</li>
        </ul>

        <p class="genre"><b>Genre: ${details.Genre}</b></p>
        <p class="writer"><b>Writer: ${details.Writer}</b></p>
        <p class="actors"><b>Actors: ${details.Actors}</b></p>
        <p class="plot"><b>Plot: ${details.Plot}</b></p>
        <p class="language"><b>Language: ${details.Language}</b></p>
        <p class="awards"><b>Awards: <i class="fa-solid fa-award"></i></b>${details.Awards}</p>
    </div>`;
};

// set addToFav button text to "already added" if it is already there in fav-list
if (movieId && favMovies.includes(movieId)) {
  addToFavBtn.textContent = "Already Added To Favourites !!";
}

// favourite Button
const addToFav = () => {
  addToFavBtn.textContent = "Added To Favourites";

  // check if movie is already added to the list
  if (favMovies.includes(movieId)) {
    addToFavBtn.textContent = "Already Added To Favourites !!";
  } else {
    favMovies.push(movieId); //add movie to favourite list

    // add new favMovies data to local storage
    localStorage.setItem("favMovies", JSON.stringify(favMovies)); //set data to localstorage
  }
};

// event listeners
addToFavBtn.addEventListener("click", addToFav);
