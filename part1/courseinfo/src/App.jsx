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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

// what is the difference between having 3 content and 1 content?
// the use of fragments and less div elements?

  return (
    <div>
      <Header course={course} />
      <Content number={[part1.name, part2.name, part3.name]} numEx={[part1.exercises, part2.exercises, part3.exercises]} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App