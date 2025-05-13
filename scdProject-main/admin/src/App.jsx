
import React from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext.jsx';
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx'
import AddDoctor from './pages/Admin/AddDoctor.jsx'
import DoctorList from './pages/Admin/DoctorsList.jsx'
import AllAppointments from './pages/Admin/AllAppointments.jsx'
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import AddPatient from './pages/Admin/AddPatient.jsx';
import PatientsList from './pages/Admin/PatientsList.jsx';
import UpdateDoctor from './pages/Admin/UpdateDoctor.jsx';
import UpdatePatient from './pages/Admin/UpdatePatient.jsx';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/*----admin route-----*/}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/edit-doctor' element={<UpdateDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
          <Route path='/add-patient' element={<AddPatient/>}/>
          <Route path='/edit-patient' element={<UpdatePatient/>}/>
          <Route path='/patient-list' element={<PatientsList/>}/>

          {/*----doctor route-----*/}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
          
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App