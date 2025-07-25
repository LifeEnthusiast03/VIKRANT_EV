import express from 'express';
import { updateContactData,getContactData } from '../controllers/datacontroller.js';


const router = express.Router();

router.post('/',updateContactData);
router.get('/',getContactData);

export default router