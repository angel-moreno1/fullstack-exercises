const Weather = props => {
    const { information } = props 
    return (
      <>
        <h4>temperature: {information.current.temperature} Celcius</h4>
        <img src={information.current.weather_icons} alt={information.location.country}/>
        <h4>wind: {information.current.wind_degree} {information.current.wind_dir}</h4>
      </>
    )
}

export default Weather