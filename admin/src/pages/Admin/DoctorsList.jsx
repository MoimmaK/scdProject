import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor, setSelectedDoctor } = useContext(AdminContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div className='border border-indigo-200 rounded-x1 max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 ' src={item.image} />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
               </div>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <button onClick={()=> {setSelectedDoctor(item);navigate('../edit-doctor')}} className='bg-grey-900 text-black px-4 py-1 hover:text-white rounded-lg hover:bg-primary'>Edit</button>
                  <button onClick={() => {deleteDoctor(item.email)}} className='bg-grey-900 text-black ml-12 px-4 py-1 hover:text-white rounded-lg hover:bg-red-500'>Delete</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList