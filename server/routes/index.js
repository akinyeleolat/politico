import express from 'express';
import PartyController from '../controllers/party';

const router = express.Router();
router.get('/parties', PartyController.getAllParty);
export default router;
