import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, Button } from 'react-bootstrap';
import { API_IP } from './Url';
import { FcAlarmClock } from "react-icons/fc";

function StudentPreviousScreen() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetingData, setMeetingData] = useState([]);
  const user = global.user;
  
  useEffect(() => {
    async function fetchMeetingData() {
      try {
        const response = await fetch(`http://${API_IP}/WaitingQueue/api/meeting/getpreviousmeetings?studentID=${user?.student_id}`);
        if (response.ok) {
          const data = await response.json();
          setMeetingData(data);
        } else {
          console.error('Failed to fetch meeting data from the API');
        }
      } catch (error) {
        console.error('An error occurred while fetching meeting data', error);
      }
    }

    if (user?.u_role === 'Student') {
      fetchMeetingData();
    }
  }, [user]);


  const handleDetailClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMeeting(null);
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Waiting Queue for Students</h1>
      <h2 className="text-center mt-1">Previous Meeting Record <FcAlarmClock /></h2>
      <Table striped bordered hover>
        <thead>
          <tr>
          
            <th>Student Name</th>
            <th>Project Name</th>
            <th>Meeting Date</th>
            {/* <th>Meeting Time</th> */}
            <th>Meeting Details</th>
          </tr>
        </thead>
        <tbody>
          {meetingData.map((meeting, index) => (
            <tr key={index}>
              
             <td>{meeting.student_name ? meeting.student_name : 'N/A'}</td>
             <td>{meeting.project_name ? meeting.project_name : 'N/A'}</td>



              <td>{meeting.date}</td> {/* Use date from the API */}
              {/* <td>{meeting.time}</td> Use time from the API */}
              <td>
                <Button variant="info" onClick={() => handleDetailClick(meeting)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for displaying meeting details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Meeting Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Meeting Remarks:</strong> {selectedMeeting?.remarks}
          </p>
          {/* Place the rest of the details you want to show here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default StudentPreviousScreen;
