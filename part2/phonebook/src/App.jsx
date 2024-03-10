import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'



// does not verify if number field contains numbers only

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    console.log('Add Person', event.target)
    // may need to add id to each person in the future
    const newPerson = {
      name: newName,
      number: newNum,
      id: persons.length + 1
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

    // const newPersons = persons.concat(newPerson)

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log('added new person')
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
      })

    
    // setPersons(persons.concat(newPerson))
    // setNewName('')
    // setNewNum('')
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
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App