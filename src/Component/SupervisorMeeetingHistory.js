import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import { API_IP } from './Url';

const SupervisorMeetingHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [supervisorName, setSupervisorName] = useState('');
  const [projects, setProjects] = useState([]);
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
const [selectedMeetings, setSelectedMeetings] = useState([]);
  const user = global.user;

  useEffect(() => {
    if (user?.u_role === 'Supervisor') {
      fetch(`http://${API_IP}/WaitingQueue/api/supervisor/GetSupervisorAndGroups?sId=${user?.S_Id}`)
        .then((response) => response.json())
        .then((data) => {
          setSupervisorName(data[0]?.SupervisorName);
          setProjects(data);
        })
        .catch((error) => {
          console.error('Error fetching project data:', error);
        });
    }
  }, [user]);

  const handleProjectClick = (project) => {
    // Pick GA_id from the first Groupmembers entry
    const firstGroupmember = project.Groupmembers[0];
    const GA_id = firstGroupmember ? firstGroupmember.GA_id : null;
  
    console.log('Selected Project:', project);
    console.log('GA_id:', GA_id);
  
    setSelectedProject(project);
    
    // Check if GA_id is defined before making the API call
    if (GA_id) {
      fetchMeetingHistory(GA_id);
      setShowModal(true);
    } else {
      console.error('GA_id is undefined.');
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const meetingsForDate = meetingHistory.find((meeting) => meeting.Date === date);
    setSelectedMeetings(meetingsForDate?.Meetings || []);
  };
  
  

  const fetchMeetingHistory = (GA_id) => {
    fetch(`http://${API_IP}/WaitingQueue/api/meeting/GetPreviousMeetingsbyGroups?GA_id=${GA_id}`)
      .then((response) => response.json())
      .then((data) => {
        setMeetingHistory(data);
      })
      .catch((error) => {
        console.error('Error fetching meeting history data:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Waiting Queue for Supervisor</h1>
      <h2 className="text-center mt-2">Meeting History</h2>
      <h3 className="text-center mt-2" style={{ color: 'Green' }}>Supervisor: {supervisorName}</h3>
      <div className="d-flex flex-column align-items-center">
        {projects.map((project, index) => (
          <div key={index} className="mb-3">
            <Button variant="primary" onClick={() => handleProjectClick(project)}>
              {project.ProjectAllocated}
            </Button>
          </div>
        ))}
      </div>

   
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Meeting History for {selectedProject?.ProjectAllocated}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {Array.isArray(meetingHistory) && meetingHistory.length > 0 ? (
      <>
        <div className="mb-3">
          <h4>Dates:</h4>
          {meetingHistory.map((meeting, index) => (
            <Button
              key={index}
              variant="outline-primary"
              onClick={() => handleDateClick(meeting.Date)}
              className="mr-2 mb-2"
            >
              {meeting.Date}
            </Button>
          ))}
        </div>
        <div className="mb-3">
          <h4>Selected Date: {selectedDate}</h4>
          {selectedMeetings.map((details, idx) => (
            <ListGroup key={idx}>
              <ListGroupItem>
                <strong>Student Name:</strong> {details.student_name}<br />
                <strong>Remarks:</strong> {details.remarks}<br />
                <strong>Attendance:</strong> {details.Attendance}
              </ListGroupItem>
            </ListGroup>
          ))}
        </div>
      </>
    ) : (
      <p>No meeting history available.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default SupervisorMeetingHistory;
