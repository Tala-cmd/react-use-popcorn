import Movie from './Movie';

function MovieList({ movies, onSelectMovie }) {
  
  return (
    <ul className='list list-movies'>
      {movies.length === 0 && 
        <h3 className='text'>Search millions of movies!</h3>} 
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
        ))}
      </ul>
  )
}

export default MovieList