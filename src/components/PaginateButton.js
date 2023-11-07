import React from 'react'
import { Button } from 'react-bootstrap'

const PaginateButton = (props) => {

  return (
    <Button className='mb-5' variant='success' onClick={props.loadMoreCountries}>Load More Countries</Button>
  )
}

export default PaginateButton