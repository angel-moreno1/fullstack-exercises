const CountriName = props => {
    const { countrie, onChangeSingleCountrie } = props
    
    return (
      <p>{countrie.name} <button onClick={() => onChangeSingleCountrie(countrie)}>show</button></p>
    )
}

export default CountriName