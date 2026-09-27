import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function SavedPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDE3ZmQyZjg4YzVhMjMyNzVkZWJhMTc1ZjNkNmIwMCIsIm5iZiI6MTc2ODg1Mjk2NS4zNTUsInN1YiI6IjY5NmU4ZGU1YmE1MTE3YzM3ZGY5NTRmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BE62T0Abjfbrq9JknHONcT-YuWE8BSBUpQK4m1v4FRw"
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
            if (!res.ok) {
              throw new Error("Could not get movie");
            }
            const data = await res.json();
            savedMovieList.push(data);
          } catch {
            setError("Something went wrong. Try again.");
          }
        }
        setMovies(savedMovieList);
      }
      setLoading(false);
    };

    getMovies();

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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