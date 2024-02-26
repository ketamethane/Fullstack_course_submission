const Header = (props) => {
  return (
    <>
      <p>{props.course}</p>
      </>
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.number} {props.numEx}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part number={props.number[0]} numEx={props.numEx[0]} />
      <Part number={props.number[1]} numEx={props.numEx[1]} />
      <Part number={props.number[2]} numEx={props.numEx[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

// what is the difference between having 3 content and 1 content?
// the use of fragments and less div elements?

  return (
    <div>
      <Header course={course} />
      <Content number={[part1, part2, part3]} numEx={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App