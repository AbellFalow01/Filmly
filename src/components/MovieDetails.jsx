import "../styles/movieDetails.css"
import SaveButton from "./SaveButton"



function MovieDetails({movie}) {

  return (
    <div className="movie-details-wrapper">
      <div className="image-wrapper">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
      </div>
      <div className="movie-details">
        <h1 className="movie-details-title">{movie.title}</h1>
        <span className="movie-details-release-date">{movie.release_date}</span>
        <p className="movie-details-overview">{movie.overview}</p>
        <p className="movie-details-rating"><span className="details-star-symbol">✦</span> {movie.vote_average?.toFixed(1)}</p>
        <SaveButton movie={movie}/>
      </div>
    </div>
  )
}

export default MovieDetails
