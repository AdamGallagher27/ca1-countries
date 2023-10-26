import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';

// pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';

// components
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/country/:name' element={<SingleCountry />} />

            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
