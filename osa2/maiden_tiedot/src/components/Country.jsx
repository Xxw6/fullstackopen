import Weather from './Weather.jsx'

const Country = ({ country }) => (
  <article>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital?.join(', ') || 'Not listed'}</div>
    <div>area {country.area} km²</div>
    <h3>languages:</h3>
    <ul>
      {Object.entries(country.languages || {}).map(([code, language]) => <li key={code}>{language}</li>)}
    </ul>
    {country.flags?.svg && <img className="flag" src={country.flags.svg} alt={country.flags.alt || `Flag of ${country.name.common}`} />}
    <Weather key={country.cca3} country={country} />
  </article>
)

export default Country
