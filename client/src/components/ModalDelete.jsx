import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ModalDelete({ show, onHandleClose, chosenEmail, onHandleDelete }) {

    return (
        <div>
            <Modal show={show} onHide={onHandleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> id: {chosenEmail._id}</p>
                    <p>subject: {chosenEmail.subject}</p>
                    <p>sender: {chosenEmail.sender}</p>
                    <p>receiver: {chosenEmail.receiver}</p>
                    <p>message: {chosenEmail.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHandleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => onHandleDelete(chosenEmail._id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal >
        </div >
    )
}
