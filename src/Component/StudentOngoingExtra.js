import React, { useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';

function StudentOngoingExtra() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const handlePopupClose = () => setShowPopup(false);

  const showProjectPopup = (projectName) => {
    setSelectedProject(projectName);
    setShowPopup(true);
  };

  const projects = [
    { number: 1, name: 'To Do List', timeLeft: 0 },
    { number: 2, name: 'Memory Jogger', timeLeft: 50 },
    { number: 3, name: 'Biit Project Waiting Queue (Your Group)', timeLeft: 70 },
    { number: 4, name: 'Vehicle Car Project', timeLeft: 90 },
    { number: 5, name: 'Replica of IMDB', timeLeft: 110 },
    { number: 6, name: 'Track Biit Visitors', timeLeft: 130 },
    { number: 7, name: 'Friends Loan Manager', timeLeft: 150 },
    { number: 8, name: 'Lab Complaint System', timeLeft: 170 },
  ];

  const navigateToStudentScreen5 = () => {
    // Add your navigation logic here
    alert('Next button clicked');
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Student Screen 4</h1>
      <div className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Time Left (min)</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.number}>
                <td>{project.number}</td>
                <td>
                  <span
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => showProjectPopup(project.name)}
                  >
                    {project.name}
                  </span>
                </td>
                <td>{project.timeLeft}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="text-center mt-4">
        <Button variant="primary" onClick={navigateToStudentScreen5}>
          Next
        </Button>
      </div>

      <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Meeting Delayed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your meeting for <strong>{selectedProject}</strong> has been delayed for 30 minutes.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default StudentOngoingExtra;
