const PersonForm = props => {
    const { name, number, onChangeName, onChangeNumber, onAddPerson } = props 
    return (
      <form>
          <div>
            name: <input value={name} onChange={onChangeName}/>
            <br />
            number: <input value={number} onChange={onChangeNumber} />
          </div>
          <button type="submit" onClick={onAddPerson}>add</button>
      </form>
    )
}

export default PersonForm