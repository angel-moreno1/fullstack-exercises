const Persons = props => {
    const { filter, persons, onDeleteSinglePerson } = props
    const filterfn = () => persons.filter(person => person.name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1)
    const filtered = filterfn()
    return (
      !filter 
        ? persons.map(person => <SinglePerson key={person.name} person={person} onDelete={onDeleteSinglePerson} />)
        : filtered.length < 1 
          ? <p>Not results</p>
          : filtered.map(person => <SinglePerson key={person.name} person={person} onDelete={onDeleteSinglePerson} />)
    )
}

const SinglePerson = props => {
  const { person, onDelete } = props

  return (
    <>
      <p key={person.name}>{person.name}: {person.number} <button onClick={() => onDelete(person)}>delete</button></p>
    </>
  )
}

export default Persons