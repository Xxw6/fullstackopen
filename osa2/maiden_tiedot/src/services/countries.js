import axios from 'axios'

const getAll = (signal) => axios
  .get('https://studies.cs.helsinki.fi/restcountries/api/all', { signal })
  .then(response => response.data)

export default { getAll }
