import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminHomeScreen() {
  const buttonStyle = {
    borderRadius: '50px',
    padding: '20px 40px',
  };

  const buttonContainerStyle = {
    textAlign: 'center',
  };

  const buttonContainerMargin = {
    marginTop: '20px',
  };

  const boldText = {
    fontWeight: 'bold',
    fontSize: '18px',
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    const body = document.body;
    if (darkMode) {
      body.classList.remove('dark-mode');
    } else {
      body.classList.add('dark-mode');
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={`StudentHomeScreen ${darkMode ? 'dark-mode' : ''}`} style={{ backgroundImage:`url(${require('../assets/Grad.jpg')})`,backgroundSize:'cover',backgroundPosition:'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
        <Container>
        <Link to='/AdminHomeScreen' className="nav-link">
          <Navbar.Brand href="#home" style={boldText}>Waiting Queue for Admin</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleDrawer} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to='/AdminArrangeMeeting' className="nav-link">
                Arrange Meeting
              </Link>
              {/* <Link to='/reschedule' className="nav-link">
                Reschedule
              </Link> */}
              <Link to='/AdminImportSheet' className="nav-link">
                Import Sheet
              </Link>
              <Link to='/AdminRequestScreen' className="nav-link">
                Requests
              </Link>
              <Link to='/AdminAttendanceSheet' className="nav-link">
                Attendance
              </Link>
              <Link to='/AdminRemarksScreen' className="nav-link">
                Remarks
              </Link>
            </Nav>
            <Button variant="primary" onClick={toggleMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div className="text-center mt-4">
          <h1>Waiting Queue for Admin</h1>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/AdminArrangeMeeting'>
              <Button variant="primary" style={buttonStyle}>
                Arrange Meeting
              </Button>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/AdminRequestScreen'>
              <Button variant="primary" style={buttonStyle}>
                Requests
              </Button>
            </Link>
          </div>
        </div>

        {/* <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/AdminOngoingRemarks'>
              <Button variant="primary" style={buttonStyle}>
                 Ongoing Meeting 
              </Button>
            </Link>
          </div>
        </div> */}

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/AdminRemarksScreen'>
              <Button variant="primary" style={buttonStyle}>
                Remarks
              </Button>
            </Link>
          </div>
        </div>

        {/* You can add more content here */}
      </Container>
    </div>
  );
}

export default AdminHomeScreen;
