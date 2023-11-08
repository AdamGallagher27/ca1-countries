
// components
import {Card} from 'react-bootstrap';

const CapitalCityWeather = (props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Todays Weather in {props.city}</Card.Title>
        <Card.Text>
          Humidity Levels : {props.weather.humidity} RH
        </Card.Text>
        <Card.Text>
          Current Tempature : {props.weather.temp} °
        </Card.Text>
        <Card.Text>
          Todays Minimum Tempature : {props.weather.min_temp} °
        </Card.Text>
        <Card.Text>
          Todays Max Tempature : {props.weather.max_temp} °
        </Card.Text>
        <Card.Text>
    	    Wind Speed : {props.weather.wind_speed} KM/H
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CapitalCityWeather