
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row } from 'react-bootstrap'


// components
import CountryCard from '../components/CountryCard'
import SearchBar from '../components/SearchBar'

const Home = () => {

	const [countriesArray, setCountriesArray] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const ALL_COUNTRIES_API = 'https://restcountries.com/v3.1/all'
	const SEARCH_COUNTRIES_API = `https://restcountries.com/v3.1/name/`


	useEffect(() => {
		getEveryCountry()
	}, [])

	useEffect(() => {
		searchCountry()
	},[searchValue])


	const searchCountry = () => {
		axios.get(SEARCH_COUNTRIES_API + searchValue)
			.then(response => {
				setCountriesArray(response.data)
			})

			.catch(error => {
				console.error(error)
			})
	}

	const getEveryCountry = () => {
		axios.get(ALL_COUNTRIES_API, {
			fullText: false
		})
			.then(response => {
				setCountriesArray(response.data)
			})

			.catch(error => {
				console.error(error)
			})
	}

	const handleSearchClick = (searchTerm) => {
		setSearchValue(searchTerm)
	}

	let countriesCards = countriesArray.map((country, index) => {
		return <CountryCard key={index} country={country} />
	})

	return (
		<>
			<div>Home</div>
			<SearchBar handleSearchClick={handleSearchClick} />
			<Row className='g-4' md={3} xs={1}>
				{countriesCards}
			</Row>

		</>
	)
}

export default Home