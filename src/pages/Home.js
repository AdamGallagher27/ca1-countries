import { useState, useEffect } from "react"
import axios from "axios"
import { Row, Button, Col } from "react-bootstrap"

// components
import CountryCard from "../components/CountryCard"
import SearchBar from "../components/SearchBar"
import SortDropDown from "../components/SortDropDown"
import RegionFilter from "../components/RegionFilter"

const Home = () => {
	const [startingCountries, setStartingCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [sortType, setSortType] = useState("")
	const [region, setRegion] = useState("")
	const [paginationLimit, setPaginationLimit] = useState(15)
	const ALL_COUNTRIES_API = "https://restcountries.com/v3.1/all"

	// on first load get every country
	useEffect(() => {
		getEveryCountry()
	}, [])

	// if the sort type is updated sort the country cards
	useEffect(() => {
		sortCountryCards()
	}, [sortType])

	// if the region value is updated filter the country cards
	useEffect(() => {
		applyRegionFilter(region)
	}, [region])

	// return every country from api
	const getEveryCountry = () => {
		axios
			.get(ALL_COUNTRIES_API, {
				fullText: false,
			})

			// assign response to the starting countries array and the filtered countries array
			.then((response) => {
				setStartingCountries(response.data)
				setFilteredCountries(response.data)
			})

			.catch((error) => {
				console.error(error)
			})
	}

	// get search from search box and apply filter to filtered countries array
	const handleSearch = (searchTerm) => {
		// set the search value
		setSearchValue(searchTerm)

		// reset the pagination
		resetPagination()

		// create the filter to apply to filtered countries
		const filter = startingCountries.filter((country) => {
			return country.name.common
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		})

		// apply filter
		setFilteredCountries(filter)
	}

	// restore pagination to original 15 cards
	const resetPagination = () => {
		setPaginationLimit(15)
	}

	// load more country cards
	const loadMoreCountries = () => {
		setPaginationLimit(paginationLimit + 9)
	}

	// function to change the sort value from sort dropdown component
	const dispatchSortValue = (sortValue) => {
		setSortType(sortValue)
	}

	const dispatchRegionValue = (selectedRegion) => {
		setRegion(selectedRegion)
		console.log(selectedRegion)
	}

	// reset the cards to default order
	const restoreDefaultOrder = () => {
		setFilteredCountries(startingCountries)
		resetPagination()
	}

	// sort the countries by alphabetical order
	const sortByAlphabetical = () => {
		const sortAlphabetically = [...filteredCountries]
		sortAlphabetically.sort((a, b) => {
			if (a.name.common < b.name.common) {
				return -1
			} else if (b.name.common < a.name.common) {
				return 1
			} else {
				return 0
			}
		})

		setFilteredCountries(sortAlphabetically)
		resetPagination()
	}

	// sort the countries by population
	const sortByPopulation = () => {
		const sortByPopulation = [...filteredCountries]
		sortByPopulation.sort((a, b) => b.population - a.population)
		setFilteredCountries(sortByPopulation)
		resetPagination()
	}

	// sort the countries by area size
	const sortByArea = () => {
		const sortByArea = [...filteredCountries]
		sortByArea.sort((a, b) => b.area - a.area)
		setFilteredCountries(sortByArea)
		resetPagination()
	}

	// change the order of the country cards based on sort dropdown
	const sortCountryCards = () => {
		switch (sortType) {
			case "default":
				restoreDefaultOrder()
				break

			case "alphabetical":
				sortByAlphabetical()
				break

			case "population":
				sortByPopulation()
				break

			case "area":
				sortByArea()
				break
		}
	}

	const applyRegionFilter = (selectedRegion) => {
		if (selectedRegion === 'default') {
			setFilteredCountries(startingCountries)
		}
		else {
			const filteredCountriesCopy = [...filteredCountries]
			
			const countriesByRegion = filteredCountriesCopy.filter((country) => {
				return (country.region.toLowerCase() === selectedRegion)
			})

			setFilteredCountries(countriesByRegion)
		}

		resetPagination()
	}

	// create card components
	const createCardComponents = () => {
		return filteredCountries.map((country, index) => {
			// apply pagination limit
			if (index < paginationLimit) {
				return <CountryCard key={index} country={country} />
			}
		})
	}

	// variable to hold countries cards
	const countriesCards = createCardComponents()

	return (
		<>
			<SearchBar handleSearch={handleSearch} />
			<Row>
				<Col>
					<SortDropDown dispatchSortValue={dispatchSortValue} />
				</Col>
				<Col>
					<RegionFilter dispatchRegionValue={dispatchRegionValue} />
				</Col>
			</Row>
			<Row className="g-4" md={3} xs={1}>
				{/* MAKE ME INTO SEARCH ERROR COMPONENT */}
				{countriesCards.length > 0
					? countriesCards
					: `sorry we couldnt find anything for ${searchValue}`}
			</Row>
			{/* MAKE PAGINATE BUTTON COMPONENT */}
			<Button onClick={loadMoreCountries}>Pagination</Button>
		</>
	)
}

export default Home
