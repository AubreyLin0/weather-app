export default function SectionLeft ({ weather }) {
  return (
    <div className='sectionLeft'>
      <img
        src={`/images/icons/${weather?.weather[0]?.icon}.png`}
        alt='icon'
        className='icon'
      />
      <div className='content'>
        <h1>{weather?.main?.temp}°C</h1>
        <h3>{weather?.weather[0]?.description}</h3>
      </div>
    </div>
  )
}
