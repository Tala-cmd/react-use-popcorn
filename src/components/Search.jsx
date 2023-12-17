import { useRef } from "react"
import { useKey } from "./useKey"

function Search({query, setQuery }) {
  const inputElement = useRef(null)

  useKey('Enter', function(){
    if(document.activeElement === inputElement.current) return //To not close the left Box when we hit 'Enter' more than once
    
    inputElement.current.focus()
    setQuery('')
  })

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