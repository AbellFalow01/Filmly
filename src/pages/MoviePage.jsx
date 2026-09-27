import { useParams } from "react-router"
import MovieDetails from "../components/MovieDetails";
import { useEffect, useState } from "react";


function MoviePage() {

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  

  const {id} = useParams()

  const options = {
    method: 'GET',
    headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDE3ZmQyZjg4YzVhMjMyNzVkZWJhMTc1ZjNkNmIwMCIsIm5iZiI6MTc2ODg1Mjk2NS4zNTUsInN1YiI6IjY5NmU4ZGU1YmE1MTE3YzM3ZGY5NTRmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BE62T0Abjfbrq9JknHONcT-YuWE8BSBUpQK4m1v4FRw'}
  };

  useEffect(() => {

    const getData = async () => {
      try {
        setError("")
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        if (!res.ok) throw new Error("Could not search for movie")
        const data = await res.json();
        setMovie(data)
      } catch {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false)
      }
    }

    getData();

  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  return <MovieDetails movie={movie}/>
}

export default MoviePage
