import React from 'react'
import { useState } from "react";
import MovieList from './MovieList';

function ListBox({ data1, movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return(
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen1((open) => !open)}
    >
      {isOpen1 ? "–" : "+"}
    </button>
    {isOpen1 && (<MovieList data1={data1} movies={movies}/>)}
  </div>
  )
}

export default ListBox