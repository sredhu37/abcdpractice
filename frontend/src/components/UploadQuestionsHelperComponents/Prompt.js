import React from "react";
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PromptContent from './PromptContent';
import {
  requestUploadQuestions,
  changeClassValue,
  changeSubjectValue,
  changeChapterValue } from '../../redux/actions/uploadQuestionsAction';
import { showPromptError, hidePrompt } from '../../redux/actions/promptAction';

const Prompt = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.prompt.show);
  const selectedClass = useSelector(state => state.uploadQuestions.class);
  const selectedSubject = useSelector(state => state.uploadQuestions.subject);
  const selectedChapter = useSelector(state => state.uploadQuestions.chapter);
  const loading = useSelector(state => state.loading.show);

  const handleOk = () => {
    // None of these values should be empty
    const arePromptValuesValid = !(selectedClass.trim() === '' || selectedSubject.trim() === '' || selectedChapter.trim() === '')

    if (arePromptValuesValid) {
      // No problem with prompt values
      dispatch(requestUploadQuestions());
    } else {
      // Some problem with prompt values
      // display error message
      dispatch(showPromptError('Please select valid values!'));
    }
  };

  const handleCancel = () => {
    dispatch(changeClassValue(''));
    dispatch(changeSubjectValue(''));
    dispatch(changeChapterValue(''));
    dispatch(hidePrompt()) 
  };

  return show ? 
  (
    <Modal show={show} onHide={handleCancel} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Upload Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PromptContent />
        <PromptError />
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
          : <Button variant="danger" onClick={handleCancel}>Back</Button>
        }
        {loading
          ? <Button variant="primary" disabled><Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /></Button>
          : <Button variant="primary" onClick={handleOk}>Upload</Button>
        }
      </Modal.Footer>
    </Modal>
  ) 
  : null;
};

const PromptError = () => {
  const { showError, errMessage } = useSelector(state => state.prompt);

  return showError ? (
    <div className='promptErrorMessage'>
      {errMessage}
    </div>
  )
  : null;
};

export default Prompt;