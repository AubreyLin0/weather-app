import React, { useState } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
//import city names from a json file
import cityNames from '../../data/cities'

export default function Searchbar ({ loaded, setLocation, location }) {
  const [input, setInput] = useState('')
  const [suggestion, setSuggestions] = useState([])

  const handleChange = e => {
    //get the input value
    let value = e.target.value
    // let match results put into an array
    let matches = []

    //only show suggestion from input value >=2
    if (value.length >= 2) {
      // use RegExp to check suggestion letters
      // check if suggestion letters equal to input value from the first letter instead of in any position, and show the filter result
      const regex = new RegExp(`\\b${value}`, 'i')
      //filter the result and only show the top 10
      matches = cityNames.filter(item => regex.test(item)).slice(0, 10)
    }
    setSuggestions(matches)
    setInput(value)
  }

  const selectValue = item => {
    setInput(item)
    setSuggestions('')
  }

  function getData (event) {
    event.preventDefault()
    let city = event.target.input.value
    setLocation(city)
    setInput('')
  }
  return (
    <Form onSubmit={getData} className={loaded ? 'close' : 'fade-in'}>
      <InputGroup className='searchBar'>
        <FormControl
          placeholder={location}
          aria-label={location}
          name='input'
          value={input}
          onChange={handleChange}
          autoComplete='off'
        />
        <Button type='submit'>
          GO<i className='fa-solid fa-magnifying-glass'></i>
        </Button>
      </InputGroup>
      {/* if the length of suggestion array >0, map the suggestion items */}
      {suggestion?.length > 0 ? (
        <div className='suggestionWrapper'>
          {suggestion.map((item, index) => {
            return (
              <div
                className='suggestions'
                key={index}
                //if click the suggestion, set the input value to the clicked item
                onClick={() => selectValue(item)}
              >
                {item}
              </div>
            )
          })}
        </div>
      ) : null}
    </Form>
  )
}
