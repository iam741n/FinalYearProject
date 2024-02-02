import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { API_IP } from './Url';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function StudentOngoingScreen() {
  const [meetingSchedule, setMeetingSchedule] = useState([]);
  const [inProgressIndex, setInProgressIndex] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedTimeOption, setSelectedTimeOption] = useState('immediate');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const user = global.user;

  const fetchMeetingData = () => {
    fetch(`http://${API_IP}/WaitingQueue/api/student/StudentOngoingMeeting?GA_id=${user?.GA_id}&dt=2024-03-06`)
      .then(response => response.json())
      .then(data => setMeetingSchedule(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    if (user?.u_role === 'Student') {
      fetchMeetingData();
    }
  }, [user]);

  const handleRequestClick = () => {
    setShowRequestModal(true);
  };

  const handleCheckboxChange = (groupId) => {
    const updatedGroups = [...selectedGroups];

    if (updatedGroups.includes(groupId)) {
      updatedGroups.splice(updatedGroups.indexOf(groupId), 1);
    } else {
      updatedGroups.push(groupId);
    }

    setSelectedGroups(updatedGroups);
  };

  const handleTimeOptionChange = (option) => {
    setSelectedTimeOption(option);
  };
  
  const handleSendRequest = async () => {
    try {
      const response = await fetch(`http://${API_IP}/WaitingQueue/api/MeetingRequest/PostMeetingRequestStudent?GA_id=${user?.GA_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SelectedGroups: selectedGroups,
          M_Id: 37, // Replace with the actual M_Id,
          SelectedTimeOption: selectedTimeOption,
          SelectedTime: selectedTime,
          SelectedDate: selectedDate,
          
          // Add any other properties you want to send to the server
        }),
      });
  
      const data = await response.json();
      console.log('API Response:', data);
  
      // Close the modal
      setShowRequestModal(false);
    } catch (error) {
      console.error('Error sending request to the server', error);
      // Handle error as needed
    }
  };
  
  // Move useEffect outside of the catch block
  useEffect(() => {
    if (user?.u_role === 'Student') {
      fetchMeetingData();
    }
  }, [user]);
  
  const filteredProjects = meetingSchedule.filter(project => project.GId === user?.GA_id);
// Debugging: Log the data to the console
console.log('meetingSchedule:', meetingSchedule);
console.log('filteredProjects:', filteredProjects);

  return (
    <Container>
      <h1 className="text-center mt-4">Waiting Queue for Student</h1>
      <div className="text-center">
    
        <h2>Ongoing Meeting</h2>
        <Button
          variant="primary"
          size="lg"
          style={{ fontWeight: 'bold' }}
          onClick={handleRequestClick}
        >
          Request
        </Button>
      </div>

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
              <tr key={index} className={index === inProgressIndex ? "table-primary" : ""}>
                <td>{schedule.GId}</td>
                <td>{`${schedule.ProjectName} ${schedule.IsYourGroup ? "(YOUR GROUP)" : ""} ${index === inProgressIndex ? "(In Progress)" : ""}`}</td>
                {/* <td>{`${schedule.StudentName}`}</td> */}
                <td>{`${schedule.ModifiedTime} `}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Request Modal */}
      <Modal show={showRequestModal} onHide={() => setShowRequestModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Request Meeting</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Display GA_id in the modal body */}
    <p>Your GA_id: {user?.GA_id}</p>

    <Form>
      {/* Display supervisor group names with checkboxes */}
      {filteredProjects.map((project) => (
  <Form.Check
    key={project.GId}
    type="checkbox"
    id={`group-${project.GId}`}
    label={project.ProjectName}
    checked={selectedGroups.includes(project.GId)}
    onChange={() => handleCheckboxChange(project.GId)}
  />
))}

      {/* Time options */}
      <Form.Check
        type="radio"
        label="Immediate"
        name="timeOption"
        id="immediate"
        checked={selectedTimeOption === 'immediate'}
        onChange={() => handleTimeOptionChange('immediate')}
      />
      {/* Conditional rendering of time picker for Immediate requests */}
      {selectedTimeOption === 'immediate' && (
        <Form.Group>
          <Form.Label>Select Time for Immediate Request</Form.Label>
          <DatePicker
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm" // Use 24-hour format
          />
        </Form.Group>
      )}

      <Form.Check
        type="radio"
        label="Specific Time"
        name="timeOption"
        id="specific"
        checked={selectedTimeOption === 'specific'}
        onChange={() => handleTimeOptionChange('specific')}
      />

      {/* Date Picker */}
      <Form.Group>
        <Form.Label>Select Date</Form.Label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </Form.Group>

      {/* Time Picker */}
      <Form.Group>
        <Form.Label>Select Time</Form.Label>
        <DatePicker
          selected={selectedTime}
          onChange={(time) => setSelectedTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm" // Use 24-hour format
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowRequestModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleSendRequest}>
      Send Request
    </Button>
  </Modal.Footer>
</Modal>
    </Container>
  );
}

export default StudentOngoingScreen;
