import express from 'express';
import PartyController from '../controllers/party';
import OfficeController from '../controllers/offices';
import middlewares from '../middlewares';

const router = express.Router();
router.get('/parties',PartyController.getAllParty);
router.get('/parties/:id', PartyController.getParty);
router.post('/parties/', middlewares.validateCreateParty,PartyController.createParty);
router.patch('/parties/:id/name', middlewares.validateUpdateParty,PartyController.updateParty);
router.delete('/parties/:id',PartyController.deleteParty);

router.get('/offices',OfficeController.getAllOffice);

export default router;
