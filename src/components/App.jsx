// import './App.css'
import React from 'react'
import Nav from './navbar'
import Weather from './Main/Weather'
import Footer from './Footer'

function App () {
  return [<Nav key={1} />, <Weather key={2} />, <Footer key={3} />]
}

export default App
