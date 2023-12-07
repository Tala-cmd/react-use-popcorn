import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import StarRating from './components/StarRating'

function Test(){
  const [movieRating, setMovieRating] = useState(0)
  return(
    <div>
      <StarRating color='blue' maxRating={10} onSetRating={setMovieRating}/>
      <h1>This movie was rated {movieRating} stars</h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} messages={['Terrible', 'Bad', 'Okay', 'Good','Amazing' ]}/>
    <StarRating color='salmon' size={24} className='test' defaultRating={3} />
    <Test />
  </React.StrictMode>,
)
