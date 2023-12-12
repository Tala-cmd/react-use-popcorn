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
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = '1b2dc3ef'

export default function App() {
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)

    /*
      useEffect(function(){
        console.log('After the initial render')
      },[])

      useEffect(function(){
        console.log('After every render')
      })

      useEffect(function(){
        console.log('When query is changed')
      },[query])

      console.log('During render')
    */
    
  function handleSelectMovie(id){
    setSelectedId((selectedId)=> id === selectedId? null : id)
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  useEffect(function(){
    async function fetchMovies(){
      try {
        setIsLoading(true)
        setError('')
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
        
        if(!response.ok) throw new Error('Something went wrong with fetching movies')
  
        const data= await response.json()

        if(data.Response === 'False') throw new Error('Movie not found')
        setMovies(data.Search)
      console.log(data.Search)
        // setIsLoading(false)
      } catch (err){
        console.log(err.message)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if(query.length < 3){
      setMovies([])
      setError('')
      return 
    }
    fetchMovies();
  } ,[query])

  
  return (
    <>
        <NavBar>
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
        </NavBar>

        <Main data1={tempMovieData} data2={tempWatchedData}>
          <Box data1={tempMovieData} data2={tempWatchedData} >
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error}/>}
            {!isLoading && !error && 
              <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          </Box>

          <Box>
            { selectedId ? <MovieDetails selectedId={selectedId} 
            onCloseMovie={handleCloseMovie} /> 
            : <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
            }
            
          </Box>
        </Main>
    </>
  );
}
