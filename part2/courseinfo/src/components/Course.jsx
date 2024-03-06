const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ numEx }) => {
console.log('numEx', numEx)
return (
<b>total of {numEx.reduce((sum, num) => sum + num, 0)} exercises</b>
)
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    console.log('parts', parts)
    return (
  <>
    {parts.map(part => 
    <Part key={part.id} part={part} />
    )}
  </>
    )
}

const Course = ({course}) => {
    const id = course.id
    const name = course.name
    const parts = course.parts


    console.log('id', id)
    console.log('name', name)
    console.log('parts', parts)
    
    return (
        <div>
      <Header name={name} />
      <Content parts={parts} />
      {<Total numEx={parts.map(part => part.exercises)} />}
    </div>
    )
}


export default Course