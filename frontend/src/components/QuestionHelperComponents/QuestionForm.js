import React from 'react';
import { useParams, Redirect, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Jumbotron, Button, Form, Table, Spinner } from 'react-bootstrap';
import MessageBox from '../MessageBox';
import SecureComponent from '../SecureComponent';
import { changeUsersAnswer, requestSubmitAnswer } from '../../redux/actions/questionAction';
import { showMessageBox } from '../../redux/actions/messageBoxAction';
import { showPrompt } from '../../redux/actions/promptAction';
import Prompt from '../QuestionHelperComponents/Prompt';

const QuestionForm = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const { questions, isQuestionReady } = useSelector(state => state.question);
  const question = questions.find(que => que._id === questionId);
  const loading = useSelector(state => state.loading.show);
  const messageBoxVariant = useSelector(state => state.messageBox.variant);
  const history = useHistory();

  const handleAnswerChange = (event, option) => {
    dispatch(changeUsersAnswer(question._id, option, event.target.checked));
  };

  const handleShowAnswer = () => {
    dispatch(showPrompt());
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

  const onMessageBoxClose = () => {
    if (messageBoxVariant.toString().trim() === 'success') {
      history.push(`/questions`);
    }
  };

  if (isQuestionReady) {
    return (
      <SecureComponent component={
        <div>
          <MessageBox onClose={onMessageBoxClose} />
          <Prompt questionId={questionId} />
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
                    <td className={question.answer.a ? "correctAnswerRow": ""}>{question.options.a}</td>
                  </tr>
                  <tr>
                    <td><Form.Check type="checkbox" onChange={(event) => handleAnswerChange(event, 'b')} /></td>
                    <td className={question.answer.b ? "correctAnswerRow": ""}>{question.options.b}</td>
                  </tr>
                  <tr>
                    <td><Form.Check type="checkbox" onChange={(event) => handleAnswerChange(event, 'c')} /></td>
                    <td className={question.answer.c ? "correctAnswerRow": ""}>{question.options.c}</td>
                  </tr>
                  <tr>
                    <td><Form.Check type="checkbox" onChange={(event) => handleAnswerChange(event, 'd')} /></td>
                    <td className={question.answer.d ? "correctAnswerRow": ""}>{question.options.d}</td>
                  </tr>
                </tbody>
              </Table>
            </Form>
            {loading
              ? <Button variant="success" disabled><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /></Button>
              : <Button
                variant={question.state === 'ANSWER_VIEWED' || question.state === 'CORRECT' ? "secondary" : "success"}
                onClick={handleSubmitAnswer}
                disabled={question.state === 'ANSWER_VIEWED' || question.state === 'CORRECT'}
                >Submit</Button>
            }
            {loading
              ? <Button variant="danger" disabled><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /></Button>
              : <Button
                variant={question.state === 'ANSWER_VIEWED' || question.state === 'CORRECT' ? "secondary" : "danger"}
                onClick={handleShowAnswer}
                disabled={question.state === 'ANSWER_VIEWED' || question.state === 'CORRECT'}
              >Show Answer</Button>
            }
            {loading
              ? <Button variant="warning" disabled><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /></Button>
              : <Link to={'/questions'}><Button variant="warning">Back to Questions</Button></Link>
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
