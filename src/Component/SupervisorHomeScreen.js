import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SupervisorHomeScreen() {
  const buttonStyle = {
    borderRadius: '50px', // Make the buttons oval-shaped
    padding: '20px 40px', // Increase padding to make buttons larger
  };

  const buttonContainerStyle = {
    textAlign: 'center', // Center align the buttons
  };

  const buttonContainerMargin = {
    marginTop: '20px', // Add margin to the button container
  };

  const boldText = {
    fontWeight: 'bold', // Make the text bold
    fontSize: '18px', // Increase font size
  };

  return (
    <div className="StudentHomeScreen" style={{ backgroundImage:`url(${require('../assets/Grad.jpg')})`,backgroundSize:'cover',backgroundPosition:'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container">
        <h1 className="text-center mt-4">Waiting Queue for Supervisor</h1>
       
  
        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/SupervisorPreviousScreen'>
            <Button variant="primary" style={buttonStyle}>Previous Meeting</Button>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/SupervisorMeetingHistory'>
            <Button variant="primary" style={buttonStyle}>Meeting History</Button>
            </Link>
          </div>
        </div>
       
            <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
          <Link to='/SupervisorGroupInformation'>
            <Button variant="primary" style={buttonStyle}>Groups Information</Button>
            </Link>
          </div>
        </div>
        
        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
          <Link to='/SupervisorMeetingDetails'>
            <Button variant="primary" style={buttonStyle}>Meeting Details</Button>
            </Link>
          </div>
        </div>
        
        {/* You can add more content here */}
        
      </div>
    </div>
  );
}

export default SupervisorHomeScreen;
