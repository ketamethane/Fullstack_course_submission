const Person = ({person, filter, deleteHandler}) => {
    if (filter==='') {
      return (
        <p>{person.name} {person.number} <button onClick={deleteHandler}>delete</button></p>
      )
    }
    if (person.name.toLowerCase().includes(filter)) {
      return (
        <p>{person.name} {person.number} <button onClick={deleteHandler}>delete</button></p>
      )
    }
    
  }

const Persons = ({persons, filter, deleteHandler}) => {
    console.log('persons', persons)
    return (
        <div>
    {persons.map(person =>
        <Person key={person.id} person={person} filter={filter} deleteHandler={() => deleteHandler(person.id)}/>
        )}
        </div>
    )
}

export default Persons