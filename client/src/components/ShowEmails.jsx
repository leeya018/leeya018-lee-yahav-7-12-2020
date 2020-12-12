import React, { useEffect, useReducer } from 'react'
import ModalDelete from "./ModalDelete"
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import util from "../util"
import Card from 'react-bootstrap/Card'
import api from "../api/index"
import Logout from "./Logout"

const initialState = {
    emailsList: [],
    alert: "",
    showFail: false,
    modalShow: false,

};


function reducer(state, action) {
    switch (action.type) {
        case action.type:
            return { ...state, ...action.payload };
        default:
            throw new Error();
    }

}
export default function ShowEmails({ onHandleLogged }) {
    debugger
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getEmails()
    }, [])

    const getEmails = () => {
        let username = util.getUsername()
        if (!username) {
            api.getAllEmails().then((res) => {
                dispatch({ type: "emailsList", payload: { emailsList: res.data.emails } })
            }).catch(err => {
                dispatch({ type: "alert", payload: { emailsList: [], alert: err.response.data.error, showFail: true } })
            })
        } else {
            api.getEmailsByUsername(username).then((res) => {
                dispatch({ type: "emailsList", payload: { emailsList: res.data.emails } })
            }).catch(err => {
                dispatch({ type: "alert", payload: { emailsList: [], alert: err.response.data.error, showFail: true } })
            })
        }

    }

    const deleteEmail = (_id) => {
        api.deleteEmail({ data: { id: _id } }).then(res => {
            getEmails()
            closeModal()
        }).catch(err => {
            dispatch({ type: "alert", payload: { alert: err.response.data.error, showFail: true } })
        })
    }


    const closeModal = () => {
        dispatch({ type: "close modal", payload: { modalShow: false } })

    }




    return (
        <div className="showEmails">
            {localStorage.getItem("data") && <div>
                {`Hello ${util.getUsername()}`}
                <Logout onHandleLogged={onHandleLogged} />
            </div>}
            <h1>Emails List:</h1>
            <ListGroup variant="flush">
                <ul>
                    {
                        state.emailsList.map((email, index) => (
                            < ListGroup.Item key={index} >
                                <Card border="primary" className="text-center">
                                    <Card.Body>
                                        <Card.Title>{`subject: ${email.subject}`}</Card.Title>
                                        <Card.Text>
                                            {`sender: ${email.sender}`}
                                        </Card.Text>
                                        <Card.Text>
                                            {`receiver: ${email.receiver}`}
                                        </Card.Text>
                                        <Card.Text>
                                            {`message: ${email.message}`}
                                        </Card.Text>
                                    </Card.Body>
                                    <ModalDelete
                                        show={state.modalShow}
                                        onHandleClose={closeModal}
                                        onHandleDelete={deleteEmail}
                                        chosenEmail={email} />
                                    <Button variant="danger"
                                        onClick={() => dispatch({ type: "open modal", payload: { modalShow: true } })}
                                    >Delete</Button>
                                </Card>
                            </ListGroup.Item>
                        ))
                    }
                </ul>

            </ListGroup>
            <Alert show={state.showFail} variant="danger">{state.alert}</Alert>

        </div >
    )
}
