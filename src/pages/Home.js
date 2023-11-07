import { useState, useEffect } from "react"
import axios from "axios"
import { Row, Button, Col, Spinner } from "react-bootstrap"

// components
import CountryCard from "../components/CountryCard"
import SearchBar from "../components/SearchBar"
import SortDropDown from "../components/SortDropDown"
import RegionFilter from "../components/RegionFilter"
import SearchError from "../components/SearchError"
import PaginateButton from "../components/PaginateButton"

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

	// filter given countries array by search term
	const applySearchFilter = (searchTerm, countriesArray) => {
		return countriesArray.filter((country) => {
			return country.name.common
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		})
	}

	// get search from search box and apply filter to filtered countries array
	const handleSearch = (searchTerm) => {

		// reset the pagination, sort value and region
		resetPagination()
		resetSort()
		resetRegion()

		// set the search value
		setSearchValue(searchTerm)

		// create the filter to apply to filtered countries
		const filter = applySearchFilter(searchTerm, startingCountries)

		// apply filter
		setFilteredCountries(filter)
	}

	// reset the filter countries state variable
	const resetFilteredCountries = () => {
		setFilteredCountries(startingCountries)
	}

	// remove type of sort category
	const resetSort = () => {
		setSortType('none')
	}

	// remove region category
	const resetRegion = () => {
		setSortType('none')
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

	// function to change the region value for the region select dropdown
	const dispatchRegionValue = (selectedRegion) => {
		setRegion(selectedRegion)
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
	}

	// sort the countries by population
	const sortByPopulation = () => {
		const sortByPopulation = [...filteredCountries]
		sortByPopulation.sort((a, b) => b.population - a.population)
		setFilteredCountries(sortByPopulation)
	}

	// sort the countries by area size
	const sortByArea = () => {
		const sortByArea = [...filteredCountries]
		sortByArea.sort((a, b) => b.area - a.area)
		setFilteredCountries(sortByArea)
	}

	// change the order of the country cards based on sort dropdown
	const sortCountryCards = () => {
		switch (sortType) {
			case "none":
				resetFilteredCountries()
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

		resetPagination()
	}


	const applyRegionFilter = (selectedRegion) => {

		if (selectedRegion === 'none') {
			resetFilteredCountries()
		}
		else {

			// filter countries by given region
			const countriesByRegion = startingCountries.filter((country) => {
				return (country.region.toLowerCase() === selectedRegion)
			})

			// if the search value is assigned apply it to filtered coutries
			const countriesWithFilters = (searchValue) ? applySearchFilter(searchValue, countriesByRegion) : countriesByRegion

			setFilteredCountries(countriesWithFilters)
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
			<div className="d-flex flex-row gap-3 mb-4">
					<SortDropDown dispatchSortValue={dispatchSortValue} />
					<RegionFilter dispatchRegionValue={dispatchRegionValue} />
			</div>
			<Row md={3} xs={1}>
				{countriesCards.length > 0
					? countriesCards
					: <SearchError searchValue={searchValue} />
				}
			</Row>

			{paginationLimit <= filteredCountries.length ? <PaginateButton loadMoreCountries={loadMoreCountries} /> : ''}

		</>
	)
}

export default Home