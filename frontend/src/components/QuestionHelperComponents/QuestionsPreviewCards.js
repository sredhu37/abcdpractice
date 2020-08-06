import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import greenTickIcon from '../../static/green-tick.png';
import redCrossIcon from '../../static/red-cross.png';
import yellowQuestionMarkIcon from '../../static/question-mark.png';

const QuestionsPreviewCards = () => {
  const { questions, isQuestionReady } = useSelector(state => state.question);

  const getPreviewCards = () => {
    return questions.map((que, index) => (
      <Col sm={4} xs={12} key={que._id}>
        <Card className="cardQuestion">
          <Card.Body>
            <Card.Title>
              Que {index+1}{' '}
              {
                que.state === 'UNATTEMPTED' ? 
                  <Image src={yellowQuestionMarkIcon} roundedCircle className="previewCardImage" /> :
                  (que.state === 'CORRECT' ? 
                    <Image src={greenTickIcon} roundedCircle className="previewCardImage" /> :
                    <Image src={redCrossIcon} roundedCircle className="previewCardImage" />
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