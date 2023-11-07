import React from 'react'
import { Navbar, Container, Row, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {

  const navigate = useNavigate()


  const navigateToHome = () => {
    navigate('/')
  }

  return (
      <Navbar className=" mb-5 border-bottom bg-success
      ">
        <Container>
              <Navbar.Brand className='text-light'>Country DataBase</Navbar.Brand>
              <Button className='btn-light' onClick={navigateToHome}>HomePage</Button>
        </Container>
      </Navbar>
  )
}

export default NavBar