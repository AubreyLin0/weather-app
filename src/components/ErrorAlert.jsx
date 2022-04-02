import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ErrorAlert ({ alert, setAlert }) {
  const handleClose = () => {
    // when get API error, the Alert window will show up
    setAlert(false)
    // after clicked the confirm button, the page will reload
    window.location.reload(false)
  }

  return (
    <Modal show={alert} onHide={handleClose} centered>
      <Modal.Body>
        <img src='images/error.jpg' alt='error' />
        <p>
          Oops, there seems to be an error
          <br />
          (wrong location or forgot to fill the field)
        </p>
        <Button onClick={handleClose}>Back to Earth</Button>
      </Modal.Body>
    </Modal>
  )
}
