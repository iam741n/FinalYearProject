import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_IP } from './Url';
import { CiStickyNote } from 'react-icons/ci';

const AdminRemarksScreen = () => {
  const [remarksData, setRemarksData] = useState([]);

  useEffect(() => {
    fetchRemarks();
  }, []);

  const fetchRemarks = async () => {
    try {
      const response = await fetch(`http://${API_IP}/WaitingQueue/api/attendance/GetRemarks`);
      const data = await response.json();
      setRemarksData(data);
    } catch (error) {
      console.error('Error fetching remarks:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mt-4">Waiting Queue for Admin</h1>
      <div className="card mt-4 p-4">
        <h2 className="mb-4 d-flex align-items-center">
          Remarks Given By Supervisors<CiStickyNote className="ml-2" />
        </h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Registration No</th>
                <th>Student Name</th>
                <th>Project Name</th>
                <th>Date</th>
                {/* <th>Time</th> */}
                <th>Attendance</th>
                <th>Remarks</th>
                <th>Supervisor Name</th>
              </tr>
            </thead>
            <tbody>
              {remarksData.map((record, index) => (
                <tr key={index}>
                  <td>{record.Reg_no}</td>
                  <td>{record.StudentName}</td>
                  <td>{record.project_name}</td>
                  <td>{record.date}</td>
                  {/* <td>{record.time}</td> */}
                  <td>{record.Attendance}</td>
                  <td>{record.remarks}</td>
                  <td>{record.SupervisorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRemarksScreen;
