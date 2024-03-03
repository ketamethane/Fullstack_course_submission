import { useState } from 'react'

const Statistics = (props) => {
  if (props.good==0 && props.neutral==0 && props.bad==0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const total = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1)/total
  const percentagePositive = props.good/(props.good + props.neutral + props.bad) * 100
  return (
    <div>
      <div>Good {props.good}</div>
      <div>Neutral {props.neutral}</div>
      <div>Bad {props.bad}</div>
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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App