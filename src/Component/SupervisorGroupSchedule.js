import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { API_IP } from './Url';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SupervisorGroupSchedule() {
  const [meetingSchedule, setMeetingSchedule] = useState([]);
  const [inProgressIndex, setInProgressIndex] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedTimeOption, setSelectedTimeOption] = useState('immediate');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const user = global.user;

  const fetchMeetingData = () => {
    fetch(`http://${API_IP}/WaitingQueue/api/task/GetMeetingDataSup?supervisorId=${user?.S_Id}`)
      .then(response => response.json())
      .then(data => setMeetingSchedule(data))
      .catch(error => console.error('Error fetching data:', error));
  };
  useEffect(() => {
    if (user?.u_role === 'Supervisor') {
      fetchMeetingData();
    }
  }, [user]);
  return (
    <Container>
      <h1 className="text-center mt-4">Waiting Queue for Supervisor</h1>
      <div className="text-center">
    
        <h2>Group Meetings</h2> 

        <div className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              {/* <th>Student Name</th> */}
              <th>Time Left (min)</th>
            </tr>
          </thead>
          <tbody>
            {meetingSchedule.map((schedule, index) => (
              <tr key={index} >
                <td>{schedule.GId}</td>
                <td>{`${schedule.ProjectName} `}</td>
                {/* <td>{`${schedule.StudentName}`}</td> */}
                <td>{`${schedule.ModifiedTime} `}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
        </div>
        </Container>
         );
}

export default SupervisorGroupSchedule;
