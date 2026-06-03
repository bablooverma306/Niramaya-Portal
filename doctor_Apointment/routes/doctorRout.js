import express from 'express'
import { userAuth,isAdmin } from '../middleware/authMiddleware.js'
import upload from '../middleware/multer.js'
import { addDoctor, deleteDoctor, getAllDoctor, getDoctorDetails, updateAvailableStatus, updateDoctor } from '../controllers/doctorController.js'

const router = express.Router()

/// add doctor
router.post('/add',userAuth,isAdmin,upload.single('Image'),addDoctor)
// get all doctor -> get
router.get('/get-all',getAllDoctor) 

// docter details -> get 
router.get('/get-details/:id',getDoctorDetails) 
/// doctor details updates ->petch
router.patch('/update/:id',userAuth,isAdmin,upload.single('Image'),updateDoctor)
// doctor delete -> delete
router.delete('/delete/:id',userAuth,isAdmin,deleteDoctor)
// doctor available status ->petch
router.patch('/update-status/:id',userAuth,isAdmin,updateAvailableStatus)

export default router 
