import { useState } from 'react'

const GetRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  console.log(anecdotes[selected])
  console.log('selected', selected)
  console.log(votes)

  const Vote = (index) => {
    console.log('index:', index)
    const copy = [...votes]
    console.log('before copy change:', copy)
    copy[index] += 1
    console.log('after copy change:', copy)
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={() => Vote(selected)}>vote</button>
      <button onClick={() => setSelected(GetRandomInt(anecdotes.length))}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
      <div>has {votes[votes.indexOf(Math.max(...votes))]} votes</div>
    </div>
  )
}

export default App