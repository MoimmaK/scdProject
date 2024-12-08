import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorDashboard = () => {

  const {dToken,dashData, setDashData, getDashData}= useContext(DoctorContext)

  useEffect(()=>{
    if(dToken){
      getDashData();
    }

  },[dToken])

  return dashData &&  (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2'>
{/*---under construction----*/}
        </div>
      </div>
        
    </div>
  )
}

export default DoctorDashboard