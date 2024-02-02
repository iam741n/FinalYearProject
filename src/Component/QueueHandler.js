import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { API_IP } from './Url';

function QueueHandler() {
const [showDelayModal, setShowDelayModal] = useState(false);
const [delayOption, setDelayOption] = useState('sameDay');
const [delayMinutes, setDelayMinutes] = useState('');
const [delayDate, setDelayDate] = useState(new Date());
const [shiftToStart, setShiftToStart] = useState(false);
const [shiftToEnd, setShiftToEnd] = useState(false);
const [meetingSchedule, setMeetingSchedule] = useState([]);
// Add this state to your QueueHandler component
const [actualDate, setActualDate] = useState(new Date());
const [showGenderPopup, setShowGenderPopup] = useState(false);
const [selectedGender, setSelectedGender] = useState('');

const [loading, setLoading] = useState(true);
const [inProgressIndex, setInProgressIndex] = useState(0);
const [selectedTime, setSelectedTime] = useState('');
const [showProjectModal, setShowProjectModal] = useState(false);
const [projectNameInput, setProjectNameInput] = useState('');
const [showSupervisorModal, setShowSupervisorModal] = useState(false);
const [supervisorData, setSupervisorData] = useState([]);
const [selectedSupervisor, setSelectedSupervisor] = useState(null); // New state to track selected supervisor
const [selectedGroup, setSelectedGroup] = useState(null);
const [showGroupMembersModal, setShowGroupMembersModal] = useState(false); // Add this line
const [groupInfo, setGroupInfo] = useState(null);
const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
const [selectedDate, setSelectedDate] = useState(new Date("2024-01-18"));



useEffect(() => {
// Fetch meeting schedule data
const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
fetch(`http://${API_IP}/WaitingQueue/api/Student/GetMeetingSChedule?dt=${formattedDate}`)
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

const handleProjectOptionClick = () => {
setShowProjectModal(true);
};

const handleProjectNameInputChange = (e) => {
setProjectNameInput(e.target.value);
};
// Add this function to your QueueHandler component
const handleActualDateChange = (date) => {
setActualDate(date);
};




const handleProjectSubmit = () => {
// Perform the API call with the entered project name
fetch(`http://${API_IP}/WaitingQueue/api/QueueHandler/OnTopByProject?meetingid=34&projectname=${projectNameInput}&dated=2024-01-18`)
.then((response) => response.json())
.then((data) => {
console.log('API Response:', data);
setMeetingSchedule(data);
setLoading(false);
setShowProjectModal(false);
})

.catch((error) => {
console.error('Error fetching data:', error);
setLoading(false);
setShowProjectModal(false); // Close the modal if an error occurs
});
};



const handleSortByGender = () => {
    // Open the gender popup
    setShowGenderPopup(true);
  };
  const handleGenderSelect = (gender) => {
    // Close the gender popup
    setShowGenderPopup(false);
  
    // Set the selected gender to the variable
    setSelectedGender(gender);
  
    // Now you can use the selectedGender variable where needed
    const meetingId = 34; // Replace with your actual meeting ID
    const currentDate = new Date();
  
    // Format the current date as "YYYY-MM-DD"
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  
    // Fetch data based on gender sorting using the new API endpoint
    fetch(`http://${API_IP}/WaitingQueue/api/QueueHandler/OnTopByGender?meetingid=${meetingId}&gender=${selectedGender}&dated=2024-01-18`)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
  
        // Check if data is an array, if not, transform it into an array
        const meetingData = Array.isArray(data) ? data : [data];
  
        setMeetingSchedule(meetingData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  


const handleDelayClick = () => {
setShowDelayModal(true);
};
const handleSortBySupervisor = (supervisorId) => {
const meetingId = 34; // Replace with your actual meeting ID
const currentDate = new Date(); // You may need to adjust this based on your requirements

// Format the current date as "YYYY-MM-DD"
const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

// Fetch data based on supervisor sorting using the new API endpoint
fetch(`http://${API_IP}/WaitingQueue/api/QueueHandler/OnTopBySupervisor?meetingid=${meetingId}&supervisorId=${supervisorId}&dated=2024-01-18`)
.then((response) => response.json())
.then((data) => {
console.log('API Response:', data);

// Check if data is an array, if not, transform it into an array
const meetingData = Array.isArray(data) ? data : [data];

setMeetingSchedule(meetingData);
setLoading(false);
})
.catch((error) => {
console.error('Error fetching data:', error);
setLoading(false);
});
};

const handleSupervisorOptionClick = () => {
fetch(`http://${API_IP}/WaitingQueue/api/Student/SortBySupervisor`)
.then((response) => response.json())
.then((data) => {
setSupervisorData(data);
setShowSupervisorModal(true);
})
.catch((error) => {
console.error('Error fetching supervisor data:', error);
// Handle error state or show a notification
});
};

const handleSupervisorClick = (supervisorId) => {
// Set the selected supervisor when a supervisor button is clicked
setSelectedSupervisor(supervisorId);
// setSelectedGroup(null); // Reset selected group when a new supervisor is clicked
console.log('sid:', supervisorId);

// Call the function to fetch data based on the selected supervisor
handleSortBySupervisor(supervisorId); // Make sure supervisorId is not undefined here
};


const handleGroupClick = (groupId) => {
// Set the selected group when a group button is clicked
setSelectedGroup(groupId);
};
// const handleSupervisorClick = (supervisorId) => {
// // Fetch projects allocated to the selected supervisor
// fetch(`http://${API_IP}/WaitingQueue/api/Supervisor/${supervisorId}/Projects`)
// .then((response) => response.json())
// .then((projects) => {
// // Display projects allocated to the supervisor
// console.log('Projects for supervisor:', projects);
// // Perform actions to display projects in a modal or UI component
// })
// .catch((error) => {
// console.error('Error fetching projects:', error);
// // Handle error state or show a notification
// });
// };


const handleDelayOptionChange = (option) => {
setDelayOption(option);
setSelectedTime('');
// Add logic for handling delay option change...

};

const handleDelayMinutesChange = (e) => {
setDelayMinutes(e.target.value);
// Add logic for handling delay minutes change...
};
const handleTimeChange = (time) => {
setSelectedTime(time.format('HH:mm'));
};

const handleDelayDateChange = (date) => {
setDelayDate(date);
// Add logic for handling delay date change...
};

const handleShiftToStartChange = () => {
setShiftToStart(!shiftToStart);
// Add logic for handling shift to start change...
};

const handleShiftToEndChange = () => {
setShiftToEnd(!shiftToEnd);
// Add logic for handling shift to end change...
};

const handleDelayMeeting = () => {
// Parse the date from the database format ("YYYY-MM-DD") to a JavaScript Date object
const parsedDate = new Date(delayDate);

console.log('date------parse-date',JSON.stringify(delayDate))
console.log('date------parse-date',parsedDate.getFullYear())
console.log('date------parse-date',parsedDate.getMonth())
console.log('date------parse-date',parsedDate.getDate())

let newDate = `${parsedDate.getFullYear()}-${parsedDate.getMonth()+1}-${parsedDate.getDate()}`
console.log('new date ---------', newDate)
const formattedActualDate = `${actualDate.getFullYear()}-${(actualDate.getMonth() + 1)
.toString()
.padStart(2, '0')}-${actualDate.getDate().toString().padStart(2, '0')}`;
// Format the parsed date to "YYYY-MM-DD"
const formattedDelayDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
.toString()
.padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;

const delayRequest = {
DelayOption: delayOption,
DelayMinutes: delayMinutes,
DelayDate: newDate,
// actualDate:formattedActualDate
// Add other necessary properties according to your MeetingSchedule object

};
const delayRequest2 = {
DelayOption: delayOption,
// DelayMinutes: delayMinutes,
DelayDate: newDate,
actualDate:formattedActualDate
// Add other necessary properties according to your MeetingSchedule object

};
if (delayOption === 'otherDay') {
// Send a POST request to the API endpoint only for 'otherDay' option
fetch(`http://${API_IP}/WaitingQueue/api/Delaymeeting/DelayByOtherDayToEnd`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(delayRequest2),
})
.then((response) => {
if (response.ok) {
// Handle success response
console.log('Meeting delayed successfully');
// You might want to update the meeting schedule here after a successful delay
setShowDelayModal(false); // Close the modal after a successful delay
} else {
// Handle error or invalid response
console.error('Error delaying meeting:', response.statusText);
// You might want to display an error message or handle the error state
}
})
.catch((error) => {
console.error('Error delaying meeting:', error);
// Handle network errors or exceptions
// You might want to display an error message or handle the error state
});
} else {
// Handle the case when delayOption is not 'otherDay'
// You might want to show a message or take other actions as needed
console.log('Delay not supported for the selected option:', delayOption);
// Send a POST request to the API endpoint
fetch(`http://${API_IP}/WaitingQueue/api/Delaymeeting/DelayMeetingsByDate`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(delayRequest),
})
.then((response) => {
if (response.ok) {
// Handle success response
console.log('Meeting delayed successfully');
// You might want to update the meeting schedule here after successful delay
setShowDelayModal(false); // Close the modal after successful delay
} else {
// Handle error or invalid response
console.error('Error delaying meeting:', response.statusText);
// You might want to display an error message or handle the error state
}
})
.catch((error) => {
console.error('Error delaying meeting:', error);
// Handle network errors or exceptions
// You might want to display an error message or handle the error state
});
}

};


// Functions for handling various actions

// const handleRemoveRow = (id) => {
// const meetingItem = meetingSchedule.find((item) => item.Id === id);

// const newTime = prompt('Enter new time (HH:mm:ss):', meetingItem.ModifiedTime);

// if (newTime !== null) {
// fetch(`http://${API_IP}/WaitingQueue/api/Student/ProcessMeeting?scheduleId=${id}&time=${newTime}`, {
// method: 'GET',
// })
// .then((response) => response.json())
// .then((data) => {
// const updatedSchedule = meetingSchedule.map((item) => (item.Id === id ? data : item));
// setMeetingSchedule(updatedSchedule);
// })
// .catch((error) => {
// console.error('Error processing meeting:', error);
// });
// }
// };
const yourMeetingId = 34;
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

const handleGroupMembersSubmit = () => {
// Use groupInfo to get the group members for constructing unselectedGroupMembers
const groupMembers = groupInfo?.GroupMembers || [];

// Prepare the payload for the API call
const attendancePayload = selectedGroupMembers.map((studentId) => ({
id: studentId,
status: 'P', // Assuming 'P' represents present for selected group members
}));

// Include unselected group members with status 'A' (absent)
// Only include those group members that are not selected
const unselectedGroupMembers = groupMembers
.filter((member) => !selectedGroupMembers.includes(member.student_id))
.map((member) => ({
id: member.student_id,
status: 'A',
}));

let ga_id = groupInfo["GroupMembers"][0]["GA_id"]
console.log('attendance paylioad ', ga_id)

const combinedPayload = [...attendancePayload, ...unselectedGroupMembers];

// Send a POST request to the API endpoint
fetch(`http://${API_IP}/WaitingQueue/api/Supervisor/SaveGroupMembersAttendance?mId=${yourMeetingId}&gid=${ga_id}`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(
combinedPayload,
),
})
.then((response) => {
if (response.ok) {
// Handle success response
console.log('Meeting attendance submitted successfully');
} else {
// Handle error or invalid response
console.error('Error submitting meeting attendance:', response.statusText);
}
})
.catch((error) => {
console.error('Error submitting meeting attendance:', error);
// Additional logging or error handling if needed
});


};
const handleCheckboxChange = (studentId) => {
// Toggle the selected state of the checkbox based on studentId
setSelectedGroupMembers((prevSelected) => {
if (prevSelected.includes(studentId)) {
// If already selected, remove from the list
return prevSelected.filter((id) => id !== studentId);
} else {
// If not selected, add to the list
return [...prevSelected, studentId];
}
});
};


return (
<Container>
<h1 className="text-center mt-4">Waiting Queue for QueueHandler</h1>
<div className="text-center">
<h2>Ongoing Meeting</h2>
<div className="d-flex justify-content-between align-items-center">
<Modal show={showGroupMembersModal} onHide={() => setShowGroupMembersModal(false)}>
<Modal.Header closeButton>
<Modal.Title>Group Members</Modal.Title>
</Modal.Header>
<Modal.Body>
{groupInfo && (
<div>
<h5 style={{ color: 'green' }}>Supervisor: {groupInfo.SupervisorName}</h5>
<h6>Project Allocated: {groupInfo.ProjectAllocated}</h6>

{/* <h6>FYP: {groupInfo.FYP}</h6> */}
{groupInfo.GroupMembers.map((member) => (
<div key={member.student_id}>
<input
type="checkbox"
id={`checkbox-${member.student_id}`}
checked={selectedGroupMembers.includes(member.student_id)}
onChange={() => handleCheckboxChange(member.student_id)}
/>
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
<Button variant="primary" onClick={handleGroupMembersSubmit}>
Submit
</Button>
</Modal.Footer>
</Modal>

<Dropdown>
<Dropdown.Toggle variant="secondary">
Prioritize by
</Dropdown.Toggle>
<Dropdown.Menu>
<Dropdown.Item onClick={handleSupervisorOptionClick}>Supervisor</Dropdown.Item>
<Dropdown.Item onClick={handleProjectOptionClick}>Project</Dropdown.Item>
<Dropdown.Item onClick={handleSortByGender}>Gender</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
<Modal show={showSupervisorModal} onHide={() => setShowSupervisorModal(false)}>
<Modal.Header closeButton>
<Modal.Title>Supervisors and Allocated Projects</Modal.Title>
</Modal.Header>
<Modal.Body>
{supervisorData.map((supervisor, index) => (
<div key={index}>
<button
className={selectedSupervisor === supervisor.S_Id ? 'selected-button' : 'supervisor-button'}
onClick={() => {
handleSupervisorClick(supervisor.S_Id);
// You can add logic here to fetch projects allocated to the selected supervisor
}}
>
{supervisor.SupervisorName}
</button>
{/* Display allocated projects related to the selected supervisor */}
{/* You can add logic here to display projects in a modal or UI component */}
</div>
))}
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={() => setShowSupervisorModal(false)}>
Close
</Button>
</Modal.Footer>
</Modal>

<DatePicker
selected={selectedDate}
onChange={(date) => setSelectedDate(date)}
dateFormat="yyyy-MM-dd"
/>
<Link to='/QueueHandlerMeetingsDone'>
{/* <Button variant="primary">Meetings Done</Button> */}
</Link>
{/* Gender Popup */}
<Modal show={showGenderPopup} onHide={() => setShowGenderPopup(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Select Gender</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="d-flex flex-column align-items-center">
    <Button variant="primary" style={{ padding: '5px', width: '25%',height: '20%', backgroundImage: 'linear-gradient(to right, lightblue,blue',
          border: 'none', color: 'white', fontWeight: 'bold', }} onClick={() => handleGenderSelect('M')}>
        Male
      </Button>
      <Button variant="primary" style={{ padding: '5px', width: '25%',height: '20%', backgroundImage: 'linear-gradient(to right, lightblue,blue',
          border: 'none', color: 'white', fontWeight: 'bold', }} onClick={() => handleGenderSelect('F')}>
        Female
      </Button>
    </div>
  </Modal.Body>
</Modal>


<Button
variant="primary"
size="sm"
style={{ fontWeight: 'bold', marginLeft: '10px' }}
onClick={() => setShowDelayModal(true)}
>
Delay Now
</Button>
</div>
</div>
<Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
<Modal.Header closeButton>
<Modal.Title>Enter Project Name</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form>
<Form.Group controlId="projectName">
<Form.Label>Project Name</Form.Label>
<Form.Control
type="text"
placeholder="Enter project name"
value={projectNameInput}
onChange={handleProjectNameInputChange}
/>
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={() => setShowProjectModal(false)}>
Close
</Button>
<Button variant="primary" onClick={handleProjectSubmit}>
Submit
</Button>
</Modal.Footer>
</Modal>




<Table striped bordered hover>
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
<tr key={row.Id} className={index === inProgressIndex ? "table-primary" : ""}>
<td>{row.g_id}</td>
<td>{row.project_name} {index === inProgressIndex && "(In Progress)"}</td>
<td>{row.ModifiedTime}</td>
<td>
<Button variant="success" onClick={() => handleProcessClick(row.g_id)}>
Process
</Button>
</td>
</tr>
))
)}
</tbody>
</Table>





<Modal show={showDelayModal} onHide={() => setShowDelayModal(false)}>
<Modal.Header closeButton>
<Modal.Title>Delay Meeting</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form>
<Form.Group controlId="delayOption">
<Form.Label>Delay Option</Form.Label>
<div>
<Form.Check
inline
label="Same Day"
type="radio"
id="sameDay"
checked={delayOption === 'sameDay'}
onChange={() => handleDelayOptionChange('sameDay')}
/>
{delayOption === 'sameDay' && (
<div>
<Form.Group controlId="delayMinutes">
<Form.Label>Enter Minutes to Delay</Form.Label>
<Form.Control
type="number"
placeholder="Enter time in minutes"
value={delayMinutes}
onChange={handleDelayMinutesChange}
/>
</Form.Group>
</div>
)}


<Form.Check
inline
label="Other Day"
type="radio"
id="otherDay"
checked={delayOption === 'otherDay'}
onChange={() => handleDelayOptionChange('otherDay')}
/>
</div>
</Form.Group>

{delayOption === 'sameday' ? (
<Form.Group controlId="delayMinutes">
<Form.Label>Enter Minutes to Delay</Form.Label>
<Form.Control
type="number"
placeholder="Enter time in minutes"
value={delayMinutes}
onChange={handleDelayMinutesChange}
/>
</Form.Group>
) : (

<>
<Form.Group controlId="actualDate">
<Form.Label>Select Actual Date</Form.Label>
<Form.Control
type="date"
value={actualDate.toISOString().split('T')[0]}
onChange={(e) => handleActualDateChange(new Date(e.target.value))}
/>
</Form.Group>
<Form.Group controlId="delayDate">
<Form.Label>Select Delay Date</Form.Label>
<Form.Control
type="date"
value={delayDate.toISOString().split('T')[0]}
onChange={(e) => handleDelayDateChange(new Date(e.target.value))}
/>
</Form.Group>

{delayOption === 'otherDay' && (
<div>
<Form.Check
type="checkbox"
label="Shift to Start"
id="shiftToStart"
checked={shiftToStart}
onChange={handleShiftToStartChange}
/>
<Form.Check
type="checkbox"
label="Shift to End"
id="shiftToEnd"
checked={shiftToEnd}
onChange={handleShiftToEndChange}
/>
</div>
)}
</>
)}
</Form>
</Modal.Body>

<Modal.Footer>
<Button variant="secondary" onClick={() => setShowDelayModal(false)}>
Close
</Button>
<Button variant="primary" onClick={handleDelayMeeting}>
Delay
</Button>
</Modal.Footer>
</Modal>

</Container>
);
}

export default QueueHandler;