const Person = ({person, filter}) => {
    if (filter==='') {
      return (
        <p>{person.name} {person.number}</p>
      )
    }
    if (person.name.toLowerCase().includes(filter)) {
      return (
        <p>{person.name} {person.number}</p>
      )
    }
    
  }

const Persons = ({persons, filter}) => {
    console.log('persons', persons)
    return (
        <div>
    {persons.map(person =>
        <Person key={person.id} person={person} filter={filter}/>
        )}
        </div>
    )
}

export default Persons