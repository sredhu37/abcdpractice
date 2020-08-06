import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Jumbotron, Button, Form, Table, Spinner } from 'react-bootstrap';
import MessageBox from '../MessageBox';
import SecureComponent from '../SecureComponent';
import { changeUsersAnswer, requestSubmitAnswer } from '../../redux/actions/questionAction';
import { showMessageBox } from '../../redux/actions/messageBoxAction';


const QuestionForm = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const { questions, isQuestionReady } = useSelector(state => state.question);
  const question = questions.find(que => que._id === questionId);
  const loading = useSelector(state => state.loading.show);

  const handleAnswerChange = (event, option) => {
    dispatch(changeUsersAnswer(question._id, option, event.target.checked));
  };

  const handleSubmitAnswer = (event) => {
    event.preventDefault();
    if (
      question.answerByUser.a ||
      question.answerByUser.b ||
      question.answerByUser.c ||
      question.answerByUser.d
    ) {
      dispatch(requestSubmitAnswer(question._id, question.answerByUser));
    } else {
      dispatch(showMessageBox(`Please select an answer!`, `danger`));
    }
  };

  if (isQuestionReady) {
    return (
      <SecureComponent component={
        <div>
          <MessageBox />
          <Jumbotron className="questionJumbotron">
            <h1>Question</h1>
            <h4 align="justify">
              {question ? question.problemStatement : ''}
            </h4>
            <br />
            <Form>
              <Table striped bordered hover responsive>
                <tbody>
                  <tr>
                    <td><Form.Check type="checkbox" onChange={(event) => handleAnswerChange(event, 'a')} /></td>
                    <td>{question.options.a}</td>
                  </tr>
                  <tr>
                    <td><Form.Check type="checkbox" onChange={(event) => handleAnswerChange(event, 'b')} /></td>
                    <td>{question.options.b}</td>
                  </tr>
                  <tr>
                    <td><Form.Check type="checkbox" onChange={(event) => handleAnswerChange(event, 'c')} /></td>
                    <td>{question.options.c}</td>
                  </tr>
                  <tr>
                    <td><Form.Check type="checkbox" onChange={(event) => handleAnswerChange(event, 'd')} /></td>
                    <td>{question.options.d}</td>
                  </tr>
                </tbody>
              </Table>
            </Form>
            {loading
              ? <Button variant="primary" disabled><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /></Button>
              : <Button variant="primary" onClick={handleSubmitAnswer}>Submit</Button>
            }
          </Jumbotron>
        </div>
      }
      />
    );
  } else {
    return <Redirect to='/questions' />
  }
};

export default QuestionForm;
