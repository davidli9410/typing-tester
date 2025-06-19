import React, { useState, useEffect, useRef } from 'react'
import Stats from './Stats'
import TextDisplay from './TextDisplay'

function TypingTest() {
  const [words, setWords] = useState([])
  const [text, setText] = useState('')
  const [input, setInput] = useState('')
  const [time, setTime] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const inputRef = useRef(null)
  const [duration, setDuration] = useState(10)
  


  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(data => {
        const arr = data.split('\n').filter(Boolean);
        const randomWords = [];
        for (let i = 0; i < 100; i++) {
          const idx = Math.floor(Math.random() * 1000);
          randomWords.push(arr[idx].toLowerCase());
        }
        setWords(arr);
        setText(randomWords.join(' '));
      })
      .catch(err => {
        setWords([])
        setText('Could not load words.')
      })
  }, [])

  useEffect(() => {
    let interval = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      calculateResults()
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  const calculateAccuracy = (inputText) => {
    if (inputText.length === 0) return 100
    let correctChars = 0
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === text[i]) {
        correctChars++
      }
    }
    return Math.round((correctChars / inputText.length) * 100)
  }

  const calculateResults = () => {
    const wordsTyped = input.trim().split(/\s+/).length
    const minutes = (10 - time) / 60
    const calculatedWpm = Math.round(wordsTyped / minutes)
    if (isActive) {
    setWpm(calculatedWpm)
    }
  }

  const handleInput = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    if (!isActive && newInput.length > 0) {
      setIsActive(true);
    }
    if (isActive) {
      setAccuracy(calculateAccuracy(newInput));
    }
    if (newInput.length >= text.length) {
      setIsActive(false);
      calculateResults();
    }
  }

  const resetTest = (newDuration = duration) => {
    setInput('');
    setTime(newDuration);
    setIsActive(false);
    setWpm(0);
    setAccuracy(100);

    if (words.length >= 100) {
      console.log("words.length >= 100");
      const randomWords = [];
      for (let i = 0; i < 100; i++) {
        const idx = Math.floor(Math.random() * Math.min(1000, words.length));
        randomWords.push(words[idx]?.toLowerCase() || 'word');
      }
      setText(randomWords.join(' '));
    } else {
      setText('The quick brown fox jumps over the lazy dog. This is a fallback text for the typing test.');
    }
    inputRef.current?.focus();
  };

  const inputWords = input.trim().split(/\s+/);
  const currentWordIdx = inputWords.length - 1;

  return (
    <div className="typing-test">
      <h1 style={{color: 'white'}}>Typing Test</h1>
      <Stats time={time} wpm={wpm} accuracy={accuracy} />
      <div className="duration-panel">
        {[10, 15, 30, 60].map((d) => (
          <button
            key={d}
            className={`duration-btn${duration === d ? ' selected' : ''}`}
            onClick={() => {
              setDuration(d);
              setTime(d);
              resetTest(d);
            }}
          >
            {d}s
          </button>
        ))}
      </div>
      <div className="text-display-container">
        
      </div>
      <TextDisplay text={text} input={input} currentWordIdx={currentWordIdx} windowSize={20} />
      <div className="input-actions">
        <div className="input-window-container" style={{height: '2.5em', flex: 1, width: '90%'}}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            disabled={time === 0}
            className="typing-input"
            style={{
              width: '100%',
              fontFamily: 'Fira Mono, Consolas, monospace',
              fontSize: '2rem',
              color: 'black',
              background: 'white',
              caretColor: '#2196f3',
              position: 'relative',
            }}
          />
        </div>
        <button onClick={() => resetTest()} className="reset-button" >
          Reset Test
        </button>
      </div>
      {words.length < 100 && <div>Loading word list...</div>}
    </div>
  )
}

function TypingInputWindow({ input, windowSize = 20 }) {
  const chars = input.slice(-windowSize).split('');
  while (chars.length < windowSize) chars.unshift(' ');

  return (
    <div className="input-window">
      {chars.map((char, idx) => {
        let fadeClass = '';
        if (idx < windowSize - 5) fadeClass = 'fade-5';
        else if (idx < windowSize - 4) fadeClass = 'fade-4';
        else if (idx < windowSize - 3) fadeClass = 'fade-3';
        else if (idx < windowSize - 2) fadeClass = 'fade-2';
        else if (idx < windowSize - 1) fadeClass = 'fade-1';
        else fadeClass = 'current';
        return (
          <span key={idx} className={fadeClass}>{char}</span>
        );
      })}
    </div>
  );
}

export default TypingTest 