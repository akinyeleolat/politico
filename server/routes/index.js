import express from 'express';
import PartyController from '../controllers/party';

const router = express.Router();
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id/',PartyController.getParty);
export default router;
