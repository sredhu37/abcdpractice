import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { hideMessageBox } from "../redux/actions/messageBoxAction";
import { useSelector, useDispatch } from 'react-redux';

const MessageBox = () => {
  const dispatch = useDispatch();

  const message = useSelector(state => state.messageBox.text);
  const variant = useSelector(state => state.messageBox.variant);
  const displayMessageBox = useSelector(state => state.messageBox.show);

  const handleClose = () => {
    dispatch(hideMessageBox());
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={1} sm={3} />
        <Col xs={10} sm={6}>
          <Modal
            show={ displayMessageBox }
            onHide={ handleClose }
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
              <Button variant={variant} onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col xs={1} sm={3} />
      </Row>
    </Container>
  );
};

export default MessageBox;