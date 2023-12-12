import React from 'react'
import { useState } from 'react';
import Movie from './Movie';

function MovieList({ movies, onSelectMovie }) {
  
  return (
    <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
        ))}
      </ul>
  )
}

export default MovieList