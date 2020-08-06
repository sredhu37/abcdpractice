import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SecureComponent from './SecureComponent';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const myUser = useSelector(state => state.user.myUser);
  const [ topLeaders, setTopLeaders ] = useState([]);

  const loadLeaders = () => {
    const result = topLeaders.map((user, index) => {
      const rank = index + 1;

      return(
        <tr key={user._id}>
          <td>{rank}</td>
          <td>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip>
                  {user.email}
                </Tooltip>
              }
            >
              <img src={user.pictureUrl} className="dashboardImg" alt="userPic"></img>
            </OverlayTrigger>
          </td>
          <td>{ " " + user.name }</td>
          <td>{user.totalScore}</td>
        </tr>
      );
    });

    return result;
  }

  const loadMyData = () => {
    const alreadyInTopLeaders = topLeaders.find(user => user._id === myUser._id);

    if(alreadyInTopLeaders) {
      return null;
    } else {
      return (
        <tr key={myUser._id}>
          <td>{myUser.rank}</td>
          <td>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip>
                  {myUser.email}
                </Tooltip>
              }
            >
              <img src={myUser.pictureUrl} className="dashboardImg" alt="userPic"></img>
            </OverlayTrigger>
          </td>
          <td>{ " " + myUser.name }</td>
          <td>{myUser.totalScore}</td>
        </tr>
      );
    }
  }

  useEffect(() => {
    const getTop10List = async () => {
      try {
        const top10Leaders = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/leaders`);
        console.log("Top leaders: ", top10Leaders.data);
        setTopLeaders(top10Leaders.data);
      } catch(error) {
        console.log("Unable to get top 10 list. Please inform Administrator immediately! Error: ", error);
      }
    };

    getTop10List();
  }, []);

  return(
    <SecureComponent component={
      <div>
        <Table striped bordered hover className="dashboardTable">
          <thead>
            <tr>
              <th>#</th>
              <th> </th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loadLeaders()}
            {loadMyData()}
          </tbody>
        </Table>
      </div>
    } />
  );
};

export default Dashboard;
