import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

const SortDropDown = (props) => {

    const handleChange = (eventKey) => {

        props.dispatchSortValue(eventKey)
        
    } 

    return (
            <DropdownButton title='sort' onSelect={handleChange}>
                <Dropdown.Item eventKey="alphabetical">AlphaBetical</Dropdown.Item>
                <Dropdown.Item eventKey='population'>Population</Dropdown.Item>
                <Dropdown.Item eventKey='area'>Area</Dropdown.Item>
            </DropdownButton>
    )
}

export default SortDropDown