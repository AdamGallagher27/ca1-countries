import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ContinentBox = (props) => {

  const navigate = useNavigate()

  // change the route to the selected continent
  const navigateToContinent = () => {
    navigate(`/continents/${props.continentName}`)
  }

  return (
    <Col>
      <Card className='mb-3' >
        <Card.Body>
          <Card.Title>{props.continentName}</Card.Title>
          <Button onClick={navigateToContinent} variant="success">See More</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ContinentBox