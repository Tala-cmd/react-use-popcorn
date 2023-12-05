import React from 'react'
import Search from './Search';
import Logo from './Logo';
import NumResults from './Numresults';

function NavBar( {children} ) {
  
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  )
}

export default NavBar