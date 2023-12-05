import { useState, useEffect } from 'react'
import countryService from './services/countries'

const SearchField = ({ filter, onFilterChange }) => (
  <a>find countries <input value={filter} onChange={onFilterChange}/> </a>
)

const Weather = ({ country, weather }) => {
  console.log(weather)
  if (weather === null) {
    return null
  }

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.current.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} />
      <p>wind {weather.current.wind_speed} m/s</p>
    </div>
  )
}

const SingleCountry = ({ country, weather }) => {
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
      <Weather weather={weather} country={country} /> 
   </div>
  )
}

const DisplayCountries = ({ countries, onShowCountry, weather}) => {
  if (countries.length === 0 || countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countries.length > 1) {
    const countryNames = countries.map(country => 
      <li key={country.tld}> 
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

  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} weather={weather}/>
  } 

  return (
    <p>
      No mathces
    </p>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  useEffect(() => {
    countryService.fetchCountries()
      .then((countryData) => {
        setCountries(countryData)
      })
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter(country => 
        country.name.common.toLowerCase().includes(filter.toLowerCase()) || 
        country.name.official.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }, [filter])

  useEffect(() => {
    if (filteredCountries.length !== 1) {
      return
    }

    const [lat, lon] = filteredCountries[0].latlng

    if (weather === null || weather.lat !== lat || weather.lon !== lon) {
      const request = countryService.fetchWeather(lat, lon)
      request.then(newWeather => setWeather(newWeather))
    }
  }, [filteredCountries])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onShowCountry = (name) => {
    setFilter(name)
  }

  return (
    <>
      <SearchField filter={filter} onFilterChange={onFilterChange} />
      <DisplayCountries countries={filteredCountries} filter={filter} onShowCountry={onShowCountry} weather={weather} /> 
    </>
  )
}

export default App
