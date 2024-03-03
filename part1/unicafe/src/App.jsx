import { useState } from 'react'

// const goodButton = () => {
//   return (
//     <div>

//     </div>
//   )
// }


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
      <div>Total number of feedback: {good + neutral + bad}</div>
      <div>Average: {(good + neutral + bad)/3}</div>
      <div>Percentage of positive feedback: {good/(good + neutral + bad) * 100} %</div>
    </div>
  )
}

export default App