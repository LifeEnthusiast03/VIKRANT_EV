import express from 'express'
import chatResponse from '../controllers/chatcontroller.js'
const router = express.Router();
router.post('/',chatResponse);
export default router;