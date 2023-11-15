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

const StatisticLine = ({ text, statistic }) => <> {text} {statistic} </>

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral

  if (!all) {
    return (
      <div>
        <h2>statistics</h2>
        <a>No feedback given</a>
      </div>
    )
  }

  const average = (good * 1 + bad * -1 + neutral * 0) / all
  const positive = good / all

  return (
    <div>
      <h2>statistics</h2>
      <ul style={{listStyleType: "none", padding: 0}}>
        <li> <StatisticLine text={'good'} statistic={good} /> </li>
        <li> <StatisticLine text={'bad'} statistic={bad} /> </li>
        <li> <StatisticLine text={'neutral'} statistic={neutral} /> </li>
        <li> <StatisticLine text={'all'} statistic={all} /> </li>
        <li> <StatisticLine text={'average'} statistic={average} /> </li>
        <li> <StatisticLine text={'positive'} statistic={positive} /> </li>
      </ul>
    </div>
  )
}

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
