import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import greenTickIcon from '../../static/green-tick.png';
import redCrossIcon from '../../static/red-cross.png';
import yellowQuestionMarkIcon from '../../static/question-mark.png';
import grayIcon from '../../static/prohibited.png';

const QuestionsPreviewCards = () => {
  const history = useHistory();
  const { questions, isQuestionReady } = useSelector(state => state.question);

  const showQuestionForm = (event, questionId) => {
    history.push(`/question-form/${questionId}`);
  };

  const getPreviewCards = () => {
    return questions.map((que, index) => (
      <Col sm={4} xs={12} key={que._id}>
        <Card className="cardQuestion" onClick={(e) => showQuestionForm(e, que._id)}>
          <Card.Body>
            <Card.Title>
              Que {index+1}{' '}
              {
                que.state === 'UNATTEMPTED' ?
                  <Image src={yellowQuestionMarkIcon} roundedCircle className="previewCardImage" /> :
                  (que.state === 'CORRECT' ? 
                    <Image src={greenTickIcon} roundedCircle className="previewCardImage" /> :
                    (que.state === 'INCORRECT') ?
                      <Image src={redCrossIcon} roundedCircle className="previewCardImage" /> :
                      <Image src={grayIcon} roundedCircle className="previewCardImage" />
                  )
              }
            </Card.Title>
            <Card.Text>
              {
                (que.problemStatement.length > 50) ?
                que.problemStatement.substring(0, 50):
                que.problemStatement
              }...
            </Card.Text>
            <Card.Link as={Link} to={`/question-form/${que._id}`}><Button variant="success">Solve</Button></Card.Link>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  if (isQuestionReady) {
    return (
      <Container>
        <Row>
          { getPreviewCards() }
        </Row>
      </Container>
    );
  } else {
    return (
      <div>
        Please select proper values for Class, Subject and Chapter.
      </div>
    );
  }
};

export default QuestionsPreviewCards;