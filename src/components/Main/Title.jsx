export default function Title ({ loaded, location, weather }) {
  const date = new Date(weather?.dt * 1000).toString().substring(0, 15)
  return (
    <div className='title'>
      <h1 className={loaded ? null : 'fade-in'}>{location}</h1>
      <h5 className={loaded ? 'close' : 'fade-in'}>{date}</h5>
    </div>
  )
}
