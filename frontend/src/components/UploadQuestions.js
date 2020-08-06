import React from 'react';
import { Container, Row, Col, Nav, Tab, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBox from './MessageBox';
import SecureComponent from './SecureComponent';
import AdminComponent from './AdminComponent';
import Prompt from './UploadQuestionsHelperComponents/Prompt';

import {
  changeProblemStatement,
  addNewQuestion,
  changeOptionStatement,
  changeAnswersValue,
  deleteLastQuestion
} from '../redux/actions/uploadQuestionsAction';
import { showPrompt } from '../redux/actions/promptAction';
import { showMessageBox } from '../redux/actions/messageBoxAction';
import { setActiveTab } from '../redux/actions/questionAction';

const UploadQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.uploadQuestions.questions);

  const activeTab = useSelector(state => state.question.activeTab);

  const handleProblemStatementChange = (event, queNumber) => {
    dispatch(changeProblemStatement(queNumber, event.target.value));
  };

  /**
   * problemStatement should not be empty
   * options: {a: "", b: "", c: "", d: ""}  => All 4 options should contain some value
   * answer: {a: false, b: false, c: false, d: false} => At least one of the options must be true
   */
  const isQuestionValid = (que) => {
    const result = {
      isValid: true,
      msg: 'Question is valid'
    };

    if(que.problemStatement.trim().length < 3) {
      result.isValid = false;
      result.msg = `Invalid value of ProblemStatement for que: ${que.number}`;
    } else if(!(
      que.options.a.trim().length &&
      que.options.b.trim().length &&
      que.options.c.trim().length &&
      que.options.d.trim().length)
    ) {
      result.isValid = false;
      result.msg = `Invalid value of Options for que: ${que.number}`;
    } else if(!(
      que.answer.a ||
      que.answer.b ||
      que.answer.c ||
      que.answer.d)
    ) {
      result.isValid = false;
      result.msg = `Please select answer for que: ${que.number}`;
    }

    return result;
  };

  const handleAddNextQuestion = () => {
    dispatch(addNewQuestion());

    dispatch(setActiveTab(`question${questions.length + 1}`));
  };

  const handleDoneWithQuestions = () => {
    //[{isValid, msg}, {isValid, msg}]
    const questionsValidityArr = questions.map(que => isQuestionValid(que));
    const invalidQuestionsArr = questionsValidityArr.filter(que => !que.isValid);

    if(invalidQuestionsArr.length) {
      dispatch(showMessageBox(invalidQuestionsArr[0].msg, `danger`));
    } else {
      dispatch(showPrompt());
    }
  };

  const handleDeleteLastQuestion = () => {
    if(questions.length > 1) {
      dispatch(deleteLastQuestion());

      dispatch(setActiveTab(`question${questions.length - 1}`));
    }
  };

  const handleOptionsValueChange = (event, queNumber, option) => {
    dispatch(changeOptionStatement(queNumber, event.target.value, option));
  };

  const handleAnswerValueChange = (event, queNumber, option) => {
    dispatch(changeAnswersValue(queNumber, event.target.checked, option));
  };

  const getNavItems = () => {
    return (
      questions.map(que =>
        <Nav.Item key={que.number}>
          <Nav.Link eventKey={`question${que.number}`}>Question {que.number}</Nav.Link>
        </Nav.Item>
      )
    );
  };

  const getTabPanes = () => {
    return (
      questions.map(que =>
        <Tab.Pane key={que.number} eventKey={`question${que.number}`} className="tabPane">
          <Form>
            <InputGroup className="marginControl">
              <InputGroup.Prepend>
                <InputGroup.Text>Problem Statement</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                placeholder="Enter problem statement"
                onChange={(event) => handleProblemStatementChange(event, que.number)}
              />
            </InputGroup>
            <InputGroup className="marginControl">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={(event) => handleAnswerValueChange(event, que.number, 'a')}
                />
              </InputGroup.Prepend>
              <FormControl
                placeholder="Enter value for option a"
                onChange={(event) => handleOptionsValueChange(event, que.number, 'a')}
              />
            </InputGroup>
            <InputGroup className="marginControl">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={(event) => handleAnswerValueChange(event, que.number, 'b')}
                />
              </InputGroup.Prepend>
              <FormControl
                placeholder="Enter value for option b"
                onChange={(event) => handleOptionsValueChange(event, que.number, 'b')}
              />
            </InputGroup>
            <InputGroup className="marginControl">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={(event) => handleAnswerValueChange(event, que.number, 'c')}
                />
              </InputGroup.Prepend>
              <FormControl
                placeholder="Enter value for option c"
                onChange={(event) => handleOptionsValueChange(event, que.number, 'c')}
              />
            </InputGroup>
            <InputGroup className="marginControl">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={(event) => handleAnswerValueChange(event, que.number, 'd')}
                />
              </InputGroup.Prepend>
              <FormControl
                placeholder="Enter value for option d"
                onChange={(event) => handleOptionsValueChange(event, que.number, 'd')}
              />
            </InputGroup>
          </Form>
        </Tab.Pane>
      )
    );
  };

  return(
    <SecureComponent component={
      <AdminComponent component={
        <div>
          <Prompt />
          <MessageBox />
          <Container fluid className="tabContainer">
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              onSelect={(k) => dispatch(setActiveTab(k))}
            >
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    {getNavItems()}
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    {getTabPanes()}
                    <Button variant="secondary" onClick={handleAddNextQuestion}>Add next question</Button>
                    <Button variant="danger" onClick={handleDeleteLastQuestion}>Delete last question</Button>
                    <Button variant="success" onClick={handleDoneWithQuestions}>Done</Button>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </div>
      } />
    } />
  );
};

export default UploadQuestions;