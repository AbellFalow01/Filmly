import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function SavedPage() {
  const [movies, setMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer DIN_TOKEN_HÄR"
    }
  };

  useEffect(() => {

    const getMovies = async () => {
      const savedMovies = localStorage.getItem("savedMovies");

      if (savedMovies) {
        const movieIds = JSON.parse(savedMovies);

        const savedMovieList = [];

        for (const id of movieIds) {
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
              options
            );

            const data = await res.json();

            savedMovieList.push(data);

          } catch (error) {
            console.log(error);
          }
        }

        setMovies(savedMovieList);
      }
    };

    getMovies();

  }, []);

  if (movies.length === 0) {
    return <p>You have no saved movies.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
}

export default SavedPage;