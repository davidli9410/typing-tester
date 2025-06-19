import React from 'react'

function Stats({ time, wpm, accuracy }) {
  return (
    <div className="stats" style={{color: 'white'}}>
      <div className="stat" style={{color: 'white'}}>Time: {time}s</div>
      <div className="stat" style={{color: 'white'}}>WPM: {wpm}</div>
      <div className="stat" style={{color: 'white'}}>Accuracy: {accuracy}%</div>
    </div>
  )
}

export default Stats 