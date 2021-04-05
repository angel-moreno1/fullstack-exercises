import { useState, useEffect } from 'react'
import CountriName from './components/CountriName'
import SingleCountrie from './components/SingleCountrie'
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

  const changeSingleCountrie = countrie => void setSingleCountrie(countrie)

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


export default App;
