
// filter given countries array by search term
const applySearchFilter = (searchTerm, countriesArray) => {
  return countriesArray.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  })
}

export { applySearchFilter }