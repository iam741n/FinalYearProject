import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_IP } from './Url';
import { Link } from 'react-router-dom';

function QueueHandlerMeetingsDone() {
    const [selectedDate, setSelectedDate] = useState(new Date("2024-01-16"));
    const [loading, setLoading] = useState(true);
    const [meetingSchedule, setMeetingSchedule] = useState([]);
    const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
    const [showGroupMembersModal, setShowGroupMembersModal] = useState(false);
    const [groupInfo, setGroupInfo] = useState(null);
    useEffect(() => {
        // Fetch meeting schedule data
        const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
        fetch(`http://${API_IP}/WaitingQueue/api/Student/GetMeetingsDone?dt=${formattedDate}`)
        .then((response) => response.json())
        .then((data) => {
        setMeetingSchedule(data);
        setLoading(false);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
        });
        }, [selectedDate]);

        const yourMeetingId = 31;
const handleProcessClick = (gaId) => {
fetch(`http://${API_IP}/WaitingQueue/api/supervisor/GetGroupMembersByGAId?gaId=${gaId}`)
.then((response) => response.json())
.then((groupInfo) => {
setSelectedGroupMembers([]);
setShowGroupMembersModal(true);
setGroupInfo(groupInfo);
})
.catch((error) => {
console.error('Error fetching group members:', error);
// Handle error state or show a notification
});
};

    return(
        <Container>
              <div className="text-center mb-3"> {/* Add margin-bottom (mb-3) for some space */}
    <Link to='/QueueHandler'>
      <Button variant='secondary'>Back</Button>
    </Link>
  </div>
        <h1 className="text-center mt-4">Waiting Queue for QueueHandler</h1>

          <h2 className="text-center mt-4">Meetings Done</h2>

          
<div>
          <DatePicker
selected={selectedDate}
onChange={(date) => setSelectedDate(date)}
dateFormat="yyyy-MM-dd"
/>
</div>



          <Modal show={showGroupMembersModal} onHide={() => setShowGroupMembersModal(false)}>
<Modal.Header closeButton>
<Modal.Title>Meetings completed</Modal.Title>
</Modal.Header>
<Modal.Body>
{groupInfo && (
<div>
<h5 style={{ color: 'green' }}>Supervisor: {groupInfo.SupervisorName}</h5>
<h6>Project Allocated: {groupInfo.ProjectAllocated}</h6>

{/* <h6>FYP: {groupInfo.FYP}</h6> */}
{groupInfo.GroupMembers.map((member) => (
<div key={member.student_id}>
{/* <input
type="checkbox"
id={`checkbox-${member.student_id}`}
checked={selectedGroupMembers.includes(member.student_id)}
onChange={() => handleCheckboxChange(member.student_id)}
/> */}
<label htmlFor={`checkbox-${member.student_id}`}>
{member.name} - {member.Regno}
</label>
</div>
))}
</div>
)}
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={() => setShowGroupMembersModal(false)}>
Close
</Button>
{/* <Button variant="primary" onClick={handleGroupMembersSubmit}>
Submit
</Button> */}
</Modal.Footer>
</Modal>
        <Table>
            <thead>
        <tr>
        <th>#</th>
        <th>Project Name</th>
        <th>Time Left</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody>
{loading ? (
<tr>
<td colSpan="4" className="text-center">
Loading...
</td>
</tr>
) : (
meetingSchedule.map((row, index) => (
<tr key={row.Id} >
<td>{row.g_id}</td>
<td>{row.project_name} </td>
<td>{row.ModifiedTime}</td>
<td>
{/* onClick={() => handleProcessClick(row.g_id)} */}
<Button variant="success" onClick={() => handleProcessClick(row.g_id)} >
Processed
</Button>
</td>
</tr>
))
)}
</tbody>
        </Table>
        </Container>
    );
    }
export default QueueHandlerMeetingsDone;