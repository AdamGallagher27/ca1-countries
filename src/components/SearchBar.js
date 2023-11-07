
import { Button, Col, Form, Row } from "react-bootstrap"

const SearchBar = (props) => {

  const handleTyping = (event) => {
    const typedWord = event.target.value

    if(typedWord.length > 2){
      props.handleSearch(typedWord)
    }
    else {
      props.handleSearch('')
    }
  }

  return (
    <Form className="mb-3 mx-0">
      <Row>
        <Col>
          <Form.Control size="lg" type="text" placeholder="Search a Country" onChange={handleTyping} />
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBar