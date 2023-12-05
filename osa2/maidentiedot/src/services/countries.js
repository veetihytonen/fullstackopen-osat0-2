import axios from 'axios'
const APIKey = import.meta.env.VITE_WEATHER_API_KEY

const countriesBaseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'

const fetchCountries = () => {
  const request = axios.get(`${countriesBaseURL}/all`)
  return request.then(response => response.data)
}

const fetchWeather = (lat, lon) => {
  const request = axios.get(`${weatherBaseUrl}lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${APIKey}`)
  return request.then(response => response.data)
}

export default {
  fetchCountries,
  fetchWeather
}