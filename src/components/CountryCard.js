import React from 'react'

// components
import { Button, Card, Col } from 'react-bootstrap'

// hooks
import { Link, useNavigate } from 'react-router-dom'

const CountryCard = (props) => {

	const country = props.country
	const navigate = useNavigate()

	const openCountry = () => {
		navigate(`/country/${country.name.common}`)
	}

	return (
		<Col className='mb-3'>
		<Card className='pb-2 px-3 h-100'>
			<Card.Img className='mt-3' src={country.flags.png} />
			<Card.Body>
				<Card.Title>
					{country.name.common}
				</Card.Title>
				<Card.Text>Population : {country.population}</Card.Text>
				<Card.Text>Region : {country.region}</Card.Text>
				<Card.Text>Capital : {country.capital}</Card.Text>
			</Card.Body>
			<Button className='btn-success' onClick={openCountry}>Learn More</Button>
		</Card>
		</Col>
	)
}

export default CountryCard