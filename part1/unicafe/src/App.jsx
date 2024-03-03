import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good + props.neutral + props.bad)/3
  const percentagePositive = props.good/(props.good + props.neutral + props.bad) * 100
  return (
    <div>
      <div>Total number of feedback: {total}</div>
      <div>Average: {average}</div>
      <div>Percentage of positive feedback: {percentagePositive} %</div>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h2>
        Statistics
      </h2>
      <div>Good {good}</div>
      <div>Neutral {neutral}</div>
      <div>Bad {bad}</div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App