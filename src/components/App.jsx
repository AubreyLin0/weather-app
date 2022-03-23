// import './App.css'
import React from 'react'
import Nav from './navbar'
import Weather from './Weather'
// import Forecast from './Forecast'
import Footer from './Footer'

function App () {
  return [
    <Nav key={1} />,
    // <Searchbar key={2} />,
    <Weather key={2} />,
    // <Forecast key={3} />,
    <Footer key={3} />
  ]
}

export default App
