import { useState } from 'react'

const Person = ({person}) => {
  return (
    <>
    <p>{person.name} {person.number}</p>
    </>
  )
}

// does not verify if number field contains numbers only

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    console.log('Add Person', event.target)
    // may need to add id to each person in the future
    const newPerson = {
      name: newName,
      number: newNum
    }

    const isPersonAlreadyAdded = persons.some(person => person.name === newPerson.name)

    if (isPersonAlreadyAdded) {
      console.log(`${newPerson.name} is already added to phonebook`)
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }

    if (newNum === '') {
      alert(`Please enter a number`)
      return
    }

    const isNumberAlreadyAdded = persons.some(person => person.number === newPerson.number)


    if (isNumberAlreadyAdded) {
      console.log(`${newPerson.number} is already added to phonebook`)
      alert(`${newPerson.number} is already added to phonebook`)
      return
    }




    console.log('added new person')
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNum('')
  }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
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
        number: <input value={newNum}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} person={person}/>
        )}
    </div>
  )
}

export default App