import { useEffect, useState } from 'react'
import personService from './services/persons.js'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    personService.getAll(controller.signal)
      .then(data => {
        setPersons(data)
        setLoading(false)
      })
      .catch(() => {
        if (controller.signal.aborted) return
        setLoading(false)
        setLoadError(true)
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 5000)
    return () => clearTimeout(timer)
  }, [notification])

  const notify = (message, type = 'success') => setNotification({ message, type })

  const handleSaveError = (error, person) => {
    if (person && error.response?.status === 404) {
      setPersons(current => current.filter(item => item.id !== person.id))
      notify(`Information of ${person.name} has already been removed from server`, 'error')
    } else {
      notify('Saving failed. Check that the phonebook server is running.', 'error')
    }
  }

  const addPerson = async (event) => {
    event.preventDefault()
    if (busy || loading || loadError) return
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) {
      notify('Name and number must not be empty.', 'error')
      return
    }

    const existing = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    if (existing && !window.confirm(`${existing.name} is already added to phonebook. Replace the old number with a new one?`)) {
      return
    }

    setBusy(true)
    try {
      if (existing) {
        const updated = await personService.update(existing.id, { ...existing, number })
        setPersons(current => current.map(person => person.id === updated.id ? updated : person))
        notify(`Updated ${updated.name}`)
      } else {
        const added = await personService.create({ name, number })
        setPersons(current => current.concat(added))
        notify(`Added ${added.name}`)
      }
      setNewName('')
      setNewNumber('')
    } catch (error) {
      handleSaveError(error, existing)
    } finally {
      setBusy(false)
    }
  }

  const deletePerson = async (person) => {
    if (busy || !window.confirm(`Delete ${person.name}?`)) return
    setBusy(true)
    try {
      await personService.remove(person.id)
      setPersons(current => current.filter(item => item.id !== person.id))
      notify(`Deleted ${person.name}`)
    } catch (error) {
      if (error.response?.status === 404) {
        setPersons(current => current.filter(item => item.id !== person.id))
        notify(`Information of ${person.name} has already been removed from server`, 'error')
      } else {
        notify(`Could not delete ${person.name}. Check the server connection.`, 'error')
      }
    } finally {
      setBusy(false)
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <main>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      {loadError && <p role="alert">Could not load contacts. Start the server with npm.cmd run server, then reload this page.</p>}
      <Filter value={filter} onChange={event => setFilter(event.target.value)} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={event => setNewName(event.target.value)}
        onNumberChange={event => setNewNumber(event.target.value)}
        onSubmit={addPerson}
        disabled={busy || loading || loadError}
      />
      <h2>Numbers</h2>
      {loading && <p>Loading contacts...</p>}
      <Persons persons={personsToShow} onDelete={deletePerson} disabled={busy} />
    </main>
  )
}

export default App
