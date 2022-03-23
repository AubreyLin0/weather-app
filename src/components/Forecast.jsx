import React from 'react'

export default function Forecast ({ temp, mainWeather, icon }) {
  return (
    <div className='forecastItem'>
      <img src={`/images/icons/${icon}.png`} alt='icon' className='icon' />
      <h3>{temp}</h3>
      <h5>{mainWeather}</h5>
    </div>
  )
}
