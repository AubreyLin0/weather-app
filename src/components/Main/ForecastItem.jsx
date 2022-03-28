import React from 'react'

export default function ForecastItem ({
  temp,
  mainWeather,
  icon,
  forecastDate
}) {
  return (
    <div className='forecastItem'>
      <h4>{forecastDate}</h4>
      <img src={`/images/icons/${icon}.png`} alt='icon' className='icon' />
      <h3>{temp}°C</h3>
      <h5>{mainWeather}</h5>
    </div>
  )
}
