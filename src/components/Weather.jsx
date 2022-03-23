import React, { useEffect, useState } from 'react'
import WeatherDetails from './WeatherDetails'
import Forecast from './Forecast'
import { Button, FormControl, InputGroup, Form } from 'react-bootstrap'
import { API_key } from '../data/information'

function Weather () {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState()
  const [location, setLocation] = useState('osaka')
  const [position, setPosition] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}&units=metric`
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(result => {
        setWeather(result)
        setPosition({
          lat: result.coord.lat,
          lon: result.coord.lon
        })
        setLoaded(false)
        // console.log(weather)
      })
      .catch(error => console.log(error))
  }, [location])

  function getData (event) {
    event.preventDefault()
    let city = event.target.input.value
    setLocation(city)
    event.target.input.value = ''
  }

  function getForecast () {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.lon}&appid=${API_key}&units=metric`
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(result => {
        setForecast(
          result.daily.map(item => {
            return {
              temp: item.temp.day,
              mainWeather: item.weather[0].description,
              icon: item.weather[0].icon
            }
          })
        )
        setLoaded(true)
        console.log(result)
      })
      .catch(error => console.log(error))
  }

  const date = new Date(weather?.dt * 1000).toString().substring(0, 15)
  const sunrise = new Date(weather?.sys.sunrise * 1000)
    .toString()
    .substring(16, 24)
  const sunset = new Date(weather?.sys.sunset * 1000)
    .toString()
    .substring(16, 24)

  return (
    <section className='currentWeather'>
      <Form onSubmit={getData}>
        <InputGroup className='mb-3 searchBar'>
          <FormControl
            placeholder={location}
            aria-label={location}
            name='input'
          />
          <Button type='submit'>
            GO<i className='fa-solid fa-magnifying-glass'></i>
          </Button>
        </InputGroup>
      </Form>
      <div className='title'>
        <h1>{location}</h1>
        <h5>{date}</h5>
      </div>
      <div className='weatherPost'>
        <div className='sectionLeft'>
          <img
            src={`/images/icons/${weather?.weather[0]?.icon}.png`}
            alt='icon'
            className='icon'
          />
          <div className='content'>
            <h1>{weather?.main?.temp}°C</h1>
            <h3>{weather?.weather[0]?.description}</h3>
            <h5>{weather?.name}</h5>
          </div>
        </div>
        <div className='sectionRight'>
          <WeatherDetails info={`${weather?.main?.temp_max}°C`} title={'Max'} />

          <WeatherDetails info={`${weather?.main?.temp_min}°C`} title={'Min'} />
          <WeatherDetails
            info={`${weather?.main?.humidity}%`}
            title={'Humidity'}
          />
          <WeatherDetails
            info={weather?.weather[0]?.main}
            title={'Weather condition'}
          />
          <WeatherDetails info={sunrise} title={'Sunrise'} />
          <WeatherDetails info={sunset} title={'Sunset'} />
        </div>
      </div>
      <Button onClick={getForecast}>Go</Button>
      <div className='forecast'>
        {loaded === true &&
          forecast.map((item, index) => (
            <Forecast
              temp={item.temp}
              mainWeather={item.mainWeather}
              icon={item.icon}
              key={index}
            />
          ))}
      </div>
    </section>
  )
}

export default Weather
