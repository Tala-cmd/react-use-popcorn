import React from 'react'

function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <>
      <div className='details'>{selectedId}</div>
      <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
    </>
  )
}

export default MovieDetails