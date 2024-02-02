import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { API_URL } from './config';
// import { ApiContext } from './Context/ApiContext';
import Login from './Component/Login';
import Signup from './Component/Signup';
import StudentHomeScreen from './Component/StudentHomeScreen';
import SupervisorHomeScreen from './Component/SupervisorHomeScreen';
import StudentPreviousScreen from './Component/StudentPreviousScreen';
import StudentOngoingScreen from './Component/StudentOngoingScreen';
import StudentOngoingExtra from './Component/StudentOngoingExtra';
import SupervisorPreviousScreen from './Component/SupervisorPreviousScreen';
import SupervisorGroupInformation from './Component/SupervisorGroupInformation';
import SupervisorMeetingDetails from './Component/SupervisorMeetingDetails';
import QueueHandler from './Component/QueueHandler';
import AdminHomeScreen from './Component/AdminHomeScreen';
import AdminImportSheet from './Component/AdminImportSheet';
import StudentOngoingScreen2 from './Component/StudentOngoingScreen2';
import AdminAttendanceSheet from './Component/AdminAttendanceSheet';
import AdminArrangeMeeting from './Component/AdminArrangeMeeting';
import AdminRequestScreen from './Component/AdminRequestScreen';
import AdminRemarksScreen from './Component/AdminRemarksScreen';
import AdminOngoingRemarks from './Component/AdminOngoingRemarks'; 
import QueueHandlerMeetingsDone from './Component/QueueHandlerMeetingsDone';
import SupervisorMeetingHistory from './Component/SupervisorMeeetingHistory';

function App() {
  return (
  //   <div>
  //    <AdminArrangeMeeting/>
  //  </div>
    <Router>
        {/* <ApiContext.Provider value={API_URL}> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/StudentHomeScreen" element={<StudentHomeScreen />} />
        <Route path="/SupervisorHomeScreen" element={<SupervisorHomeScreen />} />
        <Route path="/StudentPreviousScreen" element={<StudentPreviousScreen />} />
        <Route path="/StudentOngoingScreen" element={<StudentOngoingScreen />} />
        <Route path="/StudentOngoingExtra" element={<StudentOngoingExtra />} />
        <Route path="/SupervisorPreviousScreen" element={<SupervisorPreviousScreen />} />
        <Route path="/SupervisorGroupInformation" element={<SupervisorGroupInformation />} />
        <Route path="/SupervisorMeetingDetails" element={<SupervisorMeetingDetails />} />
        <Route path="/QueueHandler" element={<QueueHandler />} />
        <Route path="/AdminHomeScreen" element={<AdminHomeScreen />} />
        <Route path="/AdminImportSheet" element ={<AdminImportSheet/>}/>
        <Route path="/StudentOngoingScreen2" element ={<StudentOngoingScreen2/>}/>
        <Route path="/AdminAttendanceSheet" element ={<AdminAttendanceSheet/>}/>
        <Route path="/AdminArrangeMeeting" element ={<AdminArrangeMeeting/>}/>
        <Route path="/AdminRequestScreen" element ={<AdminRequestScreen/>}/>
        <Route path="/AdminRemarksScreen" element ={<AdminRemarksScreen/>}/>
        <Route path="/AdminOngoingRemarks" element={<AdminOngoingRemarks />} />
        <Route path="/QueueHandlerMeetingsDone" element={<QueueHandlerMeetingsDone />} />
        <Route path="/SupervisorMeetingHistory" element={<SupervisorMeetingHistory />} />
        {/* Add more routes as needed */} 
      </Routes>
    {/* </ApiContext.Provider> */}
    </Router>
  );
}

export default App;

// <div>
     // <QueueHandler />
   //</div>