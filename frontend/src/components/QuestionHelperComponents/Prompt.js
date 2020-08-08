import React from "react";
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { requestGetAnswer } from '../../redux/actions/questionAction';
import { hidePrompt } from '../../redux/actions/promptAction';

const Prompt = ({questionId}) => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.prompt.show);
  const loading = useSelector(state => state.loading.show);

  const handleOk = () => {
    dispatch(requestGetAnswer(questionId));
  };

  const handleCancel = () => {
    dispatch(hidePrompt()) 
  };

  return show ? 
  (
    <Modal show={show} onHide={handleCancel} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Show Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to see the answer?
        Because you won't be able to attempt this question again after that.
      </Modal.Body>
      <Modal.Footer>
        {loading
          ? <Button variant="danger" disabled><Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /></Button>
          : <Button variant="danger" onClick={handleCancel}>No</Button>
        }
        {loading
          ? <Button variant="primary" disabled><Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /></Button>
          : <Button variant="primary" onClick={handleOk}>Yes</Button>
        }
      </Modal.Footer>
    </Modal>
  ) 
  : null;
};

export default Prompt;