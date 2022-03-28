import React, { useEffect, useState } from 'react'
import SectionRight from './SectionRight'
import SectionLeft from './SectionLeft'
import ForecastBtn from './ForecastBtn'
import Forecast from './Forecast'
import Searchbar from './Searchbar'
import Title from './Title'
import { API_key } from '../../data/information'
import ErrorAlert from '../ErrorAlert'

export default function Weather () {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  //set default location to Osaka
  const [location, setLocation] = useState('osaka')
  //set longitude,latitude to get forecast
  const [position, setPosition] = useState(null)
  //if get forecast is clicked, current weather section will be hidden
  const [loaded, setLoaded] = useState(false)
  //if API get error code, the window will pop up an alert
  const [alert, setAlert] = useState(false)

  //fetch API to get current weather
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}&units=metric`
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          //if API get an error code, show the alert.
          setAlert(true)
        }
      })
      .then(result => {
        setWeather(result)
        //get longitude and latitude for forecast API
        setPosition({
          lat: result.coord.lat,
          lon: result.coord.lon
        })
        setLoaded(false)
        // console.log(weather)
      })
      .catch(error => {
        console.log(error)
      })
  }, [location])

  //fetch API to get forecast according to the longitude and latitude from current weather data.
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
        //only return what I need in an object
        setForecast(
          result.daily.map(item => {
            return {
              temp: item.temp.day,
              mainWeather: item.weather[0].description,
              icon: item.weather[0].icon,
              date: item.dt
            }
          })
        )
        //set loaded to true to show forecast area
        setLoaded(true)
        // console.log(forecast)
      })
      .catch(error => console.log(error))
  }

  return (
    // use setLoaded to hide some section
    <main className='currentWeather'>
      {alert && <ErrorAlert alert={alert} setAlert={setAlert} />}
      <Searchbar
        loaded={loaded}
        setLocation={setLocation}
        location={location}
      />
      <Title loaded={loaded} location={location} weather={weather} />
      <div className={loaded ? 'weatherWrap close' : 'weatherWrap fade-in'}>
        <SectionLeft weather={weather} />
        <SectionRight weather={weather} />
      </div>
      <Forecast
        loaded={loaded}
        setLoaded={() => {
          setLoaded(false)
        }}
        forecast={forecast}
      />
      <ForecastBtn loaded={loaded} getForecast={getForecast} />
    </main>
  )
}
