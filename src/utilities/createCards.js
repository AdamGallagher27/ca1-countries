// components
import CountryCard from "../components/CountryCard"


// create card components
const createCardComponents = (countryArray, paginationLimit) => {
  return countryArray.map((country, index) => {
    // apply pagination limit
    if (index < paginationLimit) {
      return <CountryCard key={index} country={country} />
    }
  })
}

export {createCardComponents}