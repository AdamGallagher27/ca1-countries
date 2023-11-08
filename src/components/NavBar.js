import React from 'react'

// components
import { Navbar, Container, Row, Button, Col } from 'react-bootstrap'

// hooks
import { useNavigate } from 'react-router-dom'


const NavBar = () => {

  const navigate = useNavigate()

  const navigateToHome = () => {
    navigate('/')
  }

  const navigateToContinentSelect = () => {
    navigate('/continents')
  }

  return (
    <Navbar className=" mb-5 border-bottom bg-success
      ">
      <Container>
        <Navbar.Brand className='text-light'>Country DataBase</Navbar.Brand>
        <div>
          <Button className='btn-light mx-4' onClick={navigateToContinentSelect}>Continents</Button>
          <Button className='btn-light' onClick={navigateToHome}>HomePage</Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default NavBar