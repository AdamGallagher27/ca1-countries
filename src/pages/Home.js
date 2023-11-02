
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Button } from 'react-bootstrap'


// components
import CountryCard from '../components/CountryCard'
import SearchBar from '../components/SearchBar'


const Home = () => {

	const [countriesArray, setCountriesArray] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [paginationLimit, setPaginationLimit] = useState(15)
	const ALL_COUNTRIES_API = 'https://restcountries.com/v3.1/all'
	
	useEffect(() => {
		getEveryCountry()
	}, [])


	const getEveryCountry = () => {
		axios.get(ALL_COUNTRIES_API, {
			fullText: false
		})
			.then(response => {
				setCountriesArray(response.data)
				setFilteredCountries(response.data)
			})

			.catch(error => {
				console.error(error)
			})
	}

	const handleSearch = (searchTerm) => {

		setSearchValue(searchTerm)
		resetPagination()

		const filter = countriesArray.filter((country) => {
			return country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
		})

		setFilteredCountries(filter)
	}


	const resetPagination = () => {
		setPaginationLimit(15)
	}

	const loadMoreCountries = () => {
		setPaginationLimit(paginationLimit + 9)
	}


	let countriesCards = filteredCountries.map((country, index) => {
		if(index < paginationLimit) {
			return <CountryCard key={index} country={country} />
		}
	})

	return (
		<>
			<SearchBar handleSearch={handleSearch} />
			<Row className='g-4' md={3} xs={1}>
				{/* MAKE ME INTO SEARCH ERROR COMPONENT */}
				{countriesCards.length > 0 ? countriesCards : `sorry we couldnt find anything for ${searchValue}`}
			</Row>
				{/* MAKE PAGINATE BUTTON COMPONENT */}
				<Button onClick={loadMoreCountries}>Pagination</Button>

		</>
	)
}

export default Home