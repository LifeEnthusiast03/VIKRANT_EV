import express from 'express'
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();
import { bookookService,getAllServicde,getSericeStatus} from '../controllers/servicecontrollers.js';
router.use(isAuthenticated);
router.post('/get-service',getAllServicde);
router.post('/book-service',bookookService);
router.post('/get-service-status',getSericeStatus)
export default router;