import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Col, Row, Image } from 'react-bootstrap'
import CountryCard from '../components/CountryCard'
import CapitalCityWeather from '../components/CapitalCityWeather'
import Loading from '../components/Loading'


// utilities
import { getCountryData, getCapitalCityWeather, getBorderPromises } from '../utilities/API'

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

	// load country data when url changes
	useEffect(() => {
		loadCurrentCountry()
	}, [currentURL])

	// load bordering countries
	useEffect(() => {
		const promises = getBorderPromises(borderCountryCodes)
		changePromiseToCountry(promises)
	}, [borderCountryCodes])


	// get weather for capital city
	useEffect(() => {
		loadCurrentWeather()
	}, [country])


	// helper function to load the selected country
	const loadCurrentCountry = async () => {
		try {
			const response = await getCountryData(name)
			setCountry(response)

			// if the country has borders add borders to the country codes array
			if(countryHasBorders(response)) {
				setBorderCountryCodes(response.borders)
			}
		}
		catch (error) {
			console.error(error)
		}
	}

	// helper function to load current weather in capital city
	const loadCurrentWeather = async () => {
		try {
			const response = await getCapitalCityWeather(country.capital[0])
			setCapitalWeather(response)
		}
		catch (error) {
			console.error(error)
		}
	}

	// convert the border promises to country objects
	const changePromiseToCountry = (promiseArray) => {
		Promise.all(promiseArray).then(data => {
			setBorderCountries(data)
		})
	}


	// check if country has borders
	const countryHasBorders = (countryObject) => {
		if (countryObject.borders) {
			return true
		}
		return false
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
					<Image className=' w-100' src={country.flags.png} fluid />
				</Col>
				<Col>
					{loadWeatherComponent}
				</Col>
			</Row>
			<Row>
				<h2 className='mt-5 mb-4'>Facts About {name}</h2>
				<Col>
					<p>Capital : {country.capital ? country.capital[0] : ''}</p>
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