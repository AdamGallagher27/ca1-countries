import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// components
import { Row } from 'react-bootstrap'
import SortDropDown from '../components/SortDropDown'
import Loading from '../components/Loading'
import SearchError from '../components/SearchError'
import PaginateButton from '../components/PaginateButton'

// utilities
import { getDataByRegion } from '../utilities/API'
import { sortCountryCards } from '../utilities/sort'
import { createCardComponents } from '../utilities/createCards'

const Continents = () => {

  const [countries, setCountries] = useState([])
  const [paginationLimit, setPaginationLimit] = useState([15])
  const [sortType, setSortType] = useState("")
  const [searchValue, setSearchValue] = useState('')

  const { continentName } = useParams()

  useEffect(() => {
    loadCountries()
  }, [])

  useEffect(() => {
    applySort()
  }, [sortType])

  // get countries data helper function
  const loadCountries = async () => {
    try {
      const countriesData = await getDataByRegion(continentName)
      setCountries(countriesData)
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

	// restore pagination to original 15 cards
	const resetPagination = () => {
		setPaginationLimit(15)
	}

	// load more country cards
	const loadMoreCountries = () => {
		setPaginationLimit(paginationLimit + 1)
	}

  // if countries is not set return loading component
	if(!countries) {
		return <Loading />
	}

  const countriesCards = createCardComponents(countries, paginationLimit)

  return (
    <>
      <h1 className='mb-4'>{continentName}</h1>
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