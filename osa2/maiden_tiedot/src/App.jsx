import { useEffect, useState } from 'react'
import countryService from './services/countries.js'
import Results from './components/Results.jsx'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    countryService.getAll(controller.signal)
      .then(data => {
        setCountries(data)
        setLoading(false)
      })
      .catch(() => {
        if (controller.signal.aborted) return
        setLoading(false)
        setError(true)
      })
    return () => controller.abort()
  }, [])

  const changeQuery = (event) => {
    setQuery(event.target.value)
    setSelected(null)
  }

  const matches = countries.filter(country => country.name.common.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <main>
      <h1>Country information</h1>
      <label>find countries <input value={query} onChange={changeQuery} /></label>
      {loading ? <p>Loading countries...</p> : error ? (
        <p role="alert">Country information could not be loaded. Check your connection and reload the page.</p>
      ) : (
        <Results matches={matches} selected={selected} onShow={setSelected} />
      )}
    </main>
  )
}

export default App
