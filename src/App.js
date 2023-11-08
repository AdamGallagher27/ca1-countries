// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import NotFound from './pages/NotFound';
import ContinentSelect from './pages/ContinentSelect';
import Continents from './pages/Continents';

// components
import NavBar from './components/NavBar';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/continents' element={<ContinentSelect />} />
              <Route path='/continents/:continentName' element={<Continents />} />
              <Route path='/country/:name' element={<SingleCountry />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
