import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Col, Row, Spinner, Image } from 'react-bootstrap'


const SingleCountry = () => {

	const { name } = useParams()
	const SINGLE_COUNTRY_API = `https://restcountries.com/v3.1/name/${name}?fullText=true`
	const [country, setCountry] = useState(null)

	useEffect(() => {
		axios.get(SINGLE_COUNTRY_API)

			.then(response => {
				setCountry(response.data[0])
			})

			.catch(error => {
				console.error(error)
			})
	}, [])

	if (!country) {
		return (
			<Spinner animation="grow" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		)
	}

	return (

		<Row>
			<Col>
				<Image src={country.flags.png} />
			</Col>
			<Col>
				<p>{country.name.common}</p>
			</Col>
		</Row>
	)
}

export default SingleCountry 