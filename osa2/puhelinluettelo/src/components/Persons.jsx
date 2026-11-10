const Person = ({ person, onDelete, disabled }) => (
  <li>
    {person.name} {person.number}
    <button type="button" onClick={() => onDelete(person)} disabled={disabled}>delete</button>
  </li>
)

const Persons = ({ persons, onDelete, disabled }) => (
  <ul>
    {persons.map(person => (
      <Person key={person.id} person={person} onDelete={onDelete} disabled={disabled} />
    ))}
  </ul>
)

export default Persons
