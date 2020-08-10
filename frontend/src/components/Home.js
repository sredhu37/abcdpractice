import React, { useEffect } from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { requestGetLoggedInUser } from '../redux/actions/userAction';

const Home = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    const getProfile = async () => {
      if(!isLoggedIn) {
        dispatch(requestGetLoggedInUser());
      }
    };

    getProfile();
  });

  return(
    <div>
      <Container>
        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Accordion defaultActiveKey="0" className="homeAccordian">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className='accordian'>
                  What is this app about?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>
                      We believe that improving oneself is a continuous process.
                      Hence, we have come up with a simple concept to improve one's problem solving skill.
                      That is, just solve <b>FIVE QUESTIONS PER DAY</b>.
                    </p>
                    <p>
                      By following this principle, you will not feel overwhelmed and you will learn something new everyday.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2" className='accordian'>
                  How to use this app?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <ul>
                      <li>
                        To login, all you need is a Gmail account.
                      </li>
                      <li>
                        You can click on the <b>Questions</b> tab to attempt questions for the day.
                      </li>
                      <li>
                        For every correct answer, you get 1 point. No negative marking.
                      </li>
                      <li>
                        <b>Dashboard</b> will show the top scorers' list. You can check your current rank there.
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3" className='accordian'>
                  How to contact the developer?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    Please reach out to us at <b><i>abcdpractice1234@gmail.com</i></b> in any of the following cases:
                    <ul>
                      <li>
                        You have good interesting problems that you want to be featured on this app.
                      </li>
                      <li>
                        You want a new feature to be added here.
                      </li>
                      <li>
                        There is a bug in this app.
                      </li>
                      <li>
                        Or just to say Hi!
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4" className='accordian'>
                  In the end, I would like to say:
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    <h4>Chalo Sawaal Banate Hain</h4>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col xs={1} />
        </Row>
      </Container>
    </div>
  );
};

export default Home;