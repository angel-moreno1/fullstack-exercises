import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(({ data }) => void setPersons(data))
      .catch(err => console.log(err))
  }, [])

  const addNewPerson = event => {
    event.preventDefault()
    if(newName === "" || !newNumber) return;
    const alreadyIn = persons.some(p => p.name.trim().toLowerCase() === newName.trim().toLowerCase())
    if(alreadyIn){  
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(prev => prev.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleSetFilter = ({ target }) => void setFilter(target.value)
  const handleSetName = ({ target }) => void setNewName(target.value)
  const handleSetNumber = ({ target }) => void setNewNumber(target.value)

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Phonebook</h2>
        <Filter 
          filter={filter}
          onChangeFilter={handleSetFilter}
        />
      <h2>add a new</h2>
        <PersonForm 
          name={newName}
          number={newNumber}
          onChangeName={handleSetName}
          onChangeNumber={handleSetNumber}
          onAddPerson={addNewPerson}
        />
      <h2>Numbers</h2>
        <Persons 
          filter={filter}
          persons={persons}
        />
    </div>
  )
}

export default App