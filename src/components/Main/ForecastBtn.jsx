import React from 'react'
import { Button } from 'react-bootstrap'

export default function ForecastBtn ({ loaded, getForecast }) {
  return (
    <div
      className={loaded === true ? 'close getForecast fade-in' : 'getForecast'}
    >
      <Button onClick={getForecast}>
        Forecast<i className='fa-solid fa-arrow-pointer'></i>
      </Button>
    </div>
  )
}
