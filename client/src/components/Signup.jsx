import React, { useState, useCallback } from "react"
import apis from "../api/index"
import { navigate } from "hookrouter"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


export default function Signup() {
  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let [msg, setMsg] = useState([])
  let [showFail, setShowFail] = useState(false)
  let [showSuccess, setShowSuccess] = useState(false)



  const handleClick = () => {

    apis.sign({ username, password }).then((res) => {
      navigate('/login')
    }).catch(err => {
      if (err.response.data.validation === false) {
        setMsg(err.response.data.errors)
      } else {
        debugger
        setMsg([err.response.data.message])
      }
    })
  }

  return (

    <div className="App">
      <h1>Sign</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleClick}>
          Submit
  </Button>

      </Form>
      <ul>

        {

          msg.map((m, index) => {
            return <li key={index}><Alert show={true} variant="danger">{m}</Alert></li>
          })
        }
      </ul>
    </div>
  )
}
