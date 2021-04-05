const Persons = props => {
    const { filter, persons } = props
    const filterfn = () => persons.filter(person => person.name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1)
    const filtered = filterfn()
    return (
      !filter 
        ? persons.map(person => <p key={person.name}>{person.name}: {person.number}</p>)
        : filtered.length < 1 
          ? <p>Not results</p>
          : filtered.map(person => <p key={person.name}>{person.name}: {person.number}</p>)
    )
}

export default Persons