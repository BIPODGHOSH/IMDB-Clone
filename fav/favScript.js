// select the result container div, so that can append favMovies inside it
const resultContainer =document.querySelector(".result-container");

// get data from localstorage
let favMovies = JSON.parse(localStorage.getItem("favMovies"));

// get all favourite movies
favMovies.forEach((id) => {
    console.log(id)
    getData(id);//get movie from api with id
});

// get movies from server
async function getData(movieID){
    console.log(movieID);
    const result = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=3cbf092a`); //get data from api
    const movieDetails = await result.json(); //make data readable

    AddMovie(movieDetails); //add to dom
}

// add movie to dom
const AddMovie = (details) => {
    const child =document.createElement("div") //create movie box

    child.setAttribute("id",details.imdbID); //set unique id to delete exact movies
    child.setAttribute("class","result-grid"); //add css

    child.innerHTML = `<div class="movie-poster">
    <img src="${
        details.Poster != "N/A"
        ? details.Poster
        : "../not-found.jpg"
    }" alt="movie-poster">
</div>

<div class="movie-info">
    <h3 class="movie-title">${details.Title}</h3>
    <ul class="movie-misc-info">
        <li class="year">Year:${details.Year}</li>
        <li class="rated">Ratings:${details.Rated}</li>
        <li class="released">Released:${details.Released}</li>
    </ul>

    <p class="genre"><b>Genre: ${details.Genre}</b></p>
    <p class="writer"><b>Writer: ${details.Writer}</b></p>
    <p class="actors"> <b>Actors: ${details.Actors}</b></p>
    <p class="plot"> <b>Plot: ${details.Plot}</b></p>
    <p class="language"> <b>Language: ${details.Language}</b></p>
    <p class="awards"> <b>Awards: <i class="fa-solid fa-award"> </i> </b>
    ${details.Awards}
    </p>

</div>`;

// create button for each favourites movie
const btn = document.createElement("button");
btn.setAttribute("class","delete-btn")//add css
btn.innerHTML = `<i data-id="${details.imdbID}" class="fa-solid fa-trash">`;//set unique id to delete exact movie

btn.addEventListener("click",deleteMovie); //add listener on delete button
child.appendChild(btn); // add button to movie

resultContainer.appendChild(child); //add movie to dom
};


// // delete movie from dom
// const deleteMovie = (e) =>{

//     // get the id of the novie
//     const delID =e.target.getAttribute('data-id');
//     console.log(delID)

//     // get the specific movie
//     const movie = document.getElementById(delID);

//     // delete movie from view
//     movie.remove();

//     // delete movie from list
//     favMovies = favMovies.filter((id)=> id != delID);

//     // add new data of favMovies to localStorage
//     localStorage.setItem("favMovies",JSON.stringify(favMovies));
// };


// delete movie from dom
const deleteMovie = (e) => {
    // get the id of the movie
    const delId = e.currentTarget.firstElementChild.getAttribute('data-id');
    console.log(delId);
  
    // get the specific movie
    const movie = document.getElementById(delId);
    console.log(movie)
    // check if the movie exists before trying to remove it
    if (movie) {
        // delete movie from view
        movie.remove();
  
        // delete movie from list
        favMovies = favMovies.filter((id) => id != delId);
  
        // add new data of favMovies to localStorage
        localStorage.setItem("favMovies", JSON.stringify(favMovies));
    }
};
