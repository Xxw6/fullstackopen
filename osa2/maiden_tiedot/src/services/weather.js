import axios from 'axios'

const getCurrent = (latitude, longitude, signal) => axios
  .get('https://api.open-meteo.com/v1/forecast', {
    signal,
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,wind_speed_10m,weather_code',
      wind_speed_unit: 'ms',
    },
  })
  .then(response => response.data.current)

export default { getCurrent }
