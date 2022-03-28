import WeatherDetails from './WeatherDetails'

export default function SectionRight ({ weather }) {
  const sunrise = new Date(weather?.sys.sunrise * 1000)
    .toString()
    .substring(16, 24)
  const sunset = new Date(weather?.sys.sunset * 1000)
    .toString()
    .substring(16, 24)
  return (
    <div className='sectionRight'>
      <WeatherDetails info={`${weather?.main?.temp_max}°C`} title={'Max'} />

      <WeatherDetails info={`${weather?.main?.temp_min}°C`} title={'Min'} />
      <WeatherDetails info={`${weather?.main?.humidity}%`} title={'Humidity'} />
      <WeatherDetails info={weather?.weather[0]?.main} title={'Weather'} />
      <WeatherDetails info={sunrise} title={'Sunrise'} />
      <WeatherDetails info={sunset} title={'Sunset'} />
    </div>
  )
}
