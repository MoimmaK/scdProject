import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import {useNavigate} from 'react-router-dom'

const PatientsList = () => {

  const { patients, aToken, getAllPatients, deletePatient, setSelectedPatient } = useContext(AdminContext)
  const { calculateAge } = useContext(AppContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllPatients()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Patients</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          patients.map((item, index) => (
            <div className='border border-indigo-200 rounded-x1 max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 ' src={item.image} />

                <div className='p-4 flex flex-col'>
                  <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                  <div className='mt-2 flex flex-row items-center gap-1 text-sm'>
                    <button onClick={()=> {setSelectedPatient(item);navigate('../edit-patient')}} className='bg-grey-900 text-black px-4 py-1 hover:text-white rounded-lg hover:bg-primary'>Edit</button>
                    <button onClick={()=> {deletePatient(item.email)}} className='bg-grey-900 text-black px-4 py-1 ml-16 hover:text-white rounded-lg hover:bg-red-500'>Delete</button>
                  </div>
                </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PatientsList