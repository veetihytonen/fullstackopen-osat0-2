import { useState, useEffect } from 'react'
import countryService from './services/countries'

const SearchField = ({ filter, onFilterChange }) => (
  <a>find countries <input value={filter} onChange={onFilterChange}/> </a>
)

const SingleCountry = ({ country }) => {
  const languages = Object.entries(country.languages)
  const asListItems = languages.map(([forShort, fullName]) => <li key={forShort}>{fullName}</li>)
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital}
        <br/>
        area {country.area}
      </p>
      <h3>languages:</h3>
      <ul>
        {asListItems}
      </ul>
      <img src={country.flags.svg} style={{width: 150, height: 'auto'}}/>
    </div>
  )
}

const DisplayCountries = ({ countries, filter, onShowCountry }) => {
  if (countries.length === 0 || !filter) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase()) || 
    country.name.official.toLowerCase().includes(filter.toLowerCase())
  )

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (filteredCountries.length > 1) {
    const countryNames = filteredCountries.map(country => 
      <li key={country.fifa}> 
        {country.name.common} 
        <button onClick={() => onShowCountry(country.name.common)}> show </button> 
      </li>
    )

    return (
      <ul style={{listStyleType: 'none', paddingLeft: 0}}>
        {countryNames}
      </ul>
    )
  }

  if (filteredCountries.length === 1) {
    return <SingleCountry country={filteredCountries[0]} />
  } 

  return (
    <p>
      No mathces
    </p>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter ] = useState('')

  
  useEffect(() => {
    countryService.fetchAll()
      .then((countryData) => {
        setCountries(countryData)
      })
  }, [])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onShowCountry = (name) => {
    setFilter(name)
  }

  return (
    <>
      <SearchField filter={filter} onFilterChange={onFilterChange} />
      <DisplayCountries countries={countries} filter={filter} onShowCountry={onShowCountry} /> 
    </>
  )
}

export default App
