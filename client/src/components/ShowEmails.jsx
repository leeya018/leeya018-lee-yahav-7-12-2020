import React, { useEffect, useReducer } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import util from "../util"
import Alert from 'react-bootstrap/Alert'
import api from "../api/index"
import Logout from "./Logout"
import Email from "./Email";

const initialState = {
    emailsList: [],
    alert: "",
    showFail: false,
    modalShow: false,
    isSender: true
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
            <button onClick={() => dispatch({ type: "update isSender", payload: { ...state, isSender: true } })}> from me </button>
            <button onClick={() => dispatch({ type: "update isSender", payload: { ...state, isSender: false } })} > to me </button>

            <ListGroup variant="flush">
                <ul>
                    {
                        state.emailsList.map((email, index) => {
                            return <Email
                                index={index}
                                isSender={state.isSender}
                                email={email}
                                modalShow={state.modalShow}
                                closeModal={closeModal}
                                deleteEmail={deleteEmail}
                                openModal={() => dispatch({ type: "open modal", payload: { modalShow: true } })}
                            />
                        })
                    }
                </ul>

            </ListGroup>
            <Alert show={state.showFail} variant="danger">{state.alert}</Alert>

        </div >
    )
}
