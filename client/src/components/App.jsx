import React, { useState, useEffect } from 'react';
import ComposeEmail from "./ComposeEmail"
import ShowEmails from "./ShowEmails"
import Signup from "./Signup"
import Login from "./Login"
import { useRoutes,navigate } from "hookrouter"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import util from "../util"
import '../style/App.css';

const checkLogged = ()=>{
  return util.getUsername()!==""
}

function App() {
  const [logged, setlogged] = useState(checkLogged())

  const routes = {
    '/': () => navigate('/login'),
    '/login': () => <Login logged={logged} onHandleLogged={setlogged}/>,
    '/signup': () => <Signup />,
    '/composeemail': () => <ComposeEmail logged={logged} onHandleLogged={setlogged}/>,
    '/emailslist': () => <ShowEmails onHandleLogged={setlogged}/>

  }

  let routeResult = useRoutes(routes);

  const nav = (
    <Navbar fixed="top" expand="lg" variant="light" bg="light">
      <Nav className="mr-auto">
        <Nav.Link href={`/emailslist`}>emailslist</Nav.Link>
        <Nav.Link href="/composeemail"  >compose email</Nav.Link>
        {!logged && <>
          <Nav.Link href="/login" >login</Nav.Link>
          <Nav.Link href="/signup" >sign </Nav.Link>
        </>
        }

      </Nav>
    </Navbar>
  )
  return (
    <div className="App">
      {nav}
      <div className="comp-start">

        {routeResult}
      </div>
    </div>
  );
}

export default App;
