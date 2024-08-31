// StudentHomeScreen.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function StudentHomeScreen() {
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

  return (
    <div className="StudentHomeScreen" style={{ backgroundImage:`url(${require('../assets/Grad.jpg')})`,backgroundSize:'cover',backgroundPosition:'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container">
      {/* <h1 className="text-center mt-4" style={{ color: 'Black', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Waiting Queue for Students</h1> */}
        <h1 className="text-center mt-4">Waiting Queue for Students</h1>
       
        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
          <Link to='/StudentOngoingScreen2'>
            <Button variant="primary" style={buttonStyle}>Ongoing Meeting</Button>
            </Link>
          </div>
        </div>
        
        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/StudentPreviousScreen'>
            <Button variant="primary" style={buttonStyle}>Previous Meeting</Button>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/StudentSchedule'>
            <Button variant="primary" style={buttonStyle}>Group Meeting</Button>
            </Link>
          </div>
        </div>

        {/* Logout Button (Navigate to the login screen) */}
      {/*   <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/Login'> // Use lowercase 'login' for consistency 
              <Button variant="danger" style={buttonStyle}>
                Logout
              </Button>
            </Link>
          </div>
  </div> */}
        
        
        {/* You can add more content here */}
        
      </div>
    </div>
  );
}

export default StudentHomeScreen;
