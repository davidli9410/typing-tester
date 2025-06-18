import React from 'react'

function Stats({ time, wpm, accuracy }) {
  return (
    <div className="stats">
      <div className="stat">Time: {time}s</div>
      <div className="stat">WPM: {wpm}</div>
      <div className="stat">Accuracy: {accuracy}%</div>
    </div>
  )
}

export default Stats 