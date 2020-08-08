import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SecureComponent from './SecureComponent';

const Profile = () => {
  const myUser = useSelector(state => state.user.myUser);

  return(
    <SecureComponent component={
      <div>
        <Container>
          <Row>
            <Col xs={1} sm={3} />
            <Col xs={10} sm={6}>
            <Card className="profileCard">
              <Card.Img variant="top" src={ myUser.pictureUrl } className="profileImage" />
              <Card.Body>
                <Card.Title>{ myUser.email }</Card.Title>
                <Card.Text>
                  My total score: { myUser.totalScore }
                </Card.Text>
                <Link to="/dashboard">
                  <Button variant="primary">Check your rank</Button>
                </Link>
              </Card.Body>
            </Card>
            </Col>
            <Col xs={1} sm={3} />
          </Row>
        </Container>
      </div>
    } />
  );
};

export default Profile;
