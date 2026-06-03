import express from 'express'
import{createMessage, deleteWebMessage, getAllMessage} from '../controllers/webMessageController.js'
import { isAdmin, userAuth } from '../middleware/authMiddleware.js'
 
const router = express.Router()

// create message  -> post 
 
router.post('/create',createMessage)
/// get all message -> get

router.get('/get-all',getAllMessage)

// delete message -> delete
router.get('/delete/:id',userAuth,isAdmin,deleteWebMessage)
export default router;


