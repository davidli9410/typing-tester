import React from 'react'

function TextDisplay({ text, input }) {
  return (
    <div className="text-display">
      {text.split('').map((char, index) => {
        let className = '';
        if (char === ' ') {
          className = 'space';
        } else if (index < input.length) {
          className = input[index] === char ? 'correct' : 'incorrect';
        } else if (index === input.length) {
          className = 'current';
        }
        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  )
}

export default TextDisplay 