const searchBox = document.querySelector('#movie-search-box'); //input box
const searchList = document.querySelector('#search-list'); //search suggestion box
const resultGrid = document.querySelector('#result-grid'); //result container from movie page

// set defoult data to localstorage
if(localStorage.getItem("favMovies")){
    let favMovies = []
    localStorage.setItem("fevMovies",JSON.stringify(favMovies));
}

// find movie for user
const findMovies = () =>{
    let searchTerm = searchBox.value.trim(); //get typed value and remove whitespace
    if(searchTerm.length > 0){
        searchList.classList.remove("hide-search-list"); //show the suggestion box
        fetchMovies(searchTerm);//load movie from api
    }else{
        searchList.classList.add("hide-seach-list");//hide the suggestion box if character isn't present in the search list
    }
}

// fetching movie from omdb api
// fetching movie from omdb api
async function fetchMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=3cbf092a`; // Update URL to use "s" parameter for searching by title
    const res = await fetch(URL); // Fetching data from server
    const data = await res.json(); // Convert data to JSON

    console.log(data);

    if (data.Response === "True") {
        displayMoviesList(data.Search);
    }
}



// displaying matched movies in the suggestion box
const displayMoviesList = (movies) => {
    searchList.innerHTML = ""; //clear the earlier list of movies
    for(let i =0; i<movies.length; i++){
        let movieListItem = document.createElement("div"); //create a div
        movieListItem.dataset.id = movies[i].imdbID; //set id to each movie result
        movieListItem.classList.add("search-list-item"); //adding 'search-list-item' class to this div


        // set poster image address
        if(movies[i].Poster != "N/A"){
            moviePoster = movies[i].Poster; //set Image address
        }else{
            moviePoster = "not-found.jpg";  //if movie poster not found then set not-found image
        }

        // add result to suggestion list
        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}" alt="movie">
        </div>
        
        <div class="search-item-info">
            <h3>${movies[i].Title}</h3>
            <h3>${movies[i].Year}</h3>
        </div>`;

        searchList.appendChild(movieListItem); //add a mached movie to autocomplete list

    }
    loadMovieDetails(); //load movie details
}

// Loading movie details
const loadMovieDetails = () => {
    const searchListMovies = searchList.querySelectorAll(".search-list-item"); //select all matched movies

    // add all matched movies to suggestion box
    searchListMovies.forEach((movie) => {
        movie.addEventListener("click", async() => {
            searchList.classList.add("hide-search-list"); //add css
            searchBox.value = ""; //reset search box
            localStorage.setItem("movieID", movie.dataset.id); //set movie id to lacalStorage to use it in moviePage.html
            window.location.href = "./moviePage/moviePage.html"; //redirect to a new page
        });
    });
};


// adding eventListners to diffrent elements
window.addEventListener("click",function(e){
    if(e.target.className != "form-control"){
        searchList.classList.add("hide-search-list"); //hide suggestion box if user click anywhere other then suggestion
    }
});

searchBox.addEventListener("keyup",findMovies);
searchBox.addEventListener("click",findMovies);
