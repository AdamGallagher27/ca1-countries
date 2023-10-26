import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CountryCard = (props) => {

	const country = props.country

	return (
			<Card>
				<Card.Img src={country.flags.png} />
				<Card.Body>
					<Card.Title>
						<Link to={`/country/${country.name.common}`}>{country.name.common}</Link>
					</Card.Title>
					<p>Population : {country.population}</p>
					<p>Region : {country.region}</p>
					<p>Capital : {country.capital}</p>
				</Card.Body>
			</Card>
	)
}

export default CountryCard