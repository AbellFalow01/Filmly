import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"

function DashboardPage() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const options = {
    method: 'GET',
    headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDE3ZmQyZjg4YzVhMjMyNzVkZWJhMTc1ZjNkNmIwMCIsIm5iZiI6MTc2ODg1Mjk2NS4zNTUsInN1YiI6IjY5NmU4ZGU1YmE1MTE3YzM3ZGY5NTRmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BE62T0Abjfbrq9JknHONcT-YuWE8BSBUpQK4m1v4FRw'}
  };

  useEffect(() => {

  const getData = async () => {
      try {
        setError("")
        const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        if (!res.ok) throw new Error("Could not load movies")
        const data = await res.json();
        setMovies(data.results)
      } catch (error) {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    }

    getData();

  }, [])

  const searchMovie = async (search) => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options);
      if (!res.ok) throw new Error("Could not search for movie")
      const data = await res.json();
      setMovies(data.results)
    } catch (error) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="search-wrapper">
      <SearchBar onSearch={searchMovie}/>
    </div>
    <div className="movie-grid">
      { loading ? (
        <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} id={movie.id} poster_path={movie.poster_path} vote_average={movie.vote_average}/>
        ))
      )}
    </div>
    </>
  )
}

export default DashboardPage
