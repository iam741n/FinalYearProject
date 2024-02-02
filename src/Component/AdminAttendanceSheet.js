import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { API_IP } from './Url';

class AdminAttendanceSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '02/01/2024', // Date input in the format '05-Aug-2023'
      attendanceRecords: [], // Retrieved attendance records
      errorMessage: '', // Error message
    };
  }

  handleDateChange = (event) => {
    this.setState({ date: event.target.value });
  };

  fetchAttendanceRecords = () => {
    const { date } = this.state;

    // Make an API request to retrieve attendance records for the given date
    fetch(`http://${API_IP}/WaitingQueue/api/attendance/attendance?date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Message) {
          this.setState({ attendanceRecords: [], errorMessage: data.Message });
        } else if (data.length === 0) {
          // If no records were found, set a custom error message
          this.setState({
            attendanceRecords: [],
            errorMessage: 'No attendance records found for the given date',
          });
        } else {
          this.setState({ attendanceRecords: data, errorMessage: '' });
        }
      })
      .catch((error) => {
        console.error('Error fetching attendance records:', error);
        this.setState({ attendanceRecords: [], errorMessage: 'Internal Server Error' });
      });
  };

  render() {
    const { date, attendanceRecords, errorMessage } = this.state;

    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <h1 className="text-center mt-4">Waiting Queue for Admin</h1>
            <h2>Attendance Records <IoCalendarNumberOutline /></h2>
            <Form>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text" // Input type is text, as the date format is '05-Aug-2023'
                  value={date}
                  onChange={this.handleDateChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.fetchAttendanceRecords}>
                Get Attendance
              </Button>
            </Form>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {attendanceRecords.length > 0 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Registration Number</th>
                    <th>Student Name</th>
                    <th>Project Name</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.Reg_no}</td>
                      <td>{record.StudentName}</td>
                      <td>{record.project_name}</td>
                      <td>{record.Attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminAttendanceSheet;
