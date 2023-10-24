import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Interface = ({ good, setGood, bad, setBad, neutral, setNeutral }) => (
  <div>
    <h2>give feedback</h2>
    <Button text={'good'} onClick={() => setGood(good + 1)} />
    <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} />
    <Button text={'bad'} onClick={() => setBad(bad + 1)} />
  </div>
)

const Statistics = ({ good, bad, neutral }) => (
  <div>
    <h2>statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Interface 
        good={good} setGood={setGood} 
        bad={bad} setBad={setBad} 
        neutral={neutral} setNeutral={setNeutral} 
      />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App

