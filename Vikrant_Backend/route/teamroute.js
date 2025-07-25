import express from 'express';
import { getTeamData } from '../controllers/teamcontroller.js';

const router = express.Router();
router.get('/',getTeamData);

export default router;
