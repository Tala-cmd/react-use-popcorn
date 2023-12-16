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
import { useMovies } from "./useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  const {movies, isLoading, error} = useMovies(query);  //From useMovies function 
  
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
