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
      <Part number={props.parts[0].name} numEx={props.parts[0].exercises} />
      <Part number={props.parts[1].name} numEx={props.parts[1].exercises} />
      <Part number={props.parts[2].name} numEx={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

// what is the difference between having 3 content and 1 content?
// the use of fragments and less div elements?

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
  )
}

export default App