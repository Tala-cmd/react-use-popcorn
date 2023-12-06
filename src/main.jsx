import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import StarRating from './components/StarRating'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5}/>
    <StarRating maxRating={10}/>
    <StarRating />
  </React.StrictMode>,
)
