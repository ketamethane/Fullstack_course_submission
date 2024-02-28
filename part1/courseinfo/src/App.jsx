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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

// what is the difference between having 3 content and 1 content?
// the use of fragments and less div elements?

  return (
    <div>
      <Header course={course} />
      <Content number={[parts[0].name, parts[1].name, parts[2].name]} numEx={[parts[0].exercises, parts[1].exercises, parts[2].exercises]} />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App