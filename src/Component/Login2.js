import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosLogIn } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
// import { API_IP } from './Url';
// import './Login.css';

const Login2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      const response = await fetch(`http://localhost/WebApi/api/users/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        // Check the role of the user and navigate accordingly
        // For example:
        if (data.role === 'Admin') {
          //navigate('/AdminHomeScreen');
          console.log("logged in admin");
        } else if (data.role === 'Student') {
         // navigate('/StudentHomeScreen');
         console.log("logged in student");
        } else if (data.role === 'Parent') {
           // navigate('/StudentHomeScreen');
           console.log("logged in parent");
        }else if (data.role === 'Conductor') {
           // navigate('/StudentHomeScreen');
           console.log("logged in conductor");
          }else {
          setError('Invalid role.');
        }
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };
  

  return (
    <div className="login-container">
      <h1 className="title">BIIT Project Waiting Queue</h1>
      <div className="form-container">
        <h2 className="form-title">
          Login <IoIosLogIn />
        </h2>
        {error && <p className="error-message">{error}</p>}
        <form className="form">
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className="password-toggle"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login2;