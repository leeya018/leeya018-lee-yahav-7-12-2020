import React, { useReducer } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from "react-bootstrap/Button";
import Logout from "./Logout"
import util from "../util"
import "../style/composeEmail.css"
import api from "../api/index"
import { useEffect } from 'react';

const initialState = {
    sender: util.getUsername(),
    receiver: "",
    message: "",
    subject: "",
    alert: "",
    validations: [],
    showSuccess: false,
    showFail: false

};


function reducer(state, action) {
    switch (action.type) {
        case 'subject':
            return { ...state, subject: action.payload };
        case 'sender':
            return { ...state, sender: action.payload };
        case 'receiver':
            return { ...state, receiver: action.payload };
        case 'message':
            return { ...state, message: action.payload };
        case 'alert':
            return { ...state, ...action.payload };


        default:
            throw new Error();
    }
}
export default function ComposeEmail({ logged, onHandleLogged }) {
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        dispatch({ type: "sender", payload: util.getUsername() })
    }, [])


    const emailInsertion = () => {
        debugger
        let { subject, receiver, sender, message } = state
        api.insertEmail({ subject, receiver, sender, message }).then((res) => {
            dispatch({ type: "alert", payload: { alert: res.data.message, showSuccess: true, showFail: false, receiver: "", sender: util.getUsername(), subject: "", message: "" } })
        }).catch(err => {
            if (err.response.data.validation === false) {
                dispatch({ type: "alert", payload: { validations: err.response.data.errors, showSuccess: false, showFail: true } })
            } else {
                dispatch({ type: "alert", payload: { alert: err.err.response.data.error, showSuccess: false, showFail: true } })
            }
        })
    }

    return (
        <div className="composeEmail">
            {localStorage.getItem("data") && <div>
                {`Hello ${util.getUsername()}`}
                <Logout onHandleLogged={onHandleLogged} />
            </div>}
            <h1>Compose Email:</h1>
            <Form >
                <Form.Group controlId="email">
                    <Form.Control placeholder="sender id" disabled={logged === true} value={state.sender} onChange={(e) => dispatch({ type: 'sender', payload: e.target.value })} />
                    <Form.Control placeholder="subject" value={state.subject} onChange={(e) => dispatch({ type: 'subject', payload: e.target.value })} />
                    <Form.Control placeholder="receiver id" value={state.receiver} onChange={(e) => dispatch({ type: 'receiver', payload: e.target.value })} />
                    <Form.Control as={"textarea"} placeholder="message" value={state.message} onChange={(e) => dispatch({ type: 'message', payload: e.target.value })} />
                    <Button variant="primary" className="submit" onClick={emailInsertion}>SUBMIT</Button>
                </Form.Group>
            </Form>
            <Alert show={state.showSuccess} variant="success">{state.alert}</Alert>
            <ul>
                {state.validations.length > 0 ?
                    state.validations.map((validation, index) => <li className="validations" key={index}>
                        < Alert key={index} show={state.showFail} variant="danger">{validation}</Alert>
                    </li>) : < Alert show={state.showFail} variant="danger">{state.alert}</Alert>
                }
            </ul>
        </div >
    )
}
