
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row } from 'react-bootstrap'


// components
import CountryCard from '../components/CountryCard'

const Home = () => {

	const [countriesArray, setCountriesArray] = useState([])
	const ALL_COUNTRIES_API = 'https://restcountries.com/v3.1/all'

	useEffect(() => {
		axios.get(ALL_COUNTRIES_API)

			.then(response => {
				setCountriesArray(response.data)
			})

			.catch(error => {
				console.error(error)
			})
	}, [])

	let countriesCards = countriesArray.map((country, index) => {
		return <CountryCard key={index} country={country} />
	})

	return (
		<>
			<div>Home</div>
			<Row className='g-4' md={3} xs={1}>
				{countriesCards}
			</Row>

		</>
	)
}

export default Home