import { useState, useEffect } from "react"
import { Row, Button, Col, Spinner } from "react-bootstrap"

// components
import SearchBar from "../components/SearchBar"
import SortDropDown from "../components/SortDropDown"
import SearchError from "../components/SearchError"
import PaginateButton from "../components/PaginateButton"
import Loading from "../components/Loading"

// utilities
import {sortCountryCards } from "../utilities/sort"
import { createCardComponents } from "../utilities/createCards"
import { getEveryCountry } from "../utilities/API"

const Home = () => {
	const [startingCountries, setStartingCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [sortType, setSortType] = useState("")
	const [paginationLimit, setPaginationLimit] = useState(15)

	// on first load get every country
	useEffect(() => {
		loadCountries()
	}, [])

	// if the sort type is updated sort the country cards
	useEffect(() => {
		applySort()
		resetPagination()
	}, [sortType])

	// when countries data is returned assign starting and filterd countries
	const loadCountries = async () => {

		try {
			const countries = await getEveryCountry()
			setFilteredCountries(countries)
			setStartingCountries(countries)
		}
		catch (error) {
			console.error(error)
		}

	}

	// filter given countries array by search term
	const applySearchFilter = (searchTerm, countriesArray) => {
		return countriesArray.filter((country) => {
			return country.name.common
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		})
	}

	// sort the countries cards
	const applySort = () => {
		const sortedCountryCards = sortCountryCards(sortType, filteredCountries)
		setFilteredCountries(sortedCountryCards)
	}

	// get search from search box and apply filter to filtered countries array
	const handleSearch = (searchTerm) => {

		// reset the pagination, sort value and region
		resetPagination()
		resetSort()

		// set the search value
		setSearchValue(searchTerm)

		// create the filter to apply to filtered countries
		const searchFilter = applySearchFilter(searchTerm, startingCountries)

		// apply filter
		setFilteredCountries(searchFilter)
	}

	// remove type of sort category
	const resetSort = () => {
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

	// if countries is not set return loading component
	if(!filteredCountries) {
		return <Loading />
	}

	// variable to hold countries cards
	const countriesCards = createCardComponents(filteredCountries, paginationLimit)


	return (
		<>
			<h1 className="mb-4">HomePage</h1>
			<SearchBar handleSearch={handleSearch} />
			<div className="d-flex flex-row gap-3 mb-4">
				<SortDropDown dispatchSortValue={dispatchSortValue} />
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