const Filter = props => {
    const { filter, onChangeFilter } = props
    return (
      <p>Filter shown with: <input value={filter} onChange={onChangeFilter}/> </p>
    )
}

export default Filter