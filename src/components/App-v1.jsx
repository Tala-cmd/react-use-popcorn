// /* eslint-disable no-unused-vars */
// import NavBar from "./NavBar";
// import Logo from "./Logo";
// import Search from "./Search";
// import NumResults from "./NumResults";
// import Main from "./Main";
// import Box from "./Box";
// import MovieList from "./MovieList";
// import WatchedSummary from "./WatchedSummary";
// import WatchedMoviesList from "./WatchedMoviesList";
// import StarRating from "./StarRating";
// import { useState } from "react";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//         "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//         "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//         "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//         "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//         "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// export default function App() {
//   const [movies, setMovies] = useState(tempMovieData);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//     <>
//         <NavBar>
//           <Logo />
//           <Search />
//           <NumResults movies={movies} />
//         </NavBar>

//         <Main data1={tempMovieData} data2={tempWatchedData}>
//           <Box data1={tempMovieData} data2={tempWatchedData} >
//             <MovieList movies={movies} />
//           </Box>

//           <Box>
//             <WatchedSummary watched={watched} />
//             <WatchedMoviesList watched={watched} />
//           </Box>
//         </Main>
//     </>
//   );
// }
