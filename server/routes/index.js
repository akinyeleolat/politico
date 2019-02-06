import express from 'express';
import PartyController from '../controllers/party';
import OfficeController from '../controllers/offices';
import UserController from '../controllers/user';
import middlewares from '../middlewares';

const router = express.Router();
router.post('/auth/signup', middlewares.validateSignUp, UserController.signup);
router.post('/auth/login', middlewares.validateUserLogin, UserController.login);
router.post('/parties/', middlewares.validateCreateParty, PartyController.createParty);
router.get('/offices', OfficeController.getAllOffice);
router.get('/offices/:id', OfficeController.getOffice);
router.post('/offices/', middlewares.validateOfficeInput, OfficeController.createOffice);

export default router;
