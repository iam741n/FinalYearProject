import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BsAlarm } from "react-icons/bs";
import { API_IP } from './Url';

const SupervisorArrangeMeeting = () => {
const [meetingOptions, setMeetingOptions] = useState({
  title: '',
  description: '', // Added description state
  startTime: '',
  Session:'',
  days: 0,
  dates: '',
  slotSize: 0,
 // fyp: '' // Moved fyp state here
});

  const createMeeting = async () => {
    try {
      const apiUrl = `http://${API_IP}/WaitingQueue/api/Meeting/CreateMeeting`;
      const response = await axios.post(apiUrl, meetingOptions);

      if (response.status === 200) {
        console.log('Meeting created successfully');
        // Display an alert on meeting creation success
        alert('Meeting created successfully');
      } else {
        console.log(`Failed to create meeting. Error: ${response.status}`);
        // Display an alert on meeting creation failure
        alert(`Failed to create meeting. Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
      // Display an alert on meeting creation error
      alert('Error creating meeting. Please try again.');
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingOptions({
      ...meetingOptions,
      [name]: value,
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-4">Waiting Queue for Supervisor</h1>
      <h2 style={{ color: 'blue' }}>Create Meeting <BsAlarm /></h2>
      <div className="row">
        <div className="col-md-6">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={meetingOptions.title}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Description:</label> {/* Added description label */}
          <input
            type="text"
            name="description"
            value={meetingOptions.description}
            onChange={handleInputChange}
            className="form-control"
          />
           <label>Session:</label>
          <select
            name="Session"
            value={meetingOptions.Session}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Session</option>
            <option value="Fall-23">Fall-23</option>
            
          </select>
           <label>FYP:</label>
          {/* <select
            name="fyp"
            value={meetingOptions.fyp}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select FYP</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select> */}

          <label>Start Time:</label>
          <input
            type="text"
            name="startTime"
            value={meetingOptions.startTime}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Days:</label>
          <input
            type="number"
            name="days"
            value={meetingOptions.days}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Dates(yyyy-mm-dd,yyyy-mm-dd):</label>
          <input
            type="text"
            name="dates"
            value={meetingOptions.dates}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Slot Size:</label>
          <input
            type="number"
            name="slotSize"
            value={meetingOptions.slotSize}
            onChange={handleInputChange}
            className="form-control"
          />
          <button className="btn btn-primary mt-3" onClick={createMeeting}>
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupervisorArrangeMeeting;
