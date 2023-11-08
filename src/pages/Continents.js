
// hooks
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// components
import { Row } from 'react-bootstrap'
import SortDropDown from '../components/SortDropDown'
import Loading from '../components/Loading'
import SearchError from '../components/SearchError'
import PaginateButton from '../components/PaginateButton'
import SearchBar from '../components/SearchBar'
import Title from '../components/Title'

// utilities
import { getDataByRegion } from '../utilities/API'
import { sortCountryCards } from '../utilities/sort'
import { createCardComponents } from '../utilities/createCards'
import { applySearchFilter } from '../utilities/applySearchFilter'


const Continents = () => {

  const [countries, setCountries] = useState([])
  const [startingCountries, setStartingCountries] = useState([])
  const [paginationLimit, setPaginationLimit] = useState([15])
  const [sortType, setSortType] = useState("")
  const [searchValue, setSearchValue] = useState('')

  // get name of continent from route param
  const { continentName } = useParams()

  useEffect(() => {
    loadCountries()
  }, [])

  useEffect(() => {
    applySort()
    resetPagination()
  }, [sortType])

  // get countries data helper function
  const loadCountries = async () => {
    try {
      const countriesData = await getDataByRegion(continentName)
      setCountries(countriesData)
      setStartingCountries(countriesData)
    }
    catch (error) {
      console.error(error)
    }
  }

  // sort the countries cards
  const applySort = () => {
    const sortedCountryCards = sortCountryCards(sortType, countries)
    setCountries(sortedCountryCards)
  }

  // function to change the sort value from sort dropdown component
  const dispatchSortValue = (sortValue) => {
    setSortType(sortValue)
  }

  // reset the sort value
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

  // get search value and apply it to countries array
  const handleSearch = (searchTerm) => {

    // reset the pagination, sort value and region
    resetPagination()
    resetSort()

    // set search value
    setSearchValue(searchTerm)

    // create search filter and apply it to the countries array
    const searchFilter = applySearchFilter(searchTerm, startingCountries)

    // set countries array
    setCountries(searchFilter)
  }

  // if countries is not set return loading component
	if(!countries) {
		return <Loading />
	}

  // create countries cards
  const countriesCards = createCardComponents(countries, paginationLimit)

  return (
    <>
      <Title title={continentName} />
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
      {paginationLimit <= countries.length ? <PaginateButton loadMoreCountries={loadMoreCountries} /> : ''}
    </>
  )
}

export default Continents