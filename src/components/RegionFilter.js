import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'


const RegionFilter = (props) => {

  const handleChange = (eventKey) => {
    props.dispatchRegionValue(eventKey)
  }

  return (
    <DropdownButton title='regionFilter' onSelect={handleChange}>
      <Dropdown.Item eventKey="none">None</Dropdown.Item>
      <Dropdown.Item eventKey="europe">Europe</Dropdown.Item>
      <Dropdown.Item eventKey='africa'>Africa</Dropdown.Item>
      <Dropdown.Item eventKey='asia'>Asia</Dropdown.Item>
      <Dropdown.Item eventKey='oceania'>Oceania</Dropdown.Item>
      <Dropdown.Item eventKey='americas'>Americas</Dropdown.Item>
    </DropdownButton>
  )
}

export default RegionFilter