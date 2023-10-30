
import { Button, Col, Form, Row } from "react-bootstrap"
import {useState} from 'react'

const SearchBar = (props) => {

  const [searchText, setSearchText] = useState('')

  const handleTyping = (event) => {
    setSearchText(event.target.value)
    console.log(event.target.value)
  }

  const sendSearchValue = () => {
    props.handleSearchClick(searchText)
  }

  return (
    <Form>
      <Row>
        <Col>
          <Form.Control size="lg" type="text" placeholder="Large text" onChange={handleTyping} />
        </Col>
        <Col>
          <Button onClick={sendSearchValue} >Search</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBar