import { useState } from 'react'

const Person = ({ person }) => (
  <p>{person.name}</p>
)

const Persons = ({ persons }) => {
  const asComponents = persons.map(person => <Person person={person} key={person.name} />)

  return (
    <>
      {asComponents}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onPersonSubmit = (event) => {
    event.preventDefault()

    if (! persons.every(person => person.name != newName)) {
      alert(`${newName} is already added to phonebook`)
      
      return 
    }

    const newPerson = { name: newName }

    setPersons(persons.concat(newPerson))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onPersonSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App
