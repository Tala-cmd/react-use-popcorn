import NavBar from "./NavBar";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./Numresults";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import { useEffect, useState } from "react";

const KEY = '1b2dc3ef'

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  
  const [watched, setWatched] = useState(function(){
    const storedValue = localStorage.getItem('watched')
    return JSON.parse(storedValue)
  });

  function handleSelectMovie(id){
    setSelectedId((selectedId)=> id === selectedId? null : id)
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  function handleAddWatched(movie){
    setWatched((watched)=> [...watched, movie])
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }

  function handleDeleteWatched(id){
    setWatched((watched)=> watched.filter((movie)=>
      movie.imdbID !== id))
  }

  useEffect(function(){
    localStorage.setItem('watched', JSON.stringify(watched))
  
  }, [watched])

  useEffect(function(){ 
    const controller = new AbortController();

    async function fetchMovies(){
      try {
        setIsLoading(true)
        setError('')
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal})
        
        if(!response.ok) throw new Error('Something went wrong with fetching movies')
  
        const data= await response.json()

        if(data.Response === 'False') throw new Error('Movie not found')
        setMovies(data.Search)
        console.log(data.Search)
        // setIsLoading(false)
        setError('')
      } catch (err){
        if(err.name !== 'AbortError'){
          console.log(err.message)
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    if(query.length < 3){
      setMovies([])
      setError('')
      return 
    }
    handleCloseMovie();
    fetchMovies();

    return function(){
      controller.abort();
    }
  } ,[query])

  
  return (
    <>
        <NavBar>
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
        </NavBar>

        <Main>
          <Box>
            {isLoading && <Loader />}
            
            {!isLoading && !error && 
              <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          </Box>

          <Box>
            { selectedId ?
            <MovieDetails 
              selectedId={selectedId} 
              onCloseMovie={handleCloseMovie} 
              onAddWatched={handleAddWatched}
              watched={watched}
              /> 
            : <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
            }
            
          </Box>
        </Main>
    </>
  );
}
