import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePatient = () => {
  const navigate = useNavigate();
  const { selectedPatient, setSelectedPatient } = useContext(AdminContext);

  const [patientImg, setPatientImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(new Date());
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);
  console.log(selectedPatient);

  // Fetch patient details on component load
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        if (selectedPatient) {
          const { name, email, gender, phone, dob, address, image } = selectedPatient;
          setName(name);
          setEmail(email);
          setGender(gender);
          setPhone(phone);
          setDob(dob);
          setAddress1(address?.line1 || '');
          setAddress2(address?.line2 || '');
          setPatientImg(image);
        } else {
          toast.error('Patient not found.');
        }
      } catch (error) {
        toast.error('Failed to fetch patient details.');
      }
    };

    fetchPatientDetails();
  }, [backendUrl, aToken, email]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (patientImg instanceof File) {
        formData.append('image', patientImg);
      }
      formData.append('name', name);
      formData.append('email', email);
      if (password) formData.append('password', password);
      formData.append('gender', gender);
      formData.append('phone', Number(phone));
      formData.append('dob', dob);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.put(`${backendUrl}/api/admin/update-patient/${email}`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        navigate('../patient-list');
        setSelectedPatient(null)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Update Patient</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="patient-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={patientImg instanceof File ? URL.createObjectURL(patientImg) : patientImg || assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e) => setPatientImg(e.target.files[0])} type="file" id="patient-img" hidden />
          <p>Upload Patient <br /> picture</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Patient Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Patient Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password (Leave blank to keep current)"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Gender</p>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="border rounded px-3 py-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Phone</p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Phone no"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Date of Birth</p>
              <input
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                className="border rounded px-3 py-2"
                type="date"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
          Update Patient
        </button>
      </div>
    </form>
  );
};

export default UpdatePatient;
