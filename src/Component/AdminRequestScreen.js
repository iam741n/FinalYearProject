import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { API_IP } from './Url';
const AdminRequestScreen = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchMeetingRequests();
  }, []);

  const fetchMeetingRequests = async () => {
    try {
      const response = await fetch(`http://${API_IP}/WaitingQueue/api/MeetingRequest/MeetingRequests`);
      if (!response.ok) {
        throw new Error('Failed to fetch meeting requests');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching meeting requests:', error);
      // Handle error
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const response = await fetch(`http://${API_IP}/WaitingQueue/api/MeetingRequest/AcceptRequest/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accept' }),
      });
      if (!response.ok) {
        throw new Error('Failed to accept the request');
      }
      // Remove the accepted request from the list
      setRequests(requests.filter(request => request.MR_Id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
      // Handle error
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch(`http://${API_IP}/WaitingQueue/api/MeetingRequest/RejectRequest/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'reject' }),
      });
      if (!response.ok) {
        throw new Error('Failed to reject the request');
      }
      // Remove the rejected request from the list
      setRequests(requests.filter(request => request.MR_Id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
      // Handle error
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Waiting Queue for Admin</h1>
      <h2>Meeting Requests <IoBriefcaseOutline/> </h2>
      {requests.map((request) => (
        <Card key={request.MR_Id} className="mb-3">
          <Card.Body>
            <Card.Title>{request.ProjectName}</Card.Title>
            <Card.Text>
              Request for: {request.RequestType}<br />
              Time: {request.Time}, Date: {request.Date} , Requet Option: {request.TimeOption}
            </Card.Text>
            <Button variant="success" onClick={() => handleAccept(request.MR_Id)}>
              Accept
            </Button>
            <Button variant="danger" onClick={() => handleReject(request.MR_Id)}>
              Reject
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default AdminRequestScreen;
