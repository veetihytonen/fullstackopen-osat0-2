import { useState } from 'react'

const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({ personsToShow }) => {
  const asComponents = personsToShow.map(person => <Person person={person} key={person.name} />)

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  
  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFilterChange = (event) => {
    const currFilter = event.target.value
    setFilter(currFilter)

    const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(currFilter.toLowerCase()))
    setPersonsToShow(personsFiltered)
  }

  const onPersonSubmit = (event) => {
    event.preventDefault()

    if (! persons.every(person => person.name != newName)) {
      alert(`${newName} is already added to phonebook`)
      
      return 
    }

    const newPerson = { 'name': newName, 'number': newNumber }

    setPersons(persons.concat(newPerson))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={onFilterChange} persons={persons} setPersons={setPersons} />
      <h2>add a new</h2>
      <NewPersonForm onPersonSubmit={onPersonSubmit} newName={newName} onNameChange={onNameChange} newNumber={newNumber} onNumberChange={onNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App
