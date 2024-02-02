
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosLogIn } from "react-icons/io";
import { API_IP } from './Url';
// import { API_URL } from '../config';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] =useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://${API_IP}/WaitingQueue/api/login/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const user = await response.json();
        // setUser(user);
         global.user =user;
        // setError('');
        console.warn(user);
        if (user.u_role === 'Student') {
          navigate('/StudentHomeScreen');
          //console.warn("LOGIN SUCCESS in student");
        } else if (user.u_role === 'Supervisor') {
           navigate('/SupervisorHomeScreen');
          //console.warn("LOGIN SUCCESS in supervisor");
        } else if (user.u_role === 'QueueHandler') {
           navigate('/QueueHandler');
          //console.warn("LOGIN SUCCESS in queue");
        } else if (user.u_role === 'Admin') {
           navigate('/AdminHomeScreen');
         // console.warn("LOGIN SUCCESSin admin");
        } else {
          setError('Invalid email or password.');
        }
      } else if (response.status === 404) {
        setError('User not found.');
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };
  //backgroundColor: '#004f83'

  return (
    <div style={{ backgroundImage:`url(${require('../assets/Book.jpg')})`,backgroundSize:'cover',backgroundPosition:'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 className="text-center mt-4" style={{ color: 'Black', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>BIIT Project Waiting Queue</h1>


      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6} style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '8px', position: 'relative' }}>
            <h2 className="text-center mb-4">Login <IoIosLogIn/></h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <div className="password-input" style={{ position: 'relative' }}>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Button
                    variant="secondary"
                    className="password-toggle"
                    onClick={handleTogglePassword}
                    style={{ position: 'absolute', top: '48%', right: '2px', transform: 'translateY(-50%)' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>
              <Button variant="primary" style={{ padding: '5px', width: '25%',height: '20%', backgroundImage: 'linear-gradient(to right, lightbrown,pink',
          border: 'none', color: 'white', fontWeight: 'bold', }} onClick={handleLogin}>
                Login
              </Button>
            </Form>
            <p className="text-center mt-3">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;


