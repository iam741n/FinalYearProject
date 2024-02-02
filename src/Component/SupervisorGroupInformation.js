import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import { API_IP } from './Url'; // Make sure to import or define API_IP properly



const SupervisorGroupInformation = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [supervisorName, setSupervisorName] = useState('');
  const [projects, setProjects] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
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
    setSelectedProject(project);
    setShowModal(true);
  };
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setRemarks({
      ...remarks,
      [group.student_id]: '', // Initialize remarks with an empty string for the selected group member
    });
  };
  const handleRemarkChange = (event, regno) => {
    const { value } = event.target;
    setRemarks({
      ...remarks,
      [regno]: {
        ...remarks[regno],
        remark: value,
      },
    });
  };

  const handleAttendanceChange = (event, regno) => {
    const { checked } = event.target;
    const attendanceValue = checked ? 'P' : 'A';
    setRemarks({
      ...remarks,
      [regno]: {
        ...remarks[regno],
        attendance: attendanceValue,
      },
    });
  };

  const handleSaveAllRemarks = () => {
    const extractedData = selectedProject?.Groupmembers.map((member) => ({
      student_id: member.student_id,
      GA_id: member.GA_id,
      Regno: member.Regno, // Include Regno or another identifier to match remarks
    }));
  
    console.log(extractedData);
  
    const remarksData = {
      newRemarks: extractedData.map((data) => {
        const remark = remarks[data.Regno]; // Retrieve the remark for the current member
        return {
          M_ID: '35',
          student_id: data.student_id,
          GA_id: data.GA_id,
          remarks: remark?.remark || '', // Use the retrieved remark or an empty string
          status: 'held', // Replace with appropriate status
          Attendance: remark?.attendance || 'A', // Use the retrieved attendance or 'A' as default
          date: new Date().toLocaleDateString('en-GB'),
          time: new Date().toLocaleTimeString('en-US', { hour12: true }),
          MeetingType: '1', // Replace with appropriate meeting type
          // Other necessary properties as needed
        };
      }),
    };
    const apiUrl = `http://${API_IP}/WaitingQueue/api/supervisor/NewRemark`;
    console.log('Selected Group:', selectedGroup);
    console.log('Selected Project:', selectedProject);
    
    
          console.log(JSON.stringify(selectedProject))
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(remarksData.newRemarks),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Remarks added successfully!');
          setRemarks({});
          setShowModal(false);
          setSelectedProject(null);
        } else {
          console.error('Failed to add remarks.');
        }
      })
      .catch((error) => {
        console.error('Error adding remarks:', error);
      });
  };
    

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Waiting Queue for Supervisor</h1>
      <h2 className="text-center mt-2">Groups Information</h2>
      <div className="text-center mb-3">
        <h3 style={{ color: 'Green' }}>Supervisor: {supervisorName}</h3>
      </div>
      <div className="d-flex flex-column align-items-center">
        {projects.map((project, index) => (
          <div key={index} className="mb-3">
            <Button variant="primary" onClick={() => handleProjectClick(project)}>
              {project.ProjectAllocated}
            </Button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Group Information for {selectedProject?.ProjectAllocated}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {selectedProject?.Groupmembers.map((member, index) => (
              <ListGroupItem key={index}>
                {member.name} - {member.Regno} - FYP: {member.FYP}
                <div style={{ marginTop: '10px' }}>
                  <label>Remark:</label>
                  <input
                    type="text"
                    value={remarks[member.Regno]?.remark || ''}
                    onChange={(event) => handleRemarkChange(event, member.Regno)}
                  />
                  <label style={{ marginLeft: '20px' }}>Attendance:</label>
                  <input
                    type="checkbox"
                    checked={remarks[member.Regno]?.attendance === 'P'}
                    onChange={(event) => handleAttendanceChange(event, member.Regno)}
                    style={{ marginLeft: '10px' }}
                  />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveAllRemarks}>
            Save All
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SupervisorGroupInformation;