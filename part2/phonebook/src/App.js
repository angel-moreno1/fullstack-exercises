import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { getAll, createOne, deleteOne, updateOne } from './services/persons'
import './App.css'


const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ successfull, setSucesssfull ] = useState('')
  const [ unsuccessful, setUnsuccessful ] = useState('')

  useEffect(() => void getAll().then(data => void setPersons(data)), [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSucesssfull('')
      setUnsuccessful('')
    }, 3000);
    return () => void clearTimeout(timeout)
  }, [successfull, unsuccessful])

  const updatePersons = () => {
    const updatePerson = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
    if(updatePerson) {
      const personToUpdate = persons.find(person => person.name === newName)
      const updatedPerson = {...personToUpdate, number: newNumber}
      const newPersons = persons.map(person => 
        person.name === personToUpdate.name 
          ? person = updatedPerson
          : person
      )
      setNewName('')
      setNewNumber('')
      setPersons(newPersons)
      updateOne(personToUpdate.id, updatedPerson)
        .catch(err => {
          setUnsuccessful(`information of ${newName} has already been removed from server`)
          const newPersons = persons.filter(person => person.name !== newName)
          setPersons(newPersons)
        })
    }
  }

  const addNewPerson = event => {
    event.preventDefault()
    if(newName === "" || !newNumber) return;
    const alreadyIn = persons.some(person => 
      person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )
    if(alreadyIn){  
      updatePersons()
      return
    }
    const newPerson = {name: newName, number: newNumber, id: Math.random() * 1000}
    setPersons(prev => prev.concat(newPerson))
    setNewName('')
    setNewNumber('')
    createOne(newPerson)
      .catch(err => alert(err))
      setSucesssfull(`${newName} Added  successfully`)
  }

  const DeleteSinglePerson = person => {
    const {id, name} = person
    const confirmDeletePerson = window.confirm(`delete ${name}?`)
    if(confirmDeletePerson){
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
      deleteOne(id)
        .catch(err => alert(err))
      setSucesssfull(`${name} delete successfully`)
    }
  }

  const handleSetFilter = ({ target }) => void setFilter(target.value)
  const handleSetName = ({ target }) => void setNewName(target.value)
  const handleSetNumber = ({ target }) => void setNewNumber(target.value)

  return (
    <div style={{ margin: "2rem" }}>
      {
        successfull && <Notification message={successfull} type={'done'}/>
      }
      {
        unsuccessful && <Notification  message={unsuccessful} />
      }
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
        {
          persons.length >= 1
            ? <Persons 
                filter={filter}
                persons={persons}
                onDeleteSinglePerson={DeleteSinglePerson}
              />
            : <p>No contacts to show</p>
        }
    </div>
  )
}

const Notification = props => {
  const { message, type } = props
  return <h3 className={type === 'done' ? 'done' : 'error' }>{message}</h3>
}

export default App