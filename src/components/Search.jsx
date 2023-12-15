import { useEffect, useRef } from "react"

function Search({query, setQuery }) {
  const inputElement = useRef(null)

  useEffect(function(){
    function callback(e){
      if(document.activeElement === inputElement.current) return //To not close the left Box when we hit 'Enter' more than once

      if(e.code === 'Enter'){
        inputElement.current.focus()
        setQuery('')
      }
    }
  document.addEventListener('keydown', callback)
  inputElement.current.focus();

  return ()=> document.removeEventListener('keydown', callback)
  },[setQuery])

  return (
    <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
  )
}

export default Search