import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";

//31698eff

const API_URL = "http://www.omdbapi.com?apikey=31698eff";

const movie1 = {
  Title: "Spiderman",
  Year: "1990",
  imdbID: "tt0100669",
  Type: "movie",
  Poster: "N/A",
};

const App = () => {
  //Setting my states
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    //Fetch the api url and save into a variable
    const response = await fetch(`${API_URL}&s=${title}`);

    //Grab  all titles with the key word which was passed in
    const data = await response.json();
    // Set out setMovies to only grab our Search array
    setMovies(data.Search);
  };

  //Immediatley after webpage pages the first render will be Batman
  useEffect(() => {
    searchMovie("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieClip 123</h1>
      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
