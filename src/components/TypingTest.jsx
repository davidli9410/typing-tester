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

  // Fetch words.txt on mount
  useEffect(() => {
    fetch('/src/data/words.txt')
      .then(res => res.text())
      .then(data => {
        const arr = data.split('\n').filter(Boolean);
        const randomWords = [];
        for (let i = 0; i < 10; i++) {
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

  const resetTest = () => {
    setInput('');
    setTime(10);
    setIsActive(false);
    setWpm(0);
    setAccuracy(100);


    if (words.length >= 10) {
      const randomWords = [];
      for (let i = 0; i < 10; i++) {
        const idx = Math.floor(Math.random() * 1000);
        randomWords.push(words[idx].toLowerCase());
      }
      setText(randomWords.join(' '));
    }
    inputRef.current?.focus();
  };

  return (
    <div className="typing-test">
      <h1>Typing Test</h1>
      <Stats time={time} wpm={wpm} accuracy={accuracy} />
      <TextDisplay text={text} input={input} />
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        disabled={time === 0}
        placeholder="Start typing..."
        className="typing-input"
      />
      <button onClick={resetTest} className="reset-button">
        Reset Test
      </button>
    </div>
  )
}

export default TypingTest 