import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
            <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>

        <div className='flex flex-col my-10 md:flex-row gap-12'>
            <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=""/>
            <div className='flex flex-col justify-center gap-6 md:wd-2/4 text-sm text-gray-600'>
                <p>Welcome to DocDoc, your trusted companion for hassle-free healthcare appointments. At DocDoc, we believe that access to quality healthcare should be simple, transparent, and stress-free. That’s why we’ve created a web application that connects patients with skilled and trusted doctors from various specialties, all in just a few clicks. Whether you&apos;re seeking expert advice, routine check-ups, or specialized care, DocDoc ensures you find the right healthcare provider tailored to your needs.</p>
                <p>Founded on the principles of accessibility and convenience, DocDoc continues to evolve with the needs of our users. We are dedicated to building a community where healthcare is approachable and efficient. Thank you for trusting us to be a part of your healthcare journey—we’re here to support you every step of the way.</p>
                <b className='text-gray-800'>Our Vision</b>
                <p>At DocDoc, our vision is to create a world where accessing quality healthcare is effortless and inclusive. We aim to bridge the gap between patients and healthcare providers through innovative technology, empowering everyone to take control of their health with ease and confidence.</p>
            </div>
        </div>

        <div className='text-xl my-4'>
            <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
        </div>
        <div className='flex flex-col md:flex-row mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[-15px] hover:bg-primary hover:text-white tranistion-all duration-300 text-gray-600 cursor-pointer'>
                <b>Efficiency:</b>
                <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[-15px] hover:bg-primary hover:text-white tranistion-all duration-300 text-gray-600 cursor-pointer'>
                <b>Convinience:</b>
                <p>Access to a network of trusted heathcare professionals in your area.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[-15px] hover:bg-primary hover:text-white tranistion-all duration-300 text-gray-600 cursor-pointer'>
                <b>Personalization</b>
                <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
        </div>
    </div>
  )
}

export default About