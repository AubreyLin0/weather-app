import React from 'react'

export default function WeatherDetails (props) {
  return (
    <ul className='weatherDetails'>
      <li>{props.info}</li>
      <li>{props.title}</li>
    </ul>
  )
}
