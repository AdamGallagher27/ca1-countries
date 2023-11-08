import axios from "axios"

// return every country from api
const getEveryCountry = async () => {
  const ALL_COUNTRIES_API = "https://restcountries.com/v3.1/all"

  try {
    const response = await axios.get(ALL_COUNTRIES_API, {
      fullText: false,
    })

    return response.data
  }
  catch (error) {
    console.error(error)
  }

}

// get data about single country
const getCountryData = async (name) => {
  const SINGLE_COUNTRY_API = `https://restcountries.com/v3.1/name/${name}`

  try {
    const response = await axios.get(SINGLE_COUNTRY_API, {
      fullText: false,
    })

    return response.data.find((country) => {
      return country.name.common.toLowerCase() === name.toLowerCase()
    })

  }
  catch (error) {
    console.error(error)
  }

}

// return weather about the capital city
const getCapitalCityWeather = async (capital) => {
  const WEATHER_API_KEY = 'sWBUyM53rPjjrXgcAxVPIQ==oFIz6GrLF5cYVi1H'
  const WEATHER_API_LINK = `https://api.api-ninjas.com/v1/weather?city=${capital}`

  try {
    const response = await axios.get(WEATHER_API_LINK, {
      headers: { 'X-Api-Key': WEATHER_API_KEY }
    })

    return response.data
  }
  catch (error) {
    console.error(error)
  }

}

// given an array of border codes make an api request for all return an array of promises
const getBorderPromises = (countryCodes) => {
  const COUNTRY_CODE_API = 'https://restcountries.com/v3.1/alpha/'

  // make an api request for every bordering country and return them as an array of promises 
  const promises = countryCodes.map((code) => {
    return axios.get(COUNTRY_CODE_API + code).then(res => res.data[0])
  })

  return promises
}

// get data with a specified region
const getDataByRegion = async (continentName) => {
  const COUNTRY_REGION_API = `https://restcountries.com/v3.1/region/${continentName}`

  try{
    const response = await axios.get(COUNTRY_REGION_API, {
      fullText: false,
    })

    return response.data
  }
  catch(error) {
    console.error(error)
  }

}

export { getEveryCountry, getCountryData, getCapitalCityWeather, getBorderPromises, getDataByRegion }