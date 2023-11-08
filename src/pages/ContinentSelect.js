import React from 'react'

// components
import ContinentBox from '../components/ContinentBox'
import { Row } from 'react-bootstrap'

const ContinentSelect = () => {

  const continents = ['europe', 'africa', 'asia', 'oceania', 'americas']

  // create continent cards
  const continentCards = continents.map((continent) => {
    return <ContinentBox continentName={continent} />
  })

  return (
    <Row md={3} xs={1}>
      {continentCards}
    </Row>
  )
}

export default ContinentSelect