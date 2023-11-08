
// sort the countries by alphabetical order
const sortByAlphabetical = (countries) => {
  const sortAlphabetically = [...countries]
  return sortAlphabetically.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1
    } else if (b.name.common < a.name.common) {
      return 1
    } else {
      return 0
    }
  })

}

// sort the countries by population
const sortByPopulation = (countries) => {
  const sortByPopulation = [...countries]
  return sortByPopulation.sort((a, b) => b.population - a.population)
}

// sort the countries by area size
const sortByArea = (countries) => {
  const sortByArea = [...countries]
  return sortByArea.sort((a, b) => b.area - a.area)
}


// change the order of the country cards based on sort dropdown
const sortCountryCards = (sortMethod, countriesArray) => {

  // if sort method is none dont sort the array
  if(sortMethod === 'none') return countriesArray


  let sortedCountries

  switch (sortMethod) {

    case "alphabetical":
      sortedCountries = sortByAlphabetical(countriesArray)
      break

    case "population":
      sortedCountries = sortByPopulation(countriesArray)
      break

    case "area":
      sortedCountries = sortByArea(countriesArray)
      break
  }

  return sortedCountries
}



export { sortCountryCards }