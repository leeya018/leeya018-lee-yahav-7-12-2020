import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import ModalDelete from "./ModalDelete"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import util from "../util"

export default function Email({
    index,
    openModal,
    email,
    modalShow,
    closeModal,
    deleteEmail
}) {
    return (
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
                    show={modalShow}
                    onHandleClose={closeModal}
                    onHandleDelete={deleteEmail}
                    chosenEmail={email} />
                <Button variant="danger"
                    onClick={openModal}
                >Delete</Button>
            </Card>
        </ListGroup.Item>
    )
}