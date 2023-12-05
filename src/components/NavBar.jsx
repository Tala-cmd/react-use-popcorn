import React from 'react'
import Search from './Search';
import Logo from './Logo';
import NumResults from './Numresults';

function NavBar( {movies} ) {
  
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults  movies={movies}/>
    </nav>
  )
}

export default NavBar