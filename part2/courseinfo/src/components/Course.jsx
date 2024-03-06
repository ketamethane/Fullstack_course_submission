const Header = ({ name }) => <h1>{name}</h1>

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>

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
      
    </div>
    )
}

// {<Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />}

export default Course