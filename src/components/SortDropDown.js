import React from 'react'

// componets
import { Dropdown, DropdownButton } from 'react-bootstrap'

const SortDropDown = (props) => {

	// send sort value to parent component
	const handleChange = (eventKey) => {
		props.dispatchSortValue(eventKey)
	}

	return (
		<DropdownButton variant='success' title='sort' onSelect={handleChange}>
			<Dropdown.Item eventKey="alphabetical">AlphaBetical</Dropdown.Item>
			<Dropdown.Item eventKey='population'>Population</Dropdown.Item>
			<Dropdown.Item eventKey='area'>Area</Dropdown.Item>
		</DropdownButton>
	)
}

export default SortDropDown