import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Col, Row, Spinner, Image } from 'react-bootstrap'
import CountryCard from '../components/CountryCard'
import axios from 'axios'
import CapitalCityWeather from '../components/CapitalCityWeather'
import Loading from '../components/Loading'

const SingleCountry = () => {

	// url data
	const { name } = useParams()
	const currentURL = useLocation()

	// current country variable
	const [country, setCountry] = useState(null)

	// bordering countries
	const [borderCountryCodes, setBorderCountryCodes] = useState([])
	const [borderCountries, setBorderCountries] = useState([])

	// weather in capital city
	const [capitalWeather, setCapitalWeather] = useState('')

	// api links
	const SINGLE_COUNTRY_API = `https://restcountries.com/v3.1/name/${name}`
	const COUNTRY_CODE_API = 'https://restcountries.com/v3.1/alpha/'
	const WEATHER_API_KEY = 'sWBUyM53rPjjrXgcAxVPIQ==oFIz6GrLF5cYVi1H'
	const WEATHER_API_LINK = `https://api.api-ninjas.com/v1/weather?city=${country?.capital[0]}`

	// load country data when url changes
	useEffect(() => {
		getCountryData()
	}, [currentURL])


	// load bordering countries
	useEffect(() => {
		const promises = getBorderPromises()
		changePromiseToCountry(promises)
	}, [borderCountryCodes])


	// get weather for capital city
	useEffect(() => {
		getCapitalCityWeather()
	}, [country])


	const getBorderPromises = () => {

		// make an api request for every bordering country and return them as an array of promises 
		const promises = borderCountryCodes.map((code) => {
			return axios.get(COUNTRY_CODE_API + code).then(res => res.data[0])
		})

		return promises
	}

	// convert the border promises to country objects
	const changePromiseToCountry = (promiseArray) => {
		Promise.all(promiseArray).then(data => {
			setBorderCountries(data)
		})
	}

	// check if country has borders
	const countryHasBorders = (country) => {
		if (country.borders) {
			return true
		}

		return false
	}

	// get data about selected country
	const getCountryData = () => {
		axios.get(SINGLE_COUNTRY_API)
			.then(response => {
				setCountry(response.data.find((country) => {
					return country.name.common === name
				}))
				// console.log(response)


				// if the country has borders assign the border codes
				if (countryHasBorders(response.data[0])) {
					setBorderCountryCodes(response.data[0].borders)
				}
			})

			.catch(error => {
				console.error(error)
			})
	}

	// return weather about the capital city
	const getCapitalCityWeather = () => {
		axios.get(WEATHER_API_LINK, {
			headers: { 'X-Api-Key': WEATHER_API_KEY }
		})
			.then(response => {
				setCapitalWeather(response.data)
			})
			.catch(error => {
				console.error(error)
			})

	}

	// while country is loading return spinner component
	if (!country) {
		return (
			<Loading />
		)
	}

	// store all the bordering countries in an array of country cards
	const borderingCountriesCards = borderCountries.map((country, index) => {
		return <CountryCard key={index} country={country} />
	})

	const loadWeatherComponent = capitalWeather ? <CapitalCityWeather weather={capitalWeather} city={country.capital} /> : <Loading />
	const titleBorderCountries = borderCountries.length > 0 ? <h2 className='mt-5 mb-4'>Bordering Countries</h2> : ''

	return (

		<>
			<h1>{country.name.common}</h1>
			<Row>
				<Col md={9} >
					<Image className=' w-100' src={country.flags.png}  fluid/>
				</Col>
				<Col>
					{loadWeatherComponent}
				</Col>
			</Row>
			<Row>
			<h2 className='mt-5 mb-4'>Facts About {name}</h2>
				<Col>
					<p>Capital : {country.capital[0]}</p>
					<p>Area : {country.area}</p>
					<p>Region : {country.region}</p>
					<p>Population : {country.population}</p>
					<p>{country.name.common} is {country.unMember ? '' : 'not'} a member of the united nations</p>
					<p>{country.name.common} is {country.unMember ? '' : 'not'} an independent state</p>
				</Col>
			</Row>

			{titleBorderCountries}
			<Row className='g-4' md={3} xs={1}>
				{borderingCountriesCards}
			</Row>
		</>
	)
}

export default SingleCountry 