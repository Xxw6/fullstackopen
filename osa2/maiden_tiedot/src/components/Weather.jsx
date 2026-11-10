import { useEffect, useState } from 'react'
import weatherService from '../services/weather.js'

const weatherDescription = (code) => {
  if (code === 0) return { icon: '☀️', text: 'Clear sky' }
  if (code === 1 || code === 2) return { icon: '🌤️', text: 'Partly clear' }
  if (code === 3) return { icon: '☁️', text: 'Cloudy' }
  if (code === 45 || code === 48) return { icon: '🌫️', text: 'Fog' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: '🌨️', text: 'Snow' }
  if (code >= 95) return { icon: '⛈️', text: 'Thunderstorm' }
  if (code >= 51) return { icon: '🌧️', text: 'Rain or drizzle' }
  return { icon: '🌡️', text: 'Current conditions' }
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(false)
  const capital = country.capital?.[0]
  const latitude = country.capitalInfo?.latlng?.[0]
  const longitude = country.capitalInfo?.latlng?.[1]

  useEffect(() => {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return
    const controller = new AbortController()
    weatherService.getCurrent(latitude, longitude, controller.signal)
      .then(setWeather)
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [latitude, longitude])

  if (!capital) return <p>No capital city is listed for this country.</p>
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return <p>Weather is unavailable because the capital coordinates are missing.</p>
  }

  const description = weather ? weatherDescription(weather.weather_code) : null

  return (
    <section>
      <h3>Weather in {capital}</h3>
      {error ? <p role="alert">Weather could not be loaded. Try again later.</p> : !weather ? (
        <p>Loading weather...</p>
      ) : (
        <>
          <p>temperature {weather.temperature_2m} Celsius</p>
          <div className="weather-icon" role="img" aria-label={description.text}>{description.icon}</div>
          <p>{description.text}</p>
          <p>wind {weather.wind_speed_10m} m/s</p>
          <small>Weather data: <a href="https://open-meteo.com/">Open-Meteo</a></small>
        </>
      )}
    </section>
  )
}

export default Weather
