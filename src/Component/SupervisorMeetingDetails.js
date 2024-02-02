import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_IP } from './Url';


function SupervisorMeetingDetails() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedTimeOption, setSelectedTimeOption] = useState('immediate');
  const [customTime, setCustomTime] = useState('');
  const [supervisorProjects, setSupervisorProjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const user = global.user;
  //const supervisorId = 13; // Replace with your actual supervisorId
  //(`http://${API_IP}/WaitingQueue/api/meetingdata/${supervisorId}`)

  useEffect(() => {
    console.log('useEffect is running',`http://${API_IP}/WaitingQueue/api/meeting/GetMeetingData?supervisorId=${user?.S_Id}`);
    async function fetchMeetingData() {
      try {
        const response = await fetch(`http://${API_IP}/WaitingQueue/api/meeting/GetMeetingData?supervisorId=${user?.S_Id}`,{
        
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        );
        console.log(JSON.stringify(response))
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
        
          setSupervisorProjects(data);
        } else {
          console.error('Failed to fetch meeting data from the API');
        }
      } catch (error) {
        console.error('An error occurred while fetching meeting data', error);
      }
    }
  
    if (user?.u_role === 'Supervisor') {
      console.log('Inside if statement');
      fetchMeetingData();
    }
  }, [user]);
  
  console.log('Supervisor Projects:', supervisorProjects);
  
  


  

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

  const handleCustomTimeChange = (event) => {
    setCustomTime(event.target.value);
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(`http://${API_IP}/WaitingQueue/api/MeetingRequest/PostMeetingRequest`, {
        SelectedGroups: selectedGroups,
        M_Id:34, // Replace with the actual M_Id,
        SelectedTimeOption: selectedTimeOption,
        SelectedTime: selectedTime,
        SelectedDate: selectedDate,
        // Add any other properties you want to send to the server
      });
  
      console.log('API Response:', response.data);
  
      // Close the modal
      setShowRequestModal(false);
    } catch (error) {
      console.error('Error sending request to the server', error);
      // Handle error as needed
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Waiting Queue for Supervisor</h1>
      <div className="text-center">
        <h2>Ongoing Meeting</h2>
        <div className="text-right">
          <Button
            variant="primary"
            size="lg"
            style={{ fontWeight: 'bold' }}
            onClick={handleRequestClick}
          >
            Request
          </Button>
        </div>
      </div>

      <div className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>#</th>
          <th>Project Name</th>
            <th>Time Left</th>
            <th>FYP</th>
            <th>Meeting Date</th>
          
          </tr>
        </thead>
        <tbody>
        {supervisorProjects.map((meeting, index) => (
  <tr key={index}>
    <td>{meeting.GId}</td>
    <td>{meeting.ProjectName ? meeting.ProjectName : 'N/A'}</td>
    <td>{meeting.ModifiedTime}</td>
    <td>{meeting.FYP != null ? meeting.FYP : 'N/A'}</td>
    <td>{new Date(meeting.ActualDate).toLocaleDateString()}</td>

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
          <Form>
            {/* Display supervisor group names with checkboxes */}
            {supervisorProjects.map((project) => (
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
        {/* <DatePicker
          selected={selectedTime}
          onChange={(time) => setSelectedTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm" // Use 24-hour format
        /> */}
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

export default SupervisorMeetingDetails;
