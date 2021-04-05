import { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from 'axios'

const SingleCountrie = props => {

    const [weather, setWeather] = useState({})
    const { countrieInformation } = props
    const { name, capital, population, languages, flag } = countrieInformation
    const apiKey = process.env.REACT_APP_API_KEY
  
    useEffect(() => {
      axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${name.trim().toLowerCase()}`)
        .then(({ data }) => setWeather(data))
    }, [])
  
    return (
      <>
      <h2>{name}</h2>
      <p style={{margin: 0}}>capital: {capital}</p>
      <p style={{margin: 0}}>population: {population}</p>
      <h3>languages</h3>
      <ul>
        {
          languages.map((language, i) => (
            <li key={i} style={{margin: 0}}>{language.name}</li>
          ))
        }
      </ul>
      <img style={{ width: "100px" }} src={flag} alt={name}/>
      <h2>Weather in {name}</h2>
      <div>
        {
          Object.keys(weather).length > 1
            ? <Weather information={weather} />
            : <h3>Loading weather information...</h3>
        }
        
      </div>
      </>
    )
}

export default SingleCountrie