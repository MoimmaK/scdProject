import express from 'express'
import { addDoctor, addPatient, adminDashboard, allDoctors, allPatients, appointmentCancel, appointmentsAdmin, deleteDoctor, deletePatient, loginAdmin, updateDoctor, updatePatient } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import { authAdmin } from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router()

adminRouter.post('/login', loginAdmin);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/dashboard', authAdmin, adminDashboard);


adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);

adminRouter.post('/add-patient', authAdmin, upload.single('image'),  addPatient);
adminRouter.post('/add-doctor', authAdmin, upload.single('image'),  addDoctor);

adminRouter.get('/all-doctors', authAdmin, allDoctors);
adminRouter.get('/all-patients', authAdmin, allPatients);

adminRouter.delete('/delete-doctor/:email', authAdmin, deleteDoctor);
adminRouter.delete('/delete-patient/:email', authAdmin, deletePatient);

adminRouter.put('/update-doctor/:email', authAdmin, upload.single('image'),  updateDoctor);
adminRouter.put('/update-patient/:email', authAdmin, upload.single('image'),  updatePatient);

export default adminRouter;
