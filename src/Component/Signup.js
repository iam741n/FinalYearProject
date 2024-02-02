import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { API_IP } from './Url';
// import { API_URL } from '../config';
const Signup = () => {
  const [formData, setFormData] = useState({
    u_name: '',
    u_email: '',
    u_password: '',
    u_city: '',
    u_phoneno: '',
    u_role: 'Supervisor', // Set the default role to 'Supervisor'
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    
    try {
      const response = await fetch(`http://${API_IP}/WaitingQueue/api/login/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 200) {
        // Display a success message using the Alert component
        setError('Account created successfully');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div style={{ backgroundColor: '#004f83', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    
    <Container>
      
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
        <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Signup</h1>
          <Row className="justify-content-center mt-5">
          <Form>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="u_name"
                value={formData.u_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="u_email"
                value={formData.u_email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="u_password"
                value={formData.u_password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="u_city"
                value={formData.u_city}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Phone no</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="u_phoneno"
                value={formData.u_phoneno}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Role</Form.Label>
              <Form.Control
                as="select"
                name="u_role"
                value={formData.u_role}
                onChange={handleInputChange}
                required
              >
                <option value="Supervisor">Supervisor</option>
                <option value="QueueHandler">QueueHandler</option>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Button variant="success" onClick={handleSignup}>
              Sign Up
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
          </Form>
          </Row>
        </Col>
        </Row>
     
    </Container>
   
    </div>
  );
};

export default Signup;
