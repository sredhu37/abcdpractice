import React, { useState } from 'react';
import { Navbar, Nav, Form, Image, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import personPic from '../static/nopic.png';
import logoPic from '../static/logo.png';
import { userLoggedOut } from '../redux/actions/userAction';

const NavBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const myUser = useSelector(state => state.user.myUser);
  const loading = useSelector(state => state.loading.show);
  const [ expandedNavBar, setExpandedNavBar ] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();

    // set isLoggedIn to false
    dispatch(userLoggedOut());

    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google/login`, "_self");
  };

  if(isLoggedIn) {
    return (
      <Navbar
        className="color-navbar"
        expand="lg"
        expanded={expandedNavBar}
        onClick={() => {setExpandedNavBar(!expandedNavBar)}}
      >
        <Link to="/">
          <Navbar.Brand>
            <Image
              src={logoPic}
              className="logoPic"
            />
          </Navbar.Brand>
        </Link>
        <Nav className="mr-auto" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/questions'><span className="color-nav">Questions</span></Nav.Link>
            <Nav.Link as={Link} to='/dashboard'><span className="color-nav">Dashboard</span></Nav.Link>
            {
              myUser.role === 'ADMIN' ?
                <Nav.Link as={Link} to='/upload-questions'>
                  <span className="color-nav">Upload Questions</span>
                </Nav.Link>
              :
                ''
            }
          </Nav>
          <Form inline>
            <Nav className="mr-auto">
              <Link to='/profile'>
                <Image
                  src={myUser.pictureUrl ? myUser.pictureUrl : personPic}
                  roundedCircle
                  className="personPic"
                />
              </Link>
            </Nav>
            <Nav className="mr-auto">
              {loading 
                ? <Button variant="danger" disabled><Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /></Button>
                : <Button variant="danger" onClick={handleLogout}>Logout</Button>
              }

            </Nav>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="color-navbar" expand="lg">
        <Link to="/">
          <Navbar.Brand>
            <Image
              src={logoPic}
              className="logoPic"
            />
          </Navbar.Brand>
        </Link>
        <Nav className="mr-auto" />
        <Form inline>
          <Nav className="mr-auto">
            {loading 
              ? <Button variant="warning" disabled><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /></Button>
              : <Button variant="warning" onClick={handleLogin}>Login</Button>
            }
          </Nav>
        </Form>
      </Navbar>
    ); 
  }
};

export default NavBar;