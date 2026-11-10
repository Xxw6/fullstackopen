import Country from './Country.jsx'

const Results = ({ matches, selected, onShow }) => {
  if (selected) return <Country country={selected} />
  if (matches.length > 10) return <p>Too many matches, specify another filter</p>
  if (matches.length === 0) return <p>No matches found</p>
  if (matches.length === 1) return <Country country={matches[0]} />

  return (
    <ul>
      {matches.map(country => (
        <li key={country.cca3}>
          {country.name.common}
          <button type="button" onClick={() => onShow(country)}>show</button>
        </li>
      ))}
    </ul>
  )
}

export default Results
