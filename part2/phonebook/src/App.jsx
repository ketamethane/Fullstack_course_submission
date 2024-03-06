import { useState } from 'react'

const Person = ({person}) => {
  return (
    <>
    <p>{person}</p>
    </>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    console.log('Add Person', event.target)
    // may need to add id to each person in the future
    const newPerson = {
      name: newName
    }

    const isPersonAlreadyAdded = persons.some(person => person.name === newPerson.name)

    if (isPersonAlreadyAdded) {
      console.log(`${newPerson.name} is already added to phonebook`)
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }

    console.log('added new person')
    setPersons(persons.concat(newPerson))
    setNewName('')
  }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} person={person.name}/>
        )}
    </div>
  )
}

export default App