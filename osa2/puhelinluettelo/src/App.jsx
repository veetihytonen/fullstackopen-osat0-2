import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => (
  <>
    <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button> </p>
  </>
)

const Persons = ({ persons, filter, deletePerson }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const asComponents = personsToShow.map(person => <Person person={person} key={person.name} deletePerson={deletePerson} />)

  return (
    <>
      {asComponents}
    </>
  )
}

const NewPersonForm = ({ onPersonSubmit, newName, onNameChange, newNumber, onNumberChange }) => (
  <form onSubmit={onPersonSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Filter = ({ filter, onFilterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={onFilterChange}/>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (personId) => {
    const name = persons.find(person => person.id === personId).name
    if (! window.confirm(`Delete ${name}?`)) {
      return
    }

    personService
      .remove(personId)
      .then(() => {
        setPersons(persons.filter(person => person.id !== personId))
      })
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onPersonSubmit = (event) => {
    event.preventDefault()

    if (! persons.every(person => person.name != newName)) {
      alert(`${newName} is already added to phonebook`)
      
      return 
    }

    const newPerson = { 'name': newName, 'number': newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        clearForm()
      })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={onFilterChange} persons={persons} setPersons={setPersons} />
      <h2>add a new</h2>
      <NewPersonForm onPersonSubmit={onPersonSubmit} newName={newName} onNameChange={onNameChange} newNumber={newNumber} onNumberChange={onNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )

}

export default App
