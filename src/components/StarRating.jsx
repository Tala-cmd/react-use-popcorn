import React from 'react'

const containerStyle={
  display:'flex',
  alignItems: 'center',
  gap:'16px'
}

const starContainerStyle={
  display:'flex',
  gap:'4px'
}

const textStyle={
  lineHeight: '1',
  margin:'0',
}

function StarRating({ maxRating = 5 }) {

  return (
    <div style={containerStyle}>
      <h1 style={starContainerStyle}>{Array.from({length:maxRating}, (_, i)=> <span>S{i+1}</span>)}</h1>
      <h1 style={textStyle}>10</h1>
    </div>
  )
}

export default StarRating