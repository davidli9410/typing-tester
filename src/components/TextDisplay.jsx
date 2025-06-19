import React from 'react'

function TextDisplay({ text, input, currentWordIdx, windowSize }) {
  const words = text.split(' ');
  const start = Math.max(0, currentWordIdx);
  const end = Math.min(words.length, start + windowSize);
  const visibleWords = words.slice(start, end).join(' ');
  // Find the global starting index of the visible window in the full text
  const globalStartIdx = text.indexOf(visibleWords);

  return (
    <div className="text-display">
      {visibleWords.split('').map((char, idx) => {
        let className = '';
        const globalIdx = globalStartIdx + idx;
        if (globalIdx < input.length) {
          className = input[globalIdx] === char ? 'correct' : 'incorrect';
        }
        return (
          <span key={idx} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default TextDisplay 