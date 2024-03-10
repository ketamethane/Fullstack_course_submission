import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import noteService from './services/persons'



// does not verify if number field contains numbers only

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    noteService.
      getAll().
      then(initialPersons => {
          console.log('got all')
          setPersons(initialPersons)
      })
  }, [])

  // console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Add Person', event.target)

    const newPerson = {
      name: newName,
      number: newNum,
      id: (persons.length + 1).toString()
    }
    console.log('new person id after', newPerson.id)

    const isPersonAlreadyAdded = persons.some(person => person.name === newPerson.name)

    if (isPersonAlreadyAdded) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        
        // make a shallow copy of the person to update with that person's id, then update accordingly
        const addedPerson = persons.find(person => person.name === newPerson.name)
        const changedPerson = { ...addedPerson, number: newNum}
        console.log('changed person:', changedPerson)
        noteService.update(changedPerson.id, changedPerson)
        .then(response => {
          console.log('added person:',response)
          setPersons(persons.map(p => p.id !== changedPerson.id ? p : response))
          setNewName('')
          setNewNum('')
        }
        )
        return

      }
      // console.log(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      // alert(`${newPerson.name} is already added to phonebook`)
      // return
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

    // const newPersons = persons.concat(newPerson)

    noteService.create(newPerson)
      .then(response => {
        console.log(response, 'response')
        console.log('added new person')
        setPersons(persons.concat(response))
        setNewName('')
        setNewNum('')
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
    noteService.deletePerson(person.id)
      .then(response => {
        console.log(response, 'delete')
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h2>
        add a new
      </h2>
      
      <PersonForm onSubmit={addPerson} name={newName} nameHandle={handlePersonChange}
      num={newNum} numHandle={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App