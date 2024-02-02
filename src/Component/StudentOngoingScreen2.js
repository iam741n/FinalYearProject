import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_IP } from './Url';
import { FcAlarmClock } from "react-icons/fc";

// Define fetchMeetingData outside the component
const fetchMeetingData = async (user, setQueuePosition, setGroupsBeforeYou, setExpectedMeetingTime, setActualTime, setProjectName) => {
  try {
    const response = await fetch(`http://${API_IP}/WaitingQueue/api/student/CalculateOngoingMeeting?GA_id=${user?.GA_id}&dt=2024-03-06`);
    const data = await response.json();

    // Update state with data from the API response
    setQueuePosition(data.QueuePosition);
    setGroupsBeforeYou(data.GroupsBeforeYou);
    setExpectedMeetingTime(data.ExpectedMeetingTime);
    setActualTime(data.ActualTime);
    setProjectName(data.ProjectName);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function App() {
  const [queuePosition, setQueuePosition] = useState(0);
  const [groupsBeforeYou, setGroupsBeforeYou] = useState(0);
  const [expectedMeetingTime, setExpectedMeetingTime] = useState(null);
  const [actualTime, setActualTime] = useState(null);
  const [projectName, setProjectName] = useState("");
  const user = global.user;

  // useEffect for fetching data initially
  useEffect(() => {
    if (user?.u_role === 'Student') {
      fetchMeetingData(user, setQueuePosition, setGroupsBeforeYou, setExpectedMeetingTime, setActualTime, setProjectName);
    }
  }, [user]);

  // useEffect for periodic data fetching
  useEffect(() => {
    const fetchData = () => {
      if (user?.u_role === 'Student') {
        fetchMeetingData(user, setQueuePosition, setGroupsBeforeYou, setExpectedMeetingTime, setActualTime, setProjectName);
      }
    };

    // Set up an interval to periodically fetch data
    const interval = setInterval(fetchData, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [user]);

  const textStyle = {
    margin: '1em 0',
  };

  return (
    <div className="container text-center">
      <h1>Waiting Queue for Student</h1>
      <hr />
      <h2 style={{ color: 'blue' }}>Ongoing Screen <FcAlarmClock /></h2>
      {/* <h3>{projectName}</h3> */}
      <h3 style={textStyle}>Your turn in Queue: {queuePosition}</h3>
      <h4 style={textStyle}>Groups before you: {groupsBeforeYou}</h4>
      <h4 style={textStyle}>Current Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
      <h4 style={textStyle}>Expected Meeting Time: {expectedMeetingTime }</h4>
      <h4 style={textStyle}>Actual Time: {actualTime }</h4>
      <Link to='/StudentOngoingScreen'>
        <button className="btn btn-primary mt-3">View Details</button>
      </Link>
      
    </div>
  );
}

export default App;
