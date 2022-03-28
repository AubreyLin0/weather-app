import { CloseButton } from 'react-bootstrap'
import ForecastItem from './ForecastItem'

export default function Forecast ({ loaded, setLoaded, forecast }) {
  return (
    <div className={loaded ? 'forecast slide-left' : 'forecast'}>
      <CloseButton
        className={!loaded ? 'close' : null}
        onClick={() => {
          setLoaded(false)
        }}
      />
      {/* if loaded is true map the forecast for next 8 days */}
      {loaded &&
        forecast.map((item, index) => (
          <ForecastItem
            temp={item.temp}
            mainWeather={item.mainWeather}
            icon={item.icon}
            // it's UTC time, so need to transfer to readable date and only left the date and days of the week
            forecastDate={new Date(item.date * 1000)
              .toString()
              .substring(0, 10)}
            key={index}
          />
        ))}
    </div>
  )
}
