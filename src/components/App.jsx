import NavBar from "./NavBar";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import { useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  const {movies, isLoading, error} = useMovies(query);  //From useMovies function

  const [watched, setWatched] = useLocalStorageState('watched', [])
  
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
