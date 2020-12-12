import React, { useEffect } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import SecureComponent from './SecureComponent';
import MessageBox from './MessageBox';
import QuestionsPreviewCards from './QuestionHelperComponents/QuestionsPreviewCards';
import { useSelector, useDispatch } from "react-redux";
import classes from '../hardCoded';
import {
  changeClassValue,
  changeSubjectValue,
  changeChapterValue,
  requestGetTodaysQuestions
} from '../redux/actions/questionAction';


const Question = () => {
  const dispatch = useDispatch();

  const selectedClass = useSelector(state => state.question.class);
  const selectedSubject = useSelector(state => state.question.subject);
  const selectedChapter = useSelector(state => state.question.chapter);
  const loading = useSelector(state => state.loading.show);

  const areSearchValuesValid = () => {
    return (
      selectedClass.trim().length &&
      selectedSubject.trim().length &&
      selectedChapter.trim().length
    );
  };

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
      // dispatch(hidePromptError());
      dispatch(changeChapterValue(selectedChapter));
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

  useEffect(() => {
    const getQuestions = () => {
      if(areSearchValuesValid()) {
        dispatch(requestGetTodaysQuestions());
      }
    };

    getQuestions();
  }, [selectedClass, selectedSubject, selectedChapter]);

  return (
    <SecureComponent component={
      <div className="Question">
        <MessageBox />
        <Container fluid className="questionPageContainer">
          <Row>
            <Col sm={3} xs={12}>
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
                {loading ?
                  <Spinner animation="border" variant="success" />
                  : null
                }
              </div>
            </Col>
            <Col sm={9} xs={12}>
              <QuestionsPreviewCards />
            </Col>
          </Row>
        </Container>
      </div>  
    } />
  );
};

export default Question;
