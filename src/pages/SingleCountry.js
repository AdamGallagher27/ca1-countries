import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Col, Row, Spinner, Image } from 'react-bootstrap'
import CountryCard from '../components/CountryCard'
import axios from 'axios'

const SingleCountry = () => {

	// url data
	const { name } = useParams()
	const currentURL = useLocation()

	// current country variable
	const [country, setCountry] = useState(null)

	// bordering countries
	const [borderCountryCodes, setBorderCountryCodes] = useState([])
	const [borderCountries, setBorderCountries] = useState([])

	// api links
	const SINGLE_COUNTRY_API = `https://restcountries.com/v3.1/name/${name}`
	const COUNTRY_CODE_API = 'https://restcountries.com/v3.1/alpha/'

	useEffect(() => {
		resetCountry()
		getCountryData()
	}, [currentURL])


	useEffect(() => {
		const promises = getBorderPromises()
		changePromiseToCountry(promises)

	}, [borderCountryCodes])

	const getBorderPromises = () => {
		const promises = borderCountryCodes.map((code) => {
			return axios.get(COUNTRY_CODE_API + code).then(res => res.data[0])
		})

		return promises
	}

	const changePromiseToCountry = (promiseArray) => {
		Promise.all(promiseArray).then(data => {
			setBorderCountries(data)
		})
	}

	const resetCountry = () => {
		setCountry(null)
	}

	const countryHasBorders = (country) => {
		if (country.borders) {
			setBorderCountryCodes(country.borders)
		}
	}

	const getCountryData = () => {
		axios.get(SINGLE_COUNTRY_API)
			.then(response => {
				setCountry(response.data[0])
				countryHasBorders(response.data[0])
			})

			.catch(error => {
				console.error(error)
			})
	}

	if (!country) {
		return (
			<Spinner animation="grow" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		)
	}

	const borderingCountriesCards = borderCountries.map((country, index) => {
		return <CountryCard key={index} country={country} />
	})

	return (

		<>
			<Row>
				<Col>
					<Image src={country.flags.png} />
				</Col>
				<Col>
					<p>{country.name.common}</p>
				</Col>
			</Row>
			<Row className='g-4' md={3} xs={1}>
				{borderingCountriesCards}
			</Row>
		</>
	)
}

export default SingleCountry 