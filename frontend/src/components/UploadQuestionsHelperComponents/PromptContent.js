import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../../hardCoded';
import {
  changeClassValue,
  changeSubjectValue,
  changeChapterValue
} from '../../redux/actions/uploadQuestionsAction';
import {hidePromptError } from '../../redux/actions/promptAction';

const PromptContent = () => {
  const dispatch = useDispatch();
  const selectedClass = useSelector(state => state.uploadQuestions.class);
  const selectedSubject = useSelector(state => state.uploadQuestions.subject);
  const selectedChapter = useSelector(state => state.uploadQuestions.chapter);

  const getClassOptions = () => {
    return classes.map(cls => <option key={cls.name}>{cls.name}</option>);
  };

  const getSubjectOptions = () => {
    if (selectedClass.trim() === '') {
      return null;
    } else {
      const selectedClassObj = classes.find(cls => cls.name === selectedClass.trim());
      return selectedClassObj.subjects.map(sub => <option key={sub.name}>{sub.name}</option>);
    }
  };

  const getChapterOptions = () => {
    if (selectedSubject.trim() === '') {
      return null;
    } else {
      const selectedClassObj = classes.find(cls => cls.name === selectedClass.trim());
      const selectedSubjectObj = selectedClassObj.subjects.find(sub => sub.name === selectedSubject.trim());

    return selectedSubjectObj.chapters.map(chptr => <option key={chptr.number}>{chptr.number}. {chptr.name}</option>);
    }
  };

  const handleClassChange = (event) => {
    const selectedClass = (event.target.value).trim();
    if(selectedClass !== '') {
      dispatch(changeChapterValue(''));
      dispatch(changeSubjectValue(''));
      dispatch(changeClassValue(selectedClass));
    }
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = (event.target.value).trim();
    if(selectedSubject !== '') {
      dispatch(changeChapterValue(''));
      dispatch(changeSubjectValue(selectedSubject));
    }
  };

  const handleChapterChange = (event) => {
    const selectedChapter = (event.target.value).trim();
    if(selectedChapter !== '') {
      dispatch(hidePromptError());
      dispatch(changeChapterValue(selectedChapter));
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>Select class</Form.Label>
        <Form.Control as="select" value={selectedClass} onChange={handleClassChange}>
          <option></option>
          {getClassOptions()}
        </Form.Control>
      </Form.Group>
        <Form.Group>
        <Form.Label>Select subject</Form.Label>
        <Form.Control as="select" value={selectedSubject} onChange={handleSubjectChange}>
          <option></option>
          {getSubjectOptions()}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Select chapter</Form.Label>
        <Form.Control as="select" value={selectedChapter} onChange={handleChapterChange}>
          <option></option>
          {getChapterOptions()}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default PromptContent;