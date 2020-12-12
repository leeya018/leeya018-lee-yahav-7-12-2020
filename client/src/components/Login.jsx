import React, { useState, useEffect } from "react"
import apis from "../api/index"
import { navigate } from "hookrouter"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


export default function Login({ logged, onHandleLogged }) {
  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let [msg, setMsg] = useState([])
  let [showFail, setShowFail] = useState(false)
  let [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (logged) {
      navigate(`/emailslist`)
    }
  }, [])

  const handleClick = () => {
    apis.login({ username, password }).then((res) => {
      let data = {
        "token": res.data.token, username: username
      }
      localStorage.setItem("data", JSON.stringify(data))
      onHandleLogged(true)
      navigate(`/emailslist`)
    }).catch(err => {
      if (err.response.data.validation === false) {
        setMsg(err.response.data.errors)
      } else {
        setMsg([err.response.data.message])
      }
    })
  }

  const handleUsername = (e) => {
    setMsg([])
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setMsg([])
    setPassword(e.target.value)
  }

  return (

    <div className="App">
      <h1>Login</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control placeholder="Enter username" onChange={(e) => handleUsername(e)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" onChange={(e) => handlePassword(e)} />
        </Form.Group>
        <Button variant="primary" className="submit" onClick={handleClick}>SUBMIT</Button>
        {
          msg.map((m, index) => {
            return <Alert key={index} show={true} variant="danger">{m}</Alert>
          })
        }
      </Form>
    </div>
  )
}
