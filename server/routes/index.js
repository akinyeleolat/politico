import express from 'express';
import PartyController from '../controllers/party';
import middlewares from '../middlewares';

const router = express.Router();
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id', PartyController.getParty);
router.post('/parties/', middlewares.validateCreateParty,PartyController.createParty);
router.patch('/parties/:id/name', middlewares.validateUpdateParty,PartyController.updateParty);

export default router;
