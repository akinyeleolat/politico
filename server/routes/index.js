import express from 'express';
import PartyController from '../controllers/party';
import OfficeController from '../controllers/offices';
import UserController from '../controllers/user';
import middlewares from '../middlewares';

const router = express.Router();
router.post('/auth/signup', middlewares.validateSignUp, UserController.signup);
router.post('/auth/login', middlewares.validateUserLogin, UserController.login);
router.post('/parties/', middlewares.validateCreateParty, PartyController.createParty);
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id', PartyController.getParty);
router.patch('/parties/:id/name', middlewares.validateUpdateParty, PartyController.updateParty);
router.delete('/parties/:id', PartyController.deleteParty);
router.post('/offices/', middlewares.validateOfficeInput, OfficeController.createOffice);
router.get('/offices', OfficeController.getAllOffice);

export default router;
