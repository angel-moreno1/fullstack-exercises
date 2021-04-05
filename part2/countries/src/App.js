import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [countrie, setSingleCountrie] = useState({})

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => void setCountries(data))
  }, [])

  const handleChangeInput = ({ target: {value} }) => {
    setSingleCountrie({})
    setInputValue(value)
  }

  const changeSingleCountrie = (countrie) => {
    setSingleCountrie(countrie)
  }

  const selectedCountries = inputValue && countries.filter((countrie) => (
    countrie.name.trim().toLowerCase().indexOf(inputValue.trim().toLowerCase()) !== -1
  ))

  return (
    <div style={{margin: "2rem"}}>
      <p>find countries: <input value={inputValue} onChange={handleChangeInput} disabled={countries.length > 1 ? false : true} /></p>
      {
        Object.keys(countrie).length !== 0
        ? <SingleCountrie  countrieInformation={countrie} />
        : inputValue && (
          selectedCountries.length > 10 
            ? <h4>Too many matches. please be more specific</h4>
            : selectedCountries.length === 1 
              ? <SingleCountrie  countrieInformation={selectedCountries[0]} />
              : selectedCountries.map(countrie => <CountriName onChangeSingleCountrie={changeSingleCountrie} countrie={countrie} key={countrie.name} />)
        )
      }
    </div>
  );
}

const CountriName = props => {
  const { countrie, onChangeSingleCountrie } = props
  
  return (
    <p>{countrie.name} <button onClick={() => onChangeSingleCountrie(countrie)}>show</button></p>
  )
}

const SingleCountrie = props => {
  const { countrieInformation } = props
  const { name, capital, population, languages, flag } = countrieInformation

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
    </>
  )
}

export default App;
