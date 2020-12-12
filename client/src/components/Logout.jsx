import React from 'react'
import Button from 'react-bootstrap/Button'

export default function Logout({onHandleLogged}) {

    const logout = () => {
        localStorage.removeItem("data")
        onHandleLogged(false)
    }

    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}
