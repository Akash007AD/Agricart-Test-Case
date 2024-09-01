import { Router } from 'express';
import {
    addFarmer,
    loginFarmer,
    logoutFarmer,
    getFarmerDetails,
    getAllFarmers,
    updateFarmer,
    deleteFarmer
} from "../controllers/farmer.controller.js";

const router = Router();

router.post('/register', addFarmer);
router.post('/login', loginFarmer);
router.post('/logout', logoutFarmer);
router.get('/', getAllFarmers);
router.get('/:farmerId', getFarmerDetails);
router.patch('/:farmerId', updateFarmer);
router.delete('/:farmerId', deleteFarmer);

export default router;
