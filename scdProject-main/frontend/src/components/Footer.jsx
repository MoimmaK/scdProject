import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*---left section--- */}
            <div>
                <img className='mb-5 w-24' src={assets.logo} alt=""/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>DocDoc is to &quot;Knock Knock&quot; on your doctor&apos;s door(online portal) to get an appointment, just with the click of one button! Isn&apos;t that amazing?</p>
            </div>

             {/*---center section--- */}
             <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

                 {/*---right section--- */}
            <div>
               <p className='text-xl font-medium mb-5'>GET IN TOUCH</p> 
               <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Phone: +92 1234567890</li>
                <li>Email: docdoc@gmail.com</li>
               </ul>
            </div>
        </div>

        {/*---copyright----- */}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2024&copy; Prescription DocDoc All Rights Reserved. </p>
        </div>
    </div>
  )
}

export default Footer