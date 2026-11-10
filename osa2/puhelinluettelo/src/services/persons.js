import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = (signal) => axios.get(baseUrl, { signal }).then(response => response.data)
const create = (person) => axios.post(baseUrl, person).then(response => response.data)
const update = (id, person) => axios.put(`${baseUrl}/${id}`, person).then(response => response.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }
