import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "./useKey";

const KEY = "1b2dc3ef";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState('')

  const countRef = useRef(0);

  useEffect(function(){
    if (userRating) countRef.current++;
  }, [userRating])

  const isWatched = watched.map((movie)=> movie.imdbID)
  .includes(selectedId)

  const watchedUserRating = watched.find((movie)=> 
  movie.imdbID === selectedId) ?. userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isTop = imdbRating > 8
  console.log(isTop)

  function handleAdd(){
  const newWatchedMovie={
    imdbID: selectedId,
    title,
    year,
    poster,
    imdbRating: Number(imdbRating),
    runtime: Number(runtime.split(' ').at(0)),
    userRating,
    countRatingDecisions: countRef.current
  }

  onAddWatched(newWatchedMovie)
  onCloseMovie();
  }

  useKey('Escape', onCloseMovie)

  useEffect(function () {
    async function getMovieDetails() {
      try{
        setIsLoading(true)
        setError('')
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        
        if(!res.ok) throw new Error('Something went wrong with fetching movies')
        
        const data = await res.json();
        setMovie(data);
        setIsLoading(false)
      } catch(err){
        setError(err.message)
      } finally{
        setIsLoading(false)
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(function(){
    if(!title) return;
    document.title = `usePopcorn | ${title}`

    return function(){
      document.title='usePopcorn'
    }
  },[title])

  return (
    <div className="details">
      {isLoading && <Loader /> }
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error &&
        <>
        <header>
          <button className="btn btn-back" onClick={onCloseMovie}>&larr;</button>
          <img src={poster} alt={`Poster of ${movie} movie`}/>
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull; {runtime}</p>
            <p>{genre}</p>
            <p><span>⭐</span>{imdbRating} IMDb Rating</p>
          </div>
        </header>

        <section>
          <div className="rating">
            {!isWatched ? (
            <>
            <StarRating 
              maxRating={10} 
              size={24} 
              onSetRating={setUserRating}
            />
            {userRating > 0 && 
              <button className="btn btn-add" onClick={handleAdd}>+ Add to List</button>
            } </>
            ) : <p>⭐You rated this movie with {watchedUserRating} stars</p>
            } 
            
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        </>
      }
      
    </div>
  );
}

export default MovieDetails;
