import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text=="Percentage of positive feedback") {
    return (
      <div>
      {props.text}: {props.value} %
    </div>
    )
  }
  return (
    <div>
      {props.text}: {props.value}
    </div>
  )
}

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
      <StatisticLine text="Good" value={props.good}></StatisticLine>
      <StatisticLine text="Neutral" value={props.neutral}></StatisticLine>
      <StatisticLine text="Bad" value={props.bad}></StatisticLine>
      <StatisticLine text="Total number of feedback" value={total}></StatisticLine>
      <StatisticLine text="Average" value={average}></StatisticLine>
      <StatisticLine text="Percentage of positive feedback" value={percentagePositive}></StatisticLine>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
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
      <Button onClick={() => setGood(good + 1)} text="Good"></Button>
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral"></Button>
      <Button onClick={() => setBad(bad + 1)} text="Bad"></Button>
      <h2>
        Statistics
      </h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App